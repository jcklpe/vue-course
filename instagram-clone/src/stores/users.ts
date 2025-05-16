import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { supabase } from "@/supabase";

export const useUserStore = defineStore("users", () => {
  const user = ref<{ id: string; email: string; username: string } | null>(null);
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
  const clearErrorMessage = () => {
    errorMessage.value = "";
  };

  //- handle login
  const handleLogin = async (credentials: {
    email: string;
    password: string;
    username: string;
  }) => {
    const { email, password, username } = credentials;

    if (!validateEmail(email)) {
      return (errorMessage.value = "Email is invalid");
    }
    if (!password.length) {
      return (errorMessage.value = "Password cannot be empty");
    }

    const { error, data } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    console.log("login response:", { data, error });

    if (error) {
      errorMessage.value = `Login error: ${error.message}`;
      return;
    }

    if (!data?.session) {
      errorMessage.value = "Login failed: bad credentials";
      return;
    }

    const { data: existingUser } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .single();

    user.value = {
      email: existingUser.email,
      username: existingUser.username,
      id: existingUser.id,
    };
    clearErrorMessage();
  };

  //- handle signup
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

    clearErrorMessage();

    //- Actual sign in process
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

    const { data: newUser } = await supabase.from("users").select().eq("email", email).single();

    user.value = {
      id: newUser.id,
      email: newUser.email,
      username: newUser.username,
    };
  };

  const getUser = async () => {
    const { data } = await supabase.auth.getUser();

    if (data.user) {
      const { data: userWithEmail } = await supabase
        .from("users")
        .select()
        .eq("email", data.user.email)
        .single();

      user.value = {
        username: userWithEmail.username,
        email: userWithEmail.email,
        id: userWithEmail.id,
      };
    } else {
      console.error("User data is null");
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    user.value = null;
  };

  return {
    user,
    errorMessage,
    handleLogin,
    handleSignup,
    handleLogout,
    getUser,
    clearErrorMessage,
  };
});
