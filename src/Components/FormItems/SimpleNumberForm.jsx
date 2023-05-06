import React from "react";
import { 
    Form,
    InputNumber,
} from 'antd';

export const SimpleNumberForm = ({name, label, requiredMark = true}) => {
    return (
        <Form.Item
            required={requiredMark}
            name={name}
            label={label}
            rules={[
                {
                    required: true,
                    message: `${label} can not be empty`
                }
            ]}
        >
            <InputNumber
                size="large"
                controls={false}
                placeholder={`Input ${label}`}
                style={{
                    width: '100%',
                }}
            />
        </Form.Item>
    );
};