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
    <form onSubmit={handleSubmit} className="post-form">
      <label htmlFor="subject" className="post-form__label">
        Subject
      </label>

      <input
        id="subject"
        type="text"
        className="post-form__input"
        value={subject}
        onChange={handleSubject}
        required
      />

      <textarea
        id="content"
        className="post-form__textarea"
        rows={7}
        value={content}
        onChange={handleContent}
      />

      <label htmlFor="react-select-9090" className="post-form__label">
        Tags
      </label>
      <Select tags={tags} setTags={setTags} />

      <button type="submit" className="post-form__button">
        Save
      </button>

      <ReactMarkdown className="preview">{content}</ReactMarkdown>
    </form>
  );
};
export default PostForm;
