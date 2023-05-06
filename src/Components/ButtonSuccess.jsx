import React from "react";
import {
    Button,
    ConfigProvider,
} from "antd";

export const ButtonSuccess = ({loading, shape, style, text, htmlType, icon, disabled, onClick}) => {
    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: '#00C851',
                    colorPrimaryHover: '#007E33',
                    colorPrimaryActive: "rgba(0, 126, 51, 0.5)"
                },
            }}
        >
            <Button
                loading={loading}
                className="button-success"
                shape={shape}
                type="primary"
                htmlType={htmlType}
                icon={icon}
                style={style}
                disabled={disabled}
                onClick={onClick}
            >
                {text}
            </Button>
        </ConfigProvider>
    );
};