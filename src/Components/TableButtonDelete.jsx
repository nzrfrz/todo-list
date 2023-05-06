import React from "react";

import { Popconfirm } from "antd";
import { DeleteOutlined, WarningOutlined } from '@ant-design/icons';

import { ButtonError } from "./ButtonError";

export const TableButtonDelete = ({rowData, onClick}) => {
    return (
        <Popconfirm
            placement="topLeft"
            title="Delete data"
            description={`Sure want to delete "${rowData}" data ??`}
            okText="Yes"
            cancelText="No"
            onConfirm={onClick}
            icon={
                <WarningOutlined
                    style={{
                        color: 'red',
                    }}
                />
            }
        >
            <ButtonError 
                icon={<DeleteOutlined />}
            />
        </Popconfirm>
    );
};