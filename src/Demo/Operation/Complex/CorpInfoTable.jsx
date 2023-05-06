import * as React from "react";
import { useNavigate } from "react-router-dom";

import { 
    Table,
    Tooltip,
    Typography,
    Pagination,
} from 'antd';
import {
    EditOutlined
} from '@ant-design/icons';

import { 
    ButtonWarning, 
    PaginationPrevNextBTN, 
    TableButtonDelete,
    TableButtonViewDetail
} from "../../../Components";
import { deleteCorpInfo, getAllCorpInfo, queryClientInstance, useMutateData, useQueryData } from "../../../_services";

import { toTitleCase } from "../../../_helpers";

const { Text } = Typography;

export const CorpInfoTable = ({searchValue}) => {
    const navigateTo = useNavigate();

    const [limitPerPage, setLimitPerPage] = React.useState(10);
    const [page, setPage] = React.useState(1);

    const cachedData = queryClientInstance.getQueryState(["corpInfoAll"]);
    useQueryData({
        queryKey: ["corpInfoAll"],
        queryFn: cachedData?.data?.data === undefined ? getAllCorpInfo() : null,
        isEnableFetch: cachedData?.data?.data === undefined ? true : false,
        refetchInterval: cachedData?.data?.data === undefined ? 500 : false,
    });

    const mutateData = useMutateData({
        actionType: "delete",
        queryKey: ["corpInfoAll"],
        mutateFn: deleteCorpInfo,
        refetchFN: getAllCorpInfo,
    });

    const tableData = React.useMemo(() => {
        const corpInfoData = searchValue?.length > 0 ? searchResultsTableData : cachedData?.data?.data;

        const indexOfLastData = page * limitPerPage;
        const indexOfFirstData = indexOfLastData - limitPerPage;
        const currentData = corpInfoData?.slice(indexOfFirstData, indexOfLastData);
        
        return currentData;
    }, [limitPerPage, page, searchValue, cachedData?.data?.data]);

    const columns = [
        {
            title: 'Num',
            fixed: "left",
            width: 80,
            render: (list, record, index) => (
                <Text>{index + 1}</Text>
            )
        },
        {
            title: 'Corporate Name',
            dataIndex: 'corporateName',
            key: 'corporateName',
            fixed: "left",
            width: 200,
            render: (_, record) => (
                <Text>{toTitleCase(record.corporateName)}</Text>
            )
        },
        {
            title: 'Sector',
            dataIndex: 'corporateSector',
            key: 'corporateSector',
            width: 200,
            render: (_, record) => (
                <Text>{toTitleCase(record.corporateSector)}</Text>
            )
        },
        {
            title: 'Scale',
            dataIndex: 'businessScale',
            key: 'businessScale',
            width: 200,
            render: (_, record) => (
                <Text>{toTitleCase(record.businessScale)}</Text>
            )
        },
        {
            title: 'Office Number',
            dataIndex: 'officeNumber',
            key: 'officeNumber',
            width: 200
        },
        {
            title: 'Office Email',
            dataIndex: 'officeEmail',
            key: 'officeEmail',
            width: 230
        },
        {
            title: 'Office Address',
            dataIndex: 'officeAddress',
            key: 'officeAddress',
            width: 300
        },
        {
            title: 'Province',
            dataIndex: 'province',
            key: 'province',
            width: 100,
            ellipsis: {
                showTitle: false,
            },
            render: (province) => (
                <Tooltip placement="topLeft" title={province}>
                    {province}
                </Tooltip>
            ),
        },
        {
            title: 'Regency',
            dataIndex: 'regency',
            key: 'regency',
            width: 100,
            ellipsis: {
                showTitle: false,
            },
            render: (regency) => (
                <Tooltip placement="topLeft" title={regency}>
                    {regency}
                </Tooltip>
            ),
        },
        {
            title: 'Sub District',
            dataIndex: 'subDistrict',
            key: 'subDistrict',
            width: 100,
            ellipsis: {
                showTitle: false,
            },
            render: (subDistrict) => (
                <Tooltip placement="topLeft" title={subDistrict}>
                    {subDistrict}
                </Tooltip>
            ),
        },
        {
            title: 'Village',
            dataIndex: 'village',
            key: 'village',
            width: 100,
            ellipsis: {
                showTitle: false,
            },
            render: (village) => (
                <Tooltip placement="topLeft" title={village}>
                    {village}
                </Tooltip>
            ),
        },
        {
            title: 'Actions',
            key: 'action',
            fixed: 'right',
            width: 200,
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
                            navigateTo(`/operation/complex/detail`, {state: {actionType: "Detail", rowData: record}});
                        }}
                    />
                    <ButtonWarning 
                        icon={<EditOutlined />}
                        onClick={() => {
                            navigateTo(`/operation/complex/edit`, {state: {actionType: "Edit", rowData: record}});
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
            pagination={searchValue.length > 0 ? true : false}
        />

        {
            searchValue.length === 0 && 
            <Pagination
                showQuickJumper
                showSizeChanger
                current={page}
                disabled={cachedData?.data?.data === undefined || cachedData?.fetchStatus === "fetching" || mutateData?.status === "loading"}
                total={searchValue?.length > 0 ? searchResultsTableData?.length : cachedData?.data?.data?.length}
                itemRender={PaginationPrevNextBTN}
                showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
                style={{
                    display: "flex",
                    justifyContent: "flex-end"
                }}
                onShowSizeChange={(currentPage, pageSize) => {
                    setLimitPerPage(pageSize);
                }}
                onChange={async (currentPage) => {
                    setPage(currentPage);
                }}
            />
        }
        </div>
    );
};