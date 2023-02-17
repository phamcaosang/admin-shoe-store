import { Button } from "antd"
import { Link } from "react-router-dom"

interface CreatebtnType {
    direction: string,
    text: string
}

export const Createbtn: React.FC<CreatebtnType> = ({ direction, text }: CreatebtnType) => {
    return <Link to={direction}>
        <Button type="primary" style={{ marginBottom: "15px" }}>{text}</Button>
    </Link>
}