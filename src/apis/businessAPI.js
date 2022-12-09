import api from "./configs/axiosConfig";

//----- Search for businesses
export const search = async (term, location, price, open) => {
  const res = await api.request({
    method: "POST",
    data: {
      term,
      location,
      price,
      open
    },
    url: "/api/business/search"
  });

  return res;
};

//----- Retrieve businesses for given business-id's
export const getBusinesses = async userBusinesses => {
  const res = await api.request({
    method: "POST",
    data: { userBusinesses },
    url: "/api/business/getBusinesses"
  });

  return res;
};