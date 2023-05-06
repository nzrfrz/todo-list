import * as React from "react";
// import { GlobalContext } from "../Context/GlobalContext";
import { GlobalContext } from "../Context/GlobalContextCreate";

import { 
    theme,
    Divider,
    Dropdown,
    Typography, 
} from "antd";
import {
    UserOutlined,
    SettingOutlined
} from '@ant-design/icons';

import { ButtonLogout } from "./ButtonLogout";

const { Text } = Typography;

export const NavbarProfileDD = () => {
    const { windowDimension } = React.useContext(GlobalContext);

    const [openDD, setOpenDD] = React.useState(false);

    const {
        token: { 
            borderRadiusLG, 
            boxShadow,
            colorBgTextHover,
            colorBgElevated
        },
    } = theme.useToken();

    return (
        <div
            className="navbar-profile-dd-container"
            style={{
                "--bgColor": colorBgTextHover
            }}
        >
            <Dropdown
                menu={{}}
                trigger="click"
                placement="bottomRight"
                open={openDD}
                onOpenChange={(flag) => setOpenDD(flag)}
                dropdownRender={() => (
                    <div
                        className="navbar-profile-dd-menu-container"
                        style={{
                            background: colorBgElevated,
                            borderRadius: borderRadiusLG,
                            boxShadow: boxShadow,
                        }}
                    >
                        <div 
                            className="link-button-container"
                            style={{
                                "--bgc": colorBgTextHover,
                                borderRadius: borderRadiusLG,
                            }}
                        >
                            <Text>Profile</Text>
                            <UserOutlined />
                        </div>
                        <div 
                            className="link-button-container"
                            style={{
                                "--bgc": colorBgTextHover,
                                borderRadius: borderRadiusLG,
                            }}
                        >
                            <Text>Setting</Text>
                            <SettingOutlined />
                        </div>
                        <Divider style={{ margin: 0, padding: 0 }} />
                        <ButtonLogout />
                    </div>
                )}
            >
                <div className="navbar-profile-dd-title">
                    <img src={"http://drive.google.com/uc?export=view&id=1DCruElbQ1qv6eqtLqyNL_rzrZ7egs-o2"} alt="profile" />
                    {
                        windowDimension.width > 630 &&
                        <Text>Admin</Text>
                    }
                    {/* {
                        cachedData?.data?.data === undefined ?
                        <Spinner />
                        : 
                        <>
                        <img src={cachedData?.data?.data?.profilePic} alt="profile" />
                        {
                            windowDimension.windowWidth > 630 &&
                            <Text>{cachedData?.data?.data?.userName}</Text>
                        }
                        </>
                    } */}
                </div>
            </Dropdown>
        </div>
    );
};