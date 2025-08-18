import { useState } from "react";
export default function EventObject() {
    const [event, setEvent] = useState<Record<string, unknown> | null>(null);
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        // Clone the event into a plain object so it can be mutated and serialized
        const cloned: Record<string, unknown> = { ...(e as unknown as Record<string, unknown>) };
        cloned.target = (e.target as HTMLElement).outerHTML;
        delete cloned.view;
        setEvent(cloned);
    };
    return (
        <div>
            <h2>Event Object</h2>
            <button onClick={(e) => handleClick(e)}
                    className="btn btn-primary"
                    id="wd-display-event-obj-click">
                Display Event Object
            </button>
            <pre>{JSON.stringify(event, null, 2)}</pre>
            <hr/>
        </div>
    );}
