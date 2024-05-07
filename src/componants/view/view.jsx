import React, { useEffect, useState } from 'react';
import "./view.scss"
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import Other from '../../pages/other_user/other';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

const View = () => {

  const { id } = useParams();
  console.log(id);
  const [post, setPost] = useState("");
  const [nameData, setName] = useState("");
  const [comment, setComment] = useState(""); // New state for comment

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

  useEffect(() => {
    getResponse();
  }, []);

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleCommentSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission

    try {
      const response = await fetch(`http://127.0.0.1:8000/alu/${id}/comments`, { // Replace with your comment posting endpoint
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          comment: comment, // Send the comment content
        }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      // Handle successful comment submission (e.g., clear comment field, display success message)
      setComment(""); // Clear the comment field
      console.log("Comment submitted successfully!");
    } catch {
      console.log("Error submitting comment");
    }
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
        <button type="submit">Submit Comment</button>
      </form>
    </div>
  );
};

export default View;
