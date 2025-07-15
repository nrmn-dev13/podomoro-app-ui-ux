"use client";

import { useState } from "react";
import { useTimer } from "@/hooks/use-timer";
import { useTimerStore } from "@/store/timer-store";
import { useNotesStore, type Note } from "@/store/notes-store";
import {
  Card,
  CardContent,
  Typography,
  LinearProgress,
  IconButton,
  Box,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  Button,
  TextField,
  Stack,
  Collapse,
  Divider,
} from "@mui/material";
import {
  PlayArrow,
  Pause,
  Stop,
  Refresh,
  Settings,
  Add,
  Edit,
  Delete,
  KeyboardArrowDown,
  KeyboardArrowUp,
  NoteAdd,
} from "@mui/icons-material";

export function Timer() {
  const {
    timeRemaining,
    isRunning,
    isPaused,
    formatTime,
    getProgress,
    startTimer,
    pauseTimer,
    stopTimer,
    resetTimer,
  } = useTimer();

  // Timer settings state
  const { workDuration, setWorkDuration } = useTimerStore();
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [tempDuration, setTempDuration] = useState(workDuration.toString());

  // Notes visibility state
  const [notesExpanded, setNotesExpanded] = useState(false);

  // Notes state
  const { notes, addNote, updateNote, deleteNote } = useNotesStore();
  const [noteDialogOpen, setNoteDialogOpen] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [noteToDelete, setNoteToDelete] = useState<Note | null>(null);
  const [noteTitle, setNoteTitle] = useState("");
  const [noteDescription, setNoteDescription] = useState("");

  // Check if timer is in initial/stopped state
  const canShowSettings = !isRunning && !isPaused;

  // Timer functions
  const handlePlayPause = () => {
    if (isRunning) {
      pauseTimer();
    } else {
      startTimer();
    }
  };

  const handleOpenSettings = () => {
    setTempDuration(workDuration.toString());
    setSettingsOpen(true);
  };

  const handleSaveSettings = () => {
    const duration = parseInt(tempDuration);
    if (duration > 0 && duration <= 120) {
      setWorkDuration(duration);
      setSettingsOpen(false);
    }
  };

  const handleCancelSettings = () => {
    setTempDuration(workDuration.toString());
    setSettingsOpen(false);
  };

  // Notes functions
  const handleToggleNotes = () => {
    setNotesExpanded(!notesExpanded);
  };

  const handleOpenNoteDialog = (note?: Note) => {
    if (note) {
      setEditingNote(note);
      setNoteTitle(note.title);
      setNoteDescription(note.description);
    } else {
      setEditingNote(null);
      setNoteTitle("");
      setNoteDescription("");
    }
    setNoteDialogOpen(true);

    // Ensure notes section is expanded when adding/editing
    if (!notesExpanded) {
      setNotesExpanded(true);
    }
  };

  const handleSaveNote = () => {
    if (!noteTitle.trim()) return;

    if (editingNote) {
      updateNote(editingNote.id, noteTitle.trim(), noteDescription.trim());
    } else {
      addNote(noteTitle.trim(), noteDescription.trim());
    }

    handleCloseNoteDialog();
  };

  const handleCloseNoteDialog = () => {
    setNoteDialogOpen(false);
    setEditingNote(null);
    setNoteTitle("");
    setNoteDescription("");
  };

  const handleDeleteNote = (note: Note) => {
    setNoteToDelete(note);
  };

  const confirmDeleteNote = () => {
    if (noteToDelete) {
      deleteNote(noteToDelete.id);
      setNoteToDelete(null);
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  // Preset times
  const presetTimes = [15, 25, 30, 45, 60];

  const today = new Date();
  const currentDate = today.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Box
      sx={{ width: "100%", maxWidth: 600, mx: "auto", position: "relative" }}
    >
      {/* Timer Section */}
      <Card>
        <div className="top-button"></div>
        <div className={`bottom-button${notesExpanded ? " expanded" : ""}`}></div>
        <div className="button-wrapper">
          <div className="top-button-sm"></div>
          <div className="top-button-sm"></div>
        </div>
        <CardContent
          sx={{
            textAlign: "center",
            p: 4,
            backgroundColor: "#d9d9d9",
            position: "relative",
            zIndex: 1,
          }}
        >
          {/* Timer Display */}
          <div className="screen">
            <span className="shine-lg"></span>
            <span className="shine-sm"></span>
            <Typography
              variant="h1"
              component="div"
              sx={{
                fontFamily: "monospace",
                fontSize: { xs: "1rem", sm: "1rem" },
                fontWeight: "bold",
                letterSpacing: "0.1em",
                mb: 3,
                zIndex: 1,
                position: "relative",
              }}
            >
              {currentDate}
            </Typography>
            <Typography
              variant="h1"
              component="div"
              sx={{
                fontFamily: "monospace",
                fontSize: { xs: "3rem", sm: "4rem" },
                fontWeight: "bold",
                letterSpacing: "0.1em",
                mb: 3,
                zIndex: 1,
                position: "relative",
              }}
            >
              {formatTime(timeRemaining)}
            </Typography>
            {/* Progress Bar */}
            <Box>
              <LinearProgress
                variant="determinate"
                value={getProgress()}
                sx={{ height: 8, borderRadius: 4, mb: 1 }}
              />
              <Typography variant="body2" color="text.secondary">
                {Math.round(getProgress())}% complete
              </Typography>
            </Box>
          </div>

          {/* Control Buttons */}
          <Box
            sx={{ display: "flex", justifyContent: "center", gap: 5, mb: 3 }}
          >
            {/* <Button variant="contained" color="success" size="large" startIcon={<PlayArrow />}>
              Start
            </Button>
            <Button variant="contained" color="error" size="large" startIcon={<PlayArrow />}>
              Start
            </Button>
            <Button variant="contained" color="warning" size="large" startIcon={<PlayArrow />}>
              Start
            </Button> */}
            <IconButton
              onClick={handlePlayPause}
              size="large"
              color="primary"
              sx={{
                width: 60,
                height: 60,
                bgcolor: "success.main",
                color: "white",
                "&:hover": {
                  bgcolor: "success.light",
                },
              }}
            >
              {isRunning ? <Pause /> : <PlayArrow />}
            </IconButton>

            <IconButton
              onClick={stopTimer}
              size="large"
              sx={{
                width: 60,
                height: 60,
                bgcolor: "error.main",
                color: "white",
                "&:hover": {
                  bgcolor: "error.light",
                },
              }}
            >
              <Stop />
            </IconButton>

            <IconButton
              onClick={resetTimer}
              size="large"
              sx={{
                width: 60,
                height: 60,
                bgcolor: "warning.main",
                color: "white",
                "&:hover": {
                  bgcolor: "warning.light",
                },
              }}
            >
              <Refresh />
            </IconButton>
          </Box>

          {/* Status Info with Add Notes Button */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 1,
            }}
          >
            {isPaused && (
              <Chip label="Timer Paused" color="warning" sx={{ mb: 1 }} />
            )}
            {timeRemaining === 0 && (
              <Chip label="Timer Complete! 🎉" color="success" sx={{ mb: 1 }} />
            )}

            {/* Add Notes Button and Settings Info */}
            <Box
              sx={{ display: "flex", justifyContent: "center", gap: 1, mb: 3 }}
            >
              <Button
                variant="contained"
                color="secondary"
                size="small"
                startIcon={<Settings />}
                sx={{ minWidth: 140 }}
                onClick={handleOpenSettings}
              >
                Set Timer
              </Button>
              <Button
                variant="contained"
                color="secondary"
                size="small"
                startIcon={<NoteAdd />}
                endIcon={
                  notesExpanded ? <KeyboardArrowUp /> : <KeyboardArrowDown />
                }
                onClick={handleToggleNotes}
                sx={{ minWidth: 140 }}
              >
                Notes
                {notes.length > 0 && ` (${notes.length})`}
              </Button>
            </Box>
            {/* <Box>
              {canShowSettings && !notesExpanded && (
                <Typography variant="caption" color="text.secondary">
                  Click set timer to customize duration
                </Typography>
              )}
            </Box> */}
          </Box>
        </CardContent>

        {/* Sliding Notes Section */}
        <Collapse in={notesExpanded} timeout={30}>
          <Divider />
          <CardContent sx={{ pt: 3, position: "relative" }}>
            <Box
              sx={{
                backgroundColor: "white",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "between",
                  mb: 3,
                }}
              >
                <Typography
                  variant="h6"
                  component="h2"
                  color="text.primary"
                  sx={{ flex: 1 }}
                >
                  Your Notes
                </Typography>
                <Button
                  variant="contained"
                  size="small"
                  startIcon={<Add />}
                  onClick={() => handleOpenNoteDialog()}
                >
                  New Note
                </Button>
              </Box>

              {notes.length === 0 ? (
                <Box sx={{ textAlign: "center", py: 4 }}>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 2 }}
                  >
                    No notes yet. Start by creating your first note!
                  </Typography>
                  <Button
                    variant="outlined"
                    size="small"
                    startIcon={<Add />}
                    onClick={() => handleOpenNoteDialog()}
                  >
                    Create Note
                  </Button>
                </Box>
              ) : (
                <Box
                  sx={{
                    maxHeight: 300,
                    overflow: "auto",
                    "&::-webkit-scrollbar": { width: "6px" },
                    "&::-webkit-scrollbar-track": {
                      backgroundColor: "#f1f1f1",
                      borderRadius: "3px",
                    },
                    "&::-webkit-scrollbar-thumb": {
                      backgroundColor: "#c1c1c1",
                      borderRadius: "3px",
                    },
                  }}
                >
                  <Stack spacing={1.5}>
                    {notes.map((note) => (
                      <Card
                        key={note.id}
                        variant="outlined"
                        sx={{
                          transition: "all 0.2s",
                          "&:hover": { boxShadow: 1, bgcolor: "action.hover" },
                        }}
                      >
                        <CardContent sx={{ p: 2, "&:last-child": { pb: 2 } }}>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "flex-start",
                              justifyContent: "space-between",
                            }}
                          >
                            <Box sx={{ flex: 1, minWidth: 0 }}>
                              <Typography
                                variant="subtitle2"
                                component="h3"
                                sx={{
                                  fontWeight: 600,
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                  whiteSpace: "nowrap",
                                  mb: 0.5,
                                }}
                              >
                                {note.title}
                              </Typography>
                              <Typography
                                variant="caption"
                                color="text.secondary"
                                display="block"
                                sx={{ mb: 1 }}
                              >
                                {formatDate(note.updatedAt)}
                              </Typography>
                              {note.description && (
                                <Typography
                                  variant="body2"
                                  color="text.secondary"
                                  sx={{
                                    display: "-webkit-box",
                                    WebkitLineClamp: 2,
                                    WebkitBoxOrient: "vertical",
                                    overflow: "hidden",
                                    fontSize: "0.75rem",
                                  }}
                                >
                                  {note.description}
                                </Typography>
                              )}
                            </Box>
                            <Box sx={{ ml: 1, display: "flex", gap: 0.5 }}>
                              <IconButton
                                size="small"
                                onClick={() => handleOpenNoteDialog(note)}
                              >
                                <Edit fontSize="small" />
                              </IconButton>
                              <IconButton
                                size="small"
                                onClick={() => handleDeleteNote(note)}
                                color="error"
                              >
                                <Delete fontSize="small" />
                              </IconButton>
                            </Box>
                          </Box>
                        </CardContent>
                      </Card>
                    ))}
                  </Stack>
                </Box>
              )}
            </Box>
          </CardContent>
        </Collapse>
      </Card>

      {/* Settings Dialog */}
      <Dialog
        open={settingsOpen}
        onClose={handleCancelSettings}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Set Timer Duration</DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Choose your preferred timer duration in minutes.
          </Typography>

          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              Quick Select (minutes)
            </Typography>
            <Stack direction="row" spacing={1} flexWrap="wrap">
              {presetTimes.map((time) => (
                <Chip
                  key={time}
                  label={`${time}m`}
                  variant={
                    tempDuration === time.toString() ? "filled" : "outlined"
                  }
                  color={
                    tempDuration === time.toString() ? "primary" : "default"
                  }
                  onClick={() => setTempDuration(time.toString())}
                  sx={{ cursor: "pointer" }}
                />
              ))}
            </Stack>
          </Box>

          <TextField
            label="Custom Duration (minutes)"
            type="number"
            fullWidth
            value={tempDuration}
            onChange={(e) => setTempDuration(e.target.value)}
            inputProps={{ min: 1, max: 120 }}
            helperText="Range: 1-120 minutes"
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={handleCancelSettings}>Cancel</Button>
          <Button
            onClick={handleSaveSettings}
            variant="contained"
            disabled={
              !tempDuration ||
              parseInt(tempDuration) < 1 ||
              parseInt(tempDuration) > 120
            }
          >
            Set Timer
          </Button>
        </DialogActions>
      </Dialog>

      {/* Note Dialog */}
      <Dialog
        open={noteDialogOpen}
        onClose={handleCloseNoteDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>{editingNote ? "Edit Note" : "Add New Note"}</DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            {editingNote
              ? "Update your note details below."
              : "Create a new note to track your thoughts and tasks."}
          </Typography>

          <TextField
            label="Title"
            fullWidth
            required
            value={noteTitle}
            onChange={(e) => setNoteTitle(e.target.value)}
            inputProps={{ maxLength: 100 }}
            helperText={`${noteTitle.length}/100 characters`}
            sx={{ mb: 2 }}
            autoFocus
          />

          <TextField
            label="Description"
            fullWidth
            multiline
            rows={4}
            value={noteDescription}
            onChange={(e) => setNoteDescription(e.target.value)}
            inputProps={{ maxLength: 500 }}
            helperText={`${noteDescription.length}/500 characters`}
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={handleCloseNoteDialog}>Cancel</Button>
          <Button
            onClick={handleSaveNote}
            variant="contained"
            disabled={!noteTitle.trim()}
          >
            {editingNote ? "Update Note" : "Add Note"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={!!noteToDelete}
        onClose={() => setNoteToDelete(null)}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle>Are you sure?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            This action cannot be undone. This will permanently delete the note
            "{noteToDelete?.title}".
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setNoteToDelete(null)}>Cancel</Button>
          <Button onClick={confirmDeleteNote} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
