import React, {useEffect, useState} from 'react';
import Header from './components/Header.jsx';
import Post from './components/Post.jsx'
import Footer from './components/Footer.jsx'
import Form from './components/Form.jsx';
import styles from './App.module.css';
import { posts as initialPosts} from './data/posts.js';

const App = () => {
  const [posts, setPosts] = useState(initialPosts);
  const [uniqueTags, setUniqueTags] = useState([]);
  
  // Funzione per calcolare i tag unici
  const getUniqueTags = (posts) => {
    console.log(posts);
    
    const allTags = posts.flatMap((post) => post.tags);
    console.log(allTags);
    
    const uniqueTags = [...new Set(allTags)];
    console.log(uniqueTags);
    
    setUniqueTags(uniqueTags);
  };

  useEffect(() => {
    getUniqueTags(posts);
  }, [posts]);

  const handleAddPost = (newPost) => {
    setPosts([
      ...posts,
      {
        id: posts.length + 1,
        ...newPost,
      },
    ]);
  };

  const handleDelete = (id) => {
    setPosts(posts.filter(post => post.id !== id));
  };

  const handleEdit = (id, newTitle) => {
    setPosts(posts.map(post => (post.id === id ? { ...post, title: newTitle } : post)));
  };

  return (
    <div className={styles.app}>
      <Header />
      <Form onAddPost={handleAddPost} />
      <main className={styles.main}>
        {posts
            .filter((post) => post.published)
            .map((post) => (
              <Post key={post.id} post={post} 
              onDelete={() => handleDelete(post.id)}
              onEdit={handleEdit}
              uniqueTags={uniqueTags.toString(' ')}
              title= {post.title}
              content= {post.content}
              image= {post.image}  
               />
        ))}
      </main>
      <div className={styles.flex}>
        {uniqueTags.map((tag) => (
          <span className= {styles.tags}key={tag}>{tag}</span>
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default App;
