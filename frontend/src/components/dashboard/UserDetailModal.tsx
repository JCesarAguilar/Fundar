import Modal from "@/components/common/Modal";
import Loading from "../common/Loading";
import Image from "next/image";
import { IUser } from "@/interfaces/IUser";
import { getUserById } from "@/services/user.services";
import { useEffect, useState } from "react";
import { deleteUser } from "@/services/user.services";
import { toast } from "sonner";
import { useUsers } from "@/context/UserContext";
import { FaUserCircle } from "react-icons/fa";
import { useAuth } from "@/context/AuthContext";
import { confirmAction } from "@/utils/confirmAction";

interface UserDetailModalProps {
  userId: string;
  onClose: () => void;
}

export default function UserDetailModal({
  userId,
  onClose,
}: UserDetailModalProps) {
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(true);
  const { refreshUsers } = useUsers();
  const { dataUser } = useAuth();
  const token = dataUser?.token ?? "";

  const handleDelete = async () => {
    if (!userId) return;

    const confirmDelete = await confirmAction(
      "Are you sure you want to delete this user?"
    );
    if (!confirmDelete) return;
    try {
      await deleteUser(token, userId);
      toast.success("User deleted succesfully");
      refreshUsers();
      onClose();
    } catch (err) {
      console.error("Error deleting user:", err);
      toast.error("Failed to delete user");
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const data = await getUserById(token, userId);
        setUser(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    })();
  }, [userId, token]);

  return (
    <Modal
      isOpen
      title="User Information"
      onClose={onClose}
      className="text-center"
    >
      {loading ? (
        <Loading />
      ) : (
        <div className="flex flex-col gap-15 items-center justify-center pt-3">
          <div className="flex flex-col px-10">
            <div className="flex gap-15 items-center px-3">
              {user?.imageUrl ? (
                <div className="relative h-50 w-50 rounded-full overflow-hidden">
                  <Image
                    src={user.imageUrl}
                    alt="Profile image"
                    fill
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="flex items-center justify-center h-50 w-50 rounded-full bg-gray-soft">
                  <FaUserCircle className="text-gray-strong w-full h-full" />
                </div>
              )}

              <div className="flex flex-col gap-2">
                <div>
                  <p className="font-bold">Name</p>
                  <p>
                    {user?.firstName} {user?.lastName}
                  </p>
                </div>

                <div>
                  <p className="font-bold">Email</p>
                  <p>{user?.email}</p>
                </div>

                {user?.country ? (
                  <div>
                    <p className="font-bold">Country</p>
                    <p>{user?.country} </p>
                  </div>
                ) : null}

                <div>
                  <span className="font-bold">Role</span>
                  <p>{user?.role}</p>
                </div>
              </div>
            </div>

            <div className="flex gap-5 justify-end mt-5 mb-2">
              <button
                onClick={onClose}
                className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-200 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white-smoke rounded-md hover:bg-red-400 cursor-pointer"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </Modal>
  );
}
