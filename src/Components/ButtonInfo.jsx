import React, { useContext } from "react";
import { GlobalContext } from "../Context/GlobalContextCreate";

import {
    Button,
    ConfigProvider,
} from "antd";

export const ButtonInfo = ({loading, size, shape, style, text, htmlType, icon, onClick}) => {
    const { windowDimension } = useContext(GlobalContext);

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
            <Button
                className="button-info"
                block={windowDimension.width > 403 ? false : true}
                loading={loading}
                size={size}
                shape={shape}
                type="primary"
                htmlType={htmlType}
                icon={icon}
                style={style}
                onClick={onClick}
            >
                {text}
            </Button>
        </ConfigProvider>
    );
};