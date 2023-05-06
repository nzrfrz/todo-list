import React from "react";
import { 
    theme,
    Layout, 
    Menu, 
    Typography, 
    Breadcrumb, 
    Dropdown,
    Button,
    Divider,
    Form,
    Input,
} from 'antd';
const { Text, Title } = Typography;

export const EmailForm = ({name, label, requiredMark = true}) => {
    
    return (
        <Form.Item
            name={name}
            label={label}
            required={requiredMark}
            rules={[
                {
                    type: 'email',
                    message: 'The input is not valid E-mail!',
                },
                {
                    required: true,
                    message: 'Please input your E-mail!',
                },
            ]}
        >
            <Input 
                size="large"
                placeholder="Input Email"
            />
        </Form.Item>
    );
};