import * as React from "react";
import { GlobalContext } from "../Context/GlobalContextCreate";

import { 
    Modal, 
    Form,
    Typography,
} from "antd";
import {
    CloseOutlined
} from '@ant-design/icons';

import { SimpleInputForm, SimpleSelectForm, ButtonModalSave } from "../Components";
import { todoListGetAll, todoListPatch, todoListPost, useMutateData } from "../_services";

const priorityData = [
    {
        label: "Very High",
        value: "very-high",
    },
    {
        label: "High",
        value: "high",
    },
    {
        label: "Medium",
        value: "medium",
    },
    {
        label: "Low",
        value: "low",
    },
    {
        label: "Very Low",
        value: "very-low",
    }
];

const { Text } = Typography;

export const ModalForm = ({activityData, todoData, isModalFormOpen, setIsModalFormOpen, setTodoListSelected}) => {

    const { formProps, selectedFilterType } = React.useContext(GlobalContext);
    const todoTitle = Form.useWatch('title', formProps);

    const mutateData = useMutateData({
        actionType: todoData !== undefined ? "patch" : "post",
        queryKey: ["todoList", activityData?.id, selectedFilterType],
        mutateFn: todoData !== undefined ? todoListPatch : todoListPost,
        refetchFN: () => todoListGetAll(activityData?.id, selectedFilterType),
        formProps,
        setIsModalFormOpen
    });

    const onFinishForm = async (values) => {
        const formData = {
            title: values.title,
            activity_group_id: activityData?.id,
            is_active: true,
            priority: values.priority
        }

        if (todoData === undefined) {
            await mutateData.mutateAsync({ payload: formData });
        }
        else {
            await mutateData.mutateAsync({ payload: formData, param: todoData?.id });
        }
    };

    React.useEffect(() => {
        if (todoData !== undefined) {
            formProps.setFieldsValue({
                title: todoData?.title,
                priority: todoData?.priority
            });
        }
    }, [todoData]);
    // console.log(todoTitle);

    return (
        <Modal 
            data-cy="modal-add"
            title={<Text data-cy="modal-add-title" style={{ fontSize: "18px" }}>Tambah List Item</Text>} 
            okText={"Save"}
            open={isModalFormOpen} 
            closeIcon={<CloseOutlined data-cy="modal-add-close-button" />}
            onCancel={() => {
                !mutateData?.isLoading && setIsModalFormOpen(false);
                setTodoListSelected(undefined);
                formProps.resetFields();
            }}
            afterClose={() => {
                setTodoListSelected(undefined);
            }}
            footer={[
                <ButtonModalSave 
                    key={"save"}
                    text="Simpan"
                    size="large"
                    shape="round"
                    disabled={!todoTitle}
                    loading={mutateData?.status === "loading" ? true : false}
                    onClick={() => {
                        formProps.validateFields()
                            .then((values) => {
                                onFinishForm(values);
                            })
                            .catch((info) => {
                                console.log('Validate Failed:', info);
                            });
                    }}
                />
            ]}
        >
            <div className="modal-form-container" style={{ paddingTop: "24px" }}>
                <Form
                    form={formProps}
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 24 }}
                    layout="vertical"
                    name="todoListItem"
                    style={{
                        width: "auto",
                    }}
                    initialValues={{ title: undefined, priority: "very-high"}}
                    scrollToFirstError
                    disabled={mutateData?.status === "loading" ? true : false}
                    requiredMark={todoData === undefined ? true : false}
                >
                    <SimpleInputForm 
                        name="title"
                        label="Nama List Item"
                    />
                    <SimpleSelectForm 
                        name="priority"
                        label="Priority"
                        optionSelect={priorityData}
                    />
                </Form>
            </div>
        </Modal>
    );
};