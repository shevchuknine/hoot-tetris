import React, {Fragment} from "react";

const GameComponent = ({map, count}) => {
    return (
        <Fragment>
            <div className={"game-wrapper"}>
                <div className={"game-counter"}>{count}</div>
                {
                    map.map((row, index) => {
                        return (
                            <div className={"game-row"} key={index}>
                                {
                                    row.map((item, index) => {
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
        </Fragment>
    );
};

export default GameComponent;