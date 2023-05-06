import * as React from "react";

export const useContainerDimension = () => {
    const containerRef = React.useRef(null);
    const [dimensions, setDimensions] = React.useState({ width: containerRef?.current?.clientWidth, height: containerRef?.current?.clientHeight });

    const handleResize = React.useCallback(() => {
        setDimensions({
            width: containerRef?.current.clientWidth,
            height: containerRef?.current.clientHeight
        });
    }, [containerRef]);

    React.useEffect(() => {
        setTimeout(handleResize, 0);
        window.addEventListener("load", handleResize);
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("load", handleResize);
            window.removeEventListener("resize", handleResize);
        };
    }, [containerRef, handleResize]);

    return { 
        containerRef,
        dimensions 
    };
};