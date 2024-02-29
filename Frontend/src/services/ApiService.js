export async function ApiService(url, params = { headers: {} }) {
    const refreshToken = window.localStorage.getItem("refresh");
    const accessToken = window.localStorage.getItem("access");
    const newParams = {
      ...params,
    };
    if (accessToken) {
      newParams.headers.Authorization = `Bearer ${accessToken}`;
    }
    const response = await fetch(`http://127.0.0.1:8000/api/${url}`, newParams);
    let data = null;
    if (response.status === 401 && refreshToken) {
      const refreshData = await fetch(
        `http://127.0.0.1:8000/api/token/refresh/`,
        {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            refresh: refreshToken,
          }),
        }
      );
      const { access } = await refreshData.json();
      window.localStorage.setItem("access", access);
  
      newParams.headers.Authorization = `Bearer ${access}`;
      const newresponse = await fetch(
        `http://127.0.0.1:8000/api/${url}`,
        newParams
      );
      data = await newresponse.json();
    } else {
      data = await response.json();
    }
  
    return data;
  }
  