import { Typography } from '@mui/material';
import { Box } from '@mui/system';

/**
 * Component which displays 'New' section of content for root URL - contains image of man holding a phone and an offer to invite friends to the service.
 */
export default () => {
  return (
    <Box>
      <Typography
        variant='h2'
        color='primary.dark'
        fontWeight={900}
        sx={{ mt: 2, ml: 2 }}
      >
        New
      </Typography>
      <Box sx={{ mx: 2, mt: 2, mb: 0, position: 'relative' }}>
        <Typography
          variant='h1'
          color='primary.contrastText'
          position='absolute'
          right={24}
          top={8}
        >
          $25
        </Typography>
        <img
          style={{ marginBottom: 0 }}
          width='100%'
          src='/man-holding-phone.svg'
        />
      </Box>
      <Box
        sx={{
          bgcolor: 'white',
          pt: 2,
          pb: 1,
          mx: 2,
          mb: 1,
          mt: -1,
          borderRadius: '0 0 8px 8px',
        }}
      >
        <Typography
          variant='h5'
          color='primary.dark'
          sx={{ mb: 1, mx: 2 }}
          fontWeight={900}
        >
          Invite Your Friends and Earn!
        </Typography>
        <Typography variant='body2' color='primary.dark' sx={{ mb: 1, mx: 2 }}>
          For every friend you refer, you'll receive $5. You can earn up to $25
          total.
        </Typography>
        <Typography
          variant='h5'
          color='primary.main'
          sx={{ mb: 1, mx: 2 }}
          fontWeight={900}
        >
          Invite Now
        </Typography>
      </Box>
    </Box>
  );
};
