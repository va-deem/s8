import styles from '/styles/admin/postForm.module.scss';

import ReactMarkdown from 'react-markdown';
import { useState } from 'react';
import { PostInterface } from '../../types';
import Select from './select';

type PostFormProps = {
  submitForm: (event) => void;
  postData?: PostInterface;
};

const PostForm = ({ submitForm, postData }: PostFormProps) => {
  const initialTags = postData ? postData.tags.map((tag) => tag.tag) : [];

  const [subject, setSubject] = useState(postData?.subject || '');
  const [content, setContent] = useState(postData?.content || '');
  const [tags, setTags] = useState(initialTags);

  const handleContent = (e) => {
    setContent(e.target.value);
  };

  const handleSubject = (e) => {
    setSubject(e.target.value);
  };

  // Creates post if it is new and updates post if it exists
  const handleSubmit = (e) => {
    e.preventDefault();
    submitForm({ content, tags, subject });
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <label htmlFor="subject" className={styles.label}>
        Subject
      </label>

      <input
        id="subject"
        type="text"
        className={styles.input}
        value={subject}
        onChange={handleSubject}
        required
      />

      <textarea
        id="content"
        className={styles.textarea}
        rows={7}
        value={content}
        onChange={handleContent}
      />

      <label htmlFor="react-select-9090" className={styles.label}>
        Tags
      </label>
      <Select tags={tags} setTags={setTags} />

      <button type="submit" className={styles.button}>
        Save
      </button>

      <ReactMarkdown className={styles.preview}>{content}</ReactMarkdown>
    </form>
  );
};

export default PostForm;
