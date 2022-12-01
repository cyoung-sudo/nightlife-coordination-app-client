import api from "./configs/axiosConfig";

//----- Search for businesses
export const search = async (category, location) => {
  const res = await api.request({
    method: "post",
    data: {
      category,
      location
    },
    url: "/api/business/search"
  });

  return res;
};