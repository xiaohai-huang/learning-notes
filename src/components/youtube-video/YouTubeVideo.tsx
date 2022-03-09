import React from "react";

function YouTubeVideo({ src = "", caption = "" }) {
  return (
    <div>
      <iframe
        style={{ width: "100%", height: "350px" }}
        src={src}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
      {caption && <p style={{ textAlign: "center" }}>{caption}</p>}
    </div>
  );
}

export default YouTubeVideo;
