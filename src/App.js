import React, {useState, useEffect, useReducer} from 'react';
import {
    calculateMapLines,
    drawMap,
    figureDropped,
    filterFromFigure,
    printMap,
    returnInitialMap, rotateFigure,
    transformEveryElement
} from "./helpers";
import AppComponent from "./AppComponent";

const FIELD_WIDTH = 10;
const FIELD_HEIGHT = 10;


const initialFigure = [{x: 0, y: 3}, {x:0, y:4}, {x:0, y:5}, {x:1, y:4}];

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

        if (isFigureDropped) {
            const nextData = calculateMapLines(state.map.concat(nextFigure), FIELD_WIDTH);
            return {
                ...state,
                figure: initialFigure,
                map: nextData.map,
                count: state.count + nextData.count
            };
        } else {
            return {
                ...state,
                figure: nextFigure
            };
        }
    } else if (action.type === "rotate") {
        return {
            ...state,
            figure: rotateFigure(state.figure)
        };
    }
};
const changeX = () => ({type: "changeX"});
const changeY = (payload) => ({type: "changeY", payload});
const rotate = () => ({type: "rotate"});

const App = () => {
    const [state, dispatch] = useReducer(reducer, {figure: initialFigure, map: [], count: 0});

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
            } else if (key === "ArrowUp") {
                dispatch(rotate())
            }
        });
    }, []);

    const {map, figure} = state;
    return <AppComponent map={drawMap(map, figure, FIELD_HEIGHT, FIELD_WIDTH)}/>;
};

export default App;
