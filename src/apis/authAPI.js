import api from "./configs/axiosConfig";

//----- Signup new user
export const signup = async (username, password) => {
  const res = await api.request({
    method: "post",
    data: {
      username,
      password
    },
    url: "/api/auth/signup"
  });

  return res;
};

//----- Login existing user
export const login = async (username, password) => {
  const res = await api.request({
    method: "POST",
    data: {
      username,
      password
    },
    url: "/api/auth/login"
  });

  return res;
};