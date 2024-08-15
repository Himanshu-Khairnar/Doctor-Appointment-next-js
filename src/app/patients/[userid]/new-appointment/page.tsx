import AppointmentForms from "@/components/forms/AppointmentForms";
import Patient from "@/components/forms/Patient";
import { Button } from "@/components/ui/button";
import { getPatients } from "@/lib/actions/patient.actions";
import { Divide } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default async function New_AppointmentPage({
  params: { userid },
}: SearchParamProps) {
  const patient = await getPatients(userid);
  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[860px] flex-1 justify-between">
          <Image
            src="/assets/icons/logo-full.svg"
            height={1000}
            width={1000}
            alt="logo"
            className="mb-12 h-10 w-fit"
          />

          <AppointmentForms
            patientId={patient?.$id}
            userId={userid}
            type="create"
          />

          <p className="copyright mt-10 py-12">© 2024 CarePluse</p>
        </div>
      </section>

      <Image
        src="/assets/images/appointment-img.png"
        height={1500}
        width={1500}
        alt="appointment"
        className="side-img max-w-[390px] bg-bottom"
      />
    </div>
  );
}
