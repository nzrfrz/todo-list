import React from "react";
import { theme } from "antd";

export const MenuBurger = ({collapsed, setCollapsed, innerWidth}) => {
    const {
        token: { 
            colorBgTextHover,
            colorText
        },
    } = theme.useToken();

    return (
        <div 
            id="icon" 
            className="hamburger-icon"
            style={{
                "--position": innerWidth < 768 ? "absolute" : "relative",
                "--left": innerWidth < 768 ? "10px" : "0px",
                "--bgc": colorBgTextHover
            }} 
            onClick={() => setCollapsed(!collapsed)}
        >
            <div id="a" className={collapsed === true ? "icon-1" : "icon-1 a"} style={{ "--bgc": colorText }} />
            <div id="b" className={collapsed === true ? "icon-2" : "icon-2 c"} style={{ "--bgc": colorText }} />
            <div id="c" className={collapsed === true ? "icon-3" : "icon-3 b"} style={{ "--bgc": colorText }} />
            <div className="clear" />
        </div>
    );
};