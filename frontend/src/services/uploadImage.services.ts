const apiURL = process.env.NEXT_PUBLIC_API_URL;

export const uploadSingleImage = async (file: File, token: string) => {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch(`${apiURL}/files/uploadTempImage`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });
    if (!response.ok) {
      throw new Error(`Error al subir imagen: ${response.status}`);
    }

    const data = await response.json();
    return data.imageUrl;
  } catch (error) {
    console.error("Error subiendo imagen:", error);
    throw error;
  }
};

export const uploadProfileImage = async (
  file: File,
  uuid: string,
  token: string
): Promise<string> => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("uuid", uuid);

    const response = await fetch(`${apiURL}/files/uploadImage`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (!response.ok) {
      const err = await response.text();
      throw new Error(`Error uploading image: ${err}`);
    }

    const data = await response.json();
    return data.imageUrl;
  } catch (err) {
    console.error("Server error while uploading profile image:", err);
    throw err;
  }
};
