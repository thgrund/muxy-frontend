import React, { ReactElement, useState } from 'react';

function PerformanceCreateForm(): ReactElement {
    const [name, setName] = useState<string>("");
    const [location, setLocation] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [email, setEmail] = useState<string>("");

    return (
        <div className="PerformanceCreateForm">
            <input id="name" type="text" placeholder="Name" value={name}
                   onChange={e => setName(e.target.value)} required />
            <input id="location" type="text" placeholder="Location" value={location}
                   onChange={e => setLocation(e.target.value)} required />
            <input id="description" type="text" placeholder="Description" value={description}
                   onChange={e => setDescription(e.target.value)} required />
            <input id="email" type="text" placeholder="E-Mail" value={email}
                   onChange={e => setEmail(e.target.value)} required />
            <button className="card-button">Rave on</button>
        </div>
    );
}

export default PerformanceCreateForm;
