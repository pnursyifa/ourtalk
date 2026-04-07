import React from 'react';
import { Card, CardContent, Skeleton, Box } from '@mui/material';

function ThreadCardSkeleton() {
  return (
    <Card variant="outlined" sx={{ borderRadius: 3 }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
          <Skeleton variant="circular" width={28} height={28} />
          <Skeleton variant="text" width={120} />
          <Skeleton variant="text" width={80} sx={{ ml: 'auto' }} />
        </Box>
        <Skeleton variant="text" width="60%" height={32} />
        <Skeleton variant="text" width="100%" />
        <Skeleton variant="text" width="80%" />
        <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
          <Skeleton variant="rounded" width={60} height={24} />
          <Skeleton variant="text" width={40} sx={{ ml: 'auto' }} />
          <Skeleton variant="text" width={40} />
        </Box>
      </CardContent>
    </Card>
  );
}

export default ThreadCardSkeleton;