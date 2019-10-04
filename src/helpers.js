export const returnInitialMap = (height, width) => {
    return new Array(height).fill(0).map(item => new Array(width).fill(0));
};

export const transformEveryElement = (array, callback) => {
    return array.map(callback);
};

export const figureDropped = (figure, map, fieldHeight) => {
    return figure.reduce((res, item) => {
        const nextItemX = item.x + 1;
        return res || (nextItemX >= fieldHeight) || (map.find(mapItem => mapItem.x === nextItemX && mapItem.y === item.y) !== undefined);
    }, false);
};

export const drawMap = (map, figure, height, width) => {
    console.clear();
    let result = returnInitialMap(height, width);

    map.forEach(item => {
        result[item.x][item.y] = 1;
    });

    figure.forEach(item => {
        result[item.x][item.y] = 2;
    });

    return result.map(item => item.reduce((res, i) => `${res} ${i}`, "")).join("\n")
};