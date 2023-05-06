import { sidebarRouteList } from "./RouteRegistry";

const setSidebarMenuItems = (label, key, icon, children) => {
    return { label, key, icon, children };
};

export const sidebarItems = () => {

    return sidebarRouteList.map((data) => {
        if (data.children.length === 0) {
            return (
                setSidebarMenuItems(
                    data.label, 
                    data.key, 
                    data.icon, 
                    null
                )
            )
        } else {
            return (
                setSidebarMenuItems(
                    data.label, 
                    data.key, 
                    data.icon, 
                    data.children.map((dataChildren) => 
                        setSidebarMenuItems(dataChildren.label, dataChildren.key, null, null),
                    )
                )
            )
        }
    })
};

export const sidebarItemKeys = sidebarRouteList.map((data) => data.key);