import { Drawer } from '@mui/material';
import NavList from './NavList';

interface NavBarProps {
  mobileOpen: boolean;
  handleDrawerToggle: () => void;
  email: string;
}

/**
 * Nav menu for application once logged-in. Vertical design and fixed open on left-hand side of screen for desktop.
 * Collapsible for smaller/mobile devices
 */
export default ({ mobileOpen, handleDrawerToggle, email }: NavBarProps) => {
  const drawerWidth = 300;

  return (
    <nav>
      <Drawer
        sx={{
          display: { xs: 'block', sm: 'block', md: 'block', lg: 'none' },
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant='temporary'
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        anchor='left'
      >
        <NavList email={email} />
      </Drawer>
      <Drawer
        sx={{
          display: { xs: 'none', sm: 'none', md: 'none', lg: 'block' },
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant='permanent'
        anchor='left'
      >
        <NavList email={email} />
      </Drawer>
    </nav>
  );
};
