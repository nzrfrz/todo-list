import React from "react";

import { Tooltip, Button, ConfigProvider } from "antd";
import { EyeOutlined } from '@ant-design/icons';

export const TableButtonViewDetail = ({onClick}) => {
    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: '#33b5e5',
                    colorPrimaryHover: '#0099CC',
                    colorPrimaryActive: "rgba(0, 153, 204, 0.5)"
                },
            }}
        >
            <Tooltip
                placement="topRight"
                title={<span>View Detail</span>}
            >
                <Button
                    className="button-info"
                    type="primary"
                    icon={<EyeOutlined />}
                    onClick={onClick}
                />
            </Tooltip>
        </ConfigProvider>
    );
};