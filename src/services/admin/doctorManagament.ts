/* eslint-disable @typescript-eslint/no-explicit-any */

import { serverFetch } from "@/lib/serverFetch";
import { zodValidator } from "@/lib/zodValidator";
import { IDoctor } from "@/types/doctor.interface";
import {
  createDoctorZodSchema,
  updateDoctorZodSchema,
} from "@/zod/doctor.validation";

export const createDoctor = async (_prevState: any, formData: FormData) => {
  try {
    const payload: IDoctor = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      contactNumber: formData.get("contactNumber") as string,
      address: formData.get("address") as string,
      registrationNumber: formData.get("registrationNumber") as string,
      experience: Number(formData.get("experience") as string),
      gender: formData.get("gender") as "MALE" | "FEMALE",
      appointmentFee: Number(formData.get("appointmentFee") as string),
      qualification: formData.get("qualification") as string,
      currentWorkingPlace: formData.get("currentWorkingPlace") as string,
      designation: formData.get("designation") as string,
      password: formData.get("password") as string,
    };

    if (zodValidator(payload, createDoctorZodSchema).success === false) {
      return zodValidator(payload, createDoctorZodSchema);
    }

    const validatedPayload = zodValidator(payload, createDoctorZodSchema).data;

    if (!validatedPayload) {
      throw new Error("Data not vaild");
    }

    const newPayload = {
      password: validatedPayload.password,
      doctor: {
        name: validatedPayload.name,
        email: validatedPayload.email,
        contactNumber: validatedPayload.contactNumber,
        address: validatedPayload.address,
        registrationNumber: validatedPayload.registrationNumber,
        experience: validatedPayload.experience,
        gender: validatedPayload.gender,
        appointmentFee: validatedPayload.appointmentFee,
        qualification: validatedPayload.qualification,
        currentWorkingPlace: validatedPayload.currentWorkingPlace,
        designation: validatedPayload.designation,
      },
    };

    const newFormData = new FormData();
    newFormData.append("data", JSON.stringify(newPayload));
    if (formData.get("file")) {
      newFormData.append("file", formData.get("file") as Blob);
    }

    const res = await serverFetch.post("/users/create-doctor", {
      body: newFormData,
    });

    const result = await res.json();

    return result;
  } catch (error: any) {
    console.log(error);
    return {
      success: false,
      message: `${
        process.env.NODE_ENV === "development"
          ? error.message
          : "Something went wrong"
      }`,
    };
  }
};

export const updateDoctor = async (
  id: string,
  _prevState: any,
  formData: FormData
) => {
  try {
    const payload: Partial<IDoctor> = {
      name: formData.get("name") as string,
      contactNumber: formData.get("contactNumber") as string,
      address: formData.get("address") as string,
      registrationNumber: formData.get("registrationNumber") as string,
      experience: Number(formData.get("experience") as string),
      gender: formData.get("gender") as "MALE" | "FEMALE",
      appointmentFee: Number(formData.get("appointmentFee") as string),
      qualification: formData.get("qualification") as string,
      currentWorkingPlace: formData.get("currentWorkingPlace") as string,
      designation: formData.get("designation") as string,
    };

    if (zodValidator(payload, updateDoctorZodSchema).success === false) {
      return zodValidator(payload, updateDoctorZodSchema);
    }

    const validatedPayload = zodValidator(payload, updateDoctorZodSchema).data;

    if (!validatedPayload) {
      throw new Error("Data not vaild");
    }

    const res = await serverFetch.patch(`/doctors/${id}`, {
      body: JSON.stringify(validatedPayload),
    });

    const result = await res.json();

    return result;
  } catch (error: any) {
    console.log(error);
    return {
      success: false,
      message: `${
        process.env.NODE_ENV === "development"
          ? error.message
          : "Something went wrong"
      }`,
    };
  }
};

export const getDoctors = async (queryString?: string) => {
  try {
    const res = await serverFetch.post(
      `/doctors${queryString ? `?${queryString}` : ""}`
    );
    const result = await res.json();

    return result;
  } catch (error: any) {
    console.log(error);
    return {
      success: false,
      message: `${
        process.env.NODE_ENV === "development"
          ? error.message
          : "Something went wrong"
      }`,
    };
  }
};

export const getDoctorById = async (id: string) => {
  try {
    const res = await serverFetch.post(`/doctors/${id}`);
    const result = await res.json();

    return result;
  } catch (error: any) {
    console.log(error);
    return {
      success: false,
      message: `${
        process.env.NODE_ENV === "development"
          ? error.message
          : "Something went wrong"
      }`,
    };
  }
};

export const deleteDoctor = async (id: string) => {
  try {
    const res = await serverFetch.delete(`/doctors/${id}`);
    const result = await res.json();

    return result;
  } catch (error: any) {
    console.log(error);
    return {
      success: false,
      message: `${
        process.env.NODE_ENV === "development"
          ? error.message
          : "Something went wrong"
      }`,
    };
  }
};

export const softDeleteDoctor = async (id: string) => {
  try {
    const res = await serverFetch.patch(`/doctors/soft-delete/${id}`);
    const result = await res.json();

    return result;
  } catch (error: any) {
    console.log(error);
    return {
      success: false,
      message: `${
        process.env.NODE_ENV === "development"
          ? error.message
          : "Something went wrong"
      }`,
    };
  }
};
