import React from "react";
import { 
    Form,
    Select,
    Typography
} from 'antd';
import {
    DownOutlined
} from '@ant-design/icons';

import { PriorityBadge } from "../../Pages/PriorityBadge";

const { Text } = Typography;

export const SimpleSelectForm = ({name, label, optionSelect, requiredMark = true}) => {

    return (
        <Form.Item
            name={name}
            label={<Text data-cy="modal-add-priority-title">{label}</Text>}
            required={requiredMark}
            rules={[
                {
                    required: true,
                    message: `${label} can not be empty`
                }
            ]}
        >
            <Select
                size="large"
                placeholder={`Select ${label}`}
                data-cy="modal-add-priority-dropdown"
                suffixIcon={<DownOutlined data-cy="modal-add-priority-dropdown" />}
                style={{
                    width: "50%"
                }}
            >
                {
                    optionSelect.map((data, index) => 
                        <Select.Option data-cy="modal-add-priority-item" key={index} value={data.value} >
                            <div style={{ display: "flex", gap: "12px" }}>
                                <PriorityBadge 
                                    priority={data.value}
                                />
                                <div style={{ display: "flex", flexGrow: 1 }} >
                                    {data.label}
                                </div>
                            </div>
                        </Select.Option>
                    )
                }
            </Select>
        </Form.Item>
    );
};