import { Badge } from "@/components/ui/badge";

interface IStatusBadgeCellProps {
  isDeleted?: boolean;
  activeText?: string;
  deletedText?: string;
}

const StatusBadgeCell = ({
  isDeleted,
  activeText = "Active",
  deletedText = "Deleted",
}: IStatusBadgeCellProps) => {
  return (
    <Badge variant={isDeleted ? "destructive" : "default"}>
      {isDeleted ? deletedText : activeText}
    </Badge>
  );
};

export default StatusBadgeCell;
