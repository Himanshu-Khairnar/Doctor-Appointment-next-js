"use client";
import React, { useState, useEffect } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { decryptKey, encryptKey } from "@/lib/utils";

const PasskeyModel = () => {
  const router = useRouter();
  const path = usePathname();
  const [open, setopen] = useState(true);
  const [passkey, setpasskey] = useState("");
  const [error, seterror] = useState("");
  const closeModal = () => {
    setopen(false);
    router.push("/");
  };
  useEffect(() => {
    // Ensure that this runs only on the client side
    if (typeof window !== "undefined") {
      const storedKey = window.localStorage.getItem("accessKey");
      const decryptedKey = storedKey ? decryptKey(storedKey) : null;

      if (decryptedKey === "123456") {
        setopen(false);
        router.push("/admin");
      }
    }
  }, [router, path]);
  
  const validatePasskey = (e: React.MouseEvent) => {
    e.preventDefault();
    if (passkey === "123456") {
      const encryptedKey = encryptKey(passkey);
      window.localStorage.setItem("accessKey", encryptedKey);
      setopen(false);
      router.push("/admin");
    } else {
      seterror("Invalid Passkey, Please try again");
    }
  };

  return (
    <div>
    <AlertDialog open={open} onOpenChange={setopen}>
      <AlertDialogContent className="shad-alert-dialog">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center justify-between">
            Admin access verification
            <Image
              src="/assets/icons/close.svg"
              alt="close"
              width={20}
              height={20}
              onClick={() => closeModal()}
              className="cursor-pointer"
            />
          </AlertDialogTitle>
          <AlertDialogDescription>
            To access the admin page please enter the passkey
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div>
          <InputOTP
            maxLength={6}
            value={passkey}
            onChange={(value) => setpasskey(value)}
          >
            <InputOTPGroup className="shad-otp">
              <InputOTPSlot className="shad-otp-slot" index={0} />
              <InputOTPSlot className="shad-otp-slot" index={1} />
              <InputOTPSlot className="shad-otp-slot" index={2} />
              <InputOTPSlot className="shad-otp-slot" index={3} />
              <InputOTPSlot className="shad-otp-slot" index={4} />
              <InputOTPSlot className="shad-otp-slot" index={5} />
            </InputOTPGroup>
          </InputOTP>
          {error && (
            <p className="shad-error text-14-regular mt-4 flex justify-center  ">
              {error}
            </p>
          )}
        </div>
        <AlertDialogFooter>
          <AlertDialogAction onClick={(e) => validatePasskey(e)}
              className="shad-primary-btn w-full">
            Enter Admin Passkey
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  </div>
);
};

export default PasskeyModel;
