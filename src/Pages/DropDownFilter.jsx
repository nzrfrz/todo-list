import * as React from "react";
import { GlobalContext } from "../Context/GlobalContextCreate";

import {
    theme,
    Button, 
    Dropdown, 
    Typography, 
} from "antd";
import {
    FilterOutlined,
    CheckOutlined,
} from '@ant-design/icons';

import newest from "../assets/images/sort-icon-newest.png";
import oldest from "../assets/images/sort-icon-oldest.png";
import AZsort from "../assets/images/sort-icon-AZ.png";
import ZAsort from "../assets/images/sort-icon-ZA.png";
import notDone from "../assets/images/sort-icon-notDone.png";

const { Text } = Typography;

const filterType =  [
    {
        label: "Terbaru",
        value: "newest",
        img: newest,
    },
    {
        label: "Terlama",
        value: "oldest",
        img: oldest,
    },
    {
        label: "A-Z",
        value: "ascending",
        img: AZsort,
    },
    {
        label: "Z-A",
        value: "descending",
        img: ZAsort,
    },
    {
        label: "Belum Selesai",
        value: "notFinished",
        img: notDone
    },
];

export const DropdownFilter = () => {
    const { isDarkMode, selectedFilterType, setSelectedFilterType } = React.useContext(GlobalContext);

    const [openDD, setOpenDD] = React.useState(false);

    const {
        token: { 
            colorBgContainer, 
            borderRadiusLG, 
            boxShadow,
            colorBgTextHover
        },
    } = theme.useToken();

    return (
        <Dropdown
            data-cy="todo-sort-button"
            menu={{}}
            open={openDD}
            trigger="click"
            placement="bottomRight"
            onOpenChange={(flag) => setOpenDD(flag)}
            dropdownRender={() => (
                <div
                    className="header-menu-dd-multi-inbox"
                    style={{
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG,
                        boxShadow: boxShadow,
                    }}
                >
                    {
                        filterType.map((data, index) => 
                            <div
                                key={index}
                                data-cy="sort-selection"
                                className="multi-inbox"
                                style={{
                                    "--bgc": colorBgTextHover,
                                    borderRadius: borderRadiusLG,
                                }}
                                onClick={() => {
                                    setSelectedFilterType(data.value);
                                    setOpenDD(false);
                                }}
                            >
                                <img src={data.img} />
                                <Text style={{ display: "flex", flexGrow: 1, }}>{data.label}</Text>
                                {
                                    selectedFilterType === data.value &&
                                    <CheckOutlined />
                                }
                            </div>
                        )
                    }
                </div>
            )}
        >
                <Button 
                    data-cy="todo-sort-button"
                    size="large"
                    shape="circle"
                    icon={<FilterOutlined style={{ color: isDarkMode === true ? "white" : "black" }} />} 
                />
        </Dropdown>
    );
};