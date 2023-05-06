import * as React from "react";

import { 
    Typography,
    Form,
    InputNumber,
} from 'antd';

const { Text } = Typography;

export const ContractPrice = ({field, lastContainerWidth}) => {

    return (
        <>
        <Form.Item
            labelCol={{ span: lastContainerWidth >= 500 ? 12 : 0 }}
            wrapperCol={{ span: lastContainerWidth >= 500 ? 8 : 0 }}
            label={lastContainerWidth >= 500 ? "Price" : ""}
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
                    <Text>Price :</Text>
                </Form.Item>
            }
            {/* custom label */}

            <Form.Item
                {...field}
                key={field.key}
                name={[field.name, "price"]}
                style={lastContainerWidth >= 500 ? {} : { display: 'inline-block', width: '60%' }}
                rules={[
                    {
                        required: true,
                        message: "Price can not be empty"
                    }
                ]}
            >
                <InputNumber
                    controls={false}
                    addonBefore="$"
                    size="large"
                    placeholder="Input Price"
                    formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                    style={{
                        width: "100%"
                    }}
                />
            </Form.Item>
        </Form.Item>
        </>
    );
};