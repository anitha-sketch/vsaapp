// src/components/VideoList.js
import React from 'react';


export default function VideoList({ videos = [], onSelect, currentId }) {
return (
<div className="video-list">
{videos.map(v => (
<div key={v.id} className="video-item" onClick={() => onSelect(v)} style={{ padding:8, borderRadius:8, background: v.id===currentId ? '#eef2ff' : 'transparent' }}>
<img src={v.thumbnail} alt="thumb" className="thumbnail" style={{ width:140, height:80, flex:'0 0 140px' }} />
<div className="meta">
<strong>{v.title}</strong>
<div className="small">{(v.views || 0)} views</div>
<div className="small">{v.description?.slice(0,70)}</div>
</div>
</div>
))}
{videos.length === 0 && <div className="small">No videos yet — upload one!</div>}
</div>
);
}