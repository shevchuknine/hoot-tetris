import React, {useState, useEffect, useReducer} from 'react';
import {
    calculateMapLines,
    drawMap,
    figureDropped,
    generateFigure, hasConflicts, isFinish,rotateFigure,
} from "./helpers";
import AppComponent from "./AppComponent";

const FIELD_WIDTH = 9;
const FIELD_HEIGHT = 20;

const reducer = (state, action) => {
    if (action.type === "changeX" || action.type === "changeY") {
        let nextFigure;

        if (action.type === "changeX") {
            const {figure} = state;
            nextFigure = figure.map((item) => ({...item, x: item.x + 1}));
        } else if (action.type === "changeY") {
            const {figure} = state,
                changedFigure = figure.map(i => ({...i, y: i.y + action.payload})),
                isMovementAllowed = changedFigure.reduce((res, item) => {
                    return res && (item.y >= 0) && (item.y < FIELD_WIDTH);
                }, true) && !hasConflicts(changedFigure, state.map);

            if (isMovementAllowed) {
                nextFigure = changedFigure;
            } else {
                return {...state};
            }
        }

        const isFigureDropped = figureDropped(nextFigure, state.map, FIELD_HEIGHT);

        if (isFigureDropped) {
            const {map, count} = calculateMapLines(state.map.concat(nextFigure), FIELD_WIDTH);

            if (isFinish(map)) {
                return {
                    ...state,
                    figure: generateFigure(FIELD_WIDTH),
                    map: [],
                    count: 0
                };
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
    } else if (action.type === "rotate") {
        return {
            ...state,
            figure: rotateFigure(state.figure, state.map, FIELD_WIDTH)
        };
    }
};
const changeX = () => ({type: "changeX"});
const changeY = (payload) => ({type: "changeY", payload});
const rotate = () => ({type: "rotate"});

const App = () => {
    const [state, dispatch] = useReducer(reducer, {figure: generateFigure(FIELD_WIDTH), map: [], count: 0});

    useEffect(() => {
        setInterval(() => {
            dispatch(changeX());
        }, 500);
    }, []);

    useEffect(() => {
        window.addEventListener("keydown", ({key}) => {
            if (key === "ArrowLeft") {
                dispatch(changeY(-1));
            } else if (key === "ArrowRight") {
                dispatch(changeY(1));
            } else if (key === "ArrowDown") {
                dispatch(changeX());
            } else if (key === "ArrowUp") {
                dispatch(rotate())
            }
        });
    }, []);

    const {map, figure, count} = state;
    return <AppComponent map={drawMap(map, figure, FIELD_HEIGHT, FIELD_WIDTH)}
                         count={count}
    />;
};

export default App;
