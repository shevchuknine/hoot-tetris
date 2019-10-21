import React from "react";

interface Props {
    map: Array<any>,
    count: number
}

const GameComponent: React.FunctionComponent<Props> = ({map, count}) => {
    return (
        <div className={"game-wrapper"}>
            <div className={"game-counter"}>{count}</div>
            {
                map.map((row, index) => {
                    return (
                        <div className={"game-row"} key={index}>
                            {
                                row.map((item: any, index: number) => {
                                    return (
                                        <div className={"game-item"} key={index} style={{backgroundColor: item}}>&nbsp;</div>
                                    );
                                })
                            }
                        </div>
                    );
                })
            }
        </div>
    );
};

export default GameComponent;