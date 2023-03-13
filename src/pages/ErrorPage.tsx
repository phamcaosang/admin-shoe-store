import { Button, Result } from "antd"
import { Link } from "react-router-dom"

export const ErrorPage: React.FC = () => {
    return <Result
        status="404"
        title="404"
        subTitle="Không thể tìm thấy trang"
        extra={<Link to={"/"}>
            <Button type="primary">Về trang chính</Button>
        </Link>}
    />
}