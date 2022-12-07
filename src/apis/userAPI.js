import api from "./configs/axiosConfig";

//----- Retrieve all users
export const getAll = async () => {
  const res = await api.request({
    method: "get",
    url: "/api/user"
  });

  return res;
};

//----- Retrieve single user
export const getOne = async id => {
  const res = await api.request({
    method: "post",
    data: { id },
    url: "/api/user"
  });

  return res;
};