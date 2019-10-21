import React from "react";
import Game from "../game/Game";

interface Props {}

const App: React.FunctionComponent<Props> = () => {
    return (
        <div className={"app-wrapper"}>
            <Game/>
        </div>
    );
};

export default App;