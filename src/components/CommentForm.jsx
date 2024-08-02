import { useState } from 'react';

const CommentForm = (props) => {
  const [formData, setFormData] = useState({ text: '' });

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    props.handleAddComment(formData);
    setFormData({ text: '' });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className='lable'>
      <label htmlFor="text-input">Your comment:</label>
      </div>
      <textarea
        required
        type="text"
        name="text"
        id="text-input"
        value={formData.text}
        onChange={handleChange}
      />
      <div className='submit'>
      <button type="submit">SUBMIT COMMENT</button>
      </div>
    </form>
  );
};

export default CommentForm;
