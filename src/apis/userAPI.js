import api from "./configs/axiosConfig";

//----- Retrieve all users
export const getAll = async () => {
  const res = await api.request({
    method: "GET",
    url: "/api/user"
  });

  return res;
};

//----- Retrieve single user
export const getOne = async id => {
  const res = await api.request({
    method: "POST",
    data: { id },
    url: "/api/user"
  });

  return res;
};

//----- Delete authenticated user
export const deleteUser = async () => {
  const res = await api.request({
    method: "DELETE",
    url: "/api/user"
  });

  return res;
};