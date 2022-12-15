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

//----- Delete given user-business
export const deleteUserBusiness = async (userId, businessId) => {
  const res = await api.request({
    method: "DELETE",
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

//----- Delete user-businesses for authenticated user
export const deleteForUser = async () => {
  const res = await api.request({
    method: "DELETE",
    url: "/api/userBusiness/user"
  });

  return res;
};