import { PostInterface } from '../../types';

const PostForm = ({
  submitForm,
  postData,
}: {
  submitForm: (event) => void;
  postData?: PostInterface;
}) => {
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
        defaultValue={postData?.content}
      />
      <button type="submit" className="post-form__button">
        Save
      </button>
    </form>
  );
};

export default PostForm;
