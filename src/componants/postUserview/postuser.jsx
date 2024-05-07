import React, { useEffect, useState } from 'react';

import "./postuser.scss"
import View from '../../componants/view/view';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

const PostView = ({ id }) => {

  const [newslist, setNewslist] = useState([]); // Empty array as initial state
  const [alu, setAlu] = useState(false);

  console.log(gener);
  useEffect(() => {
    const alu1 = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/posts/id/${id}`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' }
        });

        if (!response.ok) {
          console.log("error");
        }

        const data = await response.json();
        setNewslist(data);
        setAlu(true);

      } catch (error) {
        console.log("error");
      }
    };

    if (gener) {
      alu1();
    }
  }, [id]); // Dependency array includes gener for refetch on genre change

  console.log(newslist)

  return (
    <div className='newslist'>
      {alu && <div className='list'>
        {newslist.map((nw) => (
          <div className='singlenews' key={nw.id}> {/* Add key prop for unique items */}
            <div className='headline'>
              {nw.title}
            </div>
            <div className='body'>
              {nw.body}
            </div>
            <div className='see'>
              <button>
                <Link to={`/post/${nw.id}`}>
                  See 
                </Link>
              </button>
            </div>
          </div>
        ))}
      </div>}

      {!alu && <div className='loading'>
        Loading......
      </div>}
    </div>
  );
};

export default PostView;
