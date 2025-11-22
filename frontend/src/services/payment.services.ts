const apiURL = process.env.NEXT_PUBLIC_API_URL;

interface PaymentSessionResponse {
  url: string;
}

export const createPaymentSession = async (
  token: string,
  projectId: string,
  userId: string,
  amount: number
): Promise<string> => {
  try {
    const res = await fetch(`${apiURL}/payments/create-session`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ projectId, userId, amount }),
    });

    if (!res.ok) throw new Error("Error creating payment session");

    const data: PaymentSessionResponse = await res.json();

    return data.url;
  } catch (err) {
    console.error("Payment session error:", err);
    throw err;
  }
};

export const createDonation = async (
  token: string,
  amount: number,
  userId: string,
  projectId: string
) => {
  try {
    const res = await fetch(`${apiURL}/donations`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        amount,
        date: new Date().toISOString().split("T")[0],
        paymentMethod: "stripe",
        userId,
        projectId,
      }),
    });

    if (!res.ok) throw new Error("Error creating donation");

    return await res.json();
  } catch (err) {
    console.error("Donation error", err);
    throw err;
  }
};
