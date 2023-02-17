import React from "react"
import { Typography } from "antd"
const { Title } = Typography;

interface TitleType {
    text: string,
    level?: 1 | 5 | 2 | 3 | 4 | undefined
}

export const TitleComponent: React.FC<TitleType> = (props: TitleType) => {

    return <div>
        <Title level={props.level}>
            {props.text}
        </Title>
    </div>
}