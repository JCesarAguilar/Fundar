"use client";

import { createPortal } from "react-dom";

interface ConfirmModalProps {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmModal({
  message,
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
  return createPortal(
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-10000">
      <div className="bg-white w-[380px] rounded-xl shadow-xl px-8 py-6 animate-fade-in">
        <p className="text-black-medium text-lg font-semibold text-center mb-4">
          {message}
        </p>
        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300 text-gray-800 cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-md bg-red-600 hover:bg-red-700 text-white cursor-pointer"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
