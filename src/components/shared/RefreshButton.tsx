"use client";

import { RefreshCcw } from "lucide-react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

export interface RefreshButtonProps {
  size?: "sm" | "lg" | "default" | "icon" | "icon-sm" | "icon-lg";
  variant?:
    | "link"
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost";
  showlabel?: boolean;
}

function RefreshButton({
  size = "default",
  variant = "default",
  showlabel = true,
}: RefreshButtonProps) {
  const [isPending, startTransation] = useTransition();
  const router = useRouter();

  const handleRfresh = () => {
    startTransation(() => {
      router.refresh();
    });
  };
  return (
    <Button
      size={size}
      variant={variant}
      onClick={handleRfresh}
      disabled={isPending}
    >
      <RefreshCcw
        className={`h-4 w-4 ${isPending ? "animate-spin" : ""} ${
          showlabel ? "mr-2" : ""
        }`}
      />
      {showlabel && "Refresh"}
    </Button>
  );
}

export default RefreshButton;
