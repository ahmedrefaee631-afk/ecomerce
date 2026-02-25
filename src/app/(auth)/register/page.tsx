"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Controller, useForm } from "react-hook-form";
import { registerFormInput } from "@/constans/register-inputs";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerschema } from "@/schemas/auth.schemas";
import { RegisterType } from "@/types/register.type";
import { useRouter } from "next/navigation";
import { registerUser } from "../../api/register";

export default function Register() {
  const router = useRouter(); 
  const [loading, setLoading] = useState(false);

  const { handleSubmit, control } = useForm<RegisterType>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      Repassword: "",
      phone: "",
    },
    resolver: zodResolver(registerschema),
  });
  
  
 
const onSubmit = async (data: RegisterType) => {
  setLoading(true);
  const res = await registerUser(data); 
  if (res) {
    router.push("/login");
  }
  setLoading(false);
};


  return (
    <>
      <h1 className="text-2xl font-bold mb-4 text-center">Register Page</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="w-1/2 mx-auto">
        <FieldGroup>
          {registerFormInput.map(({ name, placeholder, label }, index) => (
            <Controller
              key={index}
              name={name as "password" | "name" | "email" | "Repassword" | "phone"}

              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={name}>{label}</FieldLabel>

                  <Input
                    {...field}
                    id={name}
                    placeholder={placeholder}
                    aria-invalid={fieldState.invalid}
                    autoComplete="off"
                  />

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          ))}

          <Button
            disabled={loading}
            type="submit"
            className="mt-4 w-full disabled:opacity-50"
          >
            {loading ? "Submitting..." : "Submit"}
          </Button>
        </FieldGroup>
      </form>
    </>
  );
}
