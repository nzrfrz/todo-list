export const themeToken = (isDarkMode) => {
    return {
        fontFamily: "Comfortaa",
        // colorBgContainer: isDarkMode === true ? "#151E31" : "#16ABF8",
        colorBgContainer: isDarkMode === true ? "#151E31" : "white",
        colorBgLayout: isDarkMode === true ? "#0F172A" : "#E5E5E5",
        colorBgElevated: isDarkMode === true ? "#1F2937" : "white",
        boxShadow: isDarkMode === true ? "0 6px 16px 0 rgba(255, 255, 255, 0.08), 0 3px 6px -4px rgba(255, 255, 255, 0.12), 0 9px 28px 8px rgba(255, 255, 255, 0.05)" : "0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 9px 28px 8px rgba(0, 0, 0, 0.05)",
        boxShadowCard: isDarkMode === true ? "0 1px 2px -2px rgba(255, 255, 255, 1), 0 3px 6px 0 rgba(255, 255, 255, 0.1), 0 5px 12px 4px rgba(255, 255, 255, 0.1)" : "0 1px 2px -2px rgba(0, 0, 0, 0.16), 0 3px 6px 0 rgba(0, 0, 0, 0.12), 0 5px 12px 4px rgba(0, 0, 0, 0.09)",
        colorPrimary: '#1677ff',
    }
};


/*
-default
colorBgContainer: isDarkMode === true ? "#121518" : "white",
colorBgLayout: isDarkMode === true ? "#23292e" : "#F1F5F9",

- option 1
colorBgContainer: isDarkMode === true ? "#1F2940" : "white",
colorBgLayout: isDarkMode === true ? "#141B2D" : "#F1F5F9",

-option 2
colorBgContainer: isDarkMode === true ? "#1F2940" : "white",
colorBgLayout: isDarkMode === true ? "#141B2D" : "#F1F5F9",
*/