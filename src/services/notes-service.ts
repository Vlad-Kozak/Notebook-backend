import { NotFound } from "http-errors";
import { v4 as uuidv4 } from "uuid";
import { readNotes, writeNotes } from "../repositories/notes";
import { IFullNote, INote, IStats } from "../helpers/interfaces";

const createNote = async (note: INote) => {
  const notes = await readNotes();

  if (!notes) {
    throw new NotFound("Data not found");
  }

  const newNote = {
    id: uuidv4(),
    name: note.name,
    created: Date.now(),
    category: note.category,
    content: note.content,
    archived: false,
  };

  const newNotes = [...notes, newNote];

  writeNotes(newNotes);

  return newNote;
};

const removeNote = async (id: string) => {
  const notes = await readNotes();

  if (!notes) {
    throw new NotFound("Data not found");
  }

  const note = notes.find((el: IFullNote) => el.id === id);

  if (!note) {
    throw new NotFound("Note with this id not found");
  }

  const newNotes = notes.filter((el: IFullNote) => el.id !== note.id);

  writeNotes(newNotes);

  return note;
};

const editNote = async (id: string, editedNote: INote) => {
  const notes = await readNotes();

  if (!notes) {
    throw new NotFound("Data not found");
  }

  const note = notes.find((el: IFullNote) => el.id === id);

  if (!note) {
    throw new NotFound("Note with this id not found");
  }

  const newEditedNote = { ...note, ...editedNote };

  const newNotes = [
    ...notes.filter((el: IFullNote) => el.id !== note.id),
    newEditedNote,
  ];

  writeNotes(newNotes);

  return newEditedNote;
};

const getOneNote = async (id: string) => {
  const notes = await readNotes();

  if (!notes) {
    throw new NotFound("Data not found");
  }

  const note = notes.find((el: IFullNote) => el.id === id);

  if (!note) {
    throw new NotFound("Note with this id not found");
  }

  return note;
};

const getAllNotes = async () => {
  const notes = await readNotes();

  if (!notes) {
    throw new NotFound("Data not found");
  }

  return notes;
};

const getStats = async () => {
  const notes = await readNotes();

  if (!notes) {
    throw new NotFound("Data not found");
  }

  const stats = notes.reduce((acc: IStats, el: IFullNote) => {
    if (acc[el.category]) {
      el.archived
        ? (acc[el.category].archivedCount += 1)
        : (acc[el.category].activeCount += 1);
    } else {
      acc[el.category] = {};
      acc[el.category].archivedCount = 0;
      acc[el.category].activeCount = 0;

      el.archived
        ? (acc[el.category].archivedCount += 1)
        : (acc[el.category].activeCount += 1);
    }

    return acc;
  }, {});

  return stats;
};

export const notesService = {
  createNote,
  removeNote,
  editNote,
  getOneNote,
  getAllNotes,
  getStats,
};
