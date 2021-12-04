import React, { ReactElement, useEffect, useState } from 'react';
import PerformanceList from "../components/PerformanceList";
import { MuxyEvents } from "../types";
import EventHeader from "./EventHeader";

function EventPage(): ReactElement {
    const [muxyEvents, setMuxyEvents] = useState<MuxyEvents | null>(null);
    const muxyApiKey: string = (process.env.REACT_APP_MUXY_API_KEY as string);
    const muxyUrl: string = (process.env.REACT_APP_MUXY_URL as string);
    const eventSlug: string = (process.env.REACT_APP_EVENT_SLUG as string);

    useEffect(() => {
      fetch(`${muxyUrl}/events/?slug=${eventSlug}`, {
        method: "get",
        headers: new Headers({
          Authorization: `Api-Key ${muxyApiKey}`,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          setMuxyEvents(data);
        })
        .catch(console.error);
    }, [eventSlug]);

    const event = muxyEvents?.results[0];

    return (
      <main className="App">
        <EventHeader />
        {event && (
          <PerformanceList
            slug={event.slug}
            eventUrl={event.url}
            startsAt={event.starts_at}
            endsAt={event.ends_at}
          />
        )}
      </main>
    );
}

export default EventPage;
