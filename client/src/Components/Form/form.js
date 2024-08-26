import { useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';

export default function CreatePost() {
    
    const [PostImage, setPostImage] = useState('')
    const [data, setData] = useState({
        author:'',
        location:'',
        description:''
    })
    const navigate = useNavigate()

    const imgHandler = (e) => {
        // console.log(e.target.files);
        setPostImage(e.target.files)
    }

    async function postPost(formData) {
        await fetch('http://localhost:8000/post/create', {
            method: 'POST',
            body: formData
        })
        .then(res => res.json())
        .then(data => navigate('/post/view'))
    }

    const submitHandler = (e) => {
        e.preventDefault();
        console.log('chenking if its rendering');
        // console.log(e.target[1].value);
        // console.log("PostImage file", PostImage[0])
        const formData = new FormData();
            formData.append('PostImage', PostImage[0])
            formData.append('author', data.author)
            formData.append('location', data.location)
            formData.append('description', data.description)
        // formData.append(PostImage[0].name);
        // console.log(formData)
        postPost(formData)
        
    }

    return <>
        <div className='container mt-2'>
            <div className='row nav-container border-bottom border-success'>
                <img className='col-1 mt-2' src='/image/icon.svg' alt='icon' height='40px' />
                <h1 className='col-2'>Instaclone</h1>
                <div className='col-1 offset-md-8 mt-3 camera'>
                    <Link to='/post/create'><img src='/image/camera.png' alt='camera' width='30px'/></Link>
                </div>
            </div>
        </div>
        <div className='container mt-5 text-center'>
            <form action='/' method='POST' onSubmit={submitHandler} className='row border border-secondary w-50 p-3 offset-md-3'>
                <div className="col-10 offset-md-1 mt-3">
                    <input className="form-control" type="file" onChange={imgHandler}/>
                </div>
                <div className="col-5 offset-md-1 mt-3">
                    <input 
                        type="text" 
                        className="form-control" 
                        placeholder="Author" 
                        aria-label="Author" 
                        value={data.author}
                        onChange={(e) => setData((data) => ({
                            ...data,
                            author: e.target.value
                        }))}
                    />
                </div>
                <div className="col-5 mt-3">
                    <input 
                        type="text" 
                        className="form-control" 
                        placeholder="Location" 
                        aria-label="Location" 
                        value={data.location}
                        onChange={(e) => setData((data) => ({
                            ...data,
                            location: e.target.value
                        }))}
                    />
                </div>
                <div className="col-10 offset-md-1 mt-3">
                    <input 
                        className="form-control" 
                        type="text" 
                        placeholder="Description" 
                        value={data.description}
                        onChange={(e) => setData((data) => ({
                            ...data,
                            description: e.target.value
                        }))}
                    />
                </div>
                <button type="submit" className="btn btn-outline-secondary col-2 offset-md-5 mt-3 mb-3" disabled={PostImage && data.author && data.location && data.description ? false : true}>Post</button>
            </form>
        </div>
    </>
}