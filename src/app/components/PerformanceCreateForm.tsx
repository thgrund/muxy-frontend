import React, { ReactElement, useState } from 'react';
import { MuxyStream } from '../types';

interface Props {
    muxyStream: MuxyStream,
}

function PerformanceCreateForm({muxyStream}: Props): ReactElement {
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [location, setLocation] = useState<string>("");
    const muxyApiKey: string = (process.env.REACT_APP_MUXY_API_KEY as string);
    const muxyUrl: string = (process.env.REACT_APP_MUXY_URL as string);

    console.log(muxyStream);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        fetch(`${muxyUrl}/streams/`, {
            method: 'post',
            headers: new Headers({
                "Authorization": `Api-Key ${muxyApiKey}`,
                "Content-Type": "application/json",
                "Accept": "application/json"
            }),
            body: JSON.stringify({
                publisher_name: name,
                publisher_email: email,
                description: description,
                location: location,
                timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
                event: "http://localhost:8000/events/3/", // This needs to come from the muxy event (isn't available right now)
                starts_at: "2021-12-21T19:00:00Z", // This needs to be calculated before
                ends_at: "2021-12-21T19:20:00Z" // This needs to be calculated before
            })
        });
    }

    return (
           <form className="PerformanceCreateForm" onSubmit={handleSubmit}>
            <input id="name" type="text" placeholder="Name" value={name}
                onChange={e => setName(e.target.value)} required />
            <input id="email" type="text" placeholder="E-Mail" value={email}
                onChange={e => setEmail(e.target.value)} required />
            <input id="description" type="text" placeholder="Description" value={description}
                   onChange={e => setDescription(e.target.value)} required />
            <input id="location" type="text" placeholder="Location" value={location}
                   onChange={e => setLocation(e.target.value)} required />
            <input type="submit" className="card-button" value="Rave On"/>
        </form>
    );
}

export default PerformanceCreateForm;
