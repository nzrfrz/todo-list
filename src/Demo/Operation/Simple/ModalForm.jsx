import * as React from "react";
import { useLocation } from "react-router-dom";

import { 
    Modal, 
    Form,
    Button
} from "antd";
import { 
    ButtonSuccess, 
    SimpleInputForm,
    SimpleNumberForm,
    CurrencyForm,
} from "../../../Components";

import { 
    useMutateData, 
    getMedicinesPaginated,
    postMedicines, 
    putMedicines 
} from "../../../_services";
import { toTitleCase, urlPaginationSplitter } from "../../../_helpers";

export const ModalForm = ({isModalFormOpen, setIsModalFormOpen, actionType, formProps, selectedRowData, searchValue}) => {
    const location = useLocation();
    const paginationSplitter = urlPaginationSplitter(location.search);

    const mutateData = useMutateData({
        actionType,
        queryKey: ["medicines", Number(paginationSplitter.limit), actionType === "post" ? 1 : Number(paginationSplitter.page), searchValue],
        mutateFn: actionType === "post" ? postMedicines : putMedicines,
        formProps,
        refetchFN: () => getMedicinesPaginated(Number(paginationSplitter.limit), actionType === "post" ? 1 : Number(paginationSplitter.page), searchValue),
        setIsModalFormOpen
    });

    const actionTypeAlias = React.useMemo(() => {
        switch (actionType) {
            case "post":
                return "Add New User";
            case "put":
                return "Edit User";
            case "viewDetail":
                return "User Detail";
            default:
                break;
        }
    }, [actionType]);

    const onFinishForm = (values) => {
        const formData = {
            ...values,
            name: toTitleCase(values.name),
            manufacturer: toTitleCase(values.manufacturer),
            dosage: values.dosage.toString() + " mg",
            price: values.price.toString(),
        }

        if (actionType === "post") {
            mutateData.mutateAsync({payload: formData});
        }
        else {
            mutateData.mutateAsync({payload: formData, dataID: selectedRowData.id});
        }
        // console.log(formData);
    };

    return (
        <Modal 
            title={actionTypeAlias} 
            okText={"Save"}
            open={isModalFormOpen} 
            onCancel={() => setIsModalFormOpen(false)}
            footer={[
                <Button
                    key="back"
                    loading={mutateData?.status === "loading" ? true : false}
                    onClick={() => setIsModalFormOpen(false)}
                >
                    Cancel
                </Button>,
                actionType !== "viewDetail" &&
                <ButtonSuccess
                    loading={mutateData?.status === "loading" ? true : false}
                    key="save" 
                    text="Save"
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
                    wrapperCol={{ span: 16 }}
                    layout="horizontal"
                    name="medicine"
                    style={{
                        width: "auto",
                    }}
                    scrollToFirstError
                    disabled={actionType === "viewDetail" || mutateData?.status === "loading" ? true : false}
                    requiredMark={actionType !== "viewDetail" ? true : false}
                >

                    <SimpleInputForm 
                        name="name"
                        label="Medicine Name"
                    />
                    <SimpleInputForm 
                        name="manufacturer"
                        label="Manufacturer"
                    />
                    <SimpleNumberForm 
                        name="dosage"
                        label="Dosage"
                    />
                    <SimpleNumberForm 
                        name="quantity"
                        label="Quantity"
                    />
                    <CurrencyForm 
                        name="price"
                        label="Price"
                        prefix="$"
                    /> 
                    {/* 
                */}
                </Form>
            </div>
        </Modal>
    );
};