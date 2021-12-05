import React, { ReactElement, useState } from 'react';
import { MuxyStream } from "../types";

interface Props {
    streamUrl: string;
    currMuxyStream: MuxyStream;
    onSetInEditMode: (inEditMode: boolean) => void;
    setCurrMuxyStream: (muxyStream: MuxyStream) => void;
}

function PerformanceEditForm({ streamUrl, currMuxyStream, onSetInEditMode, setCurrMuxyStream }: Props): ReactElement {
    const [name, setName] = useState<string>(currMuxyStream.publisher_name);
    const [description, setDescription] = useState<string>(currMuxyStream.description);
    const [streamKey, setStreamKey] = useState<string>("");
    const [location, setLocation] = useState<string>(currMuxyStream.location);
    const [failed, setFailed] = useState<boolean>(false);
    const muxyApiKey: string = process.env.REACT_APP_MUXY_API_KEY as string;

    const handleSubmit = (e: React.FormEvent) => {

        e.preventDefault();
        setFailed(false);

        const headers = new Headers({
            Authorization: `Api-Key ${muxyApiKey}`,
            "X-Stream-Key": streamKey,
            "Content-Type": "application/json",
            Accept: "application/json",
        });

        const body = JSON.stringify({
            publisher_name: name,
            description: description,
            location: location,
            ends_at: currMuxyStream.ends_at,
            starts_at: currMuxyStream.starts_at,
            event: currMuxyStream.event,
        });

        fetch(streamUrl, {
            method: "PUT",
            headers,
            body
        })
        .then((res) => {
            if (res.ok) {
                setStreamKey("");
                onSetInEditMode(false);
                setCurrMuxyStream({
                    ...currMuxyStream,
                    publisher_name: name,
                    description: description,
                    location: location
                })
            } else {
                setFailed(true);
            }
        })
        .catch((err) => {
            console.error(err);
            setFailed(true);
        });
    };

    return (
        <div className="PerformanceEditForm">
            <form className="PerformanceCreateForm" onSubmit={handleSubmit}>
                <p>
                    Enter your streaming key to confirm you want to edit your slot. If
                    you do not remember your streaming key, please contact the event
                    organizer.
                </p>
                {failed && (
                    <p style={{ color: "red" }}>
                        Something went wrong, did you entered the incorrect stream key? Please try again.
                    </p>
                )}

                <input id="key" type="text" placeholder="Stream-Key" value={streamKey}
                       onChange={e => setStreamKey(e.target.value)} required />
                <p>
                    Here you find your stream information that you can edit.
                    The email address can not displayed for security reasons. If you have problems
                    with your e-mail adress, please contace the event organizer.
                    The information will only be updated if you have entered the correct stream key.
                </p>
                <input id="name" type="text" placeholder="Name" value={name}
                       onChange={e => setName(e.target.value)} required />
                <input id="description" type="text" placeholder="Description" value={description}
                       onChange={e => setDescription(e.target.value)} required />
                <input id="location" type="text" placeholder="Location" value={location}
                       onChange={e => setLocation(e.target.value)} required />
                <input type="submit" className="card-button" value="Save"/>
            </form>
        </div>
    );
}

export default PerformanceEditForm;
