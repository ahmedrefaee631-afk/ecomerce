"use server"
import { LoginType } from "@/types/login.type ";
import axios from "axios";
import { toast } from "sonner";

  export const login = async (data: LoginType) => {
    try {

      const res = await axios.post(
      "https://ecommerce.routemisr.com/api/v1/auth/signin",data);
      toast.success("Wellcome back", { position: "top-center" });
      console.log(res.data.token)

      return true;
    } 
    catch (error: any) {
  toast.error(
    error?.response?.data?.message || "Something went wrong",
    { position: "top-center" }
  );
  return null;
}
  };
