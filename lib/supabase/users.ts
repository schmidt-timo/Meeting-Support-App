import { supabase } from "./config";
import { User } from "../../utils/types";

export const fetchAllUsers = async () => {
  return await supabase.from("users").select("*");
};

export const fetchSingleUser = async (userId: string) => {
  return await supabase.from("users").select("*").eq("id", userId).single();
};

export const createUser = async (user: User) => {
  return await supabase.from("users").insert([user]);
};

export const updateProfile = async (user: User) => {
  return await supabase
    .from("users")
    .update({ name: user.name, color: user.color })
    .match({ id: user.id })
    .single();
};

export const deleteUser = async (userId: string) => {
  return await supabase.from("users").delete().match({ id: userId });
};

export const getParticipantInfoIfEmailIsRegistered = async (
  participantEmail: string
) => {
  return await supabase
    .from("existing_users")
    .select("*")
    .eq("email", participantEmail)
    .single();
};

export const getParticipantInfo = async (userId: string) => {
  const { data, error } = await supabase
    .from("existing_users")
    .select("*")
    .eq("id", userId)
    .single();

  if (error) {
    throw error;
  }

  if (data) {
    return data;
  }
};
