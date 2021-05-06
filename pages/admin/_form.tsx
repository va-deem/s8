export default function Form() {
  const createPost = (event) => {
    event.preventDefault();

    console.log(event.target);
  };

  return (
    <form onSubmit={createPost}>
      <label htmlFor="name">Name</label>
      <input id="theme" type="text" autoComplete="name" required />
      <button type="submit">Save</button>
    </form>
  );
}
