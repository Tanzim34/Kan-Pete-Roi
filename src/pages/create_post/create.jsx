import React, { useState,useEffect } from 'react';
import "./create.scss"

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState("null"); // New state variable for storing selected image file
  const [error, setError] = useState(null);
  const [genre, setGenre] = useState('');
  const [userData,setuserdata]=useState(false)

  const token = localStorage.getItem('token');
  const u_id=localStorage.getItem('u_id')

  let base64Image

  function convertImageToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}
 
  useEffect( () => {
    console.log(token)
    const fetchData = async (token) => {
      console.log(token)
      try {
        const response = await fetch(`http://127.0.0.1:8000/getuser/${token}`, { // Replace {{userId}} with actual user ID
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }, // Optional, depending on your FastAPI setup
        });
        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
          }
      
          const data = await response.json();
          //console.log('Success:', data);
          //setUserData(data)
          console.log(data.role)
          if(data.role===1){
            setuserdata(true)
          }

         
        //console.log(email)
      } catch (error) {
        //setError(error);
      } finally {
        //setIsLoading(false);
      }
    };

    if (token) {
     fetchData(token);
    }
  },[]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !content || !genre) {
      setError('Please enter a title, content, and select a genre for your post.');
      return;
    }

    try {
      
    
        if (image) {
          base64Image = await convertImageToBase64(image);
          console.log(base64Image)
      }

      const fromdata={
        title:title,
        body:content,
        u_id:u_id,
        genre:genre,
        photo:base64Image

      }
        //formData.append('image', base64Image); // Append selected image file to FormData
      

      const response = await fetch('http://127.0.0.1:8000/createpost', {
        method: 'POST',
          headers : {'Content-Type': 'application/json'},
          body:JSON.stringify(fromdata) // Send FormData instead of JSON
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      console.log('Post created successfully:', data);

      setTitle('');
      setContent('');
      setImage(null); // Clear selected image after successful post
      setError(null);
      setGenre('');
    } catch (error) {
      setError('An error occurred while creating your post. Please try again.');
    }
  };

  return (
    <div className="create-post">
      <h2>Create Post</h2>
      {
        !userData&& <div className='loading'>
          Loading.....
        </div>
      }
      {
        userData && <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="content">Content:</label>
          <textarea id="content" value={content} onChange={(e) => setContent(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="genre">Genre:</label>
          <select id="genre" value={genre} onChange={(e) => setGenre(e.target.value)}>
            <option value="">Select Genre</option>
            <option value="National">National</option>
            <option value="International">International</option>
            <option value="Binodhon">Binodhon</option>
            <option value="Lifestyle">Lifestyle</option>
            <option value="Sports">Sports</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="image">Upload Photo:</label>
          <input
            type="file"
            id="image"
            accept="image/*" // Accept only image files
            onChange={(e) => setImage(e.target.files[0])} // Update state with selected image file
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        <button type="submit">Submit</button>
      </form>
      }
    </div>
  );
};

export default CreatePost;
