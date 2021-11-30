import React, { ReactElement, useEffect, useState } from 'react';
import '../../assets/css/PerformanceList.css';
import {  MuxyStreams } from "../types";
import PerformanceCard from "./PerformanceCard";

interface Props {
    slug: string
}

const PerformanceList = ({slug}: Props): ReactElement => {
    const [muxyStreams, setMuxyStreams] = useState<MuxyStreams | null>(null);
    const muxyApiKey: string = (process.env.REACT_APP_MUXY_API_KEY as string);

    useEffect(() => {
        fetch(`http://localhost:8000/streams?event__slug=${slug}`, {
            method: 'get',
            headers: new Headers({
                "Authorization": `Api-Key ${muxyApiKey}`
            })
        })
            .then(res => res.json())
            .then((data) => {
                setMuxyStreams(data);
            })
            .catch(console.log)
    }, [slug]);


    return (
        <div className="performance-list">
            {muxyStreams && muxyStreams.results.map(
                (muxyStream, index) => (<PerformanceCard key={index} muxyStream={muxyStream} cycleNo={index+1} />)
            )}

        </div>
    )
}
export default PerformanceList;
