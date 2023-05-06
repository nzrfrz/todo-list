export const defaultOptions = (isDarkMode) => {
    return {
        theme: {
            mode: isDarkMode === true ? "dark" : "light", 
            palette: 'palette1', 
            monochrome: {
                enabled: false,
                color: '#255aee',
                shadeTo: isDarkMode === true ? "dark" : "light",
                shadeIntensity: 0.65
            },
        },
        responsive: [
            {
                breakpoint: 1000,
                options: {
                    plotOptions: {
                        bar: {
                            horizontal: false
                        }
                    },
                    legend: {
                        position: "bottom"
                    },
                }
            }
        ],
    };
};