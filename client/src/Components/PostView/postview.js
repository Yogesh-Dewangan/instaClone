import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom'
import {data} from './data';

export const Post = () => {

    const [posts, setPosts] = useState(data)

    async function getPost() {
        await fetch('http://localhost:8000/post/view', {
            method: 'GET'
        })
            .then(res => res.json())
            .then(resp => {
                // console.log('responce:', resp.data)
                setPosts((posts) => 
                   [ ...posts,
                    ...resp.data].reverse()
                )
            })
    }

    useEffect(() => {
        
        getPost()
           
    }, [])

    return <div className='container mt-2'>
        <div className='row nav-container border-bottom border-success'>
            <img className='col-1 mt-2' src='/image/icon.svg' alt='icon' height='40px'/>
            <h1 className='col-2'>Instaclone</h1>
            <div className='col-1 offset-md-8 mt-3 camera'>
                <Link to='/post/create'><img src='/image/camera.png' alt='camera' width='30px'/></Link>
            </div>
        </div>
        {posts ? posts.map((post, idx) => <ViewPost post={post} key={idx}/>) : 'No Post'}
    </div>
}

function ViewPost({post}) {
    const {PostImage, author, location, description, likes} = post;
    // console.log(image, author, location, description);
    const [date] = useState(new Date().toString().split(' '))

    return <div className='card w-50 mt-4 offset-md-3 card-container'>
        <div className='card-header'>
            <div className='row'>
            <h4 className='col-2 card-title'>{author}</h4>
            <div className='col-1 offset-md-9 dot-container'>
                <h5 className='h2 my-0'>...</h5>
            </div>
            <p className='card-text text-muted'>{location}</p>
            </div>
        </div>
        <div className='row no-gutters'>
            <img src={PostImage} alt='postImg' width='100%'/>
        </div>
        <div className='card-footer'>
            <div className='row no-gutters'>
                <img className='col' src='/image/heart.png' alt='heart' height='20px'/>
                <img className='col-1' src='/image/send.png' alt='send' height='20px'/>
                <p className='col-3 offset-md-7 text-muted'>{`${date[2]} ${date[1]} ${date[3]}`}</p>
            </div>
            <div className='row'>
                <p className='col-3 text-muted'>{likes ? likes : 0} Likes</p>
            </div>
            <h4 className='card-title my-3'>{description}</h4>
        </div>
    </div>
}

// function Form() {
//     return <div className='container mt-5 text-center'>
//         <form action='/postview' method='POST' className='row border border-secondary w-50 p-3 offset-md-3'>
//             <div className="col-10 offset-md-1 mt-3">
//                 <input className="form-control" type="file" />
//             </div>
//             <div class="col-5 offset-md-1 mt-3">
//                 <input type="text" class="form-control" placeholder="Author" aria-label="Author" />
//             </div>
//             <div class="col-5 mt-3">
//                 <input type="text" class="form-control" placeholder="Location" aria-label="Location" />
//             </div>
//             <div className="col-10 offset-md-1 mt-3">
//                 <input className="form-control" type="text" placeholder="Description"/>
//             </div>
//             <button type="submit" class="btn btn-outline-secondary col-2 offset-md-5 mt-3 mb-3">Post</button>
//         </form>
//     </div>
// }