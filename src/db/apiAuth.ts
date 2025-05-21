import type { IUser } from "@/types";
import supabase from "./supabase";

export async function login({ email, password }: IUser) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);

  return data;
}

export async function getCurrentUser() {
  // Supabase supports get session from local storage
  const { data, error } = await supabase.auth.getSession();
  if (!data.session) return null;
  if (error) throw new Error(error.message);
  return data.session?.user;
}
