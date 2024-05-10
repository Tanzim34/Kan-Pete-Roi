import React, { useEffect, useState } from 'react';
import "./postview_1.scss";
import View from '../../componants/view/view'; // Assuming this is a custom component
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

const PostView_1 = ({ id }) => {
  const [newslist, setNewslist] = useState([]);
  const[ll,setll]=useState(0)
  const fetchData = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/posts/u_id/${id}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) {
        console.error("Error fetching data");
        return; // Exit the function if there's an error
      }

      const data = await response.json();
      //console.log("Data from API:", data); // Optional: Log the data

      // Handle both empty array and null data
      
      setNewslist(data || []); 
      setll(newslist.length)
      // Set newslist to data if it exists, otherwise set to empty array
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchData();
    setll(newslist.length)
    console.log(newslist)
  }, []);
  console.log("ll11")
  console.log(ll)
  console.log(newslist)
  return (
    <div className='newslist'>
      {newslist.length === 0 ? (
        <div className='loading'>
          {/* Display "No posts found" message */}
          No posts found
        </div>
      ) : (
        <div className='list'>
          {newslist.map((nw) => (
            <div className='singlenews' key={nw.id}>
              <div className='headline'>{nw.title}</div>
              <div className='body'>{nw.body}</div>
              <div className='img'><img src={nw.photo} alt="image" /></div>
              <div className='see'>
                <button>
                  <Link to={`/post/${nw.id}`}>See</Link>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PostView_1;
