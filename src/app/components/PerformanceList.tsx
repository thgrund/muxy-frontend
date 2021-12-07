import React, { ReactElement, useEffect, useState, useMemo } from "react";
import "../../assets/css/PerformanceList.css";
import { MuxyStreams, MuxyStream, EmptyMuxyStream } from "../types";
import PerformanceCard from "./PerformanceCard";
import { DateTime } from "luxon";

interface Props {
  slug: string;
  eventUrl: string;
  startsAt: string;
  endsAt: string;
  setReservedStreamCount: (reservedStreamCount: number | null) => void;
  setTotalStreamCount: (ttalStreamCount: number | null) => void;
}

const SLOT_DURATION_MIN = 20;

const PerformanceList = ({slug, eventUrl, startsAt, endsAt, setReservedStreamCount, setTotalStreamCount}: Props): ReactElement => {
    const muxyApiKey: string = (process.env.REACT_APP_MUXY_API_KEY as string);
    const muxyUrl: string = (process.env.REACT_APP_MUXY_URL as string);
    const [muxyStreams, setMuxyStreams] = useState<MuxyStreams | null>(null);

    useEffect(() => {
      fetch(`${muxyUrl}/streams/?event__slug=${slug}`, {
        method: "get",
        headers: new Headers({
          Authorization: `Api-Key ${muxyApiKey}`,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          setMuxyStreams(data);
        })
        .catch(console.error);
    }, [slug]);

  const allStreams: (MuxyStream | EmptyMuxyStream)[] = useMemo(() => {
    if (!startsAt || !endsAt) return [];
    if (!muxyStreams) return [];

    // eslint-disable-next-line no-debugger
    const startsAtDt = DateTime.fromISO(startsAt);
    const endsAtDt = DateTime.fromISO(endsAt);

    const diff = endsAtDt.diff(startsAtDt, ["minute"]).toObject();
    const numSlots = diff?.minutes ? diff.minutes / SLOT_DURATION_MIN : 0;

    const results = muxyStreams?.results || [];

    // Build slots array
    const slots = Array.from(Array(numSlots)).map((_, i) => {
      const streamStartsAtDt = startsAtDt.plus({
        minutes: i * SLOT_DURATION_MIN,
      });
      const streamEndsAtDt = streamStartsAtDt.plus({
        minutes: SLOT_DURATION_MIN,
      });

      const streamStartsAt = streamStartsAtDt.toUTC().toFormat("yyyy-MM-dd'T'HH:mm:ss'Z'");
      const streamEndsAt = streamEndsAtDt.toUTC().toFormat("yyyy-MM-dd'T'HH:mm:ss'Z'")
      const stream = results.find(
        (stream) =>
          stream.starts_at == streamStartsAt && stream.ends_at == streamEndsAt
      );

      return stream || { starts_at: streamStartsAt, ends_at: streamEndsAt };
    });

    return slots
  }, [muxyStreams]);

  setReservedStreamCount(muxyStreams ? muxyStreams.results.length: 0);
  setTotalStreamCount(allStreams ? allStreams.length: 0);

  return (
    <div className="performance-list">
      {allStreams &&
        allStreams.map((muxyStream, index) => (
          <PerformanceCard
            key={index}
            eventUrl={eventUrl}
            muxyStream={muxyStream}
            cycleNo={index + 1}
          />
        ))}
    </div>
  );
};
export default PerformanceList;
