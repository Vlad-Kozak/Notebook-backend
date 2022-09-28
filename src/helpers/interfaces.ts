export interface IFullNote {
  id: string;
  name: string;
  created: number;
  category: "Idea" | "Task" | "Random Thought";
  content: string;
  archived: boolean;
}

export interface INote {
  name: string;
  category: "Idea" | "Task" | "Random Thought";
  content: string;
  archived?: boolean;
}

export interface IStats {
  task?: ICategoryStats;
  idea?: ICategoryStats;
  randomThought?: ICategoryStats;
}

interface ICategoryStats {
  activeCount: number;
  archivedCount: number;
}
