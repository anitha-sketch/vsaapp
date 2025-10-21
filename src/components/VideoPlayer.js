import React from 'react';


export default function VideoPlayer({ video, onPlayed }) {
if (!video) return null;


const handlePlay = () => {
if (onPlayed) onPlayed();
};


return (
<div>
<video
key={video.id}
controls
width="100%"
height="480"
onPlay={handlePlay}
poster={video.thumbnail}
>
<source src={video.src} type="video/mp4" />
Your browser does not support HTML5 video.
</video>


<h2 style={{ margin: '12px 0 6px' }}>{video.title}</h2>
<div className="small">{video.views || 0} views • {new Date(video.createdAt).toLocaleString()}</div>
<p style={{ marginTop:8 }}>{video.description}</p>
</div>
);
}




