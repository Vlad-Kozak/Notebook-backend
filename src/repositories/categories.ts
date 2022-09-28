import path from "path";

export const categories = [
  {
    id: "1",
    name: "Task",
    imageUrl: path.join(__dirname, "../../public/task.svg"),
  },
  {
    id: "2",
    name: "Random Thought",
    imageUrl: path.join(__dirname, "../../public/thought.svg"),
  },
  {
    id: "3",
    name: "Idea",
    imageUrl: path.join(__dirname, "../../public/idea.svg"),
  },
];
