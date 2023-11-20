import React, { ReactElement } from 'react';
import logo from "../../assets/images/longestnight-sunset-2.0.svg";
import { MuxyEvent } from "../types";
import { DateTime } from "luxon";
import ProgressBar from "@ramonak/react-progress-bar";

interface Props {
    event: MuxyEvent | undefined
    reservedStreamCount: number | null
    totalStreamCount: number | null
}

interface ProgressType {
    reserved: number,
    total: number
    percent: number;
}

function EventHeader({event, reservedStreamCount, totalStreamCount}:Props): ReactElement {

    const calcProgressbar = (reservedStreamCount: number | null, totalStreamCount: number | null) : ProgressType => {
        if (reservedStreamCount === null || totalStreamCount === null) {
            return {reserved: 0, total: 0, percent: 0};
        }

        return {reserved: reservedStreamCount, total: totalStreamCount, percent: (reservedStreamCount * 100) / totalStreamCount};
    }

    const progressBarValues = calcProgressbar(reservedStreamCount, totalStreamCount);

    return (
        <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h4>TOPLAP Presents ...</h4>
            <h1>Solstice Stream 2023</h1>
            <h2> {event && DateTime.fromISO(event.starts_at).toFormat("dd. LLLL HH:mm")} - {event && DateTime.fromISO(event.ends_at).toFormat("dd. LLLL HH:mm")} {event && DateTime.fromISO(event.starts_at).toFormat("yyyy")}</h2>
            <hr/>

            <ProgressBar
                className="wrapper"
                bgColor={"#ffce96"}
                baseBgColor={"#bbbbbb54"}
                labelClassName="label"
                labelAlignment={"outside"}
                width={"100%"}
                height={"28px"}
                margin={"8px"}
                customLabel={`${progressBarValues.reserved}/${progressBarValues.total} slots are filled`}
                completed={progressBarValues.percent}
            />

            <hr/>
            <p>Your timezone: {Intl.DateTimeFormat().resolvedOptions().timeZone}</p>
            <p className="link-paragraph"><a href={"https://www.youtube.com/eulerroom/live"}>https://www.youtube.com/eulerroom/live</a></p>
            <p className="link-paragraph"><a href={"https://www.twitch.tv/eulerroom"}>https://www.twitch.tv/eulerroom</a></p>
        </header>
    );
}

export default EventHeader;
