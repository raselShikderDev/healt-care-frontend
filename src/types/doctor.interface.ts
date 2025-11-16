import { ISpecilaties } from "./specalities.interface";

export interface IDoctor {
  id: string;
  name: string;
  email: string;
  profilePhoto: string | null;
  contactNumber: string;
  address: string;
  registrationNumber: string;
  experience: number;
  gender: 'FEMALE' | 'MALE' | string;
  appointmentFee: number;
  qualification: string;
  currentWorkingPlace: string;
  designation: string;
  avarageRating: number;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  doctorSpecialties?:Array<{
    specialities?:ISpecilaties
  }>
}
