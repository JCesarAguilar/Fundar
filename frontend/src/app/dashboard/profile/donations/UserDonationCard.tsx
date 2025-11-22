"use client";

import Image from "next/image";
import { IUserDonation } from "@/interfaces/IUser";
import Link from "next/link";

export default function UserDonationCard({
  donation,
}: {
  donation: IUserDonation;
}) {
  const project = donation.project;

  return (
    <div className="rounded-xl bg-white shadow-md hover:shadow-lg transition-all duration-200 border flex flex-col gap-4">
      <div className="flex flex-col items-center gap-3">
        <div className="relative w-full h-70 rounded-t-xl overflow-hidden">
          <Image
            src={project.imageUrls?.[0] || "/placeholder.jpg"}
            alt={project.title}
            fill
            className="object-cover"
          />
        </div>
        <div className="flex flex-col items-center">
          <h3 className="text-lg font-semibold text-black-strong">
            {project.title}
          </h3>
          <p className="text-sm text-gray-strong">{project.country}</p>
        </div>
      </div>

      <hr className="border-gray-200 mx-7" />

      <div className="flex flex-col gap-3 px-7 pb-7">
        <div className="flex justify-between">
          <p className="text-black-strong text-sm">
            <strong className="font-semibold">Amount:</strong>{" "}
            <span className="text-green-600 font-bold">
              ${donation.amount} USD
            </span>
          </p>
          <p className="text-black-strong text-sm">
            <strong className="font-semibold">Date:</strong>{" "}
            {new Date(donation.date).toLocaleDateString()}
          </p>
        </div>
        <Link
          href={`/projects/${project.id}`}
          className="btn-form-primary text-center mt-2"
        >
          View Project
        </Link>
      </div>
    </div>
  );
}
