import * as React from "react";
import { useNavigate } from "react-router-dom";

import { 
    Input, 
    Typography 
} from "antd";

import { ButtonInfo } from "../../../Components";
import { PlusOutlined } from '@ant-design/icons';

import { CorpInfoTable } from "./CorpInfoTable";

const { Text, Title } = Typography;
const { Search } = Input;

export const OperationComplex = () => {
    const navigateTo = useNavigate();
    
    const [searchValue, setSearchValue] = React.useState("");

    return (
        <div className="one-column-layout-container">
            <div className="page-content" >
                <div className="content-title-container">
                    <div className="content-title">
                        <Title level={4}>Corporate List</Title>
                    </div>
                    <ButtonInfo 
                        text="Register Corporate"
                        icon={<PlusOutlined />}
                        onClick={() => {
                            navigateTo(`/operation/complex/registration`, {state: {actionType: "Registration"}});
                        }}
                    />
                    <Search 
                        allowClear
                        enterButton 
                        size="large"
                        placeholder="Search Something?" 
                    />
                </div>
                <div className="page-content-container">
                    <CorpInfoTable 
                        searchValue={searchValue}
                    />
                </div>
            </div>
        </div>
    );
};