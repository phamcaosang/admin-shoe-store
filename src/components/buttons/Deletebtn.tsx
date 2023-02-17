import { Tag } from "antd"

interface ViewbtnType {
    text: string,
    action: () => any
}


export const Deletebtn: React.FC<ViewbtnType> = ({ text, action }: ViewbtnType) => {
    return <Tag
        onClick={action}
        color='red' style={{ width: "50px", textAlign: "center", cursor: "pointer", margin: "2px 6px" }}>
        {text}
    </Tag>
}