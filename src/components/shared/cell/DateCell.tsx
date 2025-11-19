import { formatDateTime } from "@/lib/formattor";


interface IDateCellProps{
 date?:string | Date;
}

const DateCell = ({date}:IDateCellProps) => {
  return (
    <span className="text-sm">{formatDateTime(date!)}</span>
  )
}

export default DateCell
