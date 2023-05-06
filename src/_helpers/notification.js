import * as React from "react";
import { NotificationContext } from "../Context/NotifContext";

export const notifMessage = (actionType) => {
    switch (actionType) {
        case "login":
            return {
                messageInit: "Logging in...",
                descriptionInit: "Please do not close, change, or refresh the page !!",
                descriptionSuccess: "Login success",
            }
        case "logout":
            return {
                messageInit: "Logging out...",
                descriptionInit: "Please do not close, change, or refresh the page !!",
                descriptionSuccess: "Logout success, redirecting to login...",
            }
        case "get":
            return {
                messageInit: "Fetching data...",
                descriptionInit: "Please do not close, change, or refresh the page !!",
                descriptionSuccess: "Data fetched successfully",
            }
        case "post":
            return {
                messageInit: "Creating new data...",
                descriptionInit: "Please do not close, change, or refresh the page !!",
                descriptionSuccess: "Data saved successfully",
            }
        case "put":
        case "patch":
            return {
                messageInit: "Editing existing data...",
                descriptionInit: "Please do not close, change, or refresh the page !!",
                descriptionSuccess: "Data saved successfully",
            }
        case "delete":
            return {
                messageInit: "Deleting data...",
                descriptionInit: "Please do not close, change, or refresh the page !!",
                descriptionSuccess: "Data deleted successfully",
            }
        default:
            break;
    }
};

export const useNotification = () => {
    const { api } = React.useContext(NotificationContext);

    const setBgColor = (type) => {
        switch (type) {
            case "info":
                return "#7dd3fc";
            case "error":
                return "#fca5a5";
            case "success":
                return "#bbf7d0";
            case "warning":
                return "#fed7aa";
            default:
                break;
        };
    };

    const openNotification = (type, key, message, description) => {
        const notifContainer = document.querySelector('.custom-notif-class');
        const noticeMessage = document.querySelector('.ant-notification-notice-message');
        const noticeIcon = document.querySelector('.ant-notification-notice-with-icon');

        if (noticeIcon) noticeIcon.setAttribute('data-cy', 'modal-information-icon');
        if (notifContainer) notifContainer.setAttribute('data-cy', 'modal-information');
        if (noticeMessage) noticeMessage.setAttribute('data-cy', 'modal-information-title');

        api[type]({
            key,
            message,
            description,
            duration: 0,
            placement: "bottomRight",
            className: "custom-notif-class",
            style: {
                backgroundColor: setBgColor(type),
                color: "black"
            }
        });
    };

    const destroyNotif = () => {
        // setTimeout(() => {
        //     api.destroy();
        // }, 2000);
    };

    return {
        apiNotif: api,
        openNotif: openNotification,
        destroyNotif: destroyNotif,
    };
};