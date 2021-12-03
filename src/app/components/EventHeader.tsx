import React, { ReactElement } from 'react';
import logo from "../../assets/images/longestnight-square-web_plain.svg";

function EventHeader(): ReactElement {
    return (
        <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h4>Tidal Club Presents ...</h4>
            <h1>The Longest Night</h1>
            <h2>December 21st - December 22nd</h2>
            <h2>2021</h2>
            <hr/>
            <h3>Signups Opening Soon!</h3>
            <h4>Watch this space...</h4>
            <hr/>
            <p className="link-paragraph"><a href={"https://www.youtube.com/eulerroom/live"}>https://www.youtube.com/eulerroom/live</a></p>
            <p className="link-paragraph"><a href={"https://www.twitch.tv/eulerroom"}>https://www.twitch.tv/eulerroom</a></p>
        </header>
    );
}

export default EventHeader;
