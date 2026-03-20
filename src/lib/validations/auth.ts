import { z } from "zod";

export const SignInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const SignUpSchema = z
  .object({
    firstName: z.string().min(1).trim(),
    lastName: z.string().min(1).trim(),
    email: z.string().email().trim(),
    password: z.string().min(6),
    confirmPassword: z.string().min(6),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export const UpdatePasswordSchema = z
  .object({
    currentPassword: z.string().min(6),
    newPassword: z.string().min(6),
    confirmNewPassword: z.string().min(6),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "New passwords don't match",
    path: ["confirmNewPassword"],
  });

export type SignInData = z.infer<typeof SignInSchema>;
export type SignUpData = z.infer<typeof SignUpSchema>;
export type UpdatePasswordData = z.infer<typeof UpdatePasswordSchema>;