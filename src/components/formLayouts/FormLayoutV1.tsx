
interface FormLayoutV1Type {
    title: string,
    children: React.ReactNode
    styleWrapper?: any,
    styleHeading?: any
}


export const FormLayoutV1: React.FC<FormLayoutV1Type> = ({ title, children, styleWrapper, styleHeading }: FormLayoutV1Type) => {
    return <div
        style={{
            margin: "50px auto 0 auto",
            maxWidth: "750px",
            backgroundColor: "white",
            padding: "30px",
            ...styleWrapper
        }}
    >
        <h1
            style={{
                fontSize: "32px",
                textAlign: "center",
                marginBottom: "30px",
                ...styleHeading
            }}
        >{title}</h1>

        {children}
    </div>
}