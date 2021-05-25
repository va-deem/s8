import ReactMarkdown from 'react-markdown';
import { useState } from 'react';
import { PostInterface } from '../../types';
import Select from './select';

type PostFormProps = {
  submitForm: (event) => void;
  postData?: PostInterface;
};

const PostForm = ({ submitForm, postData }: PostFormProps) => {
  const [markdown, setMarkdown] = useState(postData?.content || '');

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
        value={markdown}
        onChange={handlePost}
      />
      <label htmlFor="react-select-17-input" className="post-form__label">
        Tags
      </label>
      <Select initialValues={postData.tags.map((t) => t.tag)} />
      <button type="submit" className="post-form__button">
        Save
      </button>
      <ReactMarkdown className="preview">{markdown}</ReactMarkdown>
    </form>
  );
};

export default PostForm;
