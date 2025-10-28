import React, { useEffect, useState } from 'react';
import VideoPlayer from './components/VideoPlayer';
import UploadForm from './components/UploadForm';
import VideoList from './components/VideoList';
import API from './api';


export default function App() {
const [videos, setVideos] = useState([]);
const [current, setCurrent] = useState(null);
const [loading, setLoading] = useState(false);


const fetchVideos = async () => {
setLoading(true);
try {
const res = await API.get('/videos?_sort=createdAt&_order=desc');
setVideos(res.data);
if (!current && res.data.length) setCurrent(res.data[0]);
} catch (err) {
console.error(err);
} finally {
setLoading(false);
}
};


useEffect(() => { fetchVideos(); }, []);


const handleSelect = (video) => setCurrent(video);


const handleUpload = async (newVideo) => {
// POST to json-server
try {
const res = await API.post('/videos', newVideo);
// add to local list
setVideos(prev => [res.data, ...prev]);
setCurrent(res.data);
} catch (err) {
console.error(err);
alert('Upload failed');
}
};


return (
    
<div className="app">
<div className="header">
<h1>Video Mini-Streaming </h1>
<div className="small">mock YouTube-style app — demo only</div>
</div>

 
<div className="grid">
<div className="card">
{current ? (
<VideoPlayer video={current} onPlayed={() => {
// increment views locally and persist
API.patch(`/videos/${current.id}`, { views: (current.views || 0) + 1 }).catch(()=>{});
setCurrent(v => ({ ...v, views: (v.views||0) + 1 }));
}} />
) : (
<div className="small">Select or upload a video</div>
)}


<hr style={{ margin: '12px 0' }} />


<UploadForm onUpload={handleUpload} />
</div>


<div className="card">
<h3>Up next</h3>
{loading ? <div className="small">loading...</div> : (
<VideoList videos={videos} onSelect={handleSelect} currentId={current?.id} />
)}
</div>
</div>
</div>
);
}