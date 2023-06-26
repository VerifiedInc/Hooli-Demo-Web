import { Button } from '@mui/material';

interface MaybeLaterButtonProps {
  handleClick: () => void;
}

/**
 * Styled button for the IDDialog that closes the Dialog when clicked.
 */
export default ({ handleClick }: MaybeLaterButtonProps) => {
  return (
    <Button
      onClick={handleClick}
      sx={{
        bgcolor: 'neutral.dark',
        color: 'white',
        py: 1,
        px: 2,
        borderRadius: 1.5,
        m: '1rem',
        mt: 0,
        '&:hover': {
          bgcolor: 'neutral.main',
        },
      }}
    >
      Maybe Later
    </Button>
  );
};
