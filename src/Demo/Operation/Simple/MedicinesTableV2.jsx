import * as React from "react";

import { 
    Table,
    Typography,
    Pagination
} from 'antd';
import {
    EditOutlined,
} from '@ant-design/icons';
import { 
    ButtonWarning, 
    TableButtonDelete, 
    TableButtonViewDetail, 
    PaginationPrevNextBTN
} from "../../../Components";

import { 
    queryClientInstance, 
    useQueryData, 
    getMedicines, 
    useMutateData,
    deleteMedicines
} from "../../../_services";

const { Text } = Typography;

export const MedicinesTableV2 = ({setActionType, formProps, setIsModalFormOpen, setSelectedRowData, searchValue}) => {

    const cachedData = queryClientInstance.getQueryState(["medicinesAll"]);
    useQueryData({
        queryKey: ["medicinesAll"],
        queryFn: cachedData?.data?.data === undefined ? getMedicines() : null,
        isEnableFetch: cachedData?.data?.data === undefined ? true : false,
        refetchInterval: cachedData?.data?.data === undefined ? 500 : false,
    });
    // console.log("MEDICINES TABLE V2: \n", cachedData?.data?.data);

    const [limitPerPage, setLimitPerPage] = React.useState(10);
    const [page, setPage] = React.useState(1);

    const searchResultsTableData = React.useMemo(() => {
        const searchData = cachedData?.data?.data?.filter((data) => 
            data.name.toLowerCase().includes(searchValue) ||
            data.manufacturer.toLowerCase().includes(searchValue) ||
            data.dosage.toLowerCase().includes(searchValue) ||
            data.quantity.toString().toLowerCase().includes(searchValue) ||
            data.price.toLowerCase().includes(searchValue)
        );

        return searchData;
    }, [searchValue]);

    const tableData = React.useMemo(() => {
        const medicinesData = searchValue.length > 0 ? searchResultsTableData : cachedData?.data?.data;

        const indexOfLastData = page * limitPerPage;
        const indexOfFirstData = indexOfLastData - limitPerPage;
        const currentData = medicinesData?.slice(indexOfFirstData, indexOfLastData);
        
        return currentData;
    }, [limitPerPage, page, searchValue, cachedData?.data?.data]);

    const setFormFieldValue = (record) => {
        setSelectedRowData(record);
        formProps.setFieldsValue({
            name: record.name,
            manufacturer: record.manufacturer,
            dosage: Number(record.dosage.replace(/\s(mg|mcg)/g, '')),
            quantity: record.quantity,
            price: record.price
        })
    };

    const mutateData = useMutateData({
        actionType: "delete",
        queryKey: ["medicinesAll"],
        mutateFn: deleteMedicines,
        formProps,
        refetchFN: getMedicines,
    });

    const columns = [
        {
            title: 'Num',
            fixed: "left",
            width: 70,
            render: (list, record, index) => (
                <Text>{index + 1}</Text>
            )
        },
        {
            title: 'Full Name',
            dataIndex: 'name',
            key: 'name',
            fixed: "left",
            width: 200
        },
        {
            title: 'Manufacturer',
            dataIndex: 'manufacturer',
            key: 'manufacturer',
            width: 200,
        },
        {
            title: 'Dosage',
            dataIndex: 'dosage',
            key: 'dosage',
            width: 150,
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            width: 100
        },
        {
            title: 'Quantity',
            dataIndex: 'quantity',
            key: 'quantity',
            width: 100
        },
        {
            title: 'Actions',
            key: 'action',
            fixed: 'right',
            width: 150,
            render: (_, record) => (
                <div 
                    className="table-action-button-container"
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        gap: 12
                    }}
                >
                    <TableButtonViewDetail 
                        onClick={() => {
                            setIsModalFormOpen(true);
                            setActionType("viewDetail");
                            setFormFieldValue(record);
                        }}
                    />
                    <ButtonWarning 
                        icon={<EditOutlined />}
                        onClick={() => {
                            setIsModalFormOpen(true);
                            setActionType("put");
                            setFormFieldValue(record);
                        }}
                    />
                    <TableButtonDelete 
                        rowData={record.name}
                        onClick={() => {
                            mutateData.mutateAsync(record.id);
                        }}
                    />
                </div>
            )
        },
    ];

    return (
        <div 
            style={{
                display: "flex",
                flexDirection: "column",
                gap: "12px"
            }}
        >
        <Table 
            loading={cachedData?.data?.data === undefined || cachedData?.fetchStatus === "fetching" || mutateData?.status === "loading"}
            rowKey={(record) => record.id} 
            columns={columns} 
            dataSource={tableData}
            scroll={{ x: "100%" }}
            pagination={false}
        />

        <Pagination
            showQuickJumper
            showSizeChanger
            current={page}
            disabled={cachedData?.data?.data === undefined || cachedData?.fetchStatus === "fetching" || mutateData?.status === "loading"}
            total={searchValue.length > 0 ? searchResultsTableData.length : cachedData?.data?.data?.length}
            itemRender={PaginationPrevNextBTN}
            showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
            style={{
                display: "flex",
                justifyContent: "flex-end"
            }}
            onShowSizeChange={(currentPage, pageSize) => {
                setLimitPerPage(pageSize);
            }}
            onChange={(currentPage) => {
                setPage(currentPage);
            }}
        />
        </div>
    );
};