import React, { useEffect, useState } from 'react';

import "./postview.scss"
import View from '../../componants/view/view';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

const PostView = ({ gener }) => {

  const [newslist, setNewslist] = useState([]); // Empty array as initial state
  const [alu, setAlu] = useState(false);
  const [havepost,sethave]=useState(true);

  console.log(gener);


  let gee=localStorage.getItem('genre');

  useEffect(() => {
    const alu1 = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/posts/${gee}`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' }
        });

        if (!response.ok) {
          console.log("error");
        }

        const data = await response.json();
        if(data.length===0){
          console.log(data.length)
          sethave(false)
        }
        setNewslist(data);
        setAlu(true);
        

      } catch (error) {
        console.log("error");
      }
    };

    if (gener) {
      alu1();
    }
  }, [gener]); // Dependency array includes gener for refetch on genre change

  console.log(newslist.length)
  
  
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

export default PostView;
