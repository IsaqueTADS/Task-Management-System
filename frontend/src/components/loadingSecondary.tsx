import React from "react";
import { cn } from "@/lib/utils";

interface LoadingProps {
  className?: string;
}

const LoadingSecondary: React.FC<LoadingProps> = ({ className }) => {
  return (
    <div
      className={cn("flex items-center justify-center py-8", className)}
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

export default LoadingSecondary;
