import * as React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import dayjs from "dayjs";

import {
    Form, 
    Typography, 
} from "antd";
import { ButtonInfo, ButtonSuccess } from "../../../Components";

import { PICInfoForm } from "./PICInfoForm";
import { CorpInfoForm } from "./CorpInfoForm";
import { ContractForm } from "./ContractInfo/ContractForm";
import { onFinishForm, setFormFieldValue } from "./handlingForm";

import { getAllCorpInfo, postCorpInfo, putCorpInfo, useMutateData } from "../../../_services";

const { Text, Title } = Typography;

const channelData = [
    {
        id: 1,
        name: "POP UP",
        value: "simAds",
    },
    {
        id: 2,
        name: "Flash SMS",
        value: "smsFlash",
    },
    {
        id: 3,
        name: "WhatsApp",
        value: "whatsApp",
    },
    {
        id: 4,
        name: "MMS",
        value: "mms",
    },
    {
        id: 5,
        name: "SMS",
        value: "sms",
    }
];

export const ComplexForm = () => {
    const navigateTo = useNavigate();
    const [form] = Form.useForm();
    const { state } = useLocation();

    const lastContainerRef = React.useRef();
    const [lastContainerWidth, setLastContainerWidth] = React.useState(0);

    const channelDealsInitialValue = [
        {
            "platform": undefined,
            "price": undefined,
            "contractType": undefined,
            "specificDate": undefined
        }
    ];

    const mutateData = useMutateData({
        actionType: state.actionType === "Registration" ? "post" : "put",
        queryKey: ["corpInfoAll"],
        mutateFn: state.actionType === "Registration" ? postCorpInfo : putCorpInfo,
        refetchFN: getAllCorpInfo,
        formProps: form,
        routePath: "/operation/complex",
    });

    React.useEffect(() => {
        if (state?.rowData !== undefined) {
            setFormFieldValue(channelData, form, state);
        }

        const observer = new ResizeObserver(entries => {
            setLastContainerWidth(entries[0].contentRect.width);
        })
        observer.observe(lastContainerRef.current);
        return () => lastContainerRef.current && observer.unobserve(lastContainerRef.current);
    }, [state?.rowData]);

    return (
        <div className="three-col-layout-container">
            <div className="col-left" >
                <Title level={5}>Person In Charge Info {state?.actionType}</Title>
                <PICInfoForm 
                    formProps={form}
                    // onFinishForm={onFinishForm}
                    onFinishForm={(values) => {
                        onFinishForm(channelData, mutateData, values, state);
                    }}
                    state={state}
                    mutation={mutateData}
                />
            </div>
            <div className="col-center">
                <Title level={5}>Corporate Info {state?.actionType}</Title>
                <CorpInfoForm 
                    formProps={form}
                    onFinishForm={(values) => {
                        onFinishForm(channelData, mutateData, values, state);
                    }}
                    state={state}
                    mutation={mutateData}
                />
            </div>
            <div ref={lastContainerRef} className="col-right">
                <Title level={5}>Contract Info {state?.actionType}</Title>
                <Form
                    form={form}
                    labelCol={{ span: lastContainerWidth >= 500 ? 8 : 0 }}
                    wrapperCol={{ span: lastContainerWidth >= 500 ? 12 : 0 }}
                    layout={lastContainerWidth >= 600 ? "horizontal" : "vertical"}
                    // onFinish={onFinishForm}
                    onFinish={(values) => {
                        onFinishForm(channelData, mutateData, values, state);
                    }}
                    disabled={mutateData?.status === "loading" ? true : false}
                    initialValues={{ 
                        channelDeals: [...channelDealsInitialValue]
                    }}
                    style={{
                        width: "auto",
                    }}
                    requiredMark={state?.actionType === "Detail" ? false : true}
                    scrollToFirstError
                >
                    <ContractForm 
                        state={state}
                        formProps={form}
                        channelData={channelData}
                        channelDealsInitialValue={channelDealsInitialValue}
                        lastContainerWidth={lastContainerWidth}
                    />
                
                {
                    state?.actionType !== "Detail" ?
                    <Form.Item
                        style={{
                            display: "flex",
                            justifyContent: "flex-end",
                            marginBottom: 0,
                        }}
                    >
                        <ButtonSuccess 
                            loading={mutateData?.status === "loading" ? true : false}
                            text={state?.actionType === "Registration" ? "Register Corporate" : "Save"}
                            htmlType="submit"
                        />
                    </Form.Item>
                    :
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "flex-end",
                            marginBottom: 0,
                        }}
                    >
                        <ButtonInfo 
                            text="Back"
                            onClick={() => {
                                navigateTo("/operation/complex");
                            }}
                        />
                    </div>
                }
                </Form>
            </div>
        </div>
    );
};