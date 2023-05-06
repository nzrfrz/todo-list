import React, { useContext } from "react";
import { GlobalContext } from "../Context/GlobalContextCreate";

import {
    Button,
    ConfigProvider,
} from "antd";

export const ButtonAddTODO = ({loading, size, shape, style, text, disabled, htmlType, icon, onClick}) => {
    const { windowDimension } = useContext(GlobalContext);

    return (
        <ConfigProvider
            data-cy="todo-add-button"
            theme={{
                token: {
                    colorPrimary: '#16ABF8',
                    colorPrimaryHover: '#0099CC',
                    colorPrimaryActive: "rgba(0, 153, 204, 0.5)"
                },
            }}
        >
            <Button
                data-cy="todo-add-button"
                className="button-info"
                block={windowDimension.width > 403 ? false : true}
                loading={loading}
                size={size}
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