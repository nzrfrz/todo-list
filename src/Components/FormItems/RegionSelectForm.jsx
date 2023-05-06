import React, { useEffect, useMemo, useState } from "react";

import { 
    Form,
    Select
} from 'antd';

import { queryClientInstance, useQueryData } from "../../_services";
import { getIndonesiaRegionData } from "../../_services/http";

export const RegionSelectForm = ({formProps, name, fullRegion, disabled, selectedLatLong = undefined}) => {
    const [selectedProvince, setSelectedProvince] = useState(undefined);
    const [selectedRegency, setSelectedRegency] = useState(undefined);
    const [selectedSubDistrict, setSelectedSubDistrict] = useState(undefined);
    const [selectedVilage, setSelectedVillage] = useState(undefined);

    const fetchedData = queryClientInstance.getQueryState(["indonesiaRegionData"]);
    const data = fetchedData?.data;
    useQueryData({
        queryKey: ["indonesiaRegionData"],
        queryFn: data === undefined ? getIndonesiaRegionData() : null,
        isEnableFetch: data === undefined ? true : false,
        refetchInterval: data === undefined ? 500 : false,
    });

    const formName = useMemo(() => {
        const provinceName = name === undefined ? "province" : `${name}Province`;
        const regencyName = name === undefined ? "regency" : `${name}Regency`;
        const subDistrictName = name === undefined ? "subDistrict" : `${name}SubDistrict`;
        const villageName = name === undefined ? "village" : `${name}Village`;

        return {
            provinceName,
            regencyName,
            subDistrictName,
            villageName
        }
    }, [name]);

    const provinceData = useMemo(() => {
        if (data !== undefined) {
            return data.filter((data) => data.type === "Provinsi")
                        .map((dataProvince) => {
                            return {
                                value: dataProvince.name,
                                label: dataProvince.name,
                                code: dataProvince.kode,
                                type: dataProvince.type,
                            }
                        });
        }
    }, [data]);

    const regencyData = useMemo(() => {
        if (selectedProvince !== undefined) {
            return data.filter((data) => data.kodeProvinsi === selectedProvince)
                    .map((dataRegency) => {
                        return {
                            value: dataRegency.name,
                            label: dataRegency.name,
                            code: dataRegency.kode,
                            type: dataRegency.type,
                        }
                    });
        }
    }, [selectedProvince]);

    const subDistrictData = useMemo(() => {
        if (selectedRegency !== undefined) {
            return data.filter((data) => data.kodeKabupaten === selectedRegency)
                    .map((dataSubDistrict) => {
                        return {
                            value: dataSubDistrict.name,
                            label: dataSubDistrict.name,
                            code: dataSubDistrict.kode,
                            type: dataSubDistrict.type,
                        }
                    });
        }
    }, [selectedRegency]);

    const villageData = useMemo(() => {
        if (selectedSubDistrict !== undefined) {
            return data.filter((data) => data.kodeKecamatan === selectedSubDistrict)
                    .map((dataVillage) => {
                        return {
                            value: dataVillage.name,
                            label: dataVillage.name,
                            code: dataVillage.kode,
                            type: dataVillage.type,
                        }
                    });
        }
    }, [selectedSubDistrict]);

    useEffect(() => {
        if (selectedLatLong !== undefined) {
            selectedLatLong("ABCD");
        }
        return;
    }, [selectedProvince, selectedRegency, selectedSubDistrict, selectedVilage]);

    return (
        <>
        <Form.Item
            name={formName.provinceName}
            label="Province"
            rules={[
                {
                    required: true,
                    message: "Province can not be empty"
                }
            ]}
        >
            <Select
                showSearch
                allowClear
                size="large"
                loading={data?.fetchStatus === "fetching" ? true : false}
                disabled={data?.fetchStatus === "fetching" || disabled ? true : false}
                options={provinceData}
                placeholder="Select Province"
                optionFilterProp="children"
                filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
                onClear={() => {
                    formProps.resetFields(["regency"]);
                    formProps.resetFields(["subDistrict"]);
                    formProps.resetFields(["village"]);
                    setSelectedProvince(undefined);
                    setSelectedRegency(undefined);
                    setSelectedSubDistrict(undefined);
                }}
                onChange={(value, data) => {
                    setSelectedProvince(data?.code);
                }}
            />
        </Form.Item>

        {
            fullRegion === false ?
            null
            :
            <>
            {/* regency */}
            <Form.Item
                noStyle
                shouldUpdate={(prevValues, currentValues) => prevValues.province !== currentValues.province}
            >
                {
                    (({getFieldValue}) => 
                        getFieldValue(formName.provinceName) !== undefined ?
                        <Form.Item
                            name={formName.regencyName}
                            label="Regency"
                            rules={[
                                {
                                    required: true,
                                    message: "Regency can not be empty"
                                }
                            ]}
                        >
                            <Select
                                showSearch
                                allowClear
                                size="large"
                                options={regencyData}
                                placeholder="Select Regency"
                                optionFilterProp="children"
                                disabled={data?.fetchStatus === "fetching" || disabled ? true : false}
                                filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
                                onClear={() => {
                                    formProps.resetFields(["subDistrict"]);
                                    formProps.resetFields(["village"]);
                                    setSelectedRegency(undefined);
                                }}
                                onChange={(value, data) => {
                                    setSelectedRegency(data?.code);
                                }}
                            />
                        </Form.Item>
                        :
                        null
                    )
                }
            </Form.Item>
            {/* regency */}
    
            {/* sub district */}
            <Form.Item
                noStyle
                shouldUpdate={(prevValues, currentValues) => prevValues.regency !== currentValues.regency}
            >
                {
                    (({getFieldValue}) => 
                        getFieldValue(formName.regencyName) !== undefined ?
                        <Form.Item
                            name={formName.subDistrictName}
                            label="Sub District"
                            rules={[
                                {
                                    required: true,
                                    message: "Sub District can not be empty"
                                }
                            ]}
                        >
                            <Select
                                showSearch
                                allowClear
                                size="large"
                                options={subDistrictData}
                                placeholder="Select Sub District"
                                optionFilterProp="children"
                                disabled={data?.fetchStatus === "fetching" || disabled ? true : false}
                                filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
                                onClear={() => {
                                    formProps.resetFields(["village"]);
                                    setSelectedSubDistrict(undefined);
                                }}
                                onChange={(value, data) => {
                                    setSelectedSubDistrict(data?.code);
                                }}
                            />
                        </Form.Item>
                        :
                        null
                    )
                }
            </Form.Item>
            {/* sub district */}
    
            {/* village */}
            <Form.Item
                noStyle
                shouldUpdate={(prevValues, currentValues) => prevValues.subDistrict !== currentValues.subDistrict}
            >
                {
                    (({getFieldValue}) => 
                        getFieldValue(formName.subDistrictName) !== undefined ?
                        <Form.Item
                            name={formName.villageName}
                            label="Village"
                            rules={[
                                {
                                    required: true,
                                    message: "Village can not be empty"
                                }
                            ]}
                        >
                            <Select
                                showSearch
                                allowClear
                                size="large"
                                options={villageData}
                                placeholder="Select Village"
                                optionFilterProp="children"
                                disabled={data?.fetchStatus === "fetching" || disabled ? true : false}
                                filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
                                onChange={(value, data) => {
                                    setSelectedVillage(data?.code);
                                }}
                            />
                        </Form.Item>
                        :
                        null
                    )
                }
            </Form.Item>
            {/* village */}
            </>
        }
        </>
    );
};