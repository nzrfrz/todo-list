import { Link } from "react-router-dom";
import {
    HomeOutlined,
    AreaChartOutlined
} from "@ant-design/icons";
import { 
    AiFillCode, 
    AiFillLayout
} from "react-icons/ai";
import { RxDot } from "react-icons/rx";
import { RiKnifeLine } from "react-icons/ri";

import { 
    Dashboard,
    ActivityDetail
} from "../Pages";

export const sidebarRouteList = [
    {
        key: "Dashboard",
        label: <Link to="/" >Dashboard</Link>,
        path: "/",
        isIndex: true,
        element: <Dashboard />,
        icon: <HomeOutlined />,
        children: [],
    },
    {
        key: "Activity Detail",
        label: <Link to="/activity_detail/:activityID" >Activity Detail</Link>,
        path: "/activity_detail/:activityID",
        isIndex: false,
        element: <ActivityDetail />,
        icon: <HomeOutlined />,
        children: [],
    },
];

export const otherRouteList = [];