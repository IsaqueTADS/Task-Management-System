import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "./ui/textarea";
import Error from "@/helpers/error";

interface TaskDialogProps {
  title: string;
  description: string;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  titleValue: string;
  descriptionValue: string;
  setTitleValue: React.Dispatch<React.SetStateAction<string>>;
  setDescriptionValue: React.Dispatch<React.SetStateAction<string>>;
  error?: string;
  onClick: () => Promise<void>;
}

function TaskDialog({
  open,
  setOpen,
  title,
  description,
  titleValue,
  descriptionValue,
  setTitleValue,
  setDescriptionValue,
  error,
  onClick,
}: TaskDialogProps) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <form
        onSubmit={(event) => {
          event.preventDefault();
        }}
      >
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="title">Titulo</Label>
              <Input
                id="title"
                name="title"
                value={titleValue}
                onChange={({ currentTarget }) =>
                  setTitleValue(currentTarget.value)
                }
                maxLength={100}
                min={5}
                required
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="description">Descrição</Label>
              <Textarea
                id="description"
                name="username"
                className="resize-none min-h-40 "
                value={descriptionValue}
                onChange={({ currentTarget }) =>
                  setDescriptionValue(currentTarget.value)
                }
                maxLength={250}
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancelar</Button>
            </DialogClose>
            <Button type="submit" onClick={onClick}>
              Enviar
            </Button>
          </DialogFooter>
          <Error>{error}</Error>
        </DialogContent>
      </form>
    </Dialog>
  );
}

export default TaskDialog;
