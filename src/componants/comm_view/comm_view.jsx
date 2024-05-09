import React, { useState, useEffect } from 'react';
import './comm_view.scss'; // Import SCSS (assuming it's in the same directory)
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
const Comm_view = () => {
  const id = localStorage.getItem('p_id'); // Get `p_id` from localStorage
  const [comment, setComment] = useState([]); // Array to store fetched comments
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const [alu, setalu] = useState(false); // Initially hide comments

  const fetchComments = async () => {
    setIsLoading(true); // Set loading state to true
    try {
      const response = await fetch(`http://127.0.0.1:8000/comment/${id}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) {
        console.log('Error fetching comments');
      } else {
        const data = await response.json();
        setComment(data);
        setalu(true); // Show comments after successful fetch
      }
    } catch (error) {
      console.error('Error fetching comments:', error);
    } finally {
      setIsLoading(false); // Set loading state to false after fetching
    }
  };

  useEffect(() => {
    fetchComments(); // Fetch comments on component mount
  }, [id]); // Dependency array: fetch only if `id` changes

  return (
    <div className='comment'>
      {isLoading ? ( // Display loading indicator while fetching
        <p>Loading comments...</p>
      ) : alu && comment.length > 0 ? ( // Show comments only if fetched and non-empty
        <div className='list'>
          {comment.map((nw) => (
            <div className='singlecomment' key={nw.id}>
              <div className='username'>
                <Link to={`/user/${nw.u_id}`}>
                    {nw.u_name}
                </Link>
              </div>
              <div className='body'>
                {nw.body}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No comments found.</p> // Display message if no comments fetched or empty
      )}
    </div>
  );
};

export default Comm_view;
