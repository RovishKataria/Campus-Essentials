import { useState } from 'react';
import API from '../api';

export default function NewListing(){
  const [form, setForm] = useState({ title:'', price:'', category:'Books', condition:'Good', description:'' });
  const [files, setFiles] = useState([]);
  const [previews, setPreviews] = useState([]);

  async function submit(e){
    e.preventDefault();
    const fd = new FormData();
    Object.entries(form).forEach(([k,v]) => fd.append(k, v));
    [...files].forEach(f => fd.append('images', f));
    const { data } = await API.post('/listings', fd, { headers: { 'Content-Type':'multipart/form-data' } });
    console.log('created', data);
  }

  function onFilesChange(e){
    const fs = e.target.files;
    setFiles(fs);
    const urls = [...fs].map(f => URL.createObjectURL(f));
    setPreviews(urls);
  }

  return (
    <form onSubmit={submit} className="max-w-xl space-y-3">
      <input className="border p-2 w-full" placeholder="Title" onChange={e=>setForm({...form,title:e.target.value})}/>
      <input className="border p-2 w-full" placeholder="Price" type="number" onChange={e=>setForm({...form,price:e.target.value})}/>
      <select className="border p-2 w-full" onChange={e=>setForm({...form,category:e.target.value})}>
        <option>Books</option><option>Electronics</option><option>Hostel</option><option>Other</option>
      </select>
      <input type="file" multiple onChange={onFilesChange} />
      <div className="grid grid-cols-3 gap-2">
        {previews.map((src,i)=>(<img key={i} src={src} className="h-24 w-full object-cover rounded" />))}
      </div>
      <button className="px-4 py-2 bg-blue-600 text-white rounded">Publish</button>
    </form>
  )
}
