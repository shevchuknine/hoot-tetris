import React, {useState, useEffect} from 'react';
import {filterFromFigure, printMap, returnInitialMap} from "./helpers";

import merge from "lodash.merge";

const initialMap = returnInitialMap(),
    figure = [[0, 0, 2, 2, 0], [0, 0, 0, 2, 0]];
const App = () => {
    const [map, setMap] = useState(initialMap);
    const [currentRow, setCurrentRow] = useState(0);

    useEffect(_ => {
        setTimeout(() => {
            // получаем состояние карты на след. шаге
            const nextMapState =
                filterFromFigure(map.slice(0, currentRow))
                    .concat(figure) // конкатить нужно этот регион с мерже с фигурой через mergeWith
                    .concat(map.slice(currentRow + figure.length, map.length));

            // проверяем пересечения
            let hasConflicts = false;
            nextMapState.forEach((row, rowIndex) => {
                row.forEach((item, itemIndex) => {
                    hasConflicts = hasConflicts || (item === 2 && map[rowIndex][itemIndex] === 1);
                });
            });

            // обновляем карту
            const isEndOfField = currentRow + figure.length === 10;
            if (hasConflicts || isEndOfField) {
                setCurrentRow(0);
                setMap(filterFromFigure(nextMapState, 1));
            } else {
                setCurrentRow(currentRow + 1);
                setMap(nextMapState);
            }
        }, 1000);
    });

    console.log(printMap(map));

    return null;
};

export default App;
