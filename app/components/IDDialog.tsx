import { Box, Button, Dialog, Fade, IconButton, Link } from '@mui/material';
import { theme } from '~/styles/theme';
import { Form, useNavigate } from '@remix-run/react';
import CloseIcon from '@mui/icons-material/Close';
import FormattedTypography from './FormattedTypography';
import MaybeLaterButton from '~/components/IDDialog/MaybeLaterButton';

interface IDDialogProps {
  issueCredsStatus: 'new' | 'success' | 'error';
  isPartner: boolean;
}

/**
 * Component to pop-up and prompt user on issuing an Unum ID card. Also handles notification of successful or failed issuance.
 */
export default ({ issueCredsStatus, isPartner }: IDDialogProps) => {
  const { primary, neutral } = theme.palette;
  const navigate = useNavigate();

  // Helper function to close the dialog and remove query params
  const handleClick = () => {
    navigate('/');
  };

  const renderTitle = () => {
    if (issueCredsStatus === 'success')
      return 'Congratulations! Your Hooli ID card is activated.';

    if (isPartner)
      return 'Earn $20 and get an AI financial assistant with Kredita';

    if (issueCredsStatus === 'new')
      return 'Get your Hooli digital ID card. \n Free forever.';

    return 'We encountered an error while issuing your Unum ID. Please try again later';
  };

  const renderDescription = () => {
    if (isPartner)
      return 'Activate your free Hooli digital ID card to redeem this offer.';

    return (
      <>
        Use it to 1-click verify your identity. No more forms. No more hassle{' '}
        <em>Welcome to a faster future.</em>
      </>
    );
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
          maxWidth='23rem'
          position='relative'
          sx={{
            pt: '1.65rem',
            pb: '2.65rem',
            px: '2.5rem',
          }}
        >
          {issueCredsStatus !== 'new' ? (
            <IconButton
              aria-label='close'
              onClick={handleClick}
              size='small'
              sx={{
                position: 'absolute',
                top: 10,
                right: 10,
                width: 30,
                height: 30,
                fontSize: '2rem',
              }}
            >
              <CloseIcon fontSize='inherit' />
            </IconButton>
          ) : (
            []
          )}
          <FormattedTypography variant='h3' color='primary'>
            {issueCredsStatus.toUpperCase()}
          </FormattedTypography>
          <FormattedTypography
            variant='h2'
            color='primary.dark'
            sx={{ mb: issueCredsStatus === 'success' ? 4 : 0 }}
          >
            {renderTitle()}
          </FormattedTypography>
          {issueCredsStatus !== 'new' ? (
            <></>
          ) : (
            <>
              <FormattedTypography
                variant='subtitle2'
                color='neutral.main'
                key='description-dialog'
              >
                {renderDescription()}
              </FormattedTypography>
              <FormattedTypography
                variant='caption'
                color='neutral.main'
                sx={{ px: '0.8rem', fontFamily: 'Lato' }}
                key='legal-links-dialog'
              >
                By clicking 1-Click Activate, I direct Hooli to use Verified
                Inc. to create a digital ID card with my personal information,
                and I agree to Verified Inc.'s{' '}
                <Link
                  href='https://verified.inc/legal#terms-of-use'
                  color='secondary.main'
                >
                  Terms of Use
                </Link>{' '}
                and acknowledge its{' '}
                <Link
                  href='https://verified.inc/legal#privacy-policy'
                  color='secondary.main'
                >
                  {' '}
                  Privacy Policy
                </Link>
                .
              </FormattedTypography>
              <Form method='post' key='activate-button-dailog-new'>
                <Button
                  name='intent'
                  value='activate1Click'
                  type='submit'
                  sx={{
                    mt: 1,
                    mb: 2,
                    width: 241.25,
                    '&:hover': {
                      backgroundColor: 'transparent',
                    },
                  }}
                >
                  <img width={241.25} src='/Button.png' />
                </Button>
              </Form>
              {!isPartner && (
                <MaybeLaterButton
                  key='maybe-later-button-dialog'
                  handleClick={handleClick}
                />
              )}
            </>
          )}
          {(issueCredsStatus === 'success' || issueCredsStatus === 'new') && (
            <Box>
              <img
                src='/Hooli ID Card.png'
                width={225}
                style={{
                  filter: 'drop-shadow(0px 2px 2px rgba(0,0,0,0.5))',
                  backgroundColor: 'none',
                }}
              />
            </Box>
          )}
        </Box>
      </Fade>
    </Dialog>
  );
};
