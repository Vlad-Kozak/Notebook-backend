import { NotFound, Conflict } from "http-errors";
import { IFullNote, INote, IStats } from "../helpers/interfaces";
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

const editNote = async (owner: string, _id: string, fields: INote) => {
  const note = await NotesModel.findByIdAndUpdate({ owner, _id }, fields, {
    new: true,
  });

  if (!note) {
    throw new NotFound("Note with this id not found");
  }

  return note;
};

const removeNote = async (owner: string, _id: string) => {
  const note = await NotesModel.findOneAndRemove({ owner, _id });

  if (!note) {
    throw new NotFound("Note with this id not found");
  }

  return note;
};

const getStats = async (owner: string) => {
  const notes = await getAllNotes(owner);

  const stats = notes.reduce((acc: IStats, el: IFullNote) => {
    if (acc[el.categoryId]) {
      el.archived
        ? (acc[el.categoryId].archivedCount += 1)
        : (acc[el.categoryId].activeCount += 1);
    } else {
      acc[el.categoryId] = {};
      acc[el.categoryId].archivedCount = 0;
      acc[el.categoryId].activeCount = 0;

      el.archived
        ? (acc[el.categoryId].archivedCount += 1)
        : (acc[el.categoryId].activeCount += 1);
    }

    return acc;
  }, {});

  return stats;
};

export const notesService = {
  getAllNotes,
  getOneNote,
  createNote,
  editNote,
  removeNote,
  getStats,
};
