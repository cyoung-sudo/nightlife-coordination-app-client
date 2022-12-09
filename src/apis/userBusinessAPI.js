import api from "./configs/axiosConfig";

//----- Add new user-business
export const create = async (userId, businessId) => {
  const res = await api.request({
    method: "POST",
    data: {
      userId,
      businessId
    },
    url: "/api/userBusiness"
  });

  return res;
};

//----- Retrieve user-businesses for given user
export const getForUser = async userId => {
  const res = await api.request({
    method: "POST",
    data: { userId },
    url: "/api/userBusiness/user"
  });

  return res;
};