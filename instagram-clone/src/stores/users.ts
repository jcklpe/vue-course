import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { supabase } from "@/supabase";

export const useUserStore = defineStore("users", () => {
  const user = ref(null);
  const errorMessage = ref("");

  //- Private Helper Functions
  async function addUserRow(username: string, email: string) {
    // 1) get a reference to the "users" table
    const usersTable = supabase.from("users");

    // 2) build the payload
    // const newUser = { username, email };
    const newUser = {
      username,
      email,
    };

    // 3) perform the insert and request return
    const { data, error } = await usersTable.insert(newUser).select("*");

    if (error) throw error;

    return data;
  }

  const validateEmail = (email: string): boolean => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  //- Public Store Actions
  const handleLogin = () => {};

  const handleSignup = async (credentials: {
    email: string;
    password: string;
    username: string;
  }) => {
    const { email, password, username } = credentials;

    //- validation stuff
    if (password.length < 6) {
      return (errorMessage.value = "Minimum of 6 characters for password");
    }

    if (username.length < 4) {
      return (errorMessage.value = "Minimum of 4 characters for username");
    }

    if (!validateEmail(email)) {
      return (errorMessage.value = "Email is invalid");
    }

    errorMessage.value = "";

    // actual sign in process

    // 1) Sign the user up
    const { data: signUpData, error: signUpError }: { data: { session: any } | null; error: any } =
      await supabase.auth.signUp({ email, password });

    const { session } = signUpData || {};
    if (signUpError) {
      return (errorMessage.value = signUpError.message);
    }

    // 2) If email confirmation is on, there may be no session yet.
    //    For quick dev/demo, you can immediately sign them in:
    let realSession = session;
    if (!realSession) {
      const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (signInError) {
        return (errorMessage.value = signInError.message);
      }
      realSession = signInData.session;
    }

    // Log the current user session
    console.log("Current user session:", realSession);

    // 3) Now authenticated → this insert will pass your RLS policy
    if (realSession) {
      try {
        const insertedRows = await addUserRow(username, email);
        console.log("🎉 user row inserted:", insertedRows);
      } catch (insertError: any) {
        console.error("❌ failure to insert user row:", insertError);
        errorMessage.value = insertError.message;
      }
    } else {
      errorMessage.value = "User is not authenticated.";
    }
  };

  const handleLogout = () => {};
  const getUser = () => {};

  return { user, errorMessage, handleLogin, handleSignup, handleLogout, getUser };
});
