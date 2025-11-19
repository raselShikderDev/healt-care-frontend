import { Column } from "@/components/shared/managmentTable";
import { ISpecilaties } from "@/types/specalities.interface";
import Image from "next/image";

export const specilatiesColumns: Column<ISpecilaties>[] = [
  {
    header: "Icon",
    accessor: (specilaty: ISpecilaties) => (
      <Image
        src={specilaty.icon as string}
        alt={specilaty.title}
        width={40}
        height={40}
        className="rounded-full"
      />
    ),
  },
  {
    header:"Title",
    accessor:(specalities:ISpecilaties)=> specalities?.title
  }
];
