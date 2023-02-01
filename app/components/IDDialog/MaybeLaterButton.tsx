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
        bgcolor: 'neutral.main',
        color: 'white',
        m: '1rem',
      }}
    >
      Maybe Later
    </Button>
  );
};
