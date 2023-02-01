import { Typography } from '@mui/material';
import type { Variant } from '@mui/material/styles/createTypography';

interface ModalTypographyProps {
  variant: Variant;
  color?: string;
  sx?: Record<string, unknown>;
  children?: React.ReactNode;
}

/**
 * Wrapper on MUI Typography component with some pre-styled aspects. Primarily leveraged in the IDDialog.
 */
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
