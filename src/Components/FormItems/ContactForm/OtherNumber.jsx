import React from "react";
import { 
    Form,
    Input,
    Space,
    InputNumber
} from 'antd';

export const OtherNumber = ({name, label}) => {

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
                    <InputNumber
                        size="large"
                        controls={false}
                        placeholder="Code"
                        style={{
                            width: '30%',
                        }}
                    />
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
                        size="large"
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