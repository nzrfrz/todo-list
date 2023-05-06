import * as React from "react";
// import { GlobalContext } from "../../Context/GlobalContext";
import { GlobalContext } from "../../Context/GlobalContextCreate";

import "./loader.css";

export const Loader = () => {
    const { isDarkMode } = React.useContext(GlobalContext);

    return (
        <div 
            className="loader-container"
            style={{
                "--contentBGC": isDarkMode === true ? "var(--contentContainerDarkMode)" : "var(--contentContainerLightMode)",
                "--borderClr": isDarkMode === true ? "#fff" : "grey",
                "--glassBGC": isDarkMode === true ? "rgba(255, 255, 255, 0.4)" : "silver"
            }}
        >
            <span className="loader"></span>
        </div>
    );
};