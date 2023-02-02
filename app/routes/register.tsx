import { ActionFunction, json } from '@remix-run/node';
import { Form, useActionData } from '@remix-run/react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { createUser, UserDto, UserOptions } from '~/models/user.server';
import { red } from '~/styles/colors';
import { createUserSession } from '~/session.server';
import { getErrorMessage, getErrorStatus } from '~/errors';
import { Container } from '@mui/material';

interface ActionData {
  user?: UserDto;
  error?: string;
}

// The exported `action` function will be called when the route makes a POST request, i.e. when the form is submitted.
export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();

  const email = formData.get('email');
  const password = formData.get('password');
  const phone = formData.get('phone');

  if (!email) {
    return json({ error: 'Email is required' }, { status: 400 });
  }

  if (!password) {
    return json({ error: 'Password is required' }, { status: 400 });
  }

  if (
    typeof email !== 'string' ||
    typeof password !== 'string' ||
    (phone && typeof phone !== 'string')
  ) {
    return json({ error: 'Invalid form data' }, { status: 400 });
  }

  const userOptions: UserOptions = {
    email,
    password,
    phone: phone || undefined,
  };

  try {
    const user = await createUser(userOptions);

    return createUserSession(request, user.uuid);
  } catch (e) {
    return json({ error: getErrorMessage(e) }, { status: getErrorStatus(e) });
  }
};

export default function Register() {
  const actionData: ActionData | undefined = useActionData<typeof action>();

  console.log('actionData', actionData);
  return (
    <Container maxWidth='xs' sx={{ mt: 4 }}>
      <Typography
        variant='h1'
        fontWeight={900}
        align='center'
        color='primary.dark'
      >
        Register
      </Typography>
      <Box my={6} display='flex' justifyContent='center'>
        <img src='/credit-card.svg' width={225} />
      </Box>
      <Form method='post'>
        <Box component='section' display='flex' flexDirection='column'>
          <TextField label='Email' name='email' />
          <TextField
            label='Password'
            name='password'
            type='password'
            sx={{ marginTop: 2 }}
          />
          <TextField label='Phone' name='phone' sx={{ marginTop: 2 }} />
          <Button
            variant='contained'
            type='submit'
            sx={{ my: 2, fontSize: '1.25rem', py: '1rem' }}
            fullWidth
          >
            Register
          </Button>
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
