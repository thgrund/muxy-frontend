import React, { ReactElement, useEffect, useState } from 'react';
import PerformanceList from "../components/PerformanceList";
import { MuxyEvents } from "../types";
import EventHeader from "./EventHeader";

function EventPage(): ReactElement {
    const [muxyEvents, setMuxyEvents] = useState<MuxyEvents | null>(null);
    const muxyApiKey: string = (process.env.REACT_APP_MUXY_API_KEY as string);
    const eventSlug: string = (process.env.REACT_APP_EVENT_SLUG as string);

    useEffect(() => {
        fetch(`http://localhost:8000/events?slug=${eventSlug}`, {
            method: 'get',
            headers: new Headers({
                "Authorization": `Api-Key ${muxyApiKey}`
            })
        })
            .then(res => res.json())
            .then((data) => {
                setMuxyEvents(data);
            })
            .catch(console.log)
    }, [eventSlug]);

    return (
        <main className="App">
            <EventHeader />
            {muxyEvents && <PerformanceList slug={muxyEvents.results[0]?.slug} />}
        </main>
    );
}

export default EventPage;
