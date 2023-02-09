import { AppBar, Box, Toolbar } from '@mui/material';

/**
 * Formatted and branded MUI AppBar to appear at the top of all pages in the demo.
 */
export default () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static'>
        <Toolbar sx={{ justifyContent: 'center', alignItems: 'center' }}>
          <Box>
            <img src='/logo-blue-background.png' height={40} />
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
