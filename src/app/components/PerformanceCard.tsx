import React, { ReactElement } from 'react';
import '../../assets/css/PerformanceCard.css';
import { MuxyStream } from "../types";

interface Props {
    muxyStream: MuxyStream
}

const PerformanceCard = ({muxyStream}: Props): ReactElement => {
    return (
        <div className="card">
            <div className="card-body">
                <p className="card-header">Cycle #1</p>
                <p className="card-time">14:40-15:00</p>
                <p className="card-text">{muxyStream.description}
                </p>
                <button className="card-button">Remove</button>
                <hr />
            </div>
        </div>
    );
}

export default PerformanceCard;
