import * as React from "react";

import { Badge } from "antd";

export const PriorityBadge = ({priority}) => {
    
    switch (priority) {
        case "very-high":
            return (
                <Badge data-cy="todo-item-priority-indicator" color="#ED4C5C" />
            );
        case "high":
            return (
                <Badge data-cy="todo-item-priority-indicator" color="#F8A541" />
            ); 
        case "medium":
            return (
                <Badge data-cy="todo-item-priority-indicator" color="#00A790" />
            ); 
        case "low":
            return (
                <Badge data-cy="todo-item-priority-indicator" color="#428BC1" />
            ); 
        case "very-low":
            return (
                <Badge data-cy="todo-item-priority-indicator" color="#8942C1" />
            );
        default:
            break;
    }
    
};