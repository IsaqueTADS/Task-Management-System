interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean | null;
}
interface Tasks {
  tasks: Task[];
  total: number;
}
