import * as React from "react";

import { 
    Typography,
    Form,
    DatePicker
} from 'antd';

const { Text } = Typography;
const { RangePicker } = DatePicker;

export const ContractSelectDate = ({index, field, formProps, lastContainerWidth}) => {
    const channelDealsFormData = Form.useWatch("channelDeals", formProps);

    const isCustomContract = React.useCallback((index) => {
        if (channelDealsFormData !== undefined) {
            switch (channelDealsFormData[index].contractType) {
                case "specific":
                    return true;
                case "general":
                    return false;
                default:
                    return false;
            }
        }
        else {
            return;
        }
    }, [channelDealsFormData]);

    const isSpecificDateSelected = React.useCallback((index) => {
        if (channelDealsFormData !== undefined && channelDealsFormData[index].specificDate !== undefined) {
            return true;
        }
        else {
            return false;
        }
    }, [channelDealsFormData]);

    return (
        <>
        <Form.Item
            labelCol={{ span: lastContainerWidth >= 500 ? 12 : 0 }}
            wrapperCol={{ span: lastContainerWidth >= 500 ? 8 : 0 }}
            label={lastContainerWidth >= 500 ? "Select Date" : ""}
            style={{ 
                marginBottom: 0,
            }}
        >
            {/* custom label */}
            {
                lastContainerWidth <= 500 &&
                <Form.Item 
                    style={{ display: 'inline-block', width: '40%', paddingRight: "5px", textAlign: "end" }}
                >
                    <Text>Select Date :</Text>
                </Form.Item>
            }
            {/* custom label */}

            <Form.Item
                {...field}
                key={field.key}
                name={[field.name, "specificDate"]}
                validateStatus={isCustomContract(index) && !isSpecificDateSelected(index) ? "warning" : undefined}
                help={isCustomContract(index) && !isSpecificDateSelected(index) ? "Please select contract date": undefined}
                style={lastContainerWidth >= 500 ? {} : { display: 'inline-block', width: '60%' }}
                rules={[
                    {
                        required: true,
                        message: "Please select contract date"
                    }
                ]}
            >
                <RangePicker 
                    size="large"
                    placeholder={["Start", "End"]}
                    disabled={!isCustomContract(index)}
                    style={{
                        width: "100%"
                    }}
                />
            </Form.Item>
        </Form.Item>
        </>
    );
};