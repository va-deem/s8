import ReactMarkdown from 'react-markdown';
import { useState } from 'react';
import { PostInterface } from '../../types';
import Tags from '../tags';

const PostForm = ({
  submitForm,
  postData,
}: {
  submitForm: (event) => void;
  postData?: PostInterface;
}) => {
  const [markdown, setMarkdown] = useState(postData?.content || '');
  const [tags, setTags] = useState(postData.tags);
  const [tag, setTag] = useState('');

  const handlePost = (e) => {
    setMarkdown(e.target.value);
  };

  const deleteTag = (event) => {
    const tagId: number = event.target.closest('span').dataset.id;
    const filteredTags = tags.filter((t) => t.tag.id !== Number(tagId));
    setTags(filteredTags);
  };

  const findTag = async (event) => {
    setTag(event.target.value);
    console.log('TAG', tag);
    // const response = await fetch(`/api/tags&name=${event.target.value}`);
    const response = await fetch(`/api/tags/${event.target.value}`);
    const data = await response.json();
    console.log(data);
  }

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
      <label htmlFor="tags" className="post-form__label">
        Tags
      </label>
      <input
        id="tags"
        type="text"
        className="post-form__input"
        // defaultValue={tagsString}
        required
        onChange={findTag}
      />
      <Tags tags={tags} deleteTag={deleteTag} />
      <button type="submit" className="post-form__button">
        Save
      </button>
      <ReactMarkdown className="preview">{markdown}</ReactMarkdown>
    </form>
  );
};

export default PostForm;
