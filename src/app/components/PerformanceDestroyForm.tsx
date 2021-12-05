import React, { ReactElement, useState } from "react";

interface Props {
  streamUrl: string;
  onRemove: () => void;
}

function PerformanceDestroyForm({ streamUrl, onRemove }: Props): ReactElement {
  const [streamKey, setStreamKey] = useState<string>("");
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

    fetch(streamUrl, {
      method: "DELETE",
      headers,
    })
      .then((res) => {
        if (res.ok) {
          setStreamKey("");
          onRemove && onRemove();
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
    <>
      {
        <form className="PerformanceCreateForm" onSubmit={handleSubmit}>
          <p>
            Enter your streaming key to confirm you want to remove your slot. If
            you do not remember your streaming key, please contact the event
            organizer.
          </p>

          {failed && (
            <p style={{ color: "red" }}>
              Something went wrong, did you entered the incorrect stream key? Please try again.
            </p>
          )}
          <input
            id="key"
            type="text"
            placeholder="Stream key"
            value={streamKey}
            onChange={(e) => setStreamKey(e.target.value)}
            required
          />
          <input type="submit" className="card-button" value="Remove slot" />
        </form>
      }
    </>
  );
}

export default PerformanceDestroyForm;
