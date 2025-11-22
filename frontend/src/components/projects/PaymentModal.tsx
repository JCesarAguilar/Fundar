"use client";

import { createPaymentSession } from "@/services/payment.services";
import { useState } from "react";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";

interface PaymentModalProps {
  projectId: string;
  onClose: () => void;
}

export default function PaymentModal({
  projectId,
  onClose,
}: PaymentModalProps) {
  const { dataUser } = useAuth();
  const token = dataUser?.token ?? "";

  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState<string>("");

  const suggestedAmounts = [50, 100, 150, 200, 300, 500];

  const handleDonate = async () => {
    const amount = selectedAmount || Number(customAmount);

    if (!amount || amount <= 0) {
      toast.error("Please select or enter a valid amount");
      return;
    }

    try {
      localStorage.setItem(
        "pendingDonation",
        JSON.stringify({
          amount,
          userId: dataUser?.user.id,
          projectId,
        })
      );

      const sessionUrl = await createPaymentSession(
        token,
        projectId,
        dataUser?.user.id as string,
        amount
      );
      window.location.href = sessionUrl;

      toast.success(`Processing donation of $${amount} USD`);
      onClose();
    } catch (err) {
      toast.error("Error processing donation");
      console.error(err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
      <div
        className="bg-white-smoke rounded-xl shadow-lg p-8 w-full max-w-md relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-medium hover:text-gray-strong text-lg cursor-pointer"
        >
          ✕
        </button>

        <h2 className="text-2xl font-semibold text-black-medium mb-6 text-center">
          Support this Project
        </h2>

        <div className="grid grid-cols-3 gap-3 mb-5">
          {suggestedAmounts.map((amount) => (
            <button
              key={amount}
              onClick={() => {
                setSelectedAmount(amount);
                setCustomAmount("");
              }}
              className={`border rounded-lg py-3 font-medium transition cursor-pointer ${
                selectedAmount === amount
                  ? "bg-yellow-300 border-yellow-strong"
                  : "bg-gray-soft border-gray-200 hover:border-yellow-300"
              }`}
            >
              ${amount} USD
            </button>
          ))}
          <button
            onClick={() => {
              setSelectedAmount(null);
              setCustomAmount("");
            }}
            className={`col-span-3 border rounded-lg py-3 font-medium transition cursor-pointer ${
              !selectedAmount && !customAmount
                ? "bg-yellow-300 border-yellow-500"
                : "bg-gray-soft border-gray-200 hover:border-yellow-300"
            }`}
          >
            Other amount
          </button>
        </div>

        {!selectedAmount && (
          <input
            type="number"
            placeholder="Enter custom amount"
            value={customAmount}
            onChange={(e) => setCustomAmount(e.target.value)}
            className="w-full border rounded-md p-2 text-center mb-5 focus:outline-none focus:ring-2 focus:ring-yellow-300"
          />
        )}

        <p className="text-center text-gray-strong mb-6 text-sm">
          Together, we can create lasting impact.
        </p>

        <button
          onClick={handleDonate}
          className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-3 rounded-lg transition cursor-pointer"
        >
          GIVE
        </button>
      </div>
    </div>
  );
}
