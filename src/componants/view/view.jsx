import React, { useEffect, useState } from 'react';
import "./view.scss"
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import Other from '../../pages/other_user/other';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import Comm_view from '../comm_view/comm_view';
const View = () => {

  const { id } = useParams();
  console.log(id);
  const [post, setPost] = useState("");
  const [nameData, setName] = useState("");
  const [comment, setComment] = useState(""); // New state for comment

  let u_id=localStorage.getItem('u_id')

  localStorage.setItem('p_id',id)

  let u_name=localStorage.getItem('name')

  const getResponse = async () => {
    try {
      
      const response = await fetch(`http://127.0.0.1:8000/alu/${id}`, { // Replace {{userId}} with actual user ID
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }, // Optional, depending on your FastAPI setup
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const data = await response.json();
      setPost(data);
    } catch {
      console.log("error");
    }
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  useEffect(() => {
    getResponse();
  }, []);

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleCommentSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission

    try {
      const data1={
        comm:comment,
        u_id:u_id,
        u_name:u_name
      }
      const response = await fetch(`http://127.0.0.1:8000/alu/${id}/comment`, { // Replace with your comment posting endpoint
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data1),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      setComment(""); 
      console.log("Comment submitted successfully!");
    } catch {
      console.log("Error submitting comment");
    }
    window.location.reload();
  };

  return (
    <div className="post">
      <div className="posttile">
        {post.title}
      </div>
      <div className="name">
        <Link to={`/user/${post.u_id}`}>
          {post.user_name}
        </Link>
      </div>
      <div className="ShowTimeDate">{formatDate(post.modify_at)}</div>
      <div className="text">
        {post.body}
      </div>
      <div className="img">
        <img src={post.photo} alt="image" />
      </div>
      <form onSubmit={handleCommentSubmit}>
        <textarea
          value={comment}
          onChange={handleCommentChange}
          placeholder="Write your comment..."
        />
        <button type="submit">Submit</button>
      </form>
      <Comm_view></Comm_view>
    </div>
  );
};

export default View;
