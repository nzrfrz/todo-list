import * as React from "react";
import axios from "axios";

// import { GlobalContext } from "../Context/GlobalContext";
import { GlobalContext } from "../Context/GlobalContextCreate";
import { useNotification } from "../_helpers";

const basePath = import.meta.env.VITE_APP_BASE_PATH;
const localBasePath = import.meta.env.VITE_APP_LOCAL_BASE_PATH;

export const requestGeneral = axios.create({
    baseURL: basePath,
    timeout: 60000,
});

export const request = axios.create({
    baseURL: basePath,
    withCredentials: true,
    timeout: 60000,
});

export const authRequest = axios.create({
    baseURL: basePath,
    withCredentials: true,
    timeout: 60000,
});

export const privateRequest = axios.create({
    baseURL: basePath,
    withCredentials: true,
    timeout: 60000,
});

export const useAxiosIntercept = () => {
    const { accessToken, setAccessToken } = React.useContext(GlobalContext);
    const { destroyNotif, openNotif } = useNotification();
    // const globalContext = React.useContext(GlobalContext);

    privateRequest.interceptors.request.use(
        async (config) => {
            // console.log("REQ INSTANCE: ", config);
            // const token = await JSON.parse(localStorage.getItem("authentication"));
            if (!config.headers["Authorization"]) {
                config.headers["Authorization"] = `Bearer ${accessToken}`;
            }

            // actually this is the data returned after doing a request
            // either it success or error
            return config;
        },
        (error) => {
            // console.log("REQ INSTANCE ERROR: ", error);
            return Promise.reject(error);
        }
    );

    privateRequest.interceptors.response.use(
        (response) => {
            // console.log("AXIOS INSTACE RESPONSE: ", response);
            return response;
        },
        async (error) => {
            // console.warn("RESPONSE INTERCEPTORS ERROR: \n", error);
            openNotif("warning", "authorization", "Access Denied", "Requesting new access...");
            try {
                const getNewAccessToken = await authRequest.get("/auth/v2/access-token/generate/");
                setAccessToken(getNewAccessToken?.data?.data?.accessToken);
                openNotif("info", "authorization", "Access Granted", "New access receive");
                destroyNotif();
            } catch (error) {
                openNotif("info", "authorization", "Expired", "Your session has expired, redirecting to login...");
                setTimeout(() => {
                    localStorage.clear();
                    window.location.reload();
                }, 1000);
            }
            return Promise.reject(error);
        }
    );
};