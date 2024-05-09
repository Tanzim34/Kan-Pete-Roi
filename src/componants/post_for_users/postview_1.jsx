import React, { useEffect, useState } from 'react';

import "./postview_1.scss"
import View from '../../componants/view/view';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

const PostView_1 = ({ id }) => {

  const [newslist, setNewslist] = useState([]); // Empty array as initial state
  const [alu, setAlu] = useState(false);

  


  let gee=id
    console.log(id)
  useEffect(() => {
    const alu1 = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/posts/u_id/${gee}`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' }
        });

        if (!response.ok) {
          console.log("error");
        }

        const data = await response.json();
        if(data.lenght===0){
            console.log("age")
            setAlu(true)
        }
        setNewslist(data);

        console.log(data)
       

      } catch (error) {
        console.log("error");
      }
    };

    if (gee) {
      alu1();
    }
  }, [gee]); // Dependency array includes gener for refetch on genre change

  //console.log(newslist)

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
            <div className='img'>
            <img src={nw.photo} alt="image" />
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

export default PostView_1;
