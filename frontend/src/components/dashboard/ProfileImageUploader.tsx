"use client";

import Image from "next/image";
import Loading from "../common/Loading";
import { useEffect, useState } from "react";
import { CiCamera } from "react-icons/ci";
import { toast } from "sonner";
import { uploadProfileImage } from "@/services/uploadImage.services";
import { useAuth } from "@/context/AuthContext";

export default function ProfileImageUploader() {
  const { dataUser, setDataUser } = useAuth();
  const token = dataUser?.token ?? "";

  const [preview, setPreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (dataUser?.user.imageUrl) {
      setPreview(dataUser.user.imageUrl);
    }
  }, [dataUser]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const tempUrl = URL.createObjectURL(file);
    setPreview(tempUrl);

    if (!dataUser) return;

    try {
      setIsUploading(true);
      const newImageUrl = await uploadProfileImage(
        file,
        dataUser?.user.id,
        token
      );
      const updatedUser = {
        ...dataUser,
        user: { ...dataUser.user, imageUrl: newImageUrl },
      };
      setDataUser(updatedUser);
      toast.success("Profile picture updated successfully");
    } catch (err) {
      console.error("Error updating profile image:", err);
      toast.error("Error uploading image");
      setPreview(dataUser.user.imageUrl || null);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="relative w-[120px] h-[120px]">
      <label
        htmlFor="profileImage"
        className="cursor-pointer group block w-full h-full"
      >
        <div className="w-full h-full rounded-full bg-gray-200 border-4 border-white shadow-md overflow-hidden flex items-center justify-center relative">
          {preview ? (
            <Image
              src={preview}
              alt="Profile photo"
              fill
              className="object-cover rounded-full"
            />
          ) : (
            <CiCamera className="text-gray-500 w-12 h-12" />
          )}
          {isUploading && (
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <Loading />
            </div>
          )}
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
            <span className="text-white text-sm font-medium">
              {isUploading ? "Uploading..." : "Change"}
            </span>
          </div>
        </div>
      </label>

      <input
        id="profileImage"
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  );
}
