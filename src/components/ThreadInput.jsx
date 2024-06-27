import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { Button, Input, Textarea } from '@chakra-ui/react';
import useInput from '../hooks/useInput';

export default function ThreadInput({ addThread }) {
  const [title, setTitle] = useInput('');
  const [category, setCategory] = useInput('');
  const [body, setBody] = useInput('');
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    addThread({ title, body, category });
    navigate('/');
  };

  return (
    <form className="thread-input">
      <label htmlFor="title">
        Title
        <Input
          type="text"
          value={title}
          id="title"
          onChange={setTitle}
          placeholder="Title"
        />
      </label>
      <label htmlFor="category" mt="4">
        Category
        <Input
          type="text"
          value={category}
          id="category"
          onChange={setCategory}
          placeholder="Category"
        />
      </label>
      <label htmlFor="body" mt="4">
        Message Body
        <Textarea
          value={body}
          id="body"
          onChange={setBody}
          rows="4"
          placeholder="Body"
        />
      </label>
      <Button
        type="submit"
        onClick={handleSubmit}
        mt="4"
        colorScheme="blue"
      >
        Create Thread
      </Button>
    </form>
  );
}

ThreadInput.propTypes = {
  addThread: PropTypes.func.isRequired,
};
