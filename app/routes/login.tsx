import type { ActionFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { Form, Link, useActionData } from '@remix-run/react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { theme } from '~/styles/theme';

import { red } from '~/styles/colors';
import { login } from '~/models/user.server';
import { createUserSession } from '~/session.server';
import { getErrorMessage, getErrorStatus } from '~/errors';
import { Container } from '@mui/material';

// The exported `action` function will be called when the route makes a POST request, i.e. when the form is submitted.
export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();

  const email = formData.get('email');
  const password = formData.get('password');

  // some basic form validation.
  // if there are any errors, we'll return a 400 with an `error` field in the JSON response
  if (!email) {
    return json({ error: 'Email is required' }, { status: 400 });
  }

  if (!password) {
    return json({ error: 'Password is required' }, { status: 400 });
  }

  if (typeof email !== 'string' || typeof password !== 'string') {
    return json({ error: 'Invalid form data' }, { status: 400 });
  }

  try {
    // log the user in
    const user = await login(email, password);

    // set the session cookie and redirect to the home page
    return createUserSession(request, user.uuid);
  } catch (e) {
    return json({ error: getErrorMessage(e) }, { status: getErrorStatus(e) });
  }
};

export default function Login() {
  const actionData = useActionData<typeof action>();

  return (
    <Container maxWidth='xs' sx={{ mt: 4 }}>
      <Typography
        variant='h1'
        fontWeight={900}
        align='center'
        color='primary.dark'
      >
        Welcome!
      </Typography>
      <Box my={6} display='flex' justifyContent='center'>
        <img src='/credit-card.svg' width={225} />
      </Box>

      <Form method='post'>
        <Box component='section' display='flex' flexDirection='column'>
          <TextField label='Email Address' name='email' />
          <TextField
            label='Password'
            name='password'
            type='password'
            sx={{ marginTop: 2 }}
          />
          <Button
            variant='contained'
            type='submit'
            sx={{ my: 2, fontSize: '1.25rem', py: '1rem' }}
            fullWidth
          >
            Sign In
          </Button>
          <Link
            to='/register'
            style={{
              color: theme.palette.primary.dark,
              fontSize: '1rem',
              textAlign: 'center',
            }}
          >
            Create a new account instead
          </Link>
          {actionData?.error && (
            <Typography sx={{ marginTop: 2 }} color={red}>
              {actionData?.error}
            </Typography>
          )}
        </Box>
      </Form>
    </Container>
  );
}
