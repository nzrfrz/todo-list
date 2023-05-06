import React from "react";
import { 
    Form,
    Input,
} from 'antd';

export const AddressForm = ({name, label, requiredMark = true}) => {
    return (
        <Form.Item
            name={name}
            label={label}
            required={requiredMark}
            rules={[
                {
                    required: true,
                    message: `${label} can not be empty`
                }
            ]}
        >
            <Input.TextArea 
                placeholder="Input Address"
                autoSize={{
                    minRows: 2
                }}
            />
        </Form.Item>
    );
};