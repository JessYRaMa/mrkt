import React from 'react'
import Posts from '../post/Posts'

export default function Home() {
    return (
        <>
        <div className = "jumbotron">
            <h2>All Posts</h2>
            <p className = "lead">This is my tester MRKT APP!</p>
        </div>
        <div className = "container">
            <Posts />
        </div>
        </>
    )
}
