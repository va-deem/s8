import ReactMarkdown from 'react-markdown';
import { useState } from 'react';
import { PostInterface } from '../../types';
import Select from './select';
import { useRouter } from 'next/router';

type PostFormProps = {
  handlePostCreate: (event) => void;
  postData?: PostInterface;
};

const PostForm = ({ handlePostCreate, postData }: PostFormProps) => {
  const router = useRouter();
  const initialTags = postData ? postData.tags.map((tag) => tag.tag) : [];

  const [content, setContent] = useState(postData?.content || '');
  const [tags, setTags] = useState(initialTags);
  const [subject, setSubject] = useState(postData?.subject || '');

  const handleContent = (e) => {
    setContent(e.target.value);
  };

  const handleSubject = (e) => {
    setSubject(e.target.value);
  };

  const handleSelect = (a) => setTags(a);

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(subject, content, tags);

    if (postData && postData.id) {
      const handlePostUpdate = async (formValues) => {
        try {
          const response = await fetch(`/api/posts/${postData.id}`, {
            body: JSON.stringify(formValues),
            headers: {
              'Content-Type': 'application/json',
            },
            method: 'PUT',
          });

          if (!response.ok) {
            const data = await response.json();
            throw new Error(data.error);
          } else {
            alert('Post updated successfully!');
            router.replace('/admin');
          }
        } catch (e) {
          alert(e.message);
        }
      };

      handlePostUpdate({
        id: postData.id,
        subject,
        content,
        tags,
      });
    } else {
      handlePostCreate({
        subject,
        content,
        tags,
      });
    }
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
      <Select handleSelect={handleSelect} initialValues={postData?.tags.map((t) => t.tag)} />

      <button type="submit" className="post-form__button">
        Save
      </button>

      <ReactMarkdown className="preview">{content}</ReactMarkdown>
    </form>
  );
};

export default PostForm;
