import { defineStore } from "pinia";
import { ref } from "vue";
import api from "@/Api";

export const useAuthStore = defineStore("auth", () => {
  const user = ref({});
  const isLogin = ref(false);
  const message = ref("");

  const loginUser = async ({ email, password }) => {
    try {
      const response = await api.post("/login", {
        email: email,
        password: password,
      });
      user.value = response.data;
      isLogin.value = true;
    } catch (err) {
      isLogin.value = false;
      message.value = err.message;
    }
  };

  const userInfo = async () => {
    try {
      const response = await api.get("/me");
      user.value = response.data;
      isLogin.value = true;
    } catch (err) {
      isLogin.value = false;
      console.log({ msg: err.message });
    }
  };

  const logoutUser = async () => {
    try {
      const response = await api.delete("/logout");
      isLogin.value = false;
    } catch (err) {
      isLogin.value = true;
      console.log({ msg: err.message });
    }
  };

  return { user, isLogin, message, loginUser, userInfo, logoutUser };
});
