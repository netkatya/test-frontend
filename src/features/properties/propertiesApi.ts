import { api } from "../../shared/api/axios";
import type { Property } from "./types";

export async function fetchProperties(): Promise<Property[]> {
  const res = await api.get("/properties");
  return res.data;
}
