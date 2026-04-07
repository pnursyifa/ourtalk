import React from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import useInput from '../hooks/useInput';
import PropTypes from 'prop-types';

function CommentInput({ onSubmit }) {
  const [content, onContentChange, setContent] = useInput('');

  const onSubmitClick = () => {
    if (!content.trim()) return;
    onSubmit(content);
    setContent('');
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
      <Typography variant="subtitle1" fontWeight="bold">Leave a comment</Typography>
      <TextField
        multiline
        rows={3}
        placeholder="Write your comment..."
        value={content}
        onChange={onContentChange}
        fullWidth
      />
      <Button variant="contained" onClick={onSubmitClick} sx={{ alignSelf: 'flex-end' }}>
        Submit
      </Button>
    </Box>
  );
}

CommentInput.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default CommentInput;