import * as React from "react";
import { MessageContext } from "../Context/MessageContext";

export const useMessage = () => {
    const { messageApi } = React.useContext(MessageContext);

    const openMessage = (type, key, content, duration) => {
        messageApi.open({
            key,
            type,
            content,
            duration,
        });
    };

    return {
        messageApi: messageApi,
        openMessage: openMessage
    };
};