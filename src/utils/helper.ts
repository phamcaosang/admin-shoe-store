export const toTitleCase = (str: String) => {
    return str.toLowerCase().split(' ').map(function (word) {
        return (word.charAt(0).toUpperCase() + word.slice(1));
    }).join(' ');
}


export const isNumeric = (str: any) => {
    return !isNaN(parseFloat(str)) && isFinite(str);
}


export const startsWithNumber = (str: any) => {
    return /^\d/.test(str);
}

export const getUniqueItems = (arr: any[]) => {
    return [...new Set(arr)]
}

export const exposeFilters = (arr: any[]) => {
    return getUniqueItems(arr).map(item => {
        return {
            text: item,
            value: item
        }
    })
}