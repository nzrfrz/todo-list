import * as React from "react";

import { Form } from "antd";
import { 
    AddressForm,
    ContactForm,
    DOBForm,
    EmailForm,
    GenderSelectForm,
    PasswordForm,
    RegionSelectForm,
    SimpleInputForm, 
    SimpleNumberForm, 
    SimpleSelectForm, 
    UserNameForm,
    ButtonSuccess
} from "../../../Components";

export const CorpInfoForm = ({formProps, onFinishForm, state, mutation}) => {
    return (
        <Form
            form={formProps}
            wrapperCol={{ span: 24 }}
            layout="vertical"
            onFinish={onFinishForm}
            style={{
                width: "auto",
            }}
            requiredMark={state?.actionType === "Detail" ? false : true}
            disabled={mutation?.status === "loading" ? true : false}
            scrollToFirstError
        >

            <SimpleInputForm 
                name="corporateName"
                label="Corporate Name"
            />
            <SimpleInputForm 
                name="corporateSector"
                label="Corporate Sector"
            />
            <SimpleSelectForm 
                name="businessScale"
                label="Business Scale"
                optionSelect={[
                    {
                        label: "Domestic",
                        value: "domestic",
                    },
                    {
                        label: "International",
                        value: "international",
                    },
                ]}
            />
            <EmailForm 
                name="officeEmail"
                label="Office Email"
            />
            <ContactForm 
                name="officeNumber"
                label="Office Number"
                isMobileNumber={false}
            />
            <AddressForm 
                name="officeAddress"
                label="Office Address"
            />
            <RegionSelectForm 
                formProps={formProps}
                disabled={mutation?.status === "loading" ? true : false}
            />
            <SimpleNumberForm 
                name="postalCode"
                label="Postal Code"
            />
            {/*
            */}
           
        </Form>
    );
};