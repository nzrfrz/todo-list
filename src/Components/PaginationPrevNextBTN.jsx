import { Button } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

export const PaginationPrevNextBTN = (_, type, originalElement) => {
    if (type === 'prev') {
        return <Button type="primary" shape="circle" icon={<LeftOutlined />} />;
    }
    if (type === 'next') {
        return <Button type="primary" shape="circle" icon={<RightOutlined />} />;
    }
    return originalElement;
};