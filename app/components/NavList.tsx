import { Logout, Person, Recommend, Settings } from '@mui/icons-material';
import {
  Button,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { Form } from '@remix-run/react';

interface NavListProps {
  email: string;
}

/**
 * Component which contains content to display in the nav bar.
 */
export default ({ email }: NavListProps) => {
  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <List>
        {[email, 'Recommendations', 'Settings'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton sx={{ color: 'primary.dark' }}>
              <ListItemIcon sx={{ color: 'primary.main' }}>
                {
                  [
                    <Person key='personIcon' />,
                    <Recommend key='recommendIcon' />,
                    <Settings key='settingsIcon' />,
                  ][index]
                }
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <List sx={{ position: 'absolute', bottom: '0' }}>
        <ListItem alignItems='center' disableGutters>
          <Form method='post'>
            <Button
              name='intent'
              value='logout'
              type='submit'
              startIcon={<Logout />}
              variant='contained'
            >
              Logout
            </Button>
          </Form>
        </ListItem>
      </List>
    </div>
  );
};
