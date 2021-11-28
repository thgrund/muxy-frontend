import React, { ReactElement } from 'react';
import logo from "../../assets/images/share.png";

function EventHeader(): ReactElement {
    return (
        <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1>Longest Night Marathon</h1>
            <h2>December 21th - December 22th</h2>
            <p className="link-paragraph"><a href={"https://www.youtube.com/eulerroom/live"}>https://www.youtube.com/eulerroom/live</a></p>
            <p className="link-paragraph"><a href={"https://www.twitch.tv/eulerroom"}>https://www.twitch.tv/eulerroom</a></p>
        </header>
    );
}

export default EventHeader;
