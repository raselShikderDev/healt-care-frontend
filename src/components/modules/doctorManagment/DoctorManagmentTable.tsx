import { ISpecilaties } from "@/types/specalities.interface"


interface IDoctorManagmentTableProps{
  specialityResult:ISpecilaties[]
}

const DoctorManagmentTable = ({specialityResult}:IDoctorManagmentTableProps) => {
  console.log(specialityResult);
  
  return (
    <div>
      
    </div>
  )
}

export default DoctorManagmentTable
