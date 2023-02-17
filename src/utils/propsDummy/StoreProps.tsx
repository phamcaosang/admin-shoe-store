export interface StoreType {
    id: string,
    name: string,
    address: string,
    phone: string
}


export const dataStore: StoreType[] = [
    {
        id: "1",
        name: "Cửa hàng Linh chiểu",
        address: "148/7 HOÀNG DIỆU 2, PHƯỜNG LINH CHIỂU, THÀNH PHỐ THỦ ĐỨC",
        phone: "0913311222"
    },
    {
        id: "2",
        name: "Cửa hàng Điện Biên Phủ",
        address: "43A ĐIỆN BIÊN PHỦ, PHƯỜNG 15, QUẬN BÌNH THẠNH",
        phone: "0913313333"
    },
    {
        id: "3",
        name: "Cửa hàng Phan Văn Trị",
        address: "1303 PHAN VĂN TRỊ, PHƯỜNG 10, QUẬN GÒ VẤP",
        phone: "0913314444"
    }
]