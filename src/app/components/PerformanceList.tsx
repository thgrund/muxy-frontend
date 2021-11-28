import React, { ReactElement, useEffect, useState } from 'react';
import PerformanceCard from "./PerformanceCard";
import '../../assets/css/PerformanceList.css';
import {  MuxyStreams } from "../types";

interface Props {
    slug: string
}

const PerformanceList = ({slug}: Props): ReactElement => {
    const [muxyStreams, setMuxyStreams] = useState<MuxyStreams | null>(null);

    useEffect(() => {
        fetch(`http://localhost:8000/streams?event__slug=${slug}`, {
            method: 'get',
            headers: new Headers({
                "Authorization": "Api-Key y7NuzQbO.4KH0UJaj9wsbSHOFQo3GQL4iQkVl8HpP"
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
