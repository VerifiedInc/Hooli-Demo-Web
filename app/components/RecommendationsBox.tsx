import { Typography } from '@mui/material';
import { Box } from '@mui/system';

interface RecommendationsBoxProps {
  title: string;
  body: string;
  plusNumber: number;
}

/**
 * Component leveraged in 'Recommended' section of content for root URL.
 */
export default ({ title, body, plusNumber }: RecommendationsBoxProps) => {
  return (
    <Box
      display='flex'
      sx={{ bgcolor: 'white', my: 2, mx: 2, borderRadius: 1 }}
    >
      <Box
        sx={{
          bgcolor: 'primary.main',
          mx: 2,
          mt: 2,
          mb: 8,
          borderRadius: 1,
          py: 1,
          px: 2,
        }}
      >
        <Typography
          variant='h6'
          align='center'
          color='primary.contrastText'
          fontWeight={900}
        >
          +{plusNumber}
        </Typography>
      </Box>
      <Box sx={{ borderRadius: 1, p: 1 }}>
        <Typography variant='h5' fontWeight={900} color='neutral.main' p={1}>
          {title}
        </Typography>
        <Typography variant='body2' color='primary.dark' px={1}>
          {body}
        </Typography>
        <Typography variant='h5' fontWeight={900} color='primary' p={1}>
          More details
        </Typography>
      </Box>
    </Box>
  );
};
