import React from "react";
import { 
    Form,
    Select,
} from 'antd';

export const GenderSelectForm = ({requiredMark = true}) => {
    return (
        <Form.Item
            name="gender" 
            label="Gender"
            required={requiredMark}
            rules={[
                {
                    required: true,
                    message: "Gender can not be empty"
                }
            ]}
        >
            <Select
                size="large"
                placeholder="Select Gender"
            >
                <Select.Option value="male">Male</Select.Option>
                <Select.Option value="female">Female</Select.Option>
            </Select>
        </Form.Item>
    );
};