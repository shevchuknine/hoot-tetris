import React, {useEffect, useReducer} from 'react';
import {
    drawMap
} from "../../utils/helpers";
import GameComponent from "./GameComponent";
import {reducer, actions, getInitialState} from "./reducer";
import {FIELD_HEIGHT, FIELD_WIDTH} from "./constants";


const Game = () => {
    const [state, dispatch] = useReducer(reducer, getInitialState());

    useEffect(() => {
        setInterval(() => {
            dispatch(actions.changeX());
        }, 500);
    }, []);

    useEffect(() => {
        window.addEventListener("keydown", ({key}) => {
            if (key === "ArrowLeft") {
                dispatch(actions.changeY(-1));
            } else if (key === "ArrowRight") {
                dispatch(actions.changeY(1));
            } else if (key === "ArrowDown") {
                dispatch(actions.changeX());
            } else if (key === "ArrowUp") {
                dispatch(actions.rotate())
            }
        });
    }, []);

    const {map, figure, count} = state;
    return <GameComponent map={drawMap(map, figure, FIELD_HEIGHT, FIELD_WIDTH)}
                          count={count}/>;
};

export default Game;
