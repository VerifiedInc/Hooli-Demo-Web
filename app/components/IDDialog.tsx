import { Box, Dialog, Fade, IconButton, Link } from '@mui/material';
import { theme } from '~/styles/theme';
import { useNavigate } from '@remix-run/react';
import CloseIcon from '@mui/icons-material/Close';
import ActivateButton from './IDDialog/ActivateButton';
import MaybeLaterButton from './IDDialog/MaybeLaterButton';
import FormattedTypography from './FormattedTypography';

interface IDDialogProps {
  isSuccess: 'new' | 'success' | 'error';
}

// Component pops up when user first logs in, prompting them to provide permission to issue a Unum ID card
export default ({ isSuccess }: IDDialogProps) => {
  const { primary, neutral } = theme.palette;
  const navigate = useNavigate();

  // Helper function to close the dialog and remove query params
  const handleClick = () => {
    navigate('/');
  };

  return (
    <Dialog
      open
      slotProps={{
        backdrop: { sx: { background: 'rgba(255, 255, 255, 0.1)' } },
      }}
      PaperProps={{
        style: { borderRadius: 16 },
      }}
      sx={{
        backgroundImage: `linear-gradient(to top, ${neutral.light} 40%, ${primary.main})`,
      }}
    >
      <Fade in timeout={350}>
        <Box
          component='div'
          display='flex'
          flexDirection='column'
          alignItems='center'
          width='20rem'
          maxHeight='45rem'
          sx={{
            p: '0.75rem',
          }}
        >
          {isSuccess !== 'new' ? (
            <Box display='flex' alignItems='left'>
              <IconButton aria-label='close' onClick={handleClick}>
                <CloseIcon />
              </IconButton>
            </Box>
          ) : (
            []
          )}
          <FormattedTypography variant='h4' color='primary'>
            {isSuccess.toUpperCase()}
          </FormattedTypography>
          <FormattedTypography
            variant='h4'
            color='primary.dark'
            sx={{ fontWeight: 900, mb: 1 }}
          >
            {isSuccess === 'success'
              ? 'Congratulations! Your Hooli ID card is activated.'
              : isSuccess === 'new'
              ? 'Get your Hooli digital ID card. \n Free forever.'
              : 'We encountered an error while issuing your Unum ID. Please try again later'}
          </FormattedTypography>
          {isSuccess !== 'new'
            ? []
            : [
                <FormattedTypography
                  variant='subtitle2'
                  color='neutral.dark'
                  key='description-dialog'
                >
                  Use it to 1-click verify your identity. No more forms. No more
                  hassle <em>Welcome to a faster future.</em>
                </FormattedTypography>,
                <ActivateButton key='activate-button-dialog' />,
                <img
                  style={{ marginTop: 6 }}
                  width={140}
                  src='/powered_by_unum.png'
                  key='powered-by-dialog'
                />,
                <FormattedTypography
                  variant='caption'
                  color='neutral.main'
                  sx={{ mt: 1 }}
                  key='legal-links-dialog'
                >
                  By activating you agree to create an Unum ID account under
                  their
                  <Link color='neutral.main'>Terms of Use</Link> and
                  <Link color='neutral.main'> Privacy Policy</Link>.
                </FormattedTypography>,
                <MaybeLaterButton
                  key='maybe-later-button-dialog'
                  handleClick={handleClick}
                />,
              ]}
          {(isSuccess === 'success' || isSuccess === 'new') && (
            <img src='/id-card.svg' width={225} />
          )}
        </Box>
      </Fade>
    </Dialog>
  );
};
