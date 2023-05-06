import * as React from "react";
// import { GlobalContext } from "../../Context/GlobalContext";
import { GlobalContext } from "../../Context/GlobalContextCreate";

import { 
    Form,
    Typography, 
} from "antd";

import { 
    SimpleInputForm,
    SimpleNumberForm,
    UserNameForm,
    SimpleSelectForm,
    GenderSelectForm, 
    EmailForm,
    DOBForm,
    DateRangeForm,
    CurrencyForm,
    AddressForm,
    RegionSelectForm
} from "../../Components";

import { ContactForm } from "../../Components";
import { useNotification, useContainerDimension } from "../../_helpers";

const { Title } = Typography;

export const DemoDashboard = () => {
    // const containerRef = React.useRef(null);
    // const { containerRef, dimensions } = useContainerDimension();
    // console.log("CONTAINER REF: \n", containerRef?.current?.clientWidth);
    // console.log("CONTAINER REF: \n", dimensions);
    
    const { apiNotif, openNotif } = useNotification();

    const [form] = Form.useForm();

    return (
        <div className="fix-height-content-container">
            <Title>
                DASHBOARD
            </Title>
            <Form
                form={form}
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 10 }}
                autoComplete="off"
                layout="horizontal"
                name="userProfile"
                requiredMark={true}
                style={{
                    width: "100%",
                }}
                scrollToFirstError
                disabled={false}
            >
            </Form>
        </div>
    );
};