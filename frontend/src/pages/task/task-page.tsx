import Loading from "@/components/loading";
import TaskCard from "@/components/task-card";
import { LIST_TASK_GET } from "@/config/api";
import { useFetch } from "@/hooks/use-fetch";
import React from "react";

const TaskPage = () => {
  const { loading, error, request } = useFetch();
  const [task, setTask] = React.useState<Task[] | null>(null);

  React.useEffect(() => {
    const { url, options } = LIST_TASK_GET();

    console.log(`${url}`);

    const getTask = async () => {
      const { json } = await request<Tasks>(`${url}`, options);

      setTask(json.tasks);
    };

    getTask();
  }, [request]);

  if (loading) return <Loading />;
  if (error) return null;

  console.log(task);

  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <div className="grid auto-rows-min gap-4 md:grid-cols-5">
        {Array.from({ length: 20 }).map((_, i) => (
          <TaskCard key={i} />
        ))}
      </div>
    </div>
  );
};

export default TaskPage;
