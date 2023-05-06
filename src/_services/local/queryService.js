import * as React from "react";
import { QueryClient, useQuery } from "@tanstack/react-query";
// import { GlobalContext } from "../../Context/GlobalContext";
import { GlobalContext } from "../../Context/GlobalContextCreate";

import { authRequest } from "../axiosInstance";
import { useNotification } from "../../_helpers";
import { useAxiosIntercept } from "../axiosInstance";

export const queryClientInstance = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
        }
    }
});

export const useQueryData = ({queryKey, queryFn, isEnableFetch, refetchInterval, ...rest}) => {
    // const globalContext = React.useContext(GlobalContext);

    // useAxiosIntercept();
    const { destroyNotif } = useNotification();

    // const destroyNotif = () => {
    //     setTimeout(() => {
    //         apiNotif.destroy();
    //     }, 2000);
    // };

    return useQuery({
        queryKey: queryKey,
        queryFn: () => queryFn,
        enabled: isEnableFetch,
        // staleTime: 10 * (60 * 1000),
        refetchInterval: refetchInterval,
        ...rest,
        onSuccess: (results) => {
            // console.log("USE QUERY DATA SUCCESS: \n", results);
            destroyNotif();
        },
        onError: (error) => {
            // console.log("USE QUERY DATA ERROR: \n", error);
            destroyNotif();
        },
        retry: 1,
    });
};