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
       
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        fetch(muxyStream.url, {
            method: 'put',
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
                event: muxyStream.event,
                starts_at: muxyStream.starts_at,
                ends_at: muxyStream.ends_at
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
