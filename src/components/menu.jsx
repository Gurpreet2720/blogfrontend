/* eslint-disable react/prop-types */
/* eslint-disable indent */
/* eslint-disable react/jsx-indent */
/* eslint-disable react/react-in-jsx-scope */
import axios from 'axios';
import React, { useEffect, useState } from 'react';

function Menu({ cat }) {
    const [posts, setPosts] = useState([]);
    console.log('---------------category from recommend', cat);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`/posts/?cat=${cat}`);
                setPosts(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchData();
    }, [cat]);
    return (
        posts.map((post) => (
            <div className="recommend-post" key={post.id}>
                <div className="recommend-img">
                    <img src={`../upload/${post.img}`} alt="" />
                </div>
                <h3>{post.title}</h3>
                <button type="button">Read more</button>
            </div>
        ))
    );
}

export default Menu;
