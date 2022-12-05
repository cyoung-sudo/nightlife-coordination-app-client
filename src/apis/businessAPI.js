import api from "./configs/axiosConfig";

//----- Search for businesses
export const search = async (term, location, price, open) => {
  const res = await api.request({
    method: "post",
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