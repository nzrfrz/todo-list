import React from "react";

import { MobileNumber } from "./MobileNumber";
import { OtherNumber } from "./OtherNumber";

export const ContactForm = ({name, label, isMobileNumber}) => {

    switch (isMobileNumber) {
        case true:
            return (
                <MobileNumber 
                    label={label}
                    name={name}
                />
            )
        case false:
            return (
                <OtherNumber
                    label={label}
                    name={name}
                />
            )
        case undefined:
            return (
                <MobileNumber 
                    label={label}
                    name={name}
                />
            )
        default:
            return null;
    }
};