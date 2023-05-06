import React from "react";
import {
    Button,
    ConfigProvider,
} from "antd";

export const ButtonModalOK = ({loading, shape, style, text, htmlType, icon, disabled, onClick}) => {
    return (
        <ConfigProvider
            data-cy="modal-delete-confirm-button"
            theme={{
                token: {
                    colorPrimary: '#ED4C5C',
                    colorPrimaryHover: '#CC0000',
                    colorPrimaryActive: "rgba(204, 0, 0, 0.5)"
                },
            }}
        >
            <Button
                data-cy="modal-delete-confirm-button"
                size="large"
                loading={loading}
                className="button-error"
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