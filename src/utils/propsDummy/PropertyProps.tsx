export interface PropItemType {
    id: string,
    value: string
}

export interface PropertyType {
    id: string,
    name: string,
    productType: string,
    value: PropItemType[]
}

export const dataCoreProperty: PropertyType[] = [
    {
        id: "1",
        name: "size",
        productType: "Giày",
        value: [
            {
                id: '1',
                value: '39',
            },
            {
                id: '2',
                value: '40',
            },
            {
                id: '3',
                value: '41',
            },
            {
                id: '4',
                value: '42',
            },
            {
                id: '5',
                value: '43',
            },
            {
                id: '6',
                value: '44',
            },
            {
                id: '7',
                value: '45',
            }
        ]
    },
    {
        id: "2",
        name: "size",
        productType: "Vớ",
        value: [
            {
                id: '1',
                value: 'XS',
            },
            {
                id: '2',
                value: 'S',
            },
            {
                id: '3',
                value: 'M',
            },
            {
                id: '4',
                value: 'L',
            },
            {
                id: '5',
                value: 'XL',
            },
        ],
    },
    {
        id: "3",
        name: "size",
        productType: "Áo",
        value: [
            {
                id: '1',
                value: 'XS',
            },
            {
                id: '2',
                value: 'S',
            },
            {
                id: '3',
                value: 'M',
            },
            {
                id: '4',
                value: 'L',
            },
            {
                id: '5',
                value: 'XL',
            },
        ],
    },
    {
        id: "4",
        name: "color",
        productType: "Giày",
        value: [
            {
                id: '1',
                value: 'Xanh ngọc',
            },
            {
                id: '2',
                value: 'Vàng trắng',
            },
            {
                id: '3',
                value: 'Vàng',
            },
            {
                id: '4',
                value: 'Trắng',
            },
            {
                id: '5',
                value: 'Xám',
            },
        ],
    },
    {
        id: "4",
        name: "color",
        productType: "Áo",
        value: [
            {
                id: '1',
                value: 'Đỏ',
            },
            {
                id: '2',
                value: 'Vàng',
            },
            {
                id: '3',
                value: 'Xanh neon',
            },
            {
                id: '4',
                value: 'Trắng',
            },
            {
                id: '5',
                value: 'Tím',
            },
        ],
    },
]


export const dataSpecProperty: PropertyType[] = [
    {
        id: "1",
        name: "Cầu thủ nổi tiếng đại diện",
        productType: "Giày",
        value: [
            {
                id: '1',
                value: 'Ramos, Nghiêm Xuân Tú, Đặng Văn Lâm, Nguyễn Tuấn Anh....',
            },
            {
                id: '2',
                value: 'Kevin De Bruyne, Harry Kane và Mason Greendwood....',
            },
        ]
    },
    {
        id: "2",
        name: "Bộ sưu tập",
        productType: "Giày",
        value: [
            {
                id: '1',
                value: 'Robotic',
            },
            {
                id: '2',
                value: 'Blueprint',
            },
        ]
    },
    {
        id: "50",
        name: "Bộ sưu tập version 2",
        productType: "Giày",
        value: [
            {
                id: '1',
                value: 'Robotic',
            },
            {
                id: '2',
                value: 'Blueprint',
            },
        ]
    },
    {
        id: "3",
        name: "Năm sản xuất",
        productType: "Giày",
        value: [
            {
                id: '1',
                value: '2020',
            },
            {
                id: '2',
                value: '2021',
            },
            {
                id: '3',
                value: '2022',
            }
        ]
    },
    {
        id: "4",
        name: "Công nghệ",
        productType: "Giày",
        value: [
            {
                id: '1',
                value: 'Khuôn đế được cải tiến bám sân, gót giày làm bằng da lộn êm ái, đinh AG phù hợp cho sân cỏ nhân tạo và tự nhiên.',
            },
            {
                id: '3',
                value: 'Cổ thun Flyknit, ACC (đá mọi thời tiết), khuôn đế Hyper Quick System bám sân, lót NikeGrip chống trượt.'
            }
        ]
    },
]