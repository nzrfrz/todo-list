import * as React from "react";
import { useLocation } from "react-router-dom";
import { Breadcrumb } from "antd";

import { sidebarRouteList } from "./RouteRegistry";

import { toTitleCase } from "../_helpers";

export const BreadCrumb = () => {
    const location = useLocation();

    const breadCrumbData = React.useMemo(() => {
        const tempBreadcrumbData = location.pathname
            .replace(new RegExp("_", "g"), " ")
            .split("/")
            .filter((data) => data)
            .map((data) => toTitleCase(data));

        const data = tempBreadcrumbData.filter((data) => data.length >= 4).map((data) => {
            return {
                href: undefined,
                title: (
                    <div>
                        {sidebarRouteList.filter((routeItem) => routeItem.key === data).map((data) => data.icon)[0]}
                        <span> {data}</span>
                    </div>
                )
            }
        });

        // console.log(data);
        return data;
    }, [location])
    
    return (
        <Breadcrumb
            style={{
                display: "flex",
                marginTop: "12px",
                marginLeft: "16px",
            }}
            items={breadCrumbData}
        />
    );
};