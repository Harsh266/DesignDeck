const api = axios.create({
    baseURL: "http://localhost:5000/",
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
    withCredentials: true,  // Add this to include cookies by default
});
