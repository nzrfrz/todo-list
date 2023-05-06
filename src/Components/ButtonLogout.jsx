import * as Reat from "react";

import { 
    theme,
    Typography, 
} from "antd";

import { useMutateData, userLogout } from "../_services";

import offIcon from "../assets/images/off-icon.png";

const { Text } = Typography;

export const ButtonLogout = () => {

    const mutateLogout = useMutateData({
        actionType: "logout",
        mutateFn: userLogout,
        routePath: "/login"
    });

    const {
        token: { 
            borderRadiusLG, 
            colorBgTextHover,
        },
    } = theme.useToken();

    return (
        <div className="button-logout-container">
            <button
                style={{
                    "--bgc": colorBgTextHover,
                    borderRadius: borderRadiusLG,
                }}
                onClick={() => {
                    mutateLogout.mutateAsync();
                }}
            >
                <Text style={{ fontSize: "14px" }}>Log Out</Text>
                <img src={offIcon} alt="icon" />
            </button>
        </div>
    );
};