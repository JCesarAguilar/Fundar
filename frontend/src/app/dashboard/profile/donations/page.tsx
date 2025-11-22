"use client";

import UserDonationCard from "./UserDonationCard";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { IUserDonation } from "@/interfaces/IUser";
import { getDonationById } from "@/services/donation.services";

export default function DonationsPage() {
  const [donations, setDonations] = useState<IUserDonation[]>([]);
  const [loading, setLoading] = useState(true);
  const { dataUser } = useAuth();
  const token = dataUser?.token ?? "";

  useEffect(() => {
    const loadDonations = async () => {
      if (!dataUser?.user?.id) return;

      try {
        const userDonations = await getDonationById(token, dataUser.user.id);
        console.log("userDonation", userDonations);
        setDonations(userDonations);
      } catch (err) {
        console.error("Error fetching donations:", err);
      } finally {
        setLoading(false);
      }
    };
    loadDonations();
  }, [dataUser, token]);

  return (
    <section className="space-y-6">
      {loading && <p className="text-gray-500">Loading donations...</p>}

      {!loading && donations.length === 0 && (
        <p className="text-gray-500">You haven’t made any donations yet.</p>
      )}
      <div className="grid grid-cols-3 gap-5 items-stretch">
        {donations.map((donation) => (
          <UserDonationCard key={donation.id} donation={donation} />
        ))}
      </div>
    </section>
  );
}
