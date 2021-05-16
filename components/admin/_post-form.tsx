import { PostInterface } from '../../types';
import ReactMarkdown from 'react-markdown';
import { useState } from 'react';

const PostForm = ({
  submitForm,
  postData,
}: {
  submitForm: (event) => void;
  postData?: PostInterface;
}) => {
  const [markdown, setMarkdown] = useState(postData.content || '');

  const handlePost = (e) => {
    setMarkdown(e.target.value);
  };

  return (
    <form onSubmit={submitForm} className="post-form">
      <label htmlFor="subject" className="post-form__label">
        Subject
      </label>
      <input
        id="subject"
        type="text"
        className="post-form__input"
        defaultValue={postData?.subject}
        required
      />
      <textarea
        id="content"
        className="post-form__textarea"
        rows={7}
        // defaultValue={postData?.content || null}
        value={markdown}
        onChange={handlePost}
      />
      <ReactMarkdown className="preview">{markdown}</ReactMarkdown>
      <button type="submit" className="post-form__button">
        Save
      </button>
    </form>
  );
};

export default PostForm;
