import React, {useState, useEffect} from 'react';
import {filterFromFigure, printMap, returnInitialMap} from "./helpers";

const FIELD_WIDTH = 5;

const initialMap = returnInitialMap(),
    figure = [[0, 0, 0, 2, 2, 0, 0, 0], [0, 0, 0, 0, 2, 0, 0, 0]];

const App = () => {
    const [map, setMap] = useState(initialMap);
    const [top, setTop] = useState(0);
    const [left, setLeft] = useState(Math.floor(FIELD_WIDTH / 2));

    useEffect(_ => {
        const timeoutId = setTimeout(() => {
            // получаем состояние карты на след. шаге
            const nextMapState =
                filterFromFigure(map.slice(0, top))
                    .concat(figure.map(line => line.slice(left, left + FIELD_WIDTH))) // конкатить нужно этот регион с мерже с фигурой через mergeWith
                    .concat(map.slice(top + figure.length, map.length));

            // проверяем пересечения
            let hasConflicts = false;
            nextMapState.forEach((row, rowIndex) => {
                row.forEach((item, itemIndex) => {
                    hasConflicts = hasConflicts || (item === 2 && map[rowIndex][itemIndex] === 1);
                });
            });

            // обновляем карту
            const isEndOfField = top + figure.length === 10;
            if (hasConflicts) {
                setMap(filterFromFigure(map, 1));
                setTop(0);
            } else if (isEndOfField) {
                setMap(filterFromFigure(nextMapState, 1));
                setTop(0);
            } else {
                setMap(nextMapState);
                setTop(top + 1);
            }
        }, 1000);

        return () => clearTimeout(timeoutId);
    });

    useEffect(() => {
        const handler = ({key}) => {
            if (key === "ArrowLeft") {
                const nextLeft = left - 1;
                setLeft(nextLeft >= 0 ? nextLeft : 0);
                // setMap(map);
            } else if (key === "ArrowRight") {
                const nextLeft = left + 1,
                    rightBorder = Math.floor(FIELD_WIDTH / 2);

                setLeft(nextLeft <= rightBorder ? nextLeft : rightBorder);
                // setMap(map);
            }
        };

        window.addEventListener("keydown", handler);

        return () => window.removeEventListener("keydown", handler)
    });

    // console.count("render");
    console.log(printMap(map));

    return null;
};

export default App;
