import * as React from "react";
// import { GlobalContext } from "../Context/GlobalContext";
import { GlobalContext } from "../Context/GlobalContextCreate";
import { NotificationContext } from "../Context/NotifContext";
import { MessageContext } from "../Context/MessageContext";

import { theme } from "antd";

export const ThemeToggleButton = () => {
    const {
        isDarkMode, 
        setIsDarkMode, 
    } = React.useContext(GlobalContext);
    const { messageApi } = React.useContext(MessageContext);

    const { api } = React.useContext(NotificationContext);

    const {
        token: { 
            colorBgTextHover,
        },
    } = theme.useToken();

    return (
        <div 
            className="toggle-theme-container"
            style={{
                "--bgColor": colorBgTextHover
            }}
        >
            <input 
                id="toggle" 
                className={isDarkMode === true ? "dark-mode" : "light-mode"} 
                type="checkbox" 
                onChange={() => {
                    api.destroy();
                    messageApi.destroy();
                    setIsDarkMode(!isDarkMode);
                    const themeMode = localStorage.getItem("themeMode");
                    localStorage.setItem("themeMode", themeMode === "light" ? "dark" : "light");
                }} 
            />
        </div>
    );
};