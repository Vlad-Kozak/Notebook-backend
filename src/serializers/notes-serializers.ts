import { IFullNote } from "../helpers/interfaces";

export const serializeNote = ({
  _id,
  name,
  categoryId,
  content,
  archived,
  createdAt,
  updatedAt,
}: IFullNote) => {
  return {
    id: _id.toString(),
    name,
    categoryId,
    content,
    archived,
    createdAt,
    updatedAt,
  };
};

export const serializeNotes = (notes: IFullNote[]) => {
  const newNotes = notes.map((el) => serializeNote(el));
  return newNotes;
};
