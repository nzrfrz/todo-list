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
    UserNameForm,
} from "../../../Components";

export const PICInfoForm = ({formProps, onFinishForm, state, mutation}) => {
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
            {/*
            */}
            <SimpleInputForm 
                name="personalName"
                label="Personal Name"
            />
            <SimpleInputForm 
                name="position"
                label="Position"
            />
            <DOBForm />
            <GenderSelectForm />
            <AddressForm 
                name="personalAddress"
                label="Personal Address"
            />
            <RegionSelectForm 
                formProps={formProps}
                name="personal"
                disabled={mutation?.status === "loading" ? true : false}
            />
            <EmailForm 
                name="personalEmail"
                label="Personal Email"
            />
            <ContactForm 
                name="personalNumber"
                label="Personal Number"
                isMobileNumber={true}
            />
            {
                state?.actionType === "Registration" &&
                <>
                <UserNameForm />
                <PasswordForm 
                    withConfirmPassword={true}
                />
                </>
            }
        </Form>
    );
};