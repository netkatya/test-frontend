import axios from "axios";

const API = import.meta.env.VITE_API_URL;

export async function createApplication(propertyId: number, amount: number) {
  const token = localStorage.getItem("token");

  const res = await axios.post(
    `${API}/applications`,
    { propertyId, amount },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return res.data;
}
