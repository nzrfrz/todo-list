import * as React from "react";
import { 
    Outlet, 
} from "react-router-dom";
import { GlobalContext } from "../Context/GlobalContextCreate";

import { 
    theme, 
    Layout, 
    Typography, 
} from 'antd';

import {  
    NavbarItems,
} from "../Routes";

const { Header, Content } = Layout;
const { Text } = Typography;

export const HomeLayout = () => {

    const globalContext = React.useContext(GlobalContext);

    const contentPadding = React.useMemo(() => {
        if (globalContext?.windowDimension.width > 480)
            return (globalContext?.windowDimension.width / 1440) * 220;
        return 24;
    }, [globalContext?.windowDimension.width]);

    const getSize = () => {
        globalContext?.setWindowDimension({
            width: window.innerWidth,
            height: window.innerHeight,
        });
    };

    React.useEffect(() => {
        window.addEventListener('resize', getSize);
        return () => {
            window.removeEventListener('resize', getSize);
        };
    }, [globalContext?.windowDimension.width]);

    const {
        token: { 
            borderRadiusLG,
        },
    } = theme.useToken();

    return (
        <Layout
            data-cy="layout"
            style={{
                height: window.innerHeight,
            }}
        >
            <Layout data-cy="header" className="site-layout">
                <Header
                    className="layout-header-menu"
                    style={{
                        display: "flex",
                        paddingInline: 0,
                        padding: `0 ${contentPadding}px`,
                        background: globalContext?.isDarkMode ? "#151E31" : "#16ABF8",
                        borderBottomLeftRadius: globalContext?.windowDimension.width < 768 ? "16px" : "0",
                        borderBottomRightRadius: globalContext?.windowDimension.width < 768 ? "16px" : "0",
                        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)"
                    }}
                >
                    <div data-cy="header-title" className="logo" >
                        <Text>TO DO LIST APP</Text>
                    </div>
                    <NavbarItems />
                </Header>
                <Content
                    data-cy="content"
                    style={{
                        margin: '16px 24px',
                        background: "transparent",
                        overflowY: "auto",
                        scrollbarWidth: "none",
                        msOverflowStyle: "none",
                        transition: "all 0.5s",
                        "--contentPadding": `24px ${contentPadding}px`,
                        "--contentBorderRadius": `${borderRadiusLG}px`,
                        "--contentBGC":  globalContext?.isDarkMode === true ? "var(--contentContainerDarkMode)" : "var(--contentContainerLightMode)",
                    }}
                >
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
};