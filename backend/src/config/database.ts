import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Database Environment Variables");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const connectDatabase = async () => {
  try {
    const { error } = await supabase.from("_any_table_").select("*").limit(0);

    if (error && error.code !== "PGRST204" && error.code !== "PGRST205") {
      throw error;
    }

    console.log("Database connected");
  } catch (error) {
    console.error("Database connection failed:", error);
    process.exit(1);
  }
};
