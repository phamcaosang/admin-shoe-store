import { Tag } from "antd"
import { Link } from "react-router-dom"

interface EditbtnType {
    direction: string,
    text: string,
}
export const Editbtn: React.FC<EditbtnType> = ({ direction, text }: EditbtnType) => {
    return <Link to={direction}>
        <Tag color='blue' style={{ width: "50px", textAlign: "center", cursor: "pointer", margin: "2px 6px" }}>{text}</Tag>
    </Link>
}