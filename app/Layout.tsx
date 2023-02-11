import Box from '@mui/material/Box';
import type { PropsWithChildren } from 'react';
import TopAppBar from './components/TopAppBar';

export default function Layout({ children }: PropsWithChildren) {
  return (
    <Box>
      <TopAppBar />
      <Box
        sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}
      >
        {children}
      </Box>
    </Box>
  );
}
