import * as React from "react";

import { 
    Typography,
    Form,
    Select,
} from 'antd';

const { Text } = Typography;

const effectiveDateOptions = [
    {
        // name: "Sesuai Tanggal Aktif Kontrak",
        name: "On Contract Active Date",
        value: "general"
    },
    {
        // name: "Kontrak Khusus",
        name: "Specific Contract",
        value: "specific"
    }
];

export const ContractType = ({index, formProps, field, lastContainerWidth}) => {
    const contractActiveDateValue = Form.useWatch('contractActiveDate', formProps);
    const channelDealsValue = Form.useWatch('channelDeals', formProps);

    const poolChannelDeals = (e, index) => {
        const list = [...channelDealsValue];
        list[index] = {
            ...list[index],
            platform: channelDealsValue[index].platform,
            price: channelDealsValue[index].price,
            contractType: e,
            specificDate: e === "general" ? [...contractActiveDateValue] : undefined
        }

        formProps.setFieldsValue(
            {
                channelDeals: [...list]
            }
        );
    };

    return (
        <>
        <Form.Item
            labelCol={{ span: lastContainerWidth >= 500 ? 12 : 0 }}
            wrapperCol={{ span: lastContainerWidth >= 500 ? 8 : 0 }}
            label={lastContainerWidth >= 500 ? "Contract Type" : ""}
            style={{ 
                marginBottom: 0,
            }}
        >
            {/* custom label */}
            {
                lastContainerWidth <= 500 &&
                <Form.Item 
                    style={{ display: 'inline-block', width: '40%', paddingRight: "5px", textAlign: "end" }}
                >
                    <Text>Contract Type :</Text>
                </Form.Item>
            }
            {/* custom label */}

            <Form.Item
                {...field}
                key={field.key}
                name={[field.name, "contractType"]}
                style={lastContainerWidth >= 500 ? {} : { display: 'inline-block', width: '60%' }}
            >
                <Select
                    showSearch
                    allowClear
                    size="large"
                    placeholder="Select Contract Type"
                    style={{
                        width: "100%"
                    }}
                    onChange={(e) => {
                        poolChannelDeals(e, index);
                    }}
                >
                    {
                        effectiveDateOptions.map((data, index) => 
                            <Select.Option key={index} value={data.value} >{data.name}</Select.Option>
                        )
                    }
                </Select>
            </Form.Item>
        </Form.Item>
        </>
    );
};