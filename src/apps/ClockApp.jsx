import { useEffect, useState } from 'react';

export default function ClockApp() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const timer = globalThis.setInterval(() => setNow(new Date()), 1_000);
    return () => globalThis.clearInterval(timer);
  }, []);
  return <div className="clock-app"><time className="clock-time">{now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</time><time className="clock-date">{now.toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}</time><div className="clock-seconds">{now.toLocaleTimeString([], { second: '2-digit' })} seconds</div></div>;
}
