const BASE_URL = "https://admin-backend-udjq.onrender.com/api/v1/";

export const fetchData = async (api) => {
  try {
    const response = await fetch(`${BASE_URL}${api}`);
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error("Error fetching data");
  }
};

export const postDatas = async (api, postData) => {
  try {
    const response = await fetch(`${BASE_URL}${api}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error("Error posting data");
  }
};

export const patchDatas = async (api, patchData, accessToken) => {
  try {
    const response = await fetch(`${BASE_URL}${api}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(patchData), // The data you want to update
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
    throw new Error("Something went wrong while making the PATCH request");
  }
};

export const fetchDataWithToken = async (api, accessToken) => {
  try {
    const response = await fetch(`${BASE_URL}${api}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error("Error fetching data: " + error.message);
  }
};
