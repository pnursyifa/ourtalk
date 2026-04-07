import React from 'react';
import { Box, TextField, Button } from '@mui/material';
import useInput from '../hooks/useInput';
import PropTypes from 'prop-types';

function CreateThreadInput({ onSubmit }) {
  const [title, onTitleChange] = useInput('');
  const [body, onBodyChange] = useInput('');
  const [category, onCategoryChange] = useInput('');

  const onSubmitClick = () => {
    if (!title.trim() || !body.trim()) return;
    onSubmit({ title, body, category });
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <TextField
        required
        id="thread-title"
        label="Title"
        value={title}
        onChange={onTitleChange}
        fullWidth
      />
      <TextField
        id="thread-category"
        label="Category (optional)"
        value={category}
        onChange={onCategoryChange}
        fullWidth
      />
      <TextField
        required
        id="thread-body"
        label="Body"
        multiline
        rows={8}
        value={body}
        onChange={onBodyChange}
        fullWidth
      />
      <Button
        variant="contained"
        onClick={onSubmitClick}
        sx={{ alignSelf: 'flex-end' }}
      >
    Create Thread
      </Button>
    </Box>
  );
}

CreateThreadInput.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default CreateThreadInput;
