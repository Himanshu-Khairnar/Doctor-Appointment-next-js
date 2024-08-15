import Patient from "@/components/forms/Patient";
import PasskeyModel from "@/components/PasskeyModel";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function page({searchParams}:SearchParamProps) {
  const isAdmin = searchParams.admin==='true';

  return (
    <div className="flex h-screen max-h-screen">
      {isAdmin && <PasskeyModel/>}

      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[496px]">
          <Image
            src="/assets/icons/logo-full.svg"
            height={1000}
            width={1000}
            alt="patient"
            className="mb-12 h-10 w-fit"
          />
          <Patient />
          <div className="text-14-regular mt-20 flex justify-between">
            {" "}
            <p className="justify-items-end text-dark-600 xl:text-left">
              {" "}
              © 2024 careplus
            </p>
            <Link href="/?admin=true" className="text-green-500">Admin</Link>
          </div>
        </div>
      </section>
      <Image
        src="/assets/images/onboarding-img.png"
        height={1000}
        width={1000}
        alt="patient"
        className="slide-img max-w-[50%] hidden lg:inline"
      />
    </div>
  );
}
