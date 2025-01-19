"use server";

import { encodedRedirect } from "@/utils/utils";
import { createClient } from "@/utils/supabase/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const signUpAction = async (formData: FormData) => {
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();
  const name = formData.get("name")?.toString();
  const supabase = await createClient();
  const origin = (await headers()).get("origin");

  if (!email || !password || !name) {
    return encodedRedirect(
      "error", 
      "/signup",
      "Name, email and password are required",
    );
  }

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/callback`,
      data: {
        name: name
      }
    },
  });

  if (error) {
    console.error(error.code + " " + error.message);
    return encodedRedirect("error", "/signup", error.message);
  } else {
    return encodedRedirect(
      "success",
      "/welcome", 
      "Thanks for signing up! Please check your email for a verification link.",
    );
  }
};

export const signInAction = async (formData: FormData) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return encodedRedirect("error", "/login", error.message);
  }

  return redirect("/dashboard");
};

export async function forgotPasswordAction(formData: FormData) {
  const email = formData.get("email") as string
  const supabase = await createClient()
  const origin = (await headers()).get("origin");
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${origin}/reset-password`
  })
  
  if (error) {
    return encodedRedirect("error", "/forgot-password", "Failed to send reset email")
  }
  
  return redirect("/forgot-password?success=true")
}

export const resetPasswordAction = async (formData: FormData) => {
  const supabase = await createClient();

  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  if (!password || !confirmPassword) {
    encodedRedirect(
      "error",
      "/reset-password",
      "Password and confirm password are required",
    );
  }

  if (password !== confirmPassword) {
    encodedRedirect(
      "error",
      "/reset-password",
      "Passwords do not match",
    );
  }

  const { error } = await supabase.auth.updateUser({
    password: password,
  });

  if (error) {
    encodedRedirect(
      "error",
      "/reset-password",
      "Password update failed",
    );
  }

  encodedRedirect("success", "/reset-password", "Password updated");
};

export const signOutAction = async () => {
  const supabase = await createClient();
  await supabase.auth.signOut();
  return redirect("/login");
};
export const updateProfileAction = async (formData: FormData) => {
  const name = formData.get("name")?.toString();
  const bio = formData.get("bio")?.toString();
  
  const supabase = await createClient();
  const { data: { user }, error: userError } = await supabase.auth.getUser();

  if (userError || !user) {
    throw encodedRedirect("error", "/account", "Unauthorized");
  }

  const { data, error: updateError } = await supabase.auth.updateUser({
    data: { name, bio }
  });

  if (updateError) {
    throw encodedRedirect("error", "/account", updateError.message);
  }


  throw encodedRedirect("success", `/account/${user.id}`, "Profile updated successfully");
};

export const updateAvatarAction = async (formData: FormData) => {
  const avatarUrl = formData.get("avatarUrl")?.toString();
  const supabase = await createClient();
  const { data: { user }, error: userError } = await supabase.auth.getUser();

  if (userError || !user) {
    throw encodedRedirect("error", "/account", "Unauthorized");
  }

  const { data, error: updateError } = await supabase.auth.updateUser({
    data: { avatarUrl }
  });

  if (updateError) {
    throw encodedRedirect("error", "/account", updateError.message);
  }

  throw encodedRedirect("success", `/account/${user.id}`, "Avatar updated successfully");
};
