import * as React from "react";

import {
    Form, 
    Select 
} from "antd";
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';

import { 
    CurrencyForm,
    DateRangeForm,
    ButtonSuccess ,
    ButtonError,
} from "../../../../Components";

import { ContractPrice } from "./ConractPrice";
import { ContractType } from "./ContractType";
import { ContractSelectDate } from "./ContractSelectDate";

export const ContractForm = ({state, formProps, channelData, channelDealsInitialValue, lastContainerWidth}) => {
    const contractActiveDateValue = Form.useWatch('contractActiveDate', formProps);
    const channelDealsFormData = Form.useWatch('channelDeals', formProps);

    const errorCD = React.useMemo(() => {
        const tempPlatformValue = channelDealsFormData === undefined ? undefined : channelDealsFormData[0]?.platform
        if (tempPlatformValue !== undefined && contractActiveDateValue === undefined) {
            return "error";
        }
        return undefined;
    }, [channelDealsFormData, contractActiveDateValue]);

    const filteredChannelData = React.useMemo(() => {
        const tempChannelData = channelData.map((data) => data.name);
        const selectedPlatform = channelDealsFormData?.map((data) => data.platform);
        return tempChannelData.filter((data) => !selectedPlatform?.includes(data));
    }, [channelDealsFormData]);

    const dynamicFormWidth = React.useCallback((fields, index) => {
        switch (true) {
            case fields.length - 1 === 0:
                return {
                    formWidth: "90%",
                    buttonDisplay: "none",
                    buttonContainerWidth: "10%"
                };
            case fields.length - 1 === index && fields.length < 5:
                return {
                    formWidth: "80%",
                    buttonDisplay: "block",
                    buttonContainerWidth: "20%"
                };
            default:
                return {
                    formWidth: "90%",
                    buttonDisplay: "block",
                    buttonContainerWidth: "10%"
                };
        }
    }, []);

    return (
        <>
        <CurrencyForm 
            name="contractValue"
            label="Contract Value"
            prefix="$"
        />
        <DateRangeForm 
            name="contractActiveDate"
            label="Contract Active Date"
            validateStatus={errorCD}
        />
        <Form.List
            name="channelDeals"
        >
            {
                (fields, {add, remove}) => (
                    <>
                    {
                        fields?.map((field, index) => (
                            <div key={index}>
                                <Form.Item
                                    label="Channel Deals"
                                    required={true}
                                    style={{ 
                                        marginBottom: 0 
                                    }}
                                >
                                    <Form.Item
                                        {...field}
                                        key={field.key}
                                        name={[field.name, "platform"]}
                                        validateStatus={errorCD}
                                        help={errorCD === "error" ? "Contract active date still empty" : undefined}
                                        style={{ display: 'inline-block', width: dynamicFormWidth(fields, index).formWidth, paddingRight: "12px" }}
                                        rules={[
                                            {
                                                required: true,
                                                message: "Channel can not be empty"
                                            }
                                        ]}
                                    >
                                        <Select
                                            showSearch
                                            allowClear
                                            size="large"
                                            placeholder="Select Channel"
                                            style={{
                                                width: "100%"
                                            }}
                                            options={
                                                filteredChannelData.map((item) => ({
                                                    value: item,
                                                    label: item
                                                }))
                                            }
                                        />
                                    </Form.Item>

                                    {/* button add and remove */}
                                    {
                                        fields.length - 1 === index && fields.length < 5 ?
                                        <Form.Item
                                            style={{ display: 'inline-block', width: dynamicFormWidth(fields, index).buttonContainerWidth }}
                                        >
                                            <div style={{ display: "flex", gap: "5px", justifyContent: "flex-end" }}>
                                                <ButtonError 
                                                    shape="circle" 
                                                    icon={<MinusOutlined />} 
                                                    style={{ display: dynamicFormWidth(fields, index).buttonDisplay }} 
                                                    onClick={() => remove(field.name)} 
                                                />
                                                <ButtonSuccess 
                                                    shape="circle"
                                                    icon={<PlusOutlined />} 
                                                    disabled={state?.actionType === "Detail" ? true : false}
                                                    onClick={() => {
                                                        add();
                                                        formProps.setFieldsValue(
                                                            {
                                                                channelDeals: [
                                                                    ...channelDealsFormData,
                                                                    ...channelDealsInitialValue
                                                                ]
                                                            }
                                                        );
                                                    }} 
                                                />
                                            </div>
                                        </Form.Item>
                                        :
                                        <Form.Item
                                            style={{ display: 'inline-block', width: dynamicFormWidth(fields, index).buttonContainerWidth, textAlign: "end" }}
                                        >
                                            <ButtonError 
                                                shape="circle" 
                                                icon={<MinusOutlined />} 
                                                disabled={state?.actionType === "Detail" ? true : false}
                                                onClick={() => remove(field.name)} 
                                            />
                                        </Form.Item>
                                    }
                                    {/* button add and remove */}
                                    
                                </Form.Item>

                                <Form.Item
                                    noStyle
                                    shouldUpdate={(prevValues, currentValues) => (prevValues.contractActiveDate !== currentValues.contractActiveDate) || (prevValues.channelDeals[index] !== currentValues.channelDeals[index])}
                                >
                                    {
                                        (({getFieldValue}) => 
                                            getFieldValue("contractActiveDate") === undefined || getFieldValue("channelDeals")[index].platform === undefined ?
                                            null
                                            :
                                            <Form.Item
                                                noStyle
                                            >
                                                <ContractPrice 
                                                    field={field}
                                                    lastContainerWidth={lastContainerWidth}
                                                />
                                                <ContractType
                                                    index={index}
                                                    formProps={formProps}
                                                    field={field}
                                                    lastContainerWidth={lastContainerWidth}
                                                />
                                                <ContractSelectDate
                                                    index={index}
                                                    field={field}
                                                    formProps={formProps}
                                                    lastContainerWidth={lastContainerWidth}
                                                />
                                            </Form.Item>
                                        )
                                    }
                                </Form.Item>


                            </div>
                        ))
                    }
                    </>
                )
            }
        </Form.List>
        </>
    );
};