import TaskCard from "@/components/task-card";
import { CREATE_TASK, LIST_TASK_GET } from "@/config/api";
import { useFetch } from "@/hooks/use-fetch";
import { useClock } from "@/hooks/useClock";
import React from "react";
import Search from "@/components/search";

import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { Plus } from "lucide-react";
import Loading from "@/components/loading";
import TaskDialog from "@/components/task-dialog";
import LoadingSecondary from "@/components/loadingSecondary";

const TaskPage = () => {
  const { loading, error, request } = useFetch();
  const [tasks, setTasks] = React.useState<Task[] | null>(null);
  const [search, setSearch] = React.useState("");
  const [openDialog, setOpenDialog] = React.useState(false);
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [page, setPage] = React.useState<number>(1);
  const [infinite, setInfinite] = React.useState(true);
  const [hasMore, setHasMore] = React.useState(true);
  const [setTotal, setTotalTask] = React.useState(true);

  const isLoadingRef = React.useRef(false);
  const isMobile = useIsMobile();
  const time = useClock();
  const itemsPerPage = 8;

  React.useEffect(() => {
    setPage(1);
    setHasMore(true);
    isLoadingRef.current = false;
  }, [search]);

  React.useEffect(() => {
    const { url, options } = LIST_TASK_GET();
    let delay = 0;
    if (search) {
      delay = 500;
    }

    let wait = false;
    let idScrollTimeout = 0;

    const infiniteScroll = () => {
      if (infinite) {
        const scrollElement = document.documentElement || document.body;
        const scroll = scrollElement.scrollTop;
        const height = scrollElement.scrollHeight - window.innerHeight;

        console.log("teste", scroll);

        if (scroll > height * 0.75 && !wait && hasMore) {
          setPage((page) => page + 1);
          wait = true;
          idScrollTimeout = setTimeout(() => (wait = false), 500);
        }
      }
    };

    window.addEventListener("wheel", infiniteScroll);
    window.addEventListener("scroll", infiniteScroll);

    const getTask = async () => {
      if (isLoadingRef.current) return;
      isLoadingRef.current = true;
      const { json } = await request<Tasks>(
        `${url}/?page=${page}&limit=${itemsPerPage}&search=${search}`,
        options
      );
      if (json.tasks.length < itemsPerPage) {
        setHasMore(false);
      }
      setTasks((prevTask) =>
        page === 1 ? json.tasks : [...(prevTask || []), ...json.tasks]
      );
      isLoadingRef.current = false;
    };

    const id = setTimeout(() => {
      getTask();
    }, delay);

    return () => {
      clearTimeout(id);
      clearTimeout(idScrollTimeout);
      window.removeEventListener("wheel", infiniteScroll);
      window.removeEventListener("scroll", infiniteScroll);
    };
  }, [request, search, page, infinite, hasMore]);

  const handleDelete = React.useCallback((taskId: string) => {
    setTasks((prevTask) => {
      if (!prevTask) return null;
      return prevTask.filter((task) => task.id !== taskId);
    });
  }, []);

  const createTask = async () => {
    const { url, options } = CREATE_TASK({ title, description });
    await request(url, options);
    setOpenDialog(false);
    setDescription("");
    setTitle("");
  };

  // if (loading) return <Loading />;
  if (error) return null;

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

          {!isMobile && (
            <Button size={"lg"} onClick={() => setOpenDialog(!openDialog)}>
              {" "}
              Nova Task
              <Plus className="h-15" />
            </Button>
          )}
        </div>

        <TaskDialog
          open={openDialog}
          setOpen={setOpenDialog}
          title="Criar nova Task"
          description="Prencha os campos a baixo para criar sua task"
          titleValue={title}
          descriptionValue={description}
          setTitleValue={setTitle}
          setDescriptionValue={setDescription}
          error={error ?? ""}
          onClick={createTask}
        />

        <div className="bg-muted flex-1 rounded-xl md:min-h-[700px]">
          <div className="flex flex-1 flex-col gap-4 p-4">
            <div className="flex justify-between">
              <h2 className="text-2xl font-semibold mb-5">Minhas Tarefas</h2>
              {isMobile && (
                <Button size={"lg"}>
                  {" "}
                  <Plus className="h-15" />
                </Button>
              )}
            </div>

            <div className="grid auto-rows-min gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3  2xl:md:grid-cols-5 items-center">
              {tasks &&
                tasks.map((task) => (
                  <TaskCard key={task.id} task={task} onDelete={handleDelete} />
                ))}
            </div>
          </div>
          {isLoadingRef && hasMore && <LoadingSecondary />}
        </div>
      </div>
    </section>
  );
};

export default TaskPage;
