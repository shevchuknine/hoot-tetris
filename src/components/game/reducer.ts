import {
    calculateMapLines,
    figureDropped,
    generateFigure,
    hasConflicts,
    isFinish,
    rotateFigure
} from "../../utils/helpers";
import {FIELD_HEIGHT, FIELD_WIDTH} from "./constants";

export interface IPoint {
    id: number,
    x: number,
    y: number,
    color: string
}

interface State {
    figure: Array<IPoint>,
    map: Array<IPoint>,
    count: number
}

interface Action {
    type: string,
    payload?: number
}

const actionTypes = {
    changeX: "changeX",
    changeY: "changeY",
    rotate: "rotate"
};

export const getInitialState = (): State => {
    return {figure: generateFigure(FIELD_WIDTH), map: [], count: 0};
};

export const reducer = (state: State, action: Action): State => {
    if (action.type === actionTypes.changeX || action.type === actionTypes.changeY) {
        let nextFigure: Array<IPoint> = [];

        if (action.type === actionTypes.changeX) {
            const {figure} = state;
            nextFigure = figure.map((item) => ({...item, x: item.x + 1}));
        } else if (action.type === actionTypes.changeY) {
            const {figure} = state,
                changedFigure = figure.map(i => ({...i, y: i.y + (action.payload || 0)})),
                isMovementAllowed = changedFigure.reduce((res, item) => {
                    return res && (item.y >= 0) && (item.y < FIELD_WIDTH);
                }, true) && !hasConflicts(changedFigure, state.map);

            if (isMovementAllowed) {
                nextFigure = changedFigure;
            } else {
                return state;
            }
        }

        const isFigureDropped = figureDropped(nextFigure, state.map, FIELD_HEIGHT);

        if (isFigureDropped) {
            const {map, count} = calculateMapLines(state.map.concat(nextFigure), FIELD_WIDTH);

            if (isFinish(map)) {
                return getInitialState();
            } else {
                return {
                    ...state,
                    figure: generateFigure(FIELD_WIDTH),
                    map,
                    count: state.count + count
                };
            }
        } else {
            return {
                ...state,
                figure: nextFigure
            };
        }
    } else if (action.type === actionTypes.rotate) {
        return {
            ...state,
            figure: rotateFigure(state.figure, state.map, FIELD_WIDTH)
        };
    }

    return state;
};


const changeX = (): Action => ({type: actionTypes.changeX});
const changeY = (payload: number): Action => ({type: actionTypes.changeY, payload});
const rotate = (): Action => ({type: actionTypes.rotate});

export const actions = {
    changeX, changeY, rotate
};