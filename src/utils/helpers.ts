import {IPoint} from "../components/game/reducer";

export const returnInitialMap = (height: number, width: number, initialValue = "transparent"): Array<Array<string>> => {
    return new Array(height).fill(initialValue).map(item => new Array(width).fill(initialValue));
};

export const figureDropped = (figure: Array<IPoint>, map: Array<IPoint>, fieldHeight: number): boolean => {
    return figure.reduce((res: boolean, item: IPoint) => {
        const nextItemX = item.x + 1;
        return res || (nextItemX >= fieldHeight) || (map.find(mapItem => mapItem.x === nextItemX && mapItem.y === item.y) !== undefined);
    }, false);
};

export const calculateMapLines = (map: Array<IPoint>, mapWidth: number) => {
    const mapObject = map.reduce((res: any, item: IPoint) => {
        return {
            ...res,
            [item.x]: (res[item.x.toString()] || []).concat(item)
        };
    }, {});

    const keysToCount = Object.entries(mapObject).reduce((res: Array<number>, item) => {
        const [key, value]: [string, any] = item;
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

export const drawMap = (map: Array<IPoint>, figure: Array<IPoint>, height: number, width: number): Array<Array<string>> => {
    let result = returnInitialMap(height, width);

    map.concat(figure).forEach(item => {
        const row = result[item.x];
        if (row) {
            row[item.y] = item.color;
        }
    });

    return result;
};

export const hasConflicts = (figure: Array<IPoint>, map: Array<IPoint>) => {
    return figure.reduce((res, item) => {
        return res || map.find(el => el.x === item.x && el.y === item.y) !== undefined
    }, false);
};

const hasIllegalCoords = (figure: Array<IPoint>, mapWidth: number) => {
    return figure.reduce((res, item) => {
        return res || item.y < 0 || item.y >= mapWidth;
    }, false);
};

export const rotateFigure = (figure: Array<IPoint>, map: Array<IPoint>, mapWidth: number) => {
    const howFarMove = 5,
        figureClone = figure.map(item => ({...item, x: item.x + howFarMove, y: item.y + howFarMove}));

    const {x: rotationX, y: rotationY} = figureClone[figureClone.length - 1],
        cos = Math.cos(-Math.PI / 2),
        sin = Math.sin(-Math.PI / 2);

    const rotatedFigure = figureClone.map(point => {
        return {
            ...point,
            x: parseInt((cos * (point.x - rotationX) - sin * (point.y - rotationY) + rotationX).toString()) - howFarMove,
            y: parseInt((sin * (point.x - rotationX) + cos * (point.y - rotationY) + rotationY).toString()) - howFarMove
        };
    });

    if (hasConflicts(rotatedFigure, map) || hasIllegalCoords(rotatedFigure, mapWidth)) {
        return figure.map(i => ({...i}));
    } else {
        return rotatedFigure;
    }
};

const randomInteger = (min: number, max: number) => {
    return Math.floor(min + Math.random() * (max + 1 - min));
};

const withProp = (array: Array<Object>, prop: Object): any => {
    return array.map(i => ({...i, ...prop}));
};

const generateId = () => {
    return parseInt((Math.random() * 1000000000000).toString());
};

export const generateFigure = (width: number): Array<IPoint> => {
    const half = Math.floor(width / 2);
    const figures = [
        withProp([{x: -2, y: half - 1}, {x: -2, y: half}, {x: -2, y: half + 1}, {x: -1, y: half}], {color: "#0031ff"}),
        withProp([{x: -1, y: half - 2}, {x: -1, y: half - 1}, {x: -1, y: half + 1}, {x: -1, y: half}], {color: "#00b6df"}),
        withProp([{x: -2, y: half - 1}, {x: -1, y: half - 1}, {x: -1, y: half + 1}, {x: -1, y: half}], {color: "#e17b00"}),
        withProp([{x: -2, y: half + 1}, {x: -1, y: half - 1}, {x: -1, y: half + 1}, {x: -1, y: half}], {color: "#b700ff"}),
        withProp([{x: -2, y: half}, {x: -1, y: half}, {x: -2, y: half + 1}, {x: -1, y: half + 1}], {color: "#e4e300"}),
        withProp([{x: -1, y: half}, {x: -2, y: half + 1}, {x: -1, y: half - 1}, {x: -2, y: half}], {color: "#00e009"}),
        withProp([{x: -1, y: half}, {x: -2, y: half - 1}, {x: -1, y: half + 1}, {x: -2, y: half}], {color: "#e20016"})
    ];

    const id = generateId();
    return withProp(figures[randomInteger(0, figures.length - 1)], {id});
};

export const isFinish = (map: Array<IPoint>) => {
    return map.find(item => item.x === 0) !== undefined;
};