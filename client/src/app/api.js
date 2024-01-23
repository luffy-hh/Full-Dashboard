const BASE_URL = "https://gamevegas.online/api/v1/"; //
const SLOT_URL = "https://napi.ar7mm.com/api/";

export const fetchData = async (api) => {
  try {
    const response = await fetch(`${BASE_URL}${api}`);
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error("Error fetching data");
  }
};

export const fetchDataSlot = async (api, accessToken) => {
  try {
    const response = await fetch(`${SLOT_URL}${api}`, {
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

export const postDataWithToken = async (api, postData, accessToken) => {
  try {
    const response = await fetch(`${BASE_URL}${api}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
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

export const putDatas = async (api, patchData, accessToken) => {
  try {
    const response = await fetch(`${BASE_URL}${api}`, {
      method: "PUT",
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

export const fetchDataWithID = async (api, idData, accessToken) => {
  try {
    const response = await fetch(`${BASE_URL}${api}/${idData}`, {
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

export const postDataWithImg = async (api, formData, accessToken) => {
  try {
    const response = await fetch(`${BASE_URL}${api}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: formData,
    });
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error("Error posting data");
  }
};
