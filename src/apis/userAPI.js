import api from "./configs/axiosConfig";

//----- Retrieve single user
export const getOne = async id => {
  const res = await api.request({
    method: "post",
    data: { id },
    url: "/api/user"
  });

  return res;
};