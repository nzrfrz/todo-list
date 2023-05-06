import * as React from "react";
import { Outlet, Navigate } from "react-router-dom";

import { GlobalContext } from "../Context/GlobalContextCreate";
import { useAxiosIntercept } from "../_services";

export const PrivateRoute = () => {
    // const { accessToken } = React.useContext(GlobalContext);

    useAxiosIntercept();
    
    return (
        // accessToken ? <Outlet /> : <Navigate to={"/login"} replace />
        <Outlet />
    );
};