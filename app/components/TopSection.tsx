import { Menu } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { Box } from '@mui/system';
import ModalTypography from './FormattedTypography';

interface TopSectionIndexProps {
  email: string;
  handleDrawerToggle: () => void;
}

/**
 * Component which displays the top section of content for the root url - includes image of gold medal and welcome message.
 */
export default ({ email, handleDrawerToggle }: TopSectionIndexProps) => {
  const name = email.split('@')[0];

  return (
    <Box
      sx={{
        bgcolor: 'primary.main',
        borderRadius: 1,
        py: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        position: 'relative',
      }}
    >
      <IconButton
        aria-label='open drawer'
        edge='start'
        onClick={handleDrawerToggle}
        sx={{
          position: 'absolute',
          top: 0,
          left: 12,
          display: { lg: 'none' },
          color: 'primary.contrastText',
        }}
      >
        <Menu />
      </IconButton>
      <img src='/100.svg' />
      <ModalTypography variant='h1' color='primary.contrastText'>
        Welcome, {name.charAt(0).toUpperCase() + name.slice(1)}!
      </ModalTypography>
      <ModalTypography variant='body1' color='primary.contrastText'>
        You're verified!
      </ModalTypography>
    </Box>
  );
};
