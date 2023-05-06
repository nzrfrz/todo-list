import React from "react";
import { 
    Form,
    Input,
    Typography
} from 'antd';

const { Text } = Typography;

export const SimpleInputForm = ({name, label, placeholder, hasFeedback = false, validateStatus, help, requiredMark = true}) => {
    return (
        <Form.Item
            hasFeedback={hasFeedback}
            name={name}
            label={<Text data-cy="modal-add-name-title">{label}</Text>}
            required={requiredMark}
            validateStatus={validateStatus}
            help={help}
            rules={[
                {
                    required: true,
                    message: `${label} can not be empty`
                }
            ]}
        >
            <Input
                data-cy="modal-add-name-input"
                size="large"
                autoComplete="off"
                placeholder={placeholder === undefined ? `Input ${label}` : placeholder}
                style={{
                    width: '100%',
                }}
            />
        </Form.Item>
    );
};