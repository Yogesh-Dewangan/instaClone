import React from 'react';
import {Link} from 'react-router-dom';

export default function LandingPage() {
    return <main className='container landing-main'>
        <div className='row no-gutters'>
        <section className='col-4 mt-5 offset-md-2 landing-container left-container' style={{height: '88vh'}}>
            <img className='image-fluid mt-4' src='/image/lens.png' alt='hero' width='410px'/>
        </section>
        <section className='col-4 mt-5 d-flex flex-column align-items-center justify-content-center landing-container right-container'>
            <h2 className='h2 text-success'>10x Team 99</h2>
            <h5 className='border border-2 border-success rounded py-1 px-3 to-postview'><Link className='text-decoration-none text-success' to='/post/view'>Enter</Link></h5>
        </section>
        </div>
    </main>
}