import React, { ReactElement, useState } from 'react';
import '../../assets/css/PerformanceCard.css';
import { MuxyStream } from "../types";
import PerformanceCreateForm from "./PerformanceCreateForm";

interface Props {
    muxyStream: MuxyStream,
    cycleNo: number,
}

const PerformanceCard = ({muxyStream, cycleNo}: Props): ReactElement => {
    const [inCreateMode, setInCreateMode] = useState<boolean>(false);

    return (
        <div className="card">
            <div className="card-body">
                <p className="card-header">Cycle #{cycleNo}</p>
                <p className="card-time">14:40-15:00 {!inCreateMode && <button className="card-button-plus" onClick={() => setInCreateMode(true)}>+</button>}</p>

                {!inCreateMode &&
                    <>
                        <p className="card-text">{muxyStream.publisher_name} / {muxyStream.location} / {muxyStream.description} / {muxyStream.timezone}</p>
                        <button className="card-button">Remove</button>
                    </>
                }

                {inCreateMode && <PerformanceCreateForm />}

                <hr />
            </div>
        </div>
    );
}

export default PerformanceCard;
