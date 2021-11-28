import React, { ReactElement } from 'react';
import '../../assets/css/PerformanceCard.css';
import { MuxyStream } from "../types";

interface Props {
    muxyStream: MuxyStream,
    cycleNo: number
}

const PerformanceCard = ({muxyStream, cycleNo}: Props): ReactElement => {
    return (
        <div className="card">
            <div className="card-body">
                <p className="card-header">Cycle #{cycleNo}</p>
                <p className="card-time">14:40-15:00</p>
                <p className="card-text">{muxyStream.publisher_name} / {muxyStream.location} / {muxyStream.description} / {muxyStream.timezone}</p>
                <button className="card-button">Remove</button>
                <hr />
            </div>
        </div>
    );
}

export default PerformanceCard;
