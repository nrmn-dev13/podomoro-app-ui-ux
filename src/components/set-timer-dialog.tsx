"use client";

import { useState } from "react";
import { useTimerStore } from "@/store/timer-store";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Settings } from "lucide-react";

interface SetTimerDialogProps {
  children: React.ReactNode;
}

export function SetTimerDialog({ children }: SetTimerDialogProps) {
  const { workDuration, setWorkDuration } = useTimerStore();
  const [tempDuration, setTempDuration] = useState(workDuration.toString());
  const [open, setOpen] = useState(false);

  const handleSave = () => {
    const duration = parseInt(tempDuration);
    if (duration > 0 && duration <= 120) {
      setWorkDuration(duration);
      setOpen(false);
    }
  };

  const handleCancel = () => {
    setTempDuration(workDuration.toString());
    setOpen(false);
  };

  const handleOpenChange = (newOpen: boolean) => {
    if (newOpen) {
      setTempDuration(workDuration.toString());
    }
    setOpen(newOpen);
  };

  // Preset times
  const presetTimes = [15, 25, 30, 45, 60];

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Set Timer Duration</DialogTitle>
          <DialogDescription>
            Choose your preferred timer duration in minutes.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          {/* Preset Buttons */}
          <div className="space-y-2">
            <Label>Quick Select (minutes)</Label>
            <div className="flex flex-wrap gap-2">
              {presetTimes.map((time) => (
                <Button
                  key={time}
                  variant={
                    tempDuration === time.toString() ? "default" : "outline"
                  }
                  size="sm"
                  onClick={() => setTempDuration(time.toString())}
                >
                  {time}m
                </Button>
              ))}
            </div>
          </div>

          {/* Custom Input */}
          <div className="space-y-2">
            <Label htmlFor="duration">Custom Duration (minutes)</Label>
            <Input
              id="duration"
              type="number"
              min="1"
              max="120"
              value={tempDuration}
              onChange={(e) => setTempDuration(e.target.value)}
              placeholder="Enter minutes..."
            />
            <p className="text-xs text-muted-foreground">
              Range: 1-120 minutes
            </p>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            disabled={
              !tempDuration ||
              parseInt(tempDuration) < 1 ||
              parseInt(tempDuration) > 120
            }
          >
            Set Timer
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
