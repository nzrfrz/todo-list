import * as React from "react";
import { notification } from 'antd';

export const NotificationContext = React.createContext();

export const NotifContextProvider = ({children}) => {
    const [api, contextHolder] = notification.useNotification();

    return (
        <NotificationContext.Provider value={{api}}>
            {contextHolder}
            {children}
        </NotificationContext.Provider>
    );
};