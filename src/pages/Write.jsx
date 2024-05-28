/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-empty */
/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
import axios from 'axios';
import moment from 'moment';
import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // import the desired Quill theme CSS
import { useLocation, useNavigate } from 'react-router-dom';

function Write() {
  const { state } = useLocation();
  const [value, setValue] = useState(state?.desc || '');
  const [title, setTitle] = useState(state?.title || '');
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState(state?.category || '');
  const navigate = useNavigate();
  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      const res = await axios.post('/upload', formData);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };
  const handleClick = async (e) => {
    e.preventDefault();
    const imgUrl = await upload();
    try {
      state ? await axios.put(
        `/posts/${state.id}`,
        {
          title,
          desc: value,
          cat,
          img: file ? imgUrl : '',
        },
      )
        : await axios.post(
          '/posts/',
          {
            title,
            desc: value,
            cat,
            img: file ? imgUrl : '',
            date: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
          },
        );
      navigate('/');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="add">
      <div className="content">
        <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <div className="editorContainer">
          <ReactQuill value={value} onChange={setValue} className="editor" />
        </div>
      </div>
      <div className="menu">
        <div className="item">
          <h1>Publish</h1>
          <span>
            <b>Status: </b>
            {' '}
            Draft
          </span>
          <span>
            <b>Visibility: </b>
            {' '}
            Public
          </span>

          <label htmlFor="file" className="file">
            <br />
            Upload Image
            {' '}
            <input type="file" id="file" onChange={(e) => setFile(e.target.files[0])} />
          </label>
          <div className="button">
            <button type="button">Sava as a draft</button>
            <button type="button" onClick={handleClick}>Publish</button>
          </div>
        </div>
        <div className="item">
          <h1>Category</h1>
          <div className="cat">
            <label htmlFor="art">
              <input type="radio" checked={cat === 'art'} name="cat" value="art" id="art" onChange={(e) => setCat(e.target.value)} />
              Art
            </label>
          </div>
          <div className="cat">
            <label htmlFor="science">
              <input type="radio" checked={cat === 'Science'} name="cat" value="Science" id="science" onChange={(e) => setCat(e.target.value)} />
              Science
            </label>
          </div>
          <div className="cat">
            <label htmlFor="technology">
              <input type="radio" checked={cat === 'technology'} name="cat" value="technology" id="technology" onChange={(e) => setCat(e.target.value)} />
              Technology
            </label>
          </div>
          <div className="cat">
            <label htmlFor="cinema">
              <input type="radio" checked={cat === 'cinema'} name="cat" value="cinema" id="cinema" onChange={(e) => setCat(e.target.value)} />
              Cinema
            </label>
          </div>
          <div className="cat">
            <label htmlFor="design">
              <input type="radio" checked={cat === 'design'} name="cat" value="design" id="design" onChange={(e) => setCat(e.target.value)} />
              Design
            </label>
          </div>
          <div className="cat">
            <label htmlFor="food">
              <input type="radio" checked={cat === 'food'} name="cat" value="food" id="food" onChange={(e) => setCat(e.target.value)} />
              Food
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Write;
