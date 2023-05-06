import { privateRequest } from "../axiosInstance";

export const getMedicines = async () => {
    const response = await privateRequest.get(`/playground/medicines/`);
    console.log("GET MEDICINES");
    return response.data;
};

export const getMedicinesPaginated = async (limitPerPage, page, querySearch) => {
    const response = await privateRequest.get(`/playground/medicines/?limit=${limitPerPage}&page=${page}&per_page=${limitPerPage}&q=${querySearch}`);
    console.log("GET PAGINATED MEDICINES");
    return response.data;
};

export const postMedicines = async (args) => {
    const response = await privateRequest.post("/playground/medicine/add/", args?.payload);
    return response;
};

export const putMedicines = async (args) => {
    const response = await privateRequest.put(`/playground/medicine/edit=${args?.dataID}/`, args?.payload);
    return response;
};

export const deleteMedicines = async (args) => {
    const response = await privateRequest.delete(`/playground/medicine/delete=${args}/`);
    return response;
};