import * as React from "react";
import { GlobalContext } from "../Context/GlobalContextCreate";

import { 
    Modal, 
    Typography,
} from "antd";
import { ButtonModalOK } from "./ButtonModalOK";
import { ButtonModalCancel } from "./ButtonModalCancel";

import alertError from "../assets/images/alert-error-img.png";

import { 
    activityDelete, 
    activityGetAll, 
    todoListDelete, 
    todoListGetAll, 
    useMutateData 
} from "../_services";
import { toTitleCase } from "../_helpers";

const { Text } = Typography;

export const ModalDelete = ({modalType, selectedData, isModalDeleteOpen, setIsModalDeleteOpen, setTodoListSelected}) => {
    const { selectedFilterType } = React.useContext(GlobalContext);
    
    const mutateData = useMutateData({
        actionType: "delete",
        queryKey: modalType === "activity" ? ["activityAll"] : ["todoList", selectedData?.activity_group_id, selectedFilterType],
        mutateFn: modalType === "activity" ? activityDelete : todoListDelete,
        refetchFN: () => modalType === "activity" ? activityGetAll() : todoListGetAll(selectedData?.activity_group_id, selectedFilterType),
        setIsModalDeleteOpen
    });

    return (
        <Modal
            data-cy="modal-delete"
            centered
            closable={false}
            footer={null}
            open={isModalDeleteOpen}
            afterClose={() => {
                setTodoListSelected(undefined);
            }}
            onCancel={() => {
                !mutateData?.isLoading && setIsModalDeleteOpen(false);
            }}
            width={490}
        >
            <div
                className="modal-delete-container"
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "31px"
                }}
            >
                <div className="image-alert-container">
                    <img src={alertError} />
                </div>
                <div className="alert-text-container" style={{ display: "flex", flexDirection: "column", alignItems: "center" }} >
                    <Text style={{ fontSize: "18px" }}>
                        Apakah anda yakin menghapus {modalType === "activity" ? "activity" : "List Item"}
                    </Text>
                    <Text style={{ fontSize: "18px", fontWeight: "bold" }}>
                        "{toTitleCase(selectedData?.title)}"?
                    </Text>
                </div>
                <div 
                    className="modal-action-button"
                    style={{
                        display: "flex",
                        gap: "20px"
                    }}
                >
                    <ButtonModalCancel 
                        text="Batal"
                        shape="round"
                        loading={mutateData?.isLoading}
                        style={{
                            color: "black"
                        }}
                        onClick={() => {
                            setIsModalDeleteOpen(false);
                        }}
                    />
                    <ButtonModalOK 
                        text="Hapus"
                        shape="round"
                        loading={mutateData?.isLoading}
                        onClick={() => {
                            mutateData.mutateAsync({param: selectedData?.id})
                        }}
                    />
                </div>
            </div>
        </Modal>
    );
};