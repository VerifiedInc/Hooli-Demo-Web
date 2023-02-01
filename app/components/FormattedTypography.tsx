import { Typography } from '@mui/material';
import type { Variant } from '@mui/material/styles/createTypography';

interface ModalTypographyProps {
  variant: Variant;
  color?: string;
  sx?: Record<string, unknown>;
  children?: React.ReactNode;
}

// Formated Typography Component, primarily used in the IDDialog
export default (props: ModalTypographyProps) => {
  const { variant, color, sx, children } = props;

  return (
    <Typography
      sx={{ mt: 1, ...sx }}
      align='center'
      variant={variant}
      color={color}
    >
      {children}
    </Typography>
  );
};
