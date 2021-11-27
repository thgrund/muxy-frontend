import React, { ReactElement, useEffect, useState } from 'react';
import PerformanceList from "../components/PerformanceList";
import { MuxyEvents } from "../types";
import EventHeader from "./EventHeader";

function EventPage(): ReactElement {
    const [muxyEvents, setMuxyEvents] = useState<MuxyEvents | null>(null);

    useEffect(() => {
        fetch('http://localhost:8000/events?slug=long-night', {
            method: 'get',
            headers: new Headers({
                "Authorization": "Api-Key y7NuzQbO.4KH0UJaj9wsbSHOFQo3GQL4iQkVl8HpP"
            })
        })
            .then(res => res.json())
            .then((data) => {
                setMuxyEvents(data);
            })
            .catch(console.log)
    }, []);

    return (
        <div className="App">
            <EventHeader />
            {muxyEvents && <PerformanceList slug={muxyEvents.results[0]?.slug} />}
        </div>
    );
}

export default EventPage;
