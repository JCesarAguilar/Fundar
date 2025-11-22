const apiURL = process.env.NEXT_PUBLIC_API_URL;

export const getDonationById = async (token: string, idUser: string) => {
  try {
    const response = await fetch(`${apiURL}/donations/user/${idUser}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) throw new Error("Error fetching user by id");
    const donationInfo = response.json();
    return donationInfo;
  } catch (err) {
    console.error("Server error while getting users:", err);
    throw err;
  }
};
