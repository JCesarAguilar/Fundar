"use client";

import Modal from "@/components/common/Modal";
import EditUserForm from "@/components/forms/EditUserForm";
import ProfileImageUploader from "@/components/dashboard/ProfileImageUploader";
import { Edit3 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";

export default function ProfilePage() {
  const { dataUser } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section>
      <div>
        <div className="max-w-[70vw] mx-auto bg-white-smoke rounded-2xl shadow-md overflow-hidden mt-5">
          <div className="relative bg-bluesky-strong h-40">
            <div className="absolute -bottom-10 left-10">
              <ProfileImageUploader />
            </div>
          </div>
          <div className="pt-14 px-10 pb-8 text-gray-strong">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-2xl font-semibold text-gray-800 ">
                Personal Information
              </h2>
              <button
                onClick={() => setIsModalOpen(true)}
                className="flex gap-2 items-center px-4 py-2 rounded-lg border border-gray-300 text-gray-strong hover:bg-gray-soft transition cursor-pointer"
              >
                <Edit3 size={16} />
                <p>Edit</p>
              </button>
            </div>
            <div className="divide-y divide-gray-medium font-medium">
              <div className="py-3 flex justify-between">
                <p>Name</p>
                <p className="text-gray-900">
                  {dataUser?.user?.firstName} {dataUser?.user?.lastName}
                </p>
              </div>
              <div className="py-3 flex justify-between">
                <p>Email</p>
                <p>{dataUser?.user?.email}</p>
              </div>
              {dataUser?.user.country ? (
                <div className="py-3 flex justify-between">
                  <p>Country</p>
                  <p>{dataUser?.user?.country}</p>
                </div>
              ) : null}
              {/* <div className="py-3 flex justify-between">
                <p>Role</p>
                <p className="capitalize">{dataUser?.user?.role}</p>
              </div> */}
              <div className="py-3 flex justify-between">
                <p>User</p>
                <p>@{dataUser?.user?.email?.split("@")[0] || "sin_usuario"}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        title="Edit Profile"
        onClose={() => setIsModalOpen(false)}
      >
        <EditUserForm onClose={() => setIsModalOpen(false)} />
      </Modal>
    </section>
  );
}
