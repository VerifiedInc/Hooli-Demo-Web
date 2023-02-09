import Box from '@mui/material/Box';
import { useState } from 'react';
import { getUserEmail, logout, requireUserEmail } from '../session.server';
import { issueCredentials } from '../coreAPI.server';
import IDModal from '../components/IDDialog';
import { Container } from '@mui/system';
import TopSection from '../components/TopSection';
import NewSection from '../components/NewSection';
import RecommendationsSection from '../components/RecommendationsSection';
import NavDrawer from '../components/NavDrawer';
import { ActionFunction, json, LoaderFunction } from '@remix-run/node';
import {
  useActionData,
  useLoaderData,
  useSearchParams,
} from '@remix-run/react';
import { IconButton } from '@mui/material';
import { Menu } from '@mui/icons-material';

type issueCredsStatusType = 'new' | 'success' | 'error';

// The exported `action` function will be called when the route makes a POST request, i.e. when the form is submitted.
export const action: ActionFunction = async ({ request }) => {
  // Leverage the intent attribute on the route's buttons to determine which button was clicked
  // This can be used to trigger the appropriate action
  const formData = await request.formData();
  const intent = formData.get('intent');

  switch (intent) {
    case 'logout': {
      return await logout(request);
    }
    case 'activate1Click': {
      const email = await getUserEmail(request);
      return await issueCredentials(email);
    }
    default: {
      return null;
    }
  }
};

// The exported `loader` function will be called when the route makes a GET request, i.e. when it is rendered
export const loader: LoaderFunction = async ({ request }) => {
  // requireUserEmail will redirect to the login page if the user is not logged in
  const email = await requireUserEmail(request);
  // return user email to route so it can be leveraged
  return json({ email });
};

export default function HomeIndex() {
  // to leverage information returned by get requests to route, in this case the user info
  const data = useLoaderData<typeof loader>();
  // to leverage info returned by post requests to route, in this case if credentials were issued
  const actionData = useActionData<typeof action>();
  // will be leveraged to check if prompt param is set, if so will display IDDialog
  const [searchParams] = useSearchParams();
  // indicate whether the nav menu should be open based on the screen size
  const [mobileOpen, setMobileOpen] = useState(false);

  // Function to handle whether the side navigation bar opens when the Menu Icon is clicked
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // indicate which 'version' of the dialog is displayed - prompt a user to join (new), failed issuance (error), successful issuance (success)
  const issueCredsStatus: issueCredsStatusType = actionData || 'new';

  return (
    <Box
      component='main'
      sx={{
        bgcolor: 'neutral.light',
        margin: 0,
      }}
    >
      <IconButton
        aria-label='open drawer'
        edge='start'
        onClick={handleDrawerToggle}
        sx={{
          display: { lg: 'none' },
          position: 'absolute',
          top: 12,
          left: 12,
          width: 60,
          color: 'primary.contrastText',
          alignContent: 'center',
          mx: 0,
        }}
      >
        <Menu />
      </IconButton>
      <NavDrawer
        mobileOpen={mobileOpen}
        handleDrawerToggle={handleDrawerToggle}
        email={data.email}
      />
      <Container maxWidth='md'>
        <TopSection email={data.email} />
        <NewSection />
        <RecommendationsSection />
      </Container>
      {searchParams.get('prompt') === 'true' ? (
        <IDModal issueCredsStatus={issueCredsStatus} />
      ) : (
        []
      )}
    </Box>
  );
}
