import { Button, Result } from "antd"
import { Link } from "react-router-dom"

export const ErrorPage: React.FC = () => {
    return <Result
        status="404"
        title="404"
        subTitle="Sorry, page not found."
        extra={<Link to={"/"}>
            <Button type="primary">Back Home</Button>
        </Link>}
    />
}