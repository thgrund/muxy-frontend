import React, { ReactElement, useState } from "react";
import "../../assets/css/PerformanceCard.css";
import { MuxyStream, EmptyMuxyStream } from "../types";
import PerformanceCreateForm from "./PerformanceCreateForm";
import { DateTime } from "luxon";

interface Props {
  muxyStream: MuxyStream | EmptyMuxyStream;
  cycleNo: number;
}

const PerformanceCard = ({ muxyStream, cycleNo }: Props): ReactElement => {
  const [inCreateMode, setInCreateMode] = useState<boolean>(false);

  const startsAtHs = DateTime.fromISO(muxyStream.starts_at).toFormat("HH:mm");
  const endsAtHs = DateTime.fromISO(muxyStream.ends_at).toFormat("HH:mm");

  let text = null;
  if ("publisher_name" in muxyStream) {
    const { publisher_name, location, description, timezone } = muxyStream;
    text = [publisher_name, location, description, timezone].join(" / ");
  }

  return (
    <div className="card">
      <div className="card-body">
        <p className="card-header">Cycle #{cycleNo}</p>
        <p className="card-time">
          {startsAtHs}-{endsAtHs}{" "}
          {!inCreateMode && (
            <button
              className="card-button-plus"
              onClick={() => setInCreateMode(true)}
            >
              +
            </button>
          )}
        </p>
        {inCreateMode ? (
          <PerformanceCreateForm />
        ) : (
          <>
            <p className="card-text">{text || "[Empty slot]"}</p>
            {text && <button className="card-button">Remove</button>}
          </>
        )}

        <hr />
      </div>
    </div>
  );
};

export default PerformanceCard;
