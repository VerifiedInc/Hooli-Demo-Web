import { CheckCircle } from '@mui/icons-material';
import { Button } from '@mui/material';
import { Form } from '@remix-run/react';

/**
 * Styled button for the IDDialog that makes a POST request to the root URL when clicked. POST request will trigger credentials issuance.
 */
export default () => {
  return (
    <Form method='post'>
      <Button
        name='intent'
        value='activate1Click'
        type='submit'
        color='secondary'
        variant='contained'
        startIcon={<CheckCircle />}
        sx={{ mt: '1rem' }}
      >
        Activate with 1-Click
      </Button>
    </Form>
  );
};
