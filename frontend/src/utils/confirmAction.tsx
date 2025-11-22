"use client";

import { createRoot } from "react-dom/client";
import ConfirmModal from "@/components/common/ConfirmModal";

export const confirmAction = (message: string): Promise<boolean> => {
  return new Promise((resolve) => {
    // Creamos un contenedor en el body
    const container = document.createElement("div");
    document.body.appendChild(container);

    const root = createRoot(container);
    const close = () => {
      root.unmount();
      container.remove();
    };
    root.render(
      <ConfirmModal
        message={message}
        onConfirm={() => {
          resolve(true);
          close();
        }}
        onCancel={() => {
          resolve(false);
          close();
        }}
      />
    );
  });
};
