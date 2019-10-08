import React, {Fragment} from "react";

const AppComponent = ({map, count}) => {
    return (
        <Fragment>
            <div className={"wrapper"}>
                {
                    map.map((row, index) => {
                        return (
                            <div className={"row"} key={index}>
                                {
                                    row.map((item, index) => {
                                        return (
                                            <div className={"item"} key={index} style={{backgroundColor: item}}>&nbsp;</div>
                                        );
                                    })
                                }
                            </div>
                        );
                    })
                }
            </div>
            <div>count: {count}</div>
        </Fragment>
    );
};

export default AppComponent;