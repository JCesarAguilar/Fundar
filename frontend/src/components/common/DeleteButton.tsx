import { Trash2 } from "lucide-react";

interface DeleteButtonProps {
  onDelete: () => void;
}

export default function DeleteButton({ onDelete }: DeleteButtonProps) {
  return (
    <button
      onClick={onDelete}
      className="text-red-600 hover:text-red-800 cursor-pointer "
    >
      <Trash2 size={18} />
    </button>
  );
}
