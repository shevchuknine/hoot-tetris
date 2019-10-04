import React, {useState, useEffect, useReducer} from 'react';
import {drawMap, figureDropped, filterFromFigure, printMap, returnInitialMap, transformEveryElement} from "./helpers";

const FIELD_WIDTH = 5;
const FIELD_HEIGHT = 10;

const reducer = (state, action) => {
    if (action.type === "changeX" || action.type === "changeY") {
        let nextFigure;

        if (action.type === "changeX") {
            nextFigure = transformEveryElement(state.figure, (item) => ({...item, x: item.x + 1}));
        } else if (action.type === "changeY") {
            const isMovementAllowed = state.figure.reduce((res, item) => {
                const nextY = item.y + action.payload;
                return res && (nextY >= 0) && (nextY < FIELD_WIDTH) && (state.map.find(mapI => mapI.x === item.x && mapI.y === nextY) === undefined);
            }, true);

            if (isMovementAllowed) {
                nextFigure = transformEveryElement(state.figure, (item) => ({...item, y: item.y + action.payload}));
            } else {
                return {...state};
            }
        }

        const isFigureDropped = figureDropped(nextFigure, state.map, FIELD_HEIGHT);

        return {
            ...state,
            figure: isFigureDropped ? [{x: 0, y: 2}] : nextFigure,
            map: isFigureDropped ? state.map.concat(nextFigure) : state.map
        };
    }
};
const changeX = () => ({type: "changeX"});
const changeY = (payload) => ({type: "changeY", payload});

const App = () => {
    const [state, dispatch] = useReducer(reducer, {figure: [{x: 0, y: 2}], map: []});

    useEffect(() => {
        setInterval(() => {
            dispatch(changeX());
        }, 1000);
    }, []);

    useEffect(() => {
        window.addEventListener("keydown", ({key}) => {
            if (key === "ArrowLeft") {
                dispatch(changeY(-1));
            } else if (key === "ArrowRight") {
                dispatch(changeY(1));
            } else if (key === "ArrowDown") {
                dispatch(changeX());
            }
        });
    }, []);

    console.log(drawMap(state.map, state.figure, FIELD_HEIGHT, FIELD_WIDTH));

    return null;
};

export default App;
