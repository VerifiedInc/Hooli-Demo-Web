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
        sx={{ mt: 2, ml: 2, mb: 2 }}
      >
        New
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: {
            xs: 'column',
            sm: 'row',
          },
          bgcolor: 'white',
          pt: { xs: 4, sm: 8 },
          pb: 1,
          mx: 2,
          mb: 1,
          borderRadius: '8px',
        }}
      >
        <Box sx={{ flex: 1, flexShrink: 0, px: 8 }}>
          <Box
            sx={{
              mx: { xs: 1, sm: 2 },
              mb: { xs: 4, sm: 0 },
              position: 'relative',
            }}
          >
            <Typography
              variant='h1'
              color='primary.dark'
              right={21}
              top={18}
              sx={{ textAlign: 'center', fontWeight: 900 }}
            >
              Grow Your 401(k) on Autopilot
            </Typography>
            <Typography
              variant='body2'
              color='primary.main'
              sx={{ textAlign: 'center', my: 2 }}
            >
              And get a $25 bonus!
            </Typography>
            <Typography
              variant='body2'
              color='primary.dark'
              sx={{ mb: 1, mx: 2, mt: 4, textAlign: 'center' }}
            >
              We've partnered with Lentable so you can get a cash advance to
              meet your employer's 401(k) match.
            </Typography>
            <Typography
              variant='body2'
              color='primary.dark'
              sx={{ mb: 1, mx: 2, mt: 4, textAlign: 'center' }}
            >
              With your Hooli ID card, you can sign up through the fast lane:
            </Typography>
            <Box sx={{ mt: 4 }}>
              <img
                src='/activate_button_with_powered_by_(Hooli).png'
                style={{ width: '100%' }}
              />
            </Box>
          </Box>
        </Box>
        <Box sx={{ flex: 1, flexShrink: 0, px: 8, pb: { xs: 4, sm: 8 } }}>
          <Box sx={{ mb: 2 }}>
            <img
              src='/activate_button_with_powered_by_(Hooli).png'
              style={{ width: '100%' }}
            />
          </Box>
          <img src='/id-card-hooli.png' style={{ width: '100%' }} />
        </Box>
      </Box>
    </Box>
  );
};
