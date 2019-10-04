import React from "react";

const AppComponent = ({map}) => {
    return (
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
    );
};

export default AppComponent;