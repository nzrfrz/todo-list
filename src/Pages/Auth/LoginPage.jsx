import * as React from "react";

import { 
    Form, 
    Typography
} from "antd";

import { 
    ButtonSuccess,
    PasswordForm,
    SimpleInputForm 
} from "../../Components";

import { useMutateData, userLogin } from "../../_services";

const { Title, Text } = Typography;

export const LoginPage = () => {
    const [form] = Form.useForm();

    const mutateLogin = useMutateData({
        actionType: "login",
        mutateFn: userLogin,
        routePath: "/dashboard"
    });

    const onFinish = (values) => {
        mutateLogin.mutateAsync({payload: values});
    };

    return (
        <div className="login-page-container">
            <div 
                className="login-page-title-container"
                style={{
                    display: "flex",
                    flexDirection: 'column',
                    alignItems: "center"
                }}
            >
                <Title level={3} style={{ color: "white" }} >L O G I N</Title>
                <Text>
                    admin:password
                </Text>
            </div>
            <Form
                form={form}
                wrapperCol={{ span: 24 }}
                layout="vertical"
                disabled={mutateLogin?.isLoading}
                onFinish={onFinish}
                style={{
                    width: "100%",
                }}
                scrollToFirstError
            >
                <SimpleInputForm 
                    name="user"
                    label="User"
                    placeholder="Input user name or email"
                    validateStatus={mutateLogin?.error?.response?.data === undefined ? undefined : "error"}
                    help={mutateLogin?.error?.response?.data === undefined ? undefined : mutateLogin?.error?.response?.data?.message}
                />
                <PasswordForm 
                    withConfirmPassword={false}
                    validateStatus={mutateLogin?.error?.response?.data === undefined ? undefined : "error"}
                    help={mutateLogin?.error?.response?.data === undefined ? undefined : mutateLogin?.error?.response?.data?.message}
                />
                <Form.Item
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        marginBottom: 0,
                    }}
                >
                    <ButtonSuccess 
                        text="L O G I N"
                        htmlType="submit"
                        loading={mutateLogin?.isLoading}
                    />
                </Form.Item>
            </Form>
        </div>
    );
};