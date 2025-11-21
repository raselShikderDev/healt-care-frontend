/* eslint-disable @typescript-eslint/no-explicit-any */

import { serverFetch } from "@/lib/serverFetch";
import { zodValidator } from "@/lib/zodValidator";
import { IDoctor } from "@/types/doctor.interface";
import {
  createDoctorZodSchema,
  updateDoctorZodSchema,
} from "@/zod/doctor.validation";

export const createDoctor = async (_prevState: any, formData: FormData) => {
  const specialtiesString = formData.get("specialties") as string;
  let specialties: string[] = [];

  if (specialtiesString) {
    try {
      specialties = JSON.parse(specialtiesString);
      if (!Array.isArray(specialties)) specialties = [];
    } catch (error) {
      console.log(error);
      
      specialties = [];
    }
  }

  const experienceValue = formData.get("experience");
  const appointmentFeeValue = formData.get("appointmentFee");

  const validationPayload: IDoctor = {
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    contactNumber: formData.get("contactNumber") as string,
    address: formData.get("address") as string,
    registrationNumber: formData.get("registrationNumber") as string,
    experience: experienceValue ? Number(experienceValue) : 0,
    gender: formData.get("gender") as "MALE" | "FEMALE",
    appointmentFee: appointmentFeeValue ? Number(appointmentFeeValue) : 0,
    qualification: formData.get("qualification") as string,
    currentWorkingPlace: formData.get("currentWorkingPlace") as string,
    designation: formData.get("designation") as string,
    password: formData.get("password") as string,
    specialties,
    profilePhoto: formData.get("file") as File,
  };

  const validatedPayload = zodValidator(
    validationPayload,
    createDoctorZodSchema
  );

  if (!validatedPayload.success && validatedPayload.errors) {
    return {
      success: validatedPayload.success,
      message: "Validation error",
      formData: validatedPayload,
      errors: validatedPayload.errors,
    };
  }
  if (!validatedPayload.data) {
    return {
      success: validatedPayload.success,
      message: "Validation error",
      formData: validatedPayload,
    };
  }

  const backendPayload = {
    password: validatedPayload.data.password,
    doctor: {
      name: validatedPayload.data.name,
      email: validatedPayload.data.email,
      contactNumber: validatedPayload.data.contactNumber,
      address: validatedPayload.data.address,
      registrationNumber: validatedPayload.data.registrationNumber,
      experience: validatedPayload.data.experience,
      gender: validatedPayload.data.gender,
      appointmentFee: validatedPayload.data.appointmentFee,
      qualification: validatedPayload.data.qualification,
      currentWorkingPlace: validatedPayload.data.currentWorkingPlace,
      designation: validatedPayload.data.designation,
      specialties: validatedPayload.data.specialties,
    },
  };

  const newFormData = new FormData();
  newFormData.append("data", JSON.stringify(backendPayload));
  if (formData.get("file")) {
    newFormData.append("file", formData.get("file") as Blob);
  }

  try {
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
      formData: validatedPayload.data,
    };
  }
};

export const updateDoctor = async (
  id: string,
  _prevState: any,
  formData: FormData
) => {
  const experienceValue = formData.get("experience");
  const appointmentFeeValue = formData.get("appointmentFee");

  const validationPayload: Partial<IDoctor> = {
    name: formData.get("name") as string,
    contactNumber: formData.get("contactNumber") as string,
    address: formData.get("address") as string,
    registrationNumber: formData.get("registrationNumber") as string,
    experience: experienceValue ? Number(experienceValue) : 0,
    gender: formData.get("gender") as "MALE" | "FEMALE",
    appointmentFee: appointmentFeeValue ? Number(appointmentFeeValue) : 0,
    qualification: formData.get("qualification") as string,
    currentWorkingPlace: formData.get("currentWorkingPlace") as string,
    designation: formData.get("designation") as string,
  };

  // Parse specialties array (for adding new specialties)
  const specialtiesValue = formData.get("specialties") as string;
  if (specialtiesValue) {
    try {
      const parsed = JSON.parse(specialtiesValue);
      if (Array.isArray(parsed) && parsed.length > 0) {
        validationPayload.specialties = parsed;
      }
    } catch {
      // Ignore invalid JSON
    }
  }

  // Parse removeSpecialties array (for removing existing specialties)
  const removeSpecialtiesValue = formData.get("removeSpecialties") as string;
  if (removeSpecialtiesValue) {
    try {
      const parsed = JSON.parse(removeSpecialtiesValue);
      if (Array.isArray(parsed) && parsed.length > 0) {
        validationPayload.removeSpecialties = parsed;
      }
    } catch {
      // Ignore invalid JSON
    }
  }
  const validatedPayload = zodValidator(
    validationPayload,
    updateDoctorZodSchema
  );

  if (!validatedPayload.success && validatedPayload.errors) {
    return {
      success: validatedPayload.success,
      message: "Validation failed",
      formData: validationPayload,
      errors: validatedPayload.errors,
    };
  }

  if (!validatedPayload.data) {
    return {
      success: false,
      message: "Validation failed",
      formData: validationPayload,
    };
  }

  try {
    const res = await serverFetch.patch(`/doctors/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
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
      formData: validationPayload,
    };
  }
};

export const getDoctors = async (queryString?: string) => {
  try {
    const res = await serverFetch.get(
      `/doctors/${queryString ? `?${queryString}` : ""}`
    );
    const result = await res.json();
    console.log({ doctos: result });

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
    const res = await serverFetch.get(`/doctors/${id}`);
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
