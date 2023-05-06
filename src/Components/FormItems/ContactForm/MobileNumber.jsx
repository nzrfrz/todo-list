import React from "react";
import { 
    Form,
    Space,
    Select,
    InputNumber,
} from 'antd';

import { queryClientInstance, useQueryData } from "../../../_services";
import { ReactCountryFlag } from "react-country-flag"
import { getDialCode } from "../../../_services/http";

const { Option } = Select;

export const MobileNumber = ({name, label}) => {

    const fetchedData = queryClientInstance.getQueryState(["phoneDialCode"]);
    const dialCode = fetchedData?.data;
    useQueryData({
        queryKey: ["phoneDialCode"],
        queryFn: dialCode === undefined ? getDialCode() : null,
        isEnableFetch: dialCode === undefined ? true : false,
        refetchInterval: dialCode === undefined ? 500 : false,
    });

    return (
        <Form.Item
            label={label}
            required={true}
        >
            <Space.Compact size="large" style={{ width: "100%" }}>
                <Form.Item
                    name={[name, 'areaCode']}
                    noStyle
                    rules={[
                        {
                            required: true,
                            message: "",
                        },
                    ]}
                >
                    <Select 
                        showSearch
                        allowClear
                        placeholder="Code"
                        style={{
                            width: '30%',
                        }}
                    >
                        {
                            dialCode?.map((data, index) => 
                                <Option key={index} value={data.dial_code} >
                                    <ReactCountryFlag
                                        svg
                                        countryCode={data.code}
                                        aria-label={data.name}
                                    />
                                    &nbsp;&nbsp;
                                    {data.dial_code}
                                </Option>
                            )
                        }
                    </Select>
                </Form.Item>
                <Form.Item
                    noStyle
                    name={[name, 'phoneNumber']}
                    rules={[
                        {
                            required: true,
                            message: `Area Code or ${label} can not be empty`,
                        },
                    ]}
                >
                    <InputNumber
                        controls={false}
                        placeholder={`Input ${label}`}
                        style={{
                            width: '70%',
                        }}
                    />
                </Form.Item>
            </Space.Compact>
        </Form.Item>
    );
};