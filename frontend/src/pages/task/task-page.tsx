import Loading from "@/components/loading";
import TaskCard from "@/components/task-card";
import { LIST_TASK_GET } from "@/config/api";
import { useFetch } from "@/hooks/use-fetch";
import React from "react";

const TaskPage = () => {
  const { loading, error, request } = useFetch();
  const [tasks, setTasks] = React.useState<Task[] | null>(null);

  React.useEffect(() => {
    const { url, options } = LIST_TASK_GET();

    console.log(`${url}`);

    const getTask = async () => {
      const { json } = await request<Tasks>(`${url}`, options);

      setTasks(json.tasks);
    };

    getTask();
  }, [request]);

  if (loading) return <Loading />;
  if (error) return null;

  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <div className="grid auto-rows-min gap-4 md:grid-cols-5">
        {tasks && tasks.map((task) => <TaskCard key={task.id} task={task} />)}
      </div>
    </div>
  );
};

export default TaskPage;
