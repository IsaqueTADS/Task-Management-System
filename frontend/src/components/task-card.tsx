import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SquarePen, Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import React from "react";
import { Separator } from "./ui/separator";
import {
  COMPLETE_TASK_PATCH,
  DELETE_TASK,
  INCOMPLETE_TASK_PATCH,
} from "@/config/api";
import { useFetch } from "@/hooks/use-fetch";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const TaskCard = ({ task }: { task: Task }) => {
  const [checkbox, setCheckbox] = React.useState(task.completed);
  const { request, error, loading } = useFetch();

  const handleComplete = React.useCallback(
    async (taskId: string) => {
      const { url, options } = COMPLETE_TASK_PATCH(taskId);
      await request(url, options);
    },
    [request]
  );

  const handleIncomplete = React.useCallback(
    async (taskId: string) => {
      const { url, options } = INCOMPLETE_TASK_PATCH(taskId);
      await request(url, options);
    },
    [request]
  );

  async function deleteTask() {
    const { url, options } = DELETE_TASK(task.id);

    await request(url, options);
  }

  React.useEffect(() => {
    if (checkbox) {
      handleComplete(task.id);
    } else {
      handleIncomplete(task.id);
    }
  }, [checkbox, task.id, handleIncomplete, handleComplete]);

  return (
    <Card className="bg-card aspect-square rounded-xl p-3">
      <CardHeader className="mt-3">
        <CardTitle>{task.title}</CardTitle>
        <CardAction>
          <div className="h-9">
            <Checkbox
              className="h-8 w-8"
              checked={checkbox || false}
              onCheckedChange={(value) => setCheckbox(value === true)}
            />
          </div>
        </CardAction>
      </CardHeader>
      <CardContent>
        <CardDescription>{task.description}</CardDescription>
      </CardContent>

      <CardFooter className="mt-auto flex flex-col gap-1 ">
        <Separator />
        <div className="flex justify-between w-full">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant={"destructive"} size={"sm"} >
                <Trash2 />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Tem certeza de que deseja apagar esta tarefa?</AlertDialogTitle>
                <AlertDialogDescription>
                Ao excluir essa tarefa, não será possível recuperá-la.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={deleteTask}>Continue</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          <Button size="sm">
            <SquarePen />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default TaskCard;
