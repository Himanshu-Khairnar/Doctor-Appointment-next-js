"use server";
import { ID, Query } from "node-appwrite";
import { database, messaging } from "../appwrite.config";
import { formatDateTime, parseStringify } from "../utils";
import { Appointment } from "@/types/appwrite.types";
import { revalidatePath } from "next/cache";

export const createAppointment = async (
  appointmentdata: CreateAppointmentParams
) => {
  try {
    const newAppointment = await database.createDocument(
      process.env.NEXT_PUBLIC_DATABASE_ID || "",
      process.env.NEXT_PUBLIC_APPOINTMENT_COLLECTION_ID|| '',
      ID.unique(),
      appointmentdata
    );
    return parseStringify(newAppointment);
  } catch (error) {
    console.log(error);
  }
};

export const getAppointment = async (aid: string) => {
  try {
    const appointment = await database.getDocument(
      process.env.NEXT_PUBLIC_DATABASE_ID || "",
      process.env.NEXT_PUBLIC_APPOINTMENT_COLLECTION_ID || "",
      aid
    );
    return parseStringify(appointment);
  } catch (error) {
    console.log(error);
  }
};

export const getRecentAppointmentList = async () => {
  try {
    const appointments = await database.listDocuments(
      process.env.NEXT_PUBLIC_DATABASE_ID || "",
      process.env.NEXT_PUBLIC_APPOINTMENT_COLLECTION_ID || "",
      [Query.orderAsc("$createdAt")]
    );

    // const scheduledAppointments = (
    //   appointments.documents as Appointment[]
    // ).filter((appointment) => appointment.status === "scheduled");

    // const pendingAppointments = (
    //   appointments.documents as Appointment[]
    // ).filter((appointment) => appointment.status === "pending");

    // const cancelledAppointments = (
    //   appointments.documents as Appointment[]
    // ).filter((appointment) => appointment.status === "cancelled");

    // const data = {
    //   totalCount: appointments.total,
    //   scheduledCount: scheduledAppointments.length,
    //   pendingCount: pendingAppointments.length,
    //   cancelledCount: cancelledAppointments.length,
    //   documents: appointments.documents,
    // };

    const initialCounts = {
      scheduledCount: 0,
      pendingCount: 0,
      cancelledCount: 0,
    };

    const counts = (appointments.documents as Appointment[]).reduce(
      (acc, appointment) => {
        switch (appointment.status) {
          case "scheduled":
            acc.scheduledCount++;
            break;
          case "pending":
            acc.pendingCount++;
            break;
          case "cancelled":
            acc.cancelledCount++;
            break;
        }
        return acc;
      },
      initialCounts
    );

    const data = {
      totalCount: appointments.total,
      ...counts,
      documents: appointments.documents,
    };

    return parseStringify(data);
  } catch (error) {
    console.error(
      "An error occurred while retrieving the recent appointments:",
      error
    );
  }
};

export const updatedAppointment = async ({
  appointmentId,
  userId,
  appointment,
  type,
}: UpdateAppointmentParams) => {
  try {
    const updatedAppointments = await database.updateDocument(
      process.env.NEXT_PUBLIC_DATABASE_ID || "",
      process.env.NEXT_PUBLIC_APPOINTMENT_COLLECTION_ID || "",
      appointmentId,
      appointment
    );
    if (!updatedAppointments) {
      throw new Error("Application not found");
    }
    const smsMessage = `Greetings from CarePulse. ${
      type === "schedule"
        ? `Your appointment is confirmed for ${
            formatDateTime(appointment.schedule!).dateTime
          } with Dr. ${appointment.primaryPhysician}`
        : `We regret to inform that your appointment for ${
            formatDateTime(appointment.schedule!).dateTime
          } is cancelled. Reason:  ${appointment.cancellationReason}`
    }.`;
    await sendSMSNotfication(userId, smsMessage);
    revalidatePath("/admin");
    return parseStringify(updatedAppointments);
  } catch (error) {
    console.log(error);
  }
};

export const sendSMSNotfication = async (
  userId: string,
  smsMessage: string
) => {
  try {
    const message = await messaging.createSms(
      ID.unique(),
      smsMessage,
      [],
      [userId]
    );
    return parseStringify(message);
  } catch (error) {}
};
