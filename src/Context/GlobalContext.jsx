import * as React from "react";
import { useQuery } from "@tanstack/react-query";

import { 
    theme, 
    Form,
    ConfigProvider,
} from 'antd';
import { themeToken } from "../themeToken";

import { Loader } from "../Components";

import { getAccessTokenV2 } from "../_services";

const themeMode = localStorage.getItem("themeMode");

import { GlobalContext } from "./GlobalContextCreate";

export const GlobalContextProvider = ({children}) => {
    const [formProps] = Form.useForm();
    const { defaultAlgorithm, darkAlgorithm } = theme;

    const [isDarkMode, setIsDarkMode] = React.useState(false);
    const [windowDimension, setWindowDimension] = React.useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });

    const [isEditTODOTitle, setIsEditTODOTitle] = React.useState(false);
    const [isInputTODOTitleFocus, setIsInputTODOTitleFocus] = React.useState(false);
    const [selectedFilterType, setSelectedFilterType] = React.useState("newest");

    const contextValue = {
        isDarkMode, 
        formProps,
        setIsDarkMode, 
        windowDimension, 
        setWindowDimension,
        isEditTODOTitle, 
        setIsEditTODOTitle,
        isInputTODOTitleFocus, 
        setIsInputTODOTitleFocus,
        selectedFilterType, 
        setSelectedFilterType
    };

    React.useEffect(() => {
        if (themeMode === null) {
            localStorage.setItem("themeMode", "light");
        }
        setIsDarkMode(themeMode === "dark" ? true : false);
    }, [themeMode]);

    return (
        <GlobalContext.Provider
            value={contextValue}
        >
            <ConfigProvider
                theme={{ 
                    algorithm: isDarkMode ? darkAlgorithm : defaultAlgorithm,
                    token: themeToken(isDarkMode),
                }}
            >
                {children}
            </ConfigProvider>
        </GlobalContext.Provider>
    );
};