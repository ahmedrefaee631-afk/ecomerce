import { RegisterType } from "@/types/register.type";
import { toast } from "sonner";

  export const registerUser = async (data: RegisterType) => {
    try {

      const res = await fetch(
        "https://ecommerce.routemisr.com/api/v1/auth/signup",
        {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      const responseData = await res.json();

      if (!res.ok) {
        toast.error(responseData.message, { position: "top-center" });
        throw new Error(responseData.message);
      }

      toast.success("User Added Successfully", { position: "top-center" });
      return true;
    } catch (error) {
      console.log(error);
      return null
    } 
  };
