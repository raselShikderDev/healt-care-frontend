"use client"

import { Plus, type LucideIcon } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";

export interface ManagmentHeaderProps {
  title: string;
  description?: string;
  action?: {
    icon: LucideIcon;
    label: string;
    onclick: () => void;
  };
  children: React.ReactNode;
}

function ManagmentHeader({
  title,
  description,
  action,
  children,
}: ManagmentHeaderProps) {
  const Icon = action?.icon || Plus;
  return (
    <div className="flex items-center justify-center ">
      <div>
        <h1 className="text-3xl font-bold">{title}</h1>
        {description && (
          <p className="text-muted-foreground mt-1">{description}</p>
        )}
      </div>
      {action && (
        <Button className="cursor-pointer" onClick={action?.onclick}>
          <Icon className="h-4 w-4 mr-2" />
          {action?.label}
        </Button>
      )}
      {children}
    </div>
  );
}

export default ManagmentHeader;
