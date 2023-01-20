import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import type { ActionFunction, LoaderFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { Form, useLoaderData } from '@remix-run/react';
import type { UserDto } from '~/models/user.server';
import { lightGrey } from '~/styles/colors';
import { logout, requireUser } from '~/session.server';

/***********************************************************************************************************************
 * AN EXAMPLE OF A ROUTE THAT REQUIRES A USER TO BE LOGGED IN. IF THE USER IS NOT LOGGED IN, THEY WILL BE REDIRECTED TO THE LOGIN PAGE. *
 ***********************************************************************************************************************/

interface LoggedInUserProps {
  user: UserDto;
}

/**
 * component to display the logged in user
 */
export function LoggedInUser({ user }: LoggedInUserProps) {
  return (
    <Box
      component='section'
      display='flex'
      flexDirection='column'
      sx={{ backgroundColor: lightGrey }}
    >
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </Box>
  );
}

// The exported `action` function will be called when the route makes a POST request, i.e. when the form is submitted.
export const action: ActionFunction = async ({ request }) => {
  return await logout(request);
};

// The exported `loader` function will be called when the route makes a GET request, i.e. when it is rendered
export const loader: LoaderFunction = async ({ request }) => {
  // requireUser will redirect to the login page if the user is not logged in
  const user = await requireUser(request);

  // return the user to the route, so it can be displayed
  return json({ user });
};

export default function Authenticated() {
  const data = useLoaderData<typeof loader>();
  return (
    <Box component='main' display='flex' flexDirection='column'>
      <Typography variant='h1'>Authenticated</Typography>
      {data?.user ? <LoggedInUser user={data.user} /> : null}
      <Form method='post'>
        <Button variant='contained' color='secondary' type='submit'>
          Log out
        </Button>
      </Form>
    </Box>
  );
}
