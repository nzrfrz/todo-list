import React from "react";
import { 
    Form,
    DatePicker,
} from 'antd';
// import dayjs from "dayjs";

export const DOBForm = ({requiredMark = true}) => {
    return (
        <Form.Item
            name="dateOfBirth"
            label="Date Of Birth"
            format="YYYY-MM-DD"
            required={requiredMark}
            // initialValue={{ dateOfBirth: dayjs("2022-21-03") }}
            rules={[
                {
                    type: "object",
                    required: true,
                    message: "Date Of Birth can not be empty"
                }
            ]}
        >
            <DatePicker 
                size="large"
                format="YYYY-MM-DD"
                style={{
                    width: "100%"
                }}            
            />
        </Form.Item>
    );
};