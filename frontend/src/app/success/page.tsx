"use client";

import { useEffect, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { useAuth } from "@/context/AuthContext";
import { TitleBanner, P1 } from "@/components/common/Typography";
import { useRouter } from "next/navigation";
import { PATHROUTES } from "@/helpers/NavItems";
import { createDonation } from "@/services/payment.services";

export default function Success() {
  const router = useRouter();
  const { dataUser } = useAuth();
  const token = dataUser?.token ?? "";

  const [isSaving, setIsSaving] = useState(true);
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    const saveDonation = async () => {
      const pending = localStorage.getItem("pendingDonation");

      if (!pending) {
        console.log("No pending donation found");
        setIsSaving(false);
        return;
      }

      const { amount, userId, projectId } = JSON.parse(pending);
      setAmount(amount);

      try {
        await createDonation(token, amount, userId, projectId);
      } catch (err) {
        console.error("Error saving donation:", err);
      } finally {
        localStorage.removeItem("pendingDonation");
        setIsSaving(false);
      }
    };

    saveDonation();
  }, [token]);

  return (
    <section className="bg-[url('/images/shared/collageRegister.webp')] h-[80vh] bg-cover">
      <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
        <div className="bg-white-smoke rounded-2xl py-15 px-10 flex flex-col gap-7">
          <div className="flex flex-col gap-2 items-center">
            <TitleBanner>Thank you {dataUser?.user.firstName}!</TitleBanner>
            <FaCheckCircle className="text-[70px] text-green-600" />
          </div>

          <div className="flex flex-col items-center gap-3 text-black-medium">
            <P1>
              {isSaving ? (
                "Processing donation..."
              ) : (
                <>
                  Your donation of{" "}
                  <span className="font-bold text-[18px]">${amount} USD</span>{" "}
                  has been processed.
                </>
              )}
            </P1>

            <P1>You&apos;ll receive a confirmation email.</P1>
          </div>

          <button
            type="button"
            onClick={() => router.push(PATHROUTES.HOME)}
            className="btn-form-primary"
          >
            GO TO HOME
          </button>
        </div>
      </div>
    </section>
  );
}
