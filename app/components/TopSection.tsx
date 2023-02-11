import { Box } from '@mui/system';
import ModalTypography from './FormattedTypography';

interface TopSectionIndexProps {
  email: string;
}

/**
 * Component which displays the top section of content for the root url - includes image of gold medal and welcome message.
 */
export default ({ email }: TopSectionIndexProps) => {
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
        mt: 2.5,
      }}
    >
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
