import { NotFound, Conflict } from "http-errors";
import { INote, IStats } from "../helpers/interfaces";
import { NotesModel } from "../models/notes-model";

const getAllNotes = async (owner: string) => {
  const notes = await NotesModel.find({ owner });

  if (!notes) {
    throw new NotFound("Data not found");
  }

  return notes;
};

const getOneNote = async (owner: string, _id: string) => {
  const note = await NotesModel.findOne({ _id, owner });

  if (!note) {
    throw new NotFound("Note not found");
  }

  return note;
};

const createNote = async (id: string, { name, categoryId, content }: INote) => {
  const copy = await NotesModel.findOne({ name });

  if (copy) {
    throw new Conflict("Note with such name already exists");
  }

  return NotesModel.create({ owner: id, name, categoryId, content });
};

const editNote = async (id: string, editedNote: INote) => {
  const note = await NotesModel.findByIdAndUpdate()

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

// const removeNote = async (id: string) => {
//   const notes = await readNotes();

//   if (!notes) {
//     throw new NotFound("Data not found");
//   }

//   const note = notes.find((el: IFullNote) => el.id === id);

//   if (!note) {
//     throw new NotFound("Note with this id not found");
//   }

//   const newNotes = notes.filter((el: IFullNote) => el.id !== note.id);

//   writeNotes(newNotes);

//   return note;
// };


// const getStats = async () => {
//   const notes = await readNotes();

//   if (!notes) {
//     throw new NotFound("Data not found");
//   }

//   const stats = notes.reduce((acc: IStats, el: IFullNote) => {
//     if (acc[el.category]) {
//       el.archived
//         ? (acc[el.category].archivedCount += 1)
//         : (acc[el.category].activeCount += 1);
//     } else {
//       acc[el.category] = {};
//       acc[el.category].archivedCount = 0;
//       acc[el.category].activeCount = 0;

//       el.archived
//         ? (acc[el.category].archivedCount += 1)
//         : (acc[el.category].activeCount += 1);
//     }

//     return acc;
//   }, {});

//   return stats;
// };

export const notesService = {
  getAllNotes,
  getOneNote,
  createNote,
  editNote,
  // removeNote,
  // getStats,
};
