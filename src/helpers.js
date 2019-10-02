export const returnInitialMap = () => {
    return new Array(10).fill(new Array(5).fill(0));
};

export const filterFromFigure = (map, value = 0) => {
    return map.map(row => {
        return row.map(item => {
            if (item === 2) {
                return value;
            } else {
                return item;
            }
        });
    })
};

export const printMap = (map) => {
    // console.clear();

    return map.reduce((rowStr, row) => {
        return row.reduce((res, item, index) => {
            const lastItem = index === row.length - 1;
            return `${res} ${item}${lastItem ? "\n" : ""}`
        }, rowStr)
    }, "");
};