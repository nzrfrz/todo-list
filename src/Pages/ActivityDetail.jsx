import * as React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { GlobalContext } from "../Context/GlobalContextCreate";

import { 
    Card,
    Input,
    Button,
    Divider,
    Checkbox,
    Typography, 
} from "antd";
import {
    PlusOutlined,
    DeleteOutlined,
    LeftOutlined, 
    EditOutlined
} from '@ant-design/icons';
import { ButtonAddTODO, LoaderRC, ModalDelete } from "../Components";
import { ModalForm } from "./ModalForm";
import { PriorityBadge } from "./PriorityBadge";
import { DropdownFilter } from "./DropDownFilter";

import emptyTodoImg from "../assets/images/todo-empty-state.png";

import { 
    activityGetOne, 
    activityPatch, 
    queryClientInstance, 
    todoListGetAll, 
    todoListPatch, 
    useMutateData, 
    useQueryData 
} from "../_services";

import { toTitleCase } from "../_helpers";

const { Text } = Typography;

export const ActivityDetail = () => {
    const navigateTo = useNavigate();
    const { state } = useLocation();
    const { 
        isDarkMode, 
        windowDimension, 
        isEditTODOTitle, 
        setIsEditTODOTitle, 
        setIsInputTODOTitleFocus,
        selectedFilterType, 
    } = React.useContext(GlobalContext);

    const [activityTitle, setActivityTitle] = React.useState("");
    const [isModalFormOpen, setIsModalFormOpen] = React.useState(false);
    const [isModalDeleteOpen, setIsModalDeleteOpen] = React.useState(false);
    const [todoListSelected, setTodoListSelected] = React.useState(undefined);

    const activityCachedByID = queryClientInstance.getQueryState(["activity", state?.activityID]);
    useQueryData({
        queryKey: ["activity", state?.activityID],
        queryFn: activityCachedByID?.data === undefined ? activityGetOne(state?.activityID) : null,
        isEnableFetch: activityCachedByID?.data === undefined ? true : false,
        refetchInterval: activityCachedByID?.data === undefined ? 500 : false,
    });
    const activityTitleMutate = useMutateData({
        actionType: "patch",
        queryKey: ["activity", state?.activityID],
        mutateFn: activityPatch,
        refetchFN: () => activityGetOne(state?.activityID),
    });

    const todoListCached = queryClientInstance.getQueryState(["todoList", state?.activityID, selectedFilterType]);
    useQueryData({
        queryKey: ["todoList", state?.activityID, selectedFilterType],
        queryFn: todoListCached?.data?.data === undefined ? todoListGetAll(state?.activityID, selectedFilterType) : null,
        isEnableFetch: todoListCached?.data?.data === undefined ? true : false,
        refetchInterval: todoListCached?.data?.data === undefined ? 500 : false,
    });
    const todoListMutate = useMutateData({
        actionType: "patch",
        queryKey: ["todoList", state?.activityID, selectedFilterType],
        mutateFn: todoListPatch,
        refetchFN: () => todoListGetAll(state?.activityID, selectedFilterType),
    });

    const handletodoListActive = (selectedID) => {
        let temp = todoListCached?.data?.data?.map((data) => {
            if (selectedID === data.id) {
                return { ...data, is_active: data.is_active === 0 ? 1 : 0 }
            }
            return data;
        });

        const formData = temp.filter((data) => data.id === selectedID).shift();
        const finalFormData = {
            ...formData,
            is_active: formData.is_active === 0 ? false : true
        };

        todoListMutate.mutateAsync({ payload: finalFormData });
    };

    return (
        <div data-cy="dashboard" className="one-column-layout-container" >
            <div data-cy="page-content-custom" className="page-content-custom">

                <div 
                    data-cy="content-title-container" 
                    className="content-title-container"
                >
                    <div
                        className="title-container"
                        style={{
                            display: "flex",
                            gap: "33px"
                        }}
                    >
                        <Button 
                            data-cy="todo-back-button"
                            size="large"
                            type="link"
                            style={{ 
                                fontSize: "28px"
                            }} 
                            icon={<LeftOutlined style={{ color: isDarkMode === true ? "white" : "black" }} />} 
                            onClick={() => {
                                navigateTo(-1);
                            }}
                        />
                        {
                            isEditTODOTitle ?
                            <div 
                                style={{
                                    display: "flex",
                                    maxWidth: "50%",
                                    flexDirection: "column"
                                }}
                            >
                                <Input
                                    autoFocus
                                    size="large"
                                    bordered={false}
                                    style={{
                                        fontSize: "36px",
                                        fontWeight: 700,
                                        padding: 0,
                                    }}
                                    data-cy="todo-title-input"
                                    onFocus={() => {
                                        setIsInputTODOTitleFocus(true);
                                    }}
                                    onBlur={() => {
                                        const formData = {
                                            title: activityTitle
                                        };

                                        if (activityTitle !== "" && (activityTitle !== activityCachedByID?.data?.title)) {
                                            activityTitleMutate.mutateAsync({payload: formData, activityID: state?.activityID});
                                        }
                                        setIsInputTODOTitleFocus(false);
                                        setIsEditTODOTitle(false);
                                    }}
                                    defaultValue={activityCachedByID?.data?.title}
                                    onChange={(e) => {
                                        setActivityTitle(e.target.value);
                                    }}
                                />
                                <Divider style={{ margin: 0, padding: 0, height: "1.5px", background: isDarkMode === true ? "white" : "black" }} />
                            </div> 
                            :
                            <Text 
                                data-cy="todo-title" 
                                className="activity-title" 
                                onClick={() => { 
                                    setIsEditTODOTitle(true);
                                    // console.log("CAHANGE TODO TITLE");
                                }} 
                            >
                                {activityCachedByID?.data?.title}
                            </Text>
                        }
                        <Button 
                            data-cy="todo-title-edit-button"
                            size="large"
                            type="link"
                            style={{ 
                                fontSize: "28px"
                            }} 
                            icon={<EditOutlined style={{ color: "#A4A4A4" }} />} 
                            onClick={() => {
                                setIsEditTODOTitle(true);
                            }}
                        />
                    </div>
                    <div 
                        style={{
                            display: "flex",
                            justifyContent: "flex-end",
                            gap: "18px",
                        }}
                    >
                        <DropdownFilter />
                        <ButtonAddTODO 
                            text="Tambah"
                            size="large"
                            shape="round"
                            icon={<PlusOutlined />}
                            onClick={() => {
                                setIsModalFormOpen(true);
                            }}
                        />
                    </div>
                </div>

                {
                    todoListCached?.fetchStatus !== "idle" ? 
                    <div
                        style={{
                            display: "flex",
                            alignSelf: "center",
                            height: `${windowDimension.height - 230}px`,
                        }}
                    >
                        <LoaderRC />
                    </div>
                    :
                    <>
                    {
                        todoListCached?.data?.data?.length === 0 ?
                        <div 
                            data-cy="todo-empty-state" 
                            className="empty-activity-container" 
                            style={{
                                display: "flex",
                                alignSelf: "center",
                                height: `${windowDimension.height - 230}px`,
                                "--imgHeight": `${windowDimension.height - 250}px`
                            }}
                            onClick={() => {
                                setIsModalFormOpen(true);
                            }}
                        >
                            <img src={emptyTodoImg} />
                        </div> 
                        :
                        <div
                            style={{
                                display: "flex",
                                flexWrap: "wrap",
                                gap: "20px",
                            }}
                        >
                            {
                                todoListCached?.data?.data?.map((data, index) => 
                                <Card
                                    key={index}
                                    hoverable
                                    data-cy="todo-item"
                                    style={{ width: "100%", backgroundColor: isDarkMode ? undefined : "white" }}
                                >
                                    <div className="todo-item-content-container">
                                        <div className="checkbox-wrapper">
                                            <Checkbox 
                                                data-cy="todo-item-checkbox"
                                                checked={data.is_active === 0 ? true : false}
                                                onChange={(e) => {
                                                    handletodoListActive(data.id);
                                                }}
                                            />
                                        </div>
                                        <div className="todo-item-content">
                                            <PriorityBadge 
                                                priority={data.priority}
                                            />
                                            <Text data-cy="todo-item-title" delete={data.is_active === 0 ? true : false} >{toTitleCase(data.title)}</Text>
                                            <Button 
                                                data-cy="todo-item-edit-button"
                                                type="link"
                                                icon={<EditOutlined style={{ color: "#A4A4A4" }} />} 
                                                onClick={() => {
                                                    setTodoListSelected(data);
                                                    setIsModalFormOpen(true);
                                                }}
                                            />
                                        </div>
                                        <Button 
                                            data-cy="todo-item-delete-button"
                                            type="default" 
                                            shape="circle"
                                            icon={<DeleteOutlined style={{ color: "#888888" }} />} 
                                            onClick={() => {
                                                setIsModalDeleteOpen(true);
                                                setTodoListSelected(data);
                                            }}
                                        />
                                    </div>
                                </Card>
                                )
                            }
                        </div>
                    }
                    </>
                }

            </div>

            <ModalDelete 
                modalType={"todoList"}
                selectedData={todoListSelected}
                isModalDeleteOpen={isModalDeleteOpen}
                setIsModalDeleteOpen={setIsModalDeleteOpen}
            />

            <ModalForm 
                activityData={activityCachedByID?.data}
                todoData={todoListSelected}
                isModalFormOpen={isModalFormOpen}
                setIsModalFormOpen={setIsModalFormOpen}
                setTodoListSelected={setTodoListSelected}
            />

        </div>
    );
};