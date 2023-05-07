import * as React from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

// import { GlobalContext } from "../../Context/GlobalContext";
import { GlobalContext } from "../../Context/GlobalContextCreate";
import { queryClientInstance } from "./queryService";
import { useNotification, notifMessage, useMessage } from "../../_helpers";
import { authRequest, prefetchData, useAxiosIntercept, usePrivateDataFetching } from "..";

export const useMutateData = ({
    actionType = undefined,
    mutateFn = () => {},
    refetchFN = () => {},
    queryKey = [],
    formProps = undefined,
    setIsModalFormOpen = undefined,
    setIsModalDeleteOpen = undefined,
    routePath = undefined
}) => {
    const navigateTo = useNavigate();
    const { setIsDarkMode, setAccessToken } = React.useContext(GlobalContext);
    // const globalContext = React.useContext(GlobalContext);

    // useAxiosIntercept();
    const { openNotif, destroyNotif } = useNotification();
    const { openMessage } = useMessage();

    // const destroyNotif = () => {
    //     setTimeout(() => {
    //         apiNotif.destroy();
    //     }, 2000);
    // };

    return useMutation({
        mutationFn: mutateFn,
        onMutate: () => {
            openNotif("info", "authorization", notifMessage(actionType).messageInit, notifMessage(actionType).descriptionInit);
        },
        onSuccess: async (data) => {
            const descriptionMessage = data?.message === undefined ? notifMessage(actionType).descriptionSuccess : data?.message;
            switch (true) {
                case actionType === "login":
                    setAccessToken(data?.data?.accessToken);
                    openNotif("success", "authorization", "Success", descriptionMessage);
                    navigateTo(routePath);

                    openMessage("loading", "syncData", "Syncing data...", 0);
                    await prefetchData();
                    openMessage("success", "syncData", "Data sync success", 2.5);

                    destroyNotif();
                    break;
                case actionType === "logout":
                    openNotif("success", "authorization", "Success", descriptionMessage);
                    setTimeout(() => {
                        localStorage.clear();
                        window.location.reload();
                    }, 1000);
                    break;
                case (actionType === "post" || actionType === "put" || actionType === "patch") && setIsModalFormOpen !== undefined:
                    await queryClientInstance.fetchQuery({
                        queryKey, 
                        queryFn: () => refetchFN()
                    });
                    await queryClientInstance.invalidateQueries(queryKey);
                    openNotif("success", "authorization", "Success", descriptionMessage);
                    setIsModalFormOpen(false);
                    destroyNotif();
                    if (formProps !== undefined) formProps?.resetFields();
                    break;
                case (actionType === "post" || actionType === "put" || actionType === "patch") && routePath !== undefined:
                    await queryClientInstance.fetchQuery({
                        queryKey, 
                        queryFn: () => refetchFN()
                    });
                    await queryClientInstance.invalidateQueries(queryKey);
                    openNotif("success", "authorization", "Success", descriptionMessage);
                    navigateTo(routePath);
                    destroyNotif();
                    break;
                case actionType === "post" || actionType === "put" || actionType === "patch":
                    await queryClientInstance.fetchQuery({
                        queryKey, 
                        queryFn: () => refetchFN()
                    });
                    await queryClientInstance.invalidateQueries(queryKey);
                    if (formProps !== undefined) formProps?.resetFields();
                    openNotif("success", "authorization", "Success", descriptionMessage);
                    destroyNotif();
                    break;
                case actionType === "delete" && setIsModalDeleteOpen !== undefined:
                    await queryClientInstance.fetchQuery({
                        queryKey, 
                        queryFn: () => refetchFN()
                    });
                    await queryClientInstance.invalidateQueries(queryKey);
                    openNotif("success", "authorization", "Success", descriptionMessage);
                    setIsModalDeleteOpen(false);
                    destroyNotif();
                    break;
                default:
                    break;
            }
        },
        onError: (error) => {
            // console.log("MUTATION ERROR: \n", error);
            destroyNotif();
        },
        retry: 1,
    });
};