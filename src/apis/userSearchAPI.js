import api from "./configs/axiosConfig";

//----- Add new user-search
export const create = async (userId, term, location, price, open) => {
  const res = await api.request({
    method: "POST",
    data: {
      userId,
      term,
      location,
      price,
      open
    },
    url: "/api/userSearch"
  });

  return res;
};

//----- Retrieve user-search for given user
export const getForUser = async userId => {
  const res = await api.request({
    method: "POST",
    data: { userId },
    url: "/api/userSearch/user"
  });

  return res;
};

//----- Delete user-search for user
export const deleteForUser = async userId => {
  const res = await api.request({
    method: "DELETE",
    data: { userId },
    url: "/api/userSearch/user"
  });

  return res;
};