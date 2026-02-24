"use client";

import { Button } from '@/components/ui/button';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { loginDataType, loginSchema } from '@/schemas/auth.schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function page() {
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      email: "",
      password: ""
    },
    resolver: zodResolver(loginSchema)
  });

  async function handelLogin(values: loginDataType) {
    const result = await signIn("credentials", {
      ...values,
      redirect: false,
    });

    if (result?.ok) {
      router.push("/"); // بعد login ناجح
    } else {
      console.log("Login failed:", result);
    }
  }

  return (
    <div className='max-w-5xl bg-emerald-100-200 p-5 mx-auto'>
      <h1>Login Page</h1>
      <form onSubmit={form.handleSubmit(handelLogin)}>
        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Email</FieldLabel>
              <Input {...field} id={field.name} aria-invalid={fieldState.invalid} placeholder="Enter your email" autoComplete="off" />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="password"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Password</FieldLabel>
              <Input type='password' {...field} id={field.name} aria-invalid={fieldState.invalid} placeholder="Enter your password" autoComplete="off" />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Button className='w-full text-xl my-3 cursor-pointer'> Log in Now </Button>
      </form>
    </div>
  )
}