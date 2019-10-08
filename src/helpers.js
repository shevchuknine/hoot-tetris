export const returnInitialMap = (height, width, initialValue = "white") => {
    return new Array(height).fill(initialValue).map(item => new Array(width).fill(initialValue));
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
        const row = result[item.x];
        if (row) {
            row[item.y] = "red";
        }
    });

    figure.forEach(item => {
        const row = result[item.x];
        if (row) {
            row[item.y] = "blue";
        }
    });

    return result;
};

export const hasConflicts = (figure, map) => {
    console.log(map);
    return figure.reduce((res, item) => {
        return res || map.find(el => el.x === item.x && el.y === item.y) !== undefined
    }, false);
};

const hasIllegalCoords = (figure, mapWidth) => {
    return figure.reduce((res, item) => {
        return res || item.y < 0 || item.y >= mapWidth;
    }, false);
};

export const rotateFigure = (figure, map, mapWidth) => {
    const howFarMove = 5,
        figureClone = figure.map(item => ({...item, x: item.x + howFarMove, y: item.y + howFarMove}));

    const {x: rotationX, y: rotationY} = figureClone[figureClone.length - 1],
        cos = Math.cos(-Math.PI / 2),
        sin = Math.sin(-Math.PI / 2);

    const rotatedFigure = figureClone.map(point => {
        return {
            ...point,
            x: parseInt(cos * (point.x - rotationX) - sin * (point.y - rotationY) + rotationX) - howFarMove,
            y: parseInt(sin * (point.x - rotationX) + cos * (point.y - rotationY) + rotationY) - howFarMove
        };
    });

    if (hasConflicts(rotatedFigure, map) || hasIllegalCoords(rotatedFigure, mapWidth)) {
        return figure.map(i => ({...i}));
    } else {
        return rotatedFigure;
    }
};

const randomInteger = (min, max) => {
    return Math.floor(min + Math.random() * (max + 1 - min));
}

export const generateFigure = (width) => {
    const half = Math.floor(width / 2);
    const figures = [
        [{x: -2, y: half - 1}, {x: -2, y: half}, {x: -2, y: half + 1}, {x: -1, y: half}],
        [{x: -1, y: half - 2}, {x: -1, y: half - 1}, {x: -1, y: half + 1}, {x: -1, y: half}],
        [{x: -2, y: half - 1}, {x: -1, y: half - 1}, {x: -1, y: half + 1}, {x: -1, y: half}],
        [{x: -2, y: half + 1}, {x: -1, y: half - 1}, {x: -1, y: half + 1}, {x: -1, y: half}],
        [{x: -2, y: half}, {x: -1, y: half}, {x: -2, y: half + 1}, {x: -1, y: half + 1}],
        [{x: -1, y: half}, {x: -2, y: half + 1}, {x: -1, y: half - 1}, {x: -2, y: half}],
        [{x: -1, y: half}, {x: -2, y: half - 1}, {x: -1, y: half + 1}, {x: -2, y: half}],
    ];

    return figures[randomInteger(0, figures.length - 1)];
};

export const isFinish = (map) => {
    return map.find(item => item.x === 0) !== undefined;
};