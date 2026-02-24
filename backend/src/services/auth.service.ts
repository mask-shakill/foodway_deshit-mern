import { supabase } from "../config/database";

export class AuthService {
  static async syncUser(userData: {
    uid: string;
    email?: string;
    name?: string;
    image?: string;
  }) {
    const { data: existingUser } = await supabase
      .from("users")
      .select("*")
      .eq("uid", userData.uid)
      .single();

    if (existingUser) return existingUser;

    const { data: newUser, error } = await supabase
      .from("users")
      .insert([
        {
          uid: userData.uid,
          email: userData.email,
          name: userData.name,
          image: userData.image,
          role: "user",
        },
      ])
      .select()
      .single();

    if (error) throw new Error(error.message);
    return newUser;
  }
}
