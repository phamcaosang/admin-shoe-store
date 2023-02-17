const weekday = ["Chủ nhật", "Thứ hai", "Thứ ba", "Thứ tư", "Thứ năm", "Thứ sáu", "Thứ bảy"];

export const dateConvertion = (str: string) => {
    const d = new Date(Date.parse(str))
    return `${d.getHours()}:${d.getMinutes()}-${weekday[d.getDay()]}-${d.getDate()}/${d.getMonth()}/${d.getFullYear()}`
}