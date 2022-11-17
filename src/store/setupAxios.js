import notification from "utilities/notification";

const setupAxios = (axios, store) => {
    axios.interceptors.request.use(
        config => {
            const { auth, shop } = store.getState()
            const accessToken = auth?.accessToken;
            const shopToken = shop?.token

            config.baseURL = process.env.REACT_APP_API_BASE_URL;
            config.headers["Content-Type"] = "application/json"
            config.headers["Accept"] = "application/json"

            if (accessToken) {
                config.headers["Authorization"] = `Bearer ${accessToken}`
            }

            if (shopToken) {
                config.headers["X-Shop-Key"] = `${shopToken}`
            }

            return config;
        },
        error => Promise.reject(error)
    );

    axios.interceptors.response.use(
        response => response,
        error => {
            const errorMessage = error?.response?.data?.message || error?.message || 'Something went wrong'
            return notification('error', errorMessage)
        });

    // return axios

}

export default setupAxios;