import React from "react";
import { cn } from "@/lib/utils";

interface LoadingProps {
  className?: string;
}

const Loading: React.FC<LoadingProps> = ({ className }) => {
  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center",
        "bg-background/70 backdrop-blur-xs",
        className
      )}
      role="status"
      aria-label="Carregando"
    >
      <div className="flex items-center gap-2.5">
        {[0, 1, 2].map((index) => (
          <div
            key={index}
            className={cn(
              "h-2.5 w-2.5 rounded-full bg-primary",
              "animate-bounce"
            )}
            style={{
              animationDelay: `${index * 0.16}s`,
              animationDuration: "0.8s",
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Loading;
