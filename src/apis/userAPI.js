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

//----- Delete a user
export const deleteUser = async userId => {
  const res = await api.request({
    method: "DELETE",
    data: { userId },
    url: "/api/user"
  });

  return res;
};