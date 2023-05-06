import * as React from "react";
import { message } from 'antd';

export const MessageContext = React.createContext();

export const MessageContextProvider = ({children}) => {
    const [messageApi, contextHolder] = message.useMessage();

    return (
        <MessageContext.Provider value={{messageApi}}>
            {contextHolder}
            {children}
        </MessageContext.Provider>
    );
};