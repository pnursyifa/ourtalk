import React from 'react';
import { Box, Skeleton, Divider } from '@mui/material';

function ThreadDetailSkeleton() {
  return (
    <Box sx={{ p: 3, maxWidth: 800, mx: 'auto' }}>
      <Skeleton variant="rounded" width={80} height={24} sx={{ mb: 2 }} />

      <Skeleton variant="text" width="70%" height={48} sx={{ mb: 1 }} />

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
        <Skeleton variant="circular" width={32} height={32} />
        <Skeleton variant="text" width={120} />
        <Skeleton variant="text" width={80} />
      </Box>

      <Skeleton variant="rectangular" width="100%" height={200} sx={{ mb: 1, borderRadius: 2 }} />
      <Skeleton variant="text" width="90%" />
      <Skeleton variant="text" width="80%" sx={{ mb: 3 }} />

      <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
        <Skeleton variant="circular" width={40} height={40} />
        <Skeleton variant="text" width={24} />
        <Skeleton variant="circular" width={40} height={40} />
        <Skeleton variant="text" width={24} />
      </Box>

      <Divider sx={{ my: 3 }} />

      <Skeleton variant="rectangular" width="100%" height={100} sx={{ borderRadius: 2, mb: 3 }} />

      <Divider sx={{ my: 3 }} />

      <Skeleton variant="text" width={120} height={32} sx={{ mb: 2 }} />
      {[...Array(3)].map((_, i) => (
        <Box key={i} sx={{ mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
            <Skeleton variant="circular" width={28} height={28} />
            <Skeleton variant="text" width={120} />
            <Skeleton variant="text" width={80} sx={{ ml: 'auto' }} />
          </Box>
          <Skeleton variant="text" width="100%" />
          <Skeleton variant="text" width="70%" />
        </Box>
      ))}
    </Box>
  );
}

export default ThreadDetailSkeleton;