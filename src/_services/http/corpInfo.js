import { privateRequest } from "../axiosInstance";

export const getAllCorpInfo = async () => {
    const response = await privateRequest.get("/playground/corporate/");
    // console.log("CORP INFO ALL: ", response.data.data);
    return response.data;
};

export const postCorpInfo = async (args) => {
    const response = await privateRequest.post("/playground/corporate/add/", args?.payload);
    // console.log("CORP INFO ALL: ", response.data.data);
    return response.data;
};

export const putCorpInfo = async (args) => {
    // console.log(args?.payload, args?.dataID);
    const response = await privateRequest.put(`/playground/corporate/edit=${args?.dataID}/`, args?.payload);
    return response;
};

export const deleteCorpInfo = async (args) => {
    // console.log(args);
    const response = await privateRequest.delete(`/playground/corporate/delete=${args}/`);
    return response;
};