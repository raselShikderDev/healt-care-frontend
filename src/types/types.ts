export interface IUser {
  id: number;
  email: string;
  role: "ADMIN" | "DOCTOR" | "PATIENT";
  exp: number;
  ia: number;
}