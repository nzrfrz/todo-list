import React from "react";
import { 
    Form,
    Input,
} from 'antd';

export const PasswordForm = ({withConfirmPassword, validateStatus, help}) => {
    
    return (
        <>
        <Form.Item
            name="password"
            label="Password"
            hasFeedback
            validateStatus={validateStatus}
            help={help}
            rules={[
                {
                    required: true,
                    message: 'Please input your password!',
                },
            ]}
        >
            <Input.Password 
                size="large"
                placeholder="Input Password"
            />
        </Form.Item>
        
        {
            withConfirmPassword === false ?
            null
            :
            <Form.Item
                name="confirmPassword"
                label="Confirm Password"
                dependencies={['password']}
                hasFeedback
                rules={[
                    {
                        required: true,
                        message: 'Please confirm your password!',
                    },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            if (!value || getFieldValue('password') === value) {
                                return Promise.resolve();
                            }
                            return Promise.reject(new Error('The two passwords that you entered do not match!'));
                        },
                    }),
                ]}
            >
                <Input.Password 
                    size="large"
                    placeholder="Retype Password"
                />
          </Form.Item>
        }
        </>
    );
};