import * as React from "react";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../Context/GlobalContextCreate";
import dayjs from "dayjs";
import 'dayjs/locale/id'
dayjs.locale("id");

import { 
    Card,
    Button,
    Typography, 
} from "antd";
import {
    PlusOutlined,
    DeleteOutlined,
} from '@ant-design/icons';

import { ModalDelete, ButtonAddActivity, LoaderRC } from "../Components";
import emptyActivityImg from "../assets/images/activity-empty-state.png";

import { 
    queryClientInstance, 
    useQueryData, 
    activityGetAll, 
    activityPost,
    useMutateData 
} from "../_services";

const { Meta } = Card;
const { Text } = Typography;

export const Dashboard = () => {
    const navigateTo = useNavigate();
    const { isDarkMode, windowDimension } = React.useContext(GlobalContext);

    const [isModalDeleteOpen, setIsModalDeleteOpen] = React.useState(false);
    const [activitySelected, setActivitySelected] = React.useState(undefined);

    const cachedData = queryClientInstance.getQueryState(["activityAll"]);
    useQueryData({
        queryKey: ["activityAll"],
        queryFn: cachedData?.data?.data === undefined ? activityGetAll() : null,
        isEnableFetch: cachedData?.data?.data === undefined ? true : false,
        refetchInterval: cachedData?.data?.data === undefined ? 500 : false,
    });

    const mutateData = useMutateData({
        actionType: "post",
        queryKey: ["activityAll"],
        mutateFn: activityPost,
        refetchFN: activityGetAll,
    });

    const cardWidth = React.useMemo(() => {
        if (windowDimension.width > 744) return 222
        return "100%"
        
    }, [windowDimension.width]);

    return (
        <div className="one-column-layout-container" >
            <div className="page-content-custom">
                
                <div className="content-title-container">
                    <Text data-cy="activity-title" className="activity-title" >Activity</Text>
                    <ButtonAddActivity 
                        text="Tambah"
                        size="large"
                        shape="round"
                        disabled={mutateData?.isLoading}
                        icon={<PlusOutlined />}
                        onClick={() => {
                            const formData = {
                                title: "New Activity",
                                email: "nzr.frz@gmail.com"
                            };
                            mutateData.mutateAsync({payload: formData});
                        }}
                    />
                </div>

                {
                    cachedData?.fetchStatus !== "idle" ? 
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
                        cachedData?.data?.data.length === 0 ?
                        <div 
                            data-cy="empty-activity-state" 
                            className="empty-activity-container" 
                            style={{
                                display: "flex",
                                alignSelf: "center",
                                height: `${windowDimension.height - 230}px`,
                                "--imgHeight": `${windowDimension.height - 250}px`
                            }}
                        >
                            <img src={emptyActivityImg} />
                        </div> 
                        :
                        <div
                            className="activity-items-container"
                        >
                            {
                                cachedData?.data?.data.map((data, index) => 
                                <Card
                                    key={index}
                                    hoverable
                                    data-cy="activity-item"
                                    style={{ width: cardWidth, backgroundColor: isDarkMode ? undefined : "white" }}
                                    bodyStyle={{
                                        display: "flex",
                                        width: "100%",
                                        height: 234,
                                        flexDirection: "column",
                                    }}
                                >
                                    <Meta
                                        data-cy="activity-item-title"
                                        style={{
                                            display: "flex",
                                            flexGrow: 1,
                                        }}
                                        title={data.title}
                                        onClick={() => {
                                            navigateTo(`/activity_detail/${data?.id}`, { state: {activityID: data?.id} });
                                            console.log("GOT TO DETAIL", data?.id);
                                        }}
                                    />
                                    <div className="card-footer">
                                        <Text data-cy="activity-item-date" key="activity-item-date">{dayjs(data.created_at).format("DD MMMM YYYY")}</Text>
                                        <Button 
                                            data-cy="activity-item-delete-button"
                                            type="link" 
                                            icon={<DeleteOutlined style={{ color: "#888888" }} />} 
                                            onClick={() => {
                                                setActivitySelected(data);
                                                setIsModalDeleteOpen(true);
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
                modalType={"activity"}
                selectedData={activitySelected}
                isModalDeleteOpen={isModalDeleteOpen}
                setIsModalDeleteOpen={setIsModalDeleteOpen}
            />

        </div>
    );
};