import * as React from "react";
import { GlobalContext } from "../../Context/GlobalContextCreate";

import { theme } from "antd";
import Chart from "react-apexcharts";

import { defaultOptions } from "./defaultOptions";

export const LineChart = ({curveType = "stright", showMarker = false, showArea = false, data}) => {
    const { isDarkMode } = React.useContext(GlobalContext);

    const {
        token: { 
            fontFamily,
        },
    } = theme.useToken();

    const lineOptions = {
        ...defaultOptions(isDarkMode),
        chart: {
            fontFamily: fontFamily,
            background: "transparent",
            toolbar: {
                show: true,
            },
            zoom: {
                enabled: true
            }
        },
        title: {
            text: data?.chartTitle,
            align: 'left',
            style: {
                fontSize: "18px"
            }
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: curveType
        },
        markers: {
            size: showMarker === true ? 5 : 0,
            colors: undefined,
            strokeColors: '#fff',
            strokeWidth: 2,
            strokeOpacity: 0.9,
            strokeDashArray: 0,
            fillOpacity: 1,
            discrete: [],
            shape: "circle",
            radius: 2,
            offsetX: 0,
            offsetY: 0,
            onClick: undefined,
            onDblClick: undefined,
            showNullDataPoints: true,
            hover: {
                size: undefined,
                sizeOffset: showMarker === true ? 3 : 7
            }
        },
        xaxis: {
            categories: data.xAxisCategories,
            type: "",
            labels: {
                show: true,
                rotate: -35,
                rotateAlways: false,
            }
        },
    };

    return (
        <Chart 
            type={showArea ? "area" : "line"}
            options={lineOptions}
            series={data?.data}
            height={"100%"}
        />
    )
};