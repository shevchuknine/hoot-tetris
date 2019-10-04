export const returnInitialMap = (height, width, initialValue = "white") => {
    return new Array(height).fill(initialValue).map(item => new Array(width).fill(initialValue));
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

export const calculateMapLines = (map, mapWidth) => {
    const mapObject = map.reduce((res, item) => {
        return {
            ...res,
            [item.x]: (res[item.x] || []).concat(item)
        };
    }, {});

    const keysToCount = Object.entries(mapObject).reduce((res, [key, value]) => {
        if (value.length === mapWidth) {
            return res.concat(+key);
        } else {
            return res;
        }
    }, []);

    return {
        map: map.filter(item => !keysToCount.includes(item.x))
            .map(item => ({...item, x: item.x + keysToCount.filter(el => item.x < el).length})),
        count: keysToCount.length
    }
};

export const drawMap = (map, figure, height, width) => {
    let result = returnInitialMap(height, width);

    map.forEach(item => {
        result[item.x][item.y] = "red";
    });

    figure.forEach(item => {
        result[item.x][item.y] = "blue";
    });

    return result;
};