import React from "react";
import {
    Button,
    ConfigProvider,
} from "antd";

export const ButtonModalSave = ({loading, shape, style, text, htmlType, icon, disabled, onClick}) => {
    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: '#16ABF8',
                    colorPrimaryHover: '#0099CC',
                    colorPrimaryActive: "rgba(0, 153, 204, 0.5)"
                },
            }}
        >
            <Button
                data-cy="modal-add-save-button"
                size="large"
                loading={loading}
                className="button-info"
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