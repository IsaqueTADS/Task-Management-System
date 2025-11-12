import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

export function ButtonLoading({ children }: React.PropsWithChildren) {
  return (
    <Button size="sm" variant="outline" disabled>
      <Spinner />
      {children}
    </Button>
  );
}
