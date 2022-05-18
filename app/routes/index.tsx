import { useEffect, useState } from "react";

export default function Index() {
  let [msgs, setMsgs] = useState<MessageEvent[]>([])

  useEffect(() => {
    let es = new EventSource('/api/events')

    let onMessage = (ev: MessageEvent) => setMsgs(ms => ms.slice(0, 3).concat(ev.data))
    
    es.addEventListener('message', onMessage)

    return () => {
      es.removeEventListener('message', onMessage)
    }
  })
  
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
     <pre>{JSON.stringify(msgs, null, 2)}</pre>
    </div>
  );
}
