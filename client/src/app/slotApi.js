const BASE_URL = "https://napi.ar7mm.com/api/"; //

export const fetchDataSlot = async (api) => {
  try {
    const response = await fetch(`${BASE_URL}${api}`);
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error("Error fetching data");
  }
};
