import ReactMarkdown from 'react-markdown';
import { useState } from 'react';
import { PostInterface } from '../../types';
import Select from './select';

type PostFormProps = {
  submitForm: (event) => void;
  postData?: PostInterface;
};

const PostForm = ({ submitForm, postData }: PostFormProps) => {
  const [contentValue, setContentValue] = useState(postData?.content || '');
  const [selectValue, setSelectValue] = useState('');
  const [subjectValue, setSubjectValue] = useState('');

  const handleContent = (e) => {
    setContentValue(e.target.value);
  };

  const handleSubject = (e) => {
    setSubjectValue(e.target.value);
  };

  const handleSelect = (a) => setSelectValue(a);

  console.log(subjectValue, contentValue, selectValue);

  return (
    <form onSubmit={submitForm} className="post-form">
      <label htmlFor="subject" className="post-form__label">
        Subject
      </label>

      <input
        id="subject"
        type="text"
        className="post-form__input"
        value={postData?.subject || subjectValue}
        onChange={handleSubject}
        required
      />

      <textarea
        id="content"
        className="post-form__textarea"
        rows={7}
        value={contentValue}
        onChange={handleContent}
      />

      <label htmlFor="react-select-9090" className="post-form__label">
        Tags
      </label>
      <Select handleSelect={handleSelect} initialValues={postData?.tags.map((t) => t.tag)} />

      <button type="submit" className="post-form__button">
        Save
      </button>

      <ReactMarkdown className="preview">{contentValue}</ReactMarkdown>
    </form>
  );
};

export default PostForm;
