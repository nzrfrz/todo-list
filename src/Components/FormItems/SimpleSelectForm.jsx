import React from "react";
import { 
    Form,
    Select,
    Typography
} from 'antd';

import { PriorityBadge } from "../../Pages/PriorityBadge";

const { Text } = Typography;

export const SimpleSelectForm = ({name, label, optionSelect, requiredMark = true}) => {

    return (
        <Form.Item
            name={name}
            data-cy="modal-add-priority-dropdown"
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
                showSearch
                allowClear
                size="large"
                // data-cy="modal-add-priority-dropdown"
                placeholder={`Select ${label}`}
                style={{
                    width: "50%"
                }}
            >
                {
                    optionSelect.map((data, index) => 
                        <Select.Option key={index} value={data.value} >
                            <div data-cy="modal-add-priority-item" style={{ display: "flex", gap: "12px" }}>
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