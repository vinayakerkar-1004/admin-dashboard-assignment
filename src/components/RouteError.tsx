import { useRouteError, isRouteErrorResponse } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material';

export const RouteError = () => {
  const error = useRouteError();

  let message = 'Something went wrong';

  if (isRouteErrorResponse(error)) {
    message = error.statusText;
  } else if (error instanceof Error) {
    message = error.message;
  }

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: 2,
        textAlign: 'center',
      }}
    >
      <Typography variant="h5">
        Unexpected application error
      </Typography>

      <Typography color="text.secondary">
        {message}
      </Typography>

      <Button
        variant="contained"
        onClick={() => window.location.reload()}
      >
        Retry
      </Button>
    </Box>
  );
};
