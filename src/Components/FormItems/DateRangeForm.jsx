import React from "react";
import { 
    Typography,
    Form,
    Select,
    InputNumber,
    DatePicker,
} from 'antd';

const { Text, Title } = Typography;
const { RangePicker } = DatePicker;

export const DateRangeForm = ({name, label, validateStatus, help, requiredMark = true}) => {
    return (
        <Form.Item
            name={name}
            label={label}
            validateFirst={false}
            validateStatus={validateStatus}
            required={requiredMark}
            help={help}
            rules={[
                {
                    type: "platform",
                    message: `This should be filled`
                },
                {
                    required: true,
                    message: `${label} can not be empty`
                }
            ]}
        >
            <RangePicker 
                size="large"
                placeholder={["Start", "End"]}
                style={{
                    width: "100%"
                }}
            />
        </Form.Item>
    );
};