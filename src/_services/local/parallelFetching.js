import * as React from "react";
import { GlobalContext } from "../../Context/GlobalContextCreate";
import { queryClientInstance } from "./queryService";

import { useAxiosIntercept } from "../axiosInstance";
import { 
    getDialCode,
    getIndonesiaRegionData, 

    getMedicines, 
    getMedicinesPaginated,
} from "../http";
import { useNotification } from "../../_helpers";

export const usePrivateDataFetching = async () => {
    useAxiosIntercept();
    const { accessToken } = React.useContext(GlobalContext);

    const { apiNotif, openNotif } = useNotification();

    const [initDataFetch, setInitDataFetch] = React.useState(true);

    const destroyNotif = () => {
        setTimeout(() => {
            apiNotif.destroy();
        }, 2000);
    };
    // console.log(initDataFetch);

    React.useEffect(() => {
        if (initDataFetch === true && accessToken !== undefined) {
            (async () => {
                console.log("INITIAL FETCHING");
                openNotif("info", "authorization", undefined, "Loading data...");

                // master data pre-fetch
                await queryClientInstance.prefetchQuery(["indonesiaRegionData"], getIndonesiaRegionData);
                await queryClientInstance.prefetchQuery(["phoneDialCode"], getDialCode);

                // private data pre-fetch
                await queryClientInstance.prefetchQuery({
                    queryKey: ["medicinesAll"],
                    queryFn: getMedicines,
                });

                openNotif("success", "authorization", undefined, "Loading data finished...");
                setInitDataFetch(false);
            })();
        }
        else if (initDataFetch === false) {
            destroyNotif();
        }
    }, [initDataFetch, accessToken]);
};

export const prefetchData = async () => {
    // master data pre-fetch
    await queryClientInstance.prefetchQuery(["indonesiaRegionData"], getIndonesiaRegionData);
    await queryClientInstance.prefetchQuery(["phoneDialCode"], getDialCode);

    // private data pre-fetch
    await queryClientInstance.prefetchQuery({
        queryKey: ["medicinesAll"],
        queryFn: getMedicines,
    });
    await queryClientInstance.prefetchQuery({
        queryKey: ["medicines", 10, 1, ""],
        queryFn: () => getMedicinesPaginated(10, 1, ""),
    });
};