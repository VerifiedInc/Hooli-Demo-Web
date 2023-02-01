import Box from '@mui/material/Box';
import { useEffect, useState } from 'react';
import { getUser, logout, requireUser } from '../session.server';
import { issueCredentials } from '../coreAPI.server';
import IDModal from '../components/IDDialog';
import { Container } from '@mui/system';
import TopSection from '../components/TopSection';
import NewSection from '../components/NewSection';
import RecommendationsSection from '../components/RecommendationsSection';
import NavBar from '../components/NavBar';
import { ActionFunction, json, LoaderFunction } from '@remix-run/node';
import {
  useActionData,
  useLoaderData,
  useSearchParams,
} from '@remix-run/react';

type isSuccessType = 'new' | 'success' | 'error';

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
      const user = await getUser(request);
      return await issueCredentials(user);
    }
    default: {
      return null;
    }
  }
};

// The exported `loader` function will be called when the route makes a GET request, i.e. when it is rendered
export const loader: LoaderFunction = async ({ request }) => {
  // requireUser will redirect to the login page if the user is not logged in
  const user = await requireUser(request);
  // return user to route so user information can be leveraged
  return json({ user });
};

export default function HomeIndex() {
  // to leverage information returned by get requests to route, in this case the user info
  const data = useLoaderData<typeof loader>();
  // to leverage info returned by post requests to route, in this case if credentials were issued
  const actionData = useActionData<typeof action>();
  // will be leveraged to check if prompt param is set, if so will display IDDialog
  const [searchParams] = useSearchParams();
  // indicate which 'version' of the dialog is displayed - prompt a user to join (new), failed issuance (error), successful issuance (success)
  const [isSuccess, setIsSuccess] = useState<isSuccessType>('new');
  // indicate whether the nav menu should be open based on the screen size
  const [mobileOpen, setMobileOpen] = useState(false);

  // Function to handle whether the side navigation bar opens when the Menu Icon is clicked
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  useEffect(() => {
    actionData === 'success' || actionData === 'error'
      ? setIsSuccess(actionData)
      : setIsSuccess('new');
  }, [actionData]);

  return (
    <Box
      component='main'
      display='flex'
      flexDirection='column'
      sx={{ bgcolor: 'neutral.light', maxWidth: '100% !important', margin: 0 }}
    >
      <Container maxWidth='md'>
        <NavBar
          mobileOpen={mobileOpen}
          handleDrawerToggle={handleDrawerToggle}
          email={data.user.email}
        />
        <TopSection
          email={data.user.email}
          handleDrawerToggle={handleDrawerToggle}
        />
        <NewSection />
        <RecommendationsSection />
      </Container>
      {searchParams.get('prompt') && <IDModal isSuccess={isSuccess} />}
    </Box>
  );
}
