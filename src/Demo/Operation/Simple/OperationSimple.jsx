import * as React from "react";

import {  
    Typography, 
    Input,
    Form,
} from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import { ButtonInfo } from "../../../Components";

import { useDebounce } from "../../../_helpers";

import { MedicinesTable } from "./MedicinesTable";
import { ModalForm } from "./ModalForm";
import { MedicinesTableV2 } from "./MedicinesTableV2";
import { ModalFormV2 } from "./ModalFormV2";

const { Search } = Input;
const { Text, Title } = Typography;

export const OperationSimple = () => {
    const [form] = Form.useForm();

    // console.log("MEDICINES ALL: \n", medicinesAllCached);

    const [isModalFormOpen, setIsModalFormOpen] = React.useState(false);
    const [actionType, setActionType] = React.useState(undefined);
    const [selectedRowData, setSelectedRowData] = React.useState({});
    
    const [searchValue, setSearchValue] = React.useState("");
    const debounceSave = useDebounce((nextValue) => setSearchValue(nextValue), 1000);

    return (
        <div className="one-column-layout-container">
            <div className="page-content">
                <div className="content-title-container">
                    <div className="content-title">
                        <Title level={4}>Medicines List</Title>
                    </div>
                    <ButtonInfo 
                        text="Add Medicine"
                        icon={<PlusOutlined />}
                        onClick={() => {
                            form.resetFields();
                            setActionType("post");
                            setSelectedRowData(undefined);
                            setIsModalFormOpen(true);
                        }}
                    />
                    <Search 
                        allowClear
                        enterButton 
                        size="large"
                        placeholder="Search Something?" 
                        onSearch={(value) => {
                            setSearchValue(value);
                        }}
                        onChange={(e) => {
                            debounceSave(e.target.value);
                        }}
                    />
                </div>
                <div className="page-content-container">
                    {/*
                    */}
                    <MedicinesTable 
                        setActionType={setActionType}
                        formProps={form}
                        setIsModalFormOpen={setIsModalFormOpen}
                        setSelectedRowData={setSelectedRowData}
                        searchValue={searchValue}
                    />

                    <ModalForm
                        isModalFormOpen={isModalFormOpen}
                        setIsModalFormOpen={setIsModalFormOpen}
                        actionType={actionType}
                        setActionType={setActionType}
                        formProps={form}
                        selectedRowData={selectedRowData}
                        searchValue={searchValue}
                    />

                    {/*
                    <MedicinesTableV2 
                        setActionType={setActionType}
                        formProps={form}
                        setIsModalFormOpen={setIsModalFormOpen}
                        setSelectedRowData={setSelectedRowData}
                        searchValue={searchValue}
                    />

                    <ModalFormV2
                        isModalFormOpen={isModalFormOpen}
                        setIsModalFormOpen={setIsModalFormOpen}
                        actionType={actionType}
                        setActionType={setActionType}
                        formProps={form}
                        selectedRowData={selectedRowData}
                    />
                    */}
                </div>
            </div>
        </div>
    );
};