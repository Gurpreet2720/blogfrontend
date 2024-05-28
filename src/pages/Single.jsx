/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
// eslint-disable-next-line import/no-extraneous-dependencies
import moment from 'moment';
import Dosa from '../pic/dosa.jpg';
import Person from '../pic/person.png';
import edit from '../pic/edit-button.png';
import Delete from '../pic/bin.png';
import { AuthContext } from '../context/authContext';
import Menu from '../components/menu';
import DisplayContent from '../components/DisplayContent';

function Single() {
  const [post, setPost] = useState([]);
  console.log(post);
  const location = useLocation();
  const PostID = location.pathname.split('/')[2];
  console.log(location);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/posts/${PostID}`);
        console.log(res.data);
        setPost(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [PostID]);
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleDelete = async () => {
    try {
      const res = await axios.delete(`/posts/${PostID}`);
      navigate('/');
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="single">
      <div className="content">
        <img src={`../upload/${post?.img}`} alt="" />
        <div className="user">
          {post.userimg && <img src={post?.userimg} alt="" />}
          <div className="info">
            <span>{post.username}</span>
            <p>
              Posted
              {' '}
              {moment(post.date).fromNow()}
            </p>
          </div>
          {currentUser?.username === post.username && (
            <div className="edit">
              <Link to="/write?edit=2" className="link" state={post}>
                <span className="tooltip-edit">Edit Post</span>
                <img src={edit} alt="" />
              </Link>
              <div className="del-p">
                <img src={Delete} onClick={handleDelete} className="del" alt="" />
                <span className="tooltip-del">Delete Post</span>
              </div>
            </div>
          )}
        </div>
        <h1>{post.title}</h1>
        <DisplayContent content={post.desc} />
      </div>
      <div className="recommend-container">
        <h3>other posts you may like</h3>
        <Menu cat={post.category} />
      </div>
    </div>
  );
}

export default Single;
