const PostForm = ({ createPost }: { createPost: (event) => void }) => {
  return (
    <form onSubmit={createPost} className="post-form">
      <label htmlFor="subject" className="post-form__label">
        Subject
      </label>
      <input id="subject" type="text" className="post-form__input" required />
      <textarea id="content" className="post-form__textarea" rows={7} required />
      <button type="submit" className="post-form__button">
        Save
      </button>
    </form>
  );
};

export default PostForm;
