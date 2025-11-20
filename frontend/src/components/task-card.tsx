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

const TaskCard = ({ task }: { task: Task }) => {
  return (
    <Card className="bg-card aspect-square rounded-xl p-3">
      <CardHeader className="mt-3">
        <CardTitle>{task.title}</CardTitle>
        <CardAction>
          <Button  size="sm">
            <SquarePen />
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <CardDescription>{task.description}</CardDescription>
      </CardContent>
      <CardFooter className="mt-auto">
        <Button variant={"destructive"} size={"sm"}>
          <Trash2 />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default TaskCard;

{
  /* <h3 className="font-bold uppercase mb-5"></h3>
      <p className=""></p> */
}
