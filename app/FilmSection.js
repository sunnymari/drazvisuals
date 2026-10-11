"use client";

import { useRef, useState } from "react";

export default function FilmSection() {
  const videoRef = useRef(null);
  const [muted, setMuted] = useState(true);

  const toggleSound = () => {
    const video = videoRef.current;
    video.muted = !video.muted;
    if (!video.muted) video.play();
    setMuted(video.muted);
  };

  return (
    <section id="film" className="film">
      <header className="film__header">
        <span className="film__label">Title Film</span>
        <span className="film__name">NAYL</span>
      </header>
      <div className="film__frame">
        <video
          ref={videoRef}
          src="/nayl-film.mp4"
          poster="/nayl-poster.jpg"
          autoPlay
          muted
          loop
          playsInline
        />
        <button type="button" className="film__sound" onClick={toggleSound}>
          {muted ? "Sound on" : "Sound off"}
        </button>
      </div>
    </section>
  );
}
