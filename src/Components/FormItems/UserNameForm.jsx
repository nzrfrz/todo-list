import React from "react";
import { 
    Form,
    Input,
} from 'antd';

export const UserNameForm = ({requiredMark = true}) => {

    return (
        <Form.Item
            name="userName"
            label="User Name"
            required={requiredMark}
            rules={[
                {
                    min: 6,
                    message: "User Name should be more than 6"
                },
                {
                    required: true,
                    message: "User Name can not be empty"
                }
            ]}
        >
            <Input 
                size="large"
                placeholder="Input User Name"
            />
        </Form.Item>
    );
};