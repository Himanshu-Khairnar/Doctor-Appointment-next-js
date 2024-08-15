"use server";
import {  ID, Query } from "node-appwrite";
import { database, storage, users } from "../appwrite.config";
import { InputFile } from "node-appwrite/file";
import { parseStringify } from "../utils";

export const createUser = async (user: CreateUserParams) => {
 
  try {
    const id = ID.unique();

    const newUser = await users.create(
      id, 
      user.email,
      user.phone,
      undefined,
      user.name
    );

    return parseStringify(newUser);
  } catch (error: any) {
   
    if (error?.code === 409) {
      const existingUser = await users.list([
        Query.equal("email", [user.email]),
      ]);

      if (existingUser.users.length > 0) {
        return parseStringify(existingUser.users[0]);
      } else {
        throw new Error("User conflict, but no existing user found.");
      }
    }
    console.error("An error occurred while creating a new user:", error);
    throw error; 
  }
};

export const getUser = async (userid: string) => {
  try {
  
    const user = await users.get(userid);
    return parseStringify(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
};
export const getPatients = async (userId: string) => {
  try {
    const patients = await database.listDocuments(
      process.env.NEXT_PUBLIC_DATABASE_ID || '',
      process.env.NEXT_PUBLC_PATIENT_COLLECTION_ID || '' ,
      [Query.equal('userId', [userId])]
    );    
    if (!patients.documents || patients.documents.length === 0) {
      console.log("No patient found for the given userId");
      return null;
    }
    return JSON.parse(JSON.stringify(patients.documents[0]));
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
};

export const registerPatient = async ({
  identificationDocument,
  ...patient
}: RegisterUserParams) => {
  try {
    let file;
    if (identificationDocument) {
      const inputFile = InputFile.fromBuffer(
        identificationDocument.get("blobFile") as Blob,
        identificationDocument.get("fileName") as string
      );
      file = await storage.createFile(
        process.env.NEXT_PUBLIC_BUCKET_ID || '', 
        ID.unique(), 
        inputFile
      );
    }

    const newPatient = await database.createDocument(
      process.env.NEXT_PUBLIC_DATABASE_ID || '',
      process.env.NEXT_PUBLC_PATIENT_COLLECTION_ID || '',
      ID.unique(), // Generate a unique ID for the document
      {
        indentificationDocumentId: file?.$id || null,
        identificationDocumentUrl: file
          ? `${process.env.NEXT_PUBLC_PATIENT_COLLECTION_ID}/storage/buckets/${process.env.NEXT_PUBLIC_BUCKET_ID}/files/${file.$id}/view?project=${process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID}`
          : null,
        ...patient,
      }
    );

    return parseStringify(newPatient); 
  } catch (error) {
    console.error("Error registering patient:", error);
    throw error; 
  }
};

