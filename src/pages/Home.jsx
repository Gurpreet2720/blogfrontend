/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import DisplayContent from '../components/DisplayContent';

// const Menucard = [
//   {
//     id: 1,
//     name: 'Tandoori Chicken',
//     about: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Facere molestias amet odit earum accusantium unde dicta hic, vitae velit deserunt laborum rem porro enim omnis. Tenetur vel molestiae maxime sunt.',
//     image: '/img/chicken.jpg',
//     category: '1',
//     price: 200,
//     quantity: 0,
//   },

//   {
//     id: 2,
//     name: 'Indian Curry',
//     about: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Facere molestias amet odit earum accusantium unde dicta hic, vitae velit deserunt laborum rem porro enim omnis. Tenetur vel molestiae maxime sunt.',
//     image: '/img/curry.png',
//     category: '1',
//     price: 100,
//     quantity: 0,
//   },

//   {
//     id: 3,
//     name: 'Masala Dosa',
//     about: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Facere molestias amet odit earum accusantium unde dicta hic, vitae velit deserunt laborum rem porro enim omnis. Tenetur vel molestiae maxime sunt.',
//     image: '/img/dosa.jpg',
//     category: '0',
//     price: 150,
//     quantity: 0,
//   },

//   {
//     id: 4,
//     name: 'Idli',
//     about: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Facere molestias amet odit earum accusantium unde dicta hic, vitae velit deserunt laborum rem porro enim omnis. Tenetur vel molestiae maxime sunt.',
//     image: '/img/idli.jpg',
//     category: '0',
//     price: 300,
//     quantity: 0,
//   },

//   {
//     id: 5,
//     name: 'Jalebi',
//     about: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Facere molestias amet odit earum accusantium unde dicta hic, vitae velit deserunt laborum rem porro enim omnis. Tenetur vel molestiae maxime sunt.',
//     image: '/img/jalebi.jpg',
//     category: '0',
//     price: 250,
//     quantity: 0,
//   },

//   {
//     id: 6,
//     name: 'Panipuri',
//     about: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Facere molestias amet odit earum accusantium unde dicta hic, vitae velit deserunt laborum rem porro enim omnis. Tenetur vel molestiae maxime sunt.',
//     image: '/img/panipuri.jpg',
//     category: '2',
//     price: 350,
//     quantity: 0,
//   },

//   {
//     id: 7,
//     name: 'Pizza',
//     about: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Facere molestias amet odit earum accusantium unde dicta hic, vitae velit deserunt laborum rem porro enim omnis. Tenetur vel molestiae maxime sunt.',
//     image: '/img/pizza.jpg',
//     category: '2',
//     price: 500,
//     quantity: 0,
//   },

//   {
//     id: 8,
//     name: 'Rasgulla',
//     about: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Facere molestias amet odit earum accusantium unde dicta hic, vitae velit deserunt laborum rem porro enim omnis. Tenetur vel molestiae maxime sunt.',
//     image: '/img/rasgulla.jpg',
//     category: '2',
//     price: 200,
//     quantity: 0,
//   },

//   {
//     id: 9,
//     name: 'Indian Thali',
//     about: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Facere molestias amet odit earum accusantium unde dicta hic, vitae velit deserunt laborum rem porro enim omnis. Tenetur vel molestiae maxime sunt.',
//     image: '/img/thali.jpg',
//     category: '1',
//     price: 270,
//     quantity: 0,
//   },
// ];
function Home() {
  const [posts, setPosts] = useState([]);
  console.log(posts);
  const cat = useLocation().search;
  console.log(cat);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/posts/${cat}`);
        setPosts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [cat]);
  return (

    <div className="home">
      <div className="posts">
        {posts.map((post) => (
          <div className="post" key={post.id}>
            <div className="img">
              <img src={`../upload/${post.img}`} alt="not found" />
            </div>
            <div className="content">
              <Link to={`post/${post.id}`} className="link">
                <h1>{post.title}</h1>
              </Link>
              <DisplayContent content={post.desc} />
              <button type="button">
                <Link to={`post/${post.id}`} className="link">
                  Read More
                </Link>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
