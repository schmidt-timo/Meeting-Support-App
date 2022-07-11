import { getServiceSupabase, supabase } from "./config";

export const updateUserAccountEmail = async (newEmail: string) => {
  return await supabase.auth.update({ email: newEmail });
};

export const updateUserAccountPassword = async (newPassword: string) => {
  return await supabase.auth.update({ password: newPassword });
};

export const deleteUserAccount = async (userId: string) => {
  const supabaseService = getServiceSupabase();
  return await supabaseService.auth.api.deleteUser(userId);
};
