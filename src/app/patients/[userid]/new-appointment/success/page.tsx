import { Button } from "@/components/ui/button";
import { Doctors } from "@/constants";
import { getAppointment } from "@/lib/actions/appointment.actions";
import { formatDateTime } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const SuccessPage = async ({
  params: { userid },
  searchParams,
}: SearchParamProps) => {
  const appointmentId = (searchParams?.appointmentId as string) ;
  const appointment = await getAppointment(appointmentId);
  const doc = Doctors.find((d) => d.name === appointment.primaryPhysician);
  return (
    <div className="flex h-screen max-h-screen px-[5%]">
      <div className="success-img">
        <Link href="/">
          <Image
            src="/assets/icons/logo-full.svg"
            height={1000}
            width={1000}
            alt="Company logo"
            className="h-10 w-fit"
          />
        </Link>
        <section className="flex flex-col items-center">
          <Image
            src="/assets/gifs/success.gif"
            height={300}
            width={280}
            alt="success"
          />
          <h2 className="header mb-6 max-w-[600px] text-center">
            Your <span className="text-green-500">appointment request</span> has
            been successfully submitted
          </h2>
          <p>we&apos;ll be in touch shortly to confrim </p>
        </section>
        <section className="request-details">
          <p>Requested appointment details:</p>
          <div className="flex items-center gap-3 ">
            <Image
              src={doc?.image}
              alt="doctor Image"
              width={100}
              height={100}
              className="size-10"
            />
            <p className="whitespace-nowrap">{doc?.name}</p>
            <div className="flex gap-2">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M20 10.2H4M15.5556 3V6.6M8.44444 3V6.6M8.26667 21H15.7333C17.2268 21 17.9735 21 18.544 20.7057C19.0457 20.4469 19.4537 20.0338 19.7094 19.5258C20 18.9482 20 18.1921 20 16.68V9.12C20 7.60786 20 6.85179 19.7094 6.27423C19.4537 5.76619 19.0457 5.35314 18.544 5.09428C17.9735 4.8 17.2268 4.8 15.7333 4.8H8.26667C6.77319 4.8 6.02646 4.8 5.45603 5.09428C4.95426 5.35314 4.54631 5.76619 4.29065 6.27423C4 6.85179 4 7.60786 4 9.12V16.68C4 18.1921 4 18.9482 4.29065 19.5258C4.54631 20.0338 4.95426 20.4469 5.45603 20.7057C6.02646 21 6.77319 21 8.26667 21Z"
                  stroke="#CDE9DF"
                  stroke-width="1.66667"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>

              <p>{formatDateTime(appointment.schedule).dateTime}</p>
            </div>
          </div>
        </section>
        <Button variant="outline" className="shad-primary-btn" >
          <Link href={`/patients/${userid}/new-appointment`}>New Appointment</Link>
        </Button>

        <p className="copyright mt-5 py-12">
            {" "}
            © 2024 careplus
          </p>
   
      </div>
    </div>
  );
};

export default SuccessPage;
