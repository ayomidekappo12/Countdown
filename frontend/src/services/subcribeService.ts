import axios from "axios";
import instance from "@/api/axios";

export type SubscribeData = {
  firstName: string;
  email: string;
};

export type SubscribeResponse = {
  message?: string;
  position?: number;
  referralCode?: string;
  totalSubscribers?: number;
};

type ErrorResponse = {
  message?: string;
  detail?: string;
};

export async function subscribeUser(
  data: SubscribeData,
): Promise<SubscribeResponse> {
  try {
    const response = await instance.post<SubscribeResponse>("/subscribe", data);

    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError<ErrorResponse>(error)) {
      throw new Error(
        error.response?.data?.message ??
          error.response?.data?.detail ??
          "Something went wrong",
      );
    }

    throw new Error("Something went wrong");
  }
}
