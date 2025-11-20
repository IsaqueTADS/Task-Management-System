import TaskCard from "@/components/task-card";
import { API_URL, LIST_TASK_GET } from "@/config/api";
import { useFetch } from "@/hooks/use-fetch";
import { useClock } from "@/hooks/useClock";
import React from "react";
import Search from "@/components/search";

import { useUser } from "@/context/user-context";

const TaskPage = () => {
  const { loading, error, request } = useFetch();
  const [tasks, setTasks] = React.useState<Task[] | null>(null);
  const [search, setSearch] = React.useState("");
  const { userData } = useUser();
  const user = userData?.user;
  const avatarUrl = `${API_URL}${user?.avatarUrl}`;

  const time = useClock();

  React.useEffect(() => {
    const { url, options } = LIST_TASK_GET();
    let delay = 0;
    if (search) {
      delay = 500;
    }

    console.log(`${url}`);

    const getTask = async () => {
      const { json } = await request<Tasks>(
        `${url}/?limit=8&search=${search}`,
        options
      );

      setTasks(json.tasks);
    };

    const id = setTimeout(() => {
      getTask();
    }, delay);

    return () => clearTimeout(id);
  }, [request, search]);

  // if (loading) return <Loading />;
  // if (error) return null;

  return (
    <section className="p-2">
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0 ">
        <div className="flex gap-4 mt-5 mb-3">
          <div className="bg-muted border-2 aspect-video rounded-xl h-56 flex items-center justify-center">
            <h1 className="text-7xl font-mono">{time.toLocaleTimeString()}</h1>
          </div>
        </div>

        <div className="flex justify-between">
          <Search value={search} setValue={setSearch} />
        </div>

        <div className="bg-muted min-h-[100vh] flex-1 rounded-xl md:min-h-min">
          <div className="flex flex-1 flex-col gap-4 p-4">
            <h2 className="text-2xl font-semibold">Minhas Tarefas</h2>
            <div></div>
            <div className="grid auto-rows-min gap-4 md:grid-cols-4">
              {tasks &&
                tasks.map((task) => <TaskCard key={task.id} task={task} />)}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TaskPage;
