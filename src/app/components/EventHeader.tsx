import React, { ReactElement } from 'react';
import logo from "../../assets/images/longestnight-sunset-2.0.svg";
import { MuxyEvent } from "../types";
import { DateTime } from "luxon";

interface Props {
    event: MuxyEvent | undefined
}

function EventHeader({event}:Props): ReactElement {
    return (
        <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h4>Tidal Club Presents ...</h4>
            <h1>The Longest Night</h1>
            <h2> {event && DateTime.fromISO(event.starts_at).toFormat("dd. LLLL HH:mm")} - {event && DateTime.fromISO(event.ends_at).toFormat("dd. LLLL HH:mm")} {event && DateTime.fromISO(event.starts_at).toFormat("yyyy")}</h2>
            <hr/>
            <h2>Your timezone: {Intl.DateTimeFormat().resolvedOptions().timeZone}</h2>
            <hr/>
            <p className="link-paragraph"><a href={"https://www.youtube.com/eulerroom/live"}>https://www.youtube.com/eulerroom/live</a></p>
            <p className="link-paragraph"><a href={"https://www.twitch.tv/eulerroom"}>https://www.twitch.tv/eulerroom</a></p>
        </header>
    );
}

export default EventHeader;
