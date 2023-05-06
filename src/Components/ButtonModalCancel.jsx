import React from "react";
import {
    Button,
    ConfigProvider,
} from "antd";

export const ButtonModalCancel = ({loading, shape, style, text, htmlType, icon, disabled, onClick}) => {
    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: '#F4F4F4',
                    colorPrimaryHover: '#F4F4F4',
                    colorPrimaryActive: "#F4F4F4"
                },
            }}
        >
            <Button
                data-cy="modal-delete-confirm-button"
                size="large"
                loading={loading}
                className="button-modal-cancel"
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