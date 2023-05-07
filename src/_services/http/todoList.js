import { requestGeneral } from "../axiosInstance";

export const activityGetAll = async () => {
    const response = await requestGeneral.get("/activity-groups?email=nzr.frz@gmail.com");
    return response.data;
};

export const activityGetOne = async (activityID) => {
    // console.log(activityID);
    const response = await requestGeneral.get(`/activity-groups/${activityID}`);
    return response.data;
};

export const activityPost = async (args) => {
    const response = await requestGeneral.post("/activity-groups", args?.payload);
    // console.log(args?.payload);
    return response.data;
};

export const activityPatch = async (args) => {
    const response = await requestGeneral.patch(`/activity-groups/${args?.activityID}`, args?.payload);
    // console.log(args?.payload);
    return response.data;
};

export const activityDelete = async (args) => {
    const response = await requestGeneral.delete(`/activity-groups/${args?.param}`);
    // console.log(args);
    return response.data;
};



export const todoListGetAll = async (activityID, filterType) => {
    const response = await requestGeneral.get(`/todo-items?activity_group_id=${activityID}`);

    switch (filterType) {
        case "newest":
            return response.data;
        case "oldest":
            return {
                ...response.data,
                data: response.data.data.reverse()
            };
        case "ascending":
            return {
                ...response.data,
                data: response.data.data?.sort((a, b) => 
                    a.title.charAt(0).toLowerCase() < b.title.charAt(0).toLowerCase() ? -1 : 1
                )
            };
        case "descending":
            return {
                ...response.data,
                data: response.data.data?.sort((a, b) => 
                    a.title.charAt(0).toLowerCase() < b.title.charAt(0).toLowerCase() ? 1 : -1
                )
            };
        case "notFinished":
            return {
                ...response.data,
                data: response.data.data?.sort((a, b) => { return a.is_active - b.is_active })
            };
        default:
            break;
    }
}

export const todoListPost = async (args) => {
    const response = await requestGeneral.post(`/todo-items`, args?.payload);
    return response.data;
}

export const todoListPatch = async (args) => {
    const response = await requestGeneral.patch(`/todo-items/${args?.payload?.id || args?.param}`, args?.payload);
    return response.data;
}

export const todoListDelete = async (args) => {
    const response = await requestGeneral.delete(`/todo-items/${args?.param}`);
    return response.data;
}