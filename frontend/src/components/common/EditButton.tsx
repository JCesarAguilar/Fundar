import { Edit3 } from "lucide-react";

interface EditButtonProps {
  onEdit: () => void;
}

export default function EditButton({ onEdit }: EditButtonProps) {
  return (
    <button
      onClick={onEdit}
      className="text-blue-strong hover:text-blue-soft cursor-pointer"
    >
      <Edit3 size={18} />
    </button>
  );
}
