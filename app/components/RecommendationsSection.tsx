import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import RecommendationsBox from './RecommendationsBox';

/**
 * Component which displays 'Recommended' section of the root URL, includes recommendations to improve financial habits.
 */
export default () => {
  return (
    <Box>
      <Typography
        variant='h2'
        color='primary.dark'
        fontWeight={900}
        sx={{ mt: 2, mx: 2 }}
      >
        Recommendations
      </Typography>
      <RecommendationsBox
        title='Spending'
        body='Try to spend less than $350 this month on food.'
        plusNumber={17}
      />
      <RecommendationsBox
        title='Credit'
        body='Switch your credit card to reduce your annual fee.'
        plusNumber={8}
      />
    </Box>
  );
};
