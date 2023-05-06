import * as React from "react";
import { Outlet, Navigate } from "react-router-dom";

import { GlobalContext } from "../Context/GlobalContextCreate";

export const PublicRoute = () => {
    const { accessToken } = React.useContext(GlobalContext);

    return (
        accessToken ? <Navigate to={"/dashboard"} replace /> : <Outlet />
    );
};