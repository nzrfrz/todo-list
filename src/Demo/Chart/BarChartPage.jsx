import * as React from "react";
import dayjs from "dayjs";
import { GlobalContext } from "../../Context/GlobalContextCreate";

import { 
    Select,
    Checkbox,
    Typography 
} from "antd";

import barSingle from "../../assets/data/barSeriesSingle.json";
import barStacked from "../../assets/data/barSeriesStacked.json";
import barRanged from "../../assets/data/barSeriesRanged.json";

export const BarChartPage = () => {
    return (
        <div className="fix-height-content-chart" >
            <div className="page-content" >
                <div className="page-content-title-container" >
                    <div className="input-field-container">
                        <Text>Curve Type</Text>
                        <Select
                            size="large"
                            placeholder="Select Curve"
                            // defaultValue={curveType}
                            style={{ width: 150 }}
                            onChange={(e) => {
                                // setCurveType(e);
                            }}
                            options={[
                                { value: 'smooth', label: 'Smooth' },
                                { value: 'straight', label: 'Straight' },
                                { value: 'stepline', label: 'Step Line' },
                            ]}
                        />
                    </div>
                    <div className="input-field-container">
                        <Text>Series Type</Text>
                        <Select
                            size="large"
                            placeholder="Select Series"
                            // defaultValue={seriesType}
                            style={{ width: 150 }}
                            onChange={(e) => {
                                // setSeriesType(e);
                            }}
                            options={[
                                { value: 'single', label: 'Single' },
                                { value: 'multiple', label: 'Multiple' },
                            ]}
                        />
                    </div>
                    <Checkbox 
                        style={{
                            alignSelf: "flex-end",
                        }}
                        onChange={(e) => {
                            // setShowMarker(e.target.checked);
                        }}
                    >
                        Show Marker
                    </Checkbox>
                    <Checkbox 
                        style={{
                            alignSelf: "flex-end",
                        }}
                        onChange={(e) => {
                            // setShowArea(e.target.checked);
                        }}
                    >
                        Show Area
                    </Checkbox>
                </div>
                <div 
                    className="page-content-container"
                    style={{
                        height: `${windowDimension.height - 340}px`,
                        "--fixChartHeight": `${windowDimension.height - 340}px`
                    }}
                >
                    {/* <LineChart 
                        curveType={curveType}
                        showMarker={showMarker}
                        showArea={showArea}
                        data={seriesData}
                    /> */}
                </div>
            </div>
        </div>
    );
};