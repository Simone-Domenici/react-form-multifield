import React, { useState } from 'react';
import styles from './Form.module.css'

const Form = ({ onAddPost }) => {
    const [formState, setFormState] = useState({
      title: '',
      image: '',
      content: '',
      tags: '',
      published: false,
      author: '',
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormState({ ...formState, [name]: value });
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      if (!formState.title) {
        alert('Il titolo è obbligatorio.');
        return;
      }
  
      onAddPost({
        ...formState,
        tags: formState.tags.split(',').map(tag => tag.trim()),
      });
  
      setFormState({ title: '', image: '', content: '', tags: '', published: false, author: '' });
    };
  
    return (
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Titolo"
          value={formState.title}
          onChange={handleChange}
        />
        <input
        type="text"
        name="image"
        placeholder="URL immagine"
        value={formState.image}
        onChange={handleChange}
      />
      <textarea
        name="content"
        placeholder="Contenuto"
        value={formState.content}
        onChange={handleChange}
      />
      <input
        type="text"
        name="tags"
        placeholder="Tag (separati da virgola)"
        value={formState.tags}
        onChange={handleChange}
      />
      <input
        type="text"
        name="author"
        placeholder="Autore"
        value={formState.author}
        onChange={handleChange}
      />
      <select name="published" value={formState.published} onChange={handleChange}>
        <option value="false">Draft</option>
        <option value="true">Published</option>
      </select>
        <button type="submit">Aggiungi Post</button>
      </form>
    );
  };
  
  export default Form;