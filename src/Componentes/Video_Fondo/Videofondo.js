import { useEffect, useRef, useState } from 'react';
import './Videofondo.css';

const fondos = [
  '/media/fondos/video1.mp4',
  '/media/fondos/video2.mp4',
  '/media/fondos/video3.mp4'
];

export function FondoCambiante({ className }) {
  const [videoIndex, setVideoIndex] = useState(0);
  const [currentVideo, setCurrentVideo] = useState(0); // 0 ó 1
  const videoRefs = [useRef(null), useRef(null)];

  const handleVideoEnd = () => {
    const nextIndex = (videoIndex + 1) % fondos.length;
    const nextVideo = 1 - currentVideo;

    const nextRef = videoRefs[nextVideo].current;
    nextRef.src = fondos[nextIndex];
    nextRef.load();
    nextRef.play();

    // Activamos el fade (con tiempo para que el siguiente comience)
    setTimeout(() => {
      setCurrentVideo(nextVideo);
      setVideoIndex(nextIndex);
    }, 100); // pequeño delay para asegurarse de que se empieza a reproducir
  };

  return (
    <div className="video-container">
      {[0, 1].map((i) => (
        <video
          key={i}
          ref={videoRefs[i]}
          className={`video-fondo ${className} ${i === currentVideo ? 'active' : ''}`}
          autoPlay
          muted
          onEnded={handleVideoEnd}
        >
          <source src={fondos[i === currentVideo ? videoIndex : (videoIndex + 1) % fondos.length]} type="video/mp4" />
        </video>
      ))}
    </div>
  );
}
