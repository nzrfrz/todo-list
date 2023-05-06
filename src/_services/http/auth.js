import { request, authRequest, privateRequest } from "../axiosInstance";

export const userLogin = async (payloadData) => {
    const { payload } = payloadData;
    const response = await request.post("/auth/v2/user/login/", payload);
    return response.data;
};

export const userLogout = async () => {
    const response = await privateRequest.post("/auth/v2/user/logout/");
    return response;
};

export const getAccessTokenV2 = async () => {
    const response = await authRequest.get("/auth/v2/access-token/generate/");
    console.log("GET ACCESS TOKEN:");
    return response.data;
};