import React from 'react';
import { IconButton, Tooltip, CircularProgress } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import type { User } from '@/types';

interface UserActionsProps {
  user: User;
  onToggleStatus: (userId: string, newStatus: 'active' | 'inactive') => void;
  isUpdating?: boolean;
  onRequestDeactivate?: (user: User) => void;
}

export const UserActions: React.FC<UserActionsProps> = ({
  user,
  onToggleStatus,
  isUpdating = false,
  onRequestDeactivate,
}) => {
  const handleToggle = () => {
    if (user.status === 'active' && onRequestDeactivate) {
      onRequestDeactivate(user);
      return;
    }

    const newStatus = 'active';
    onToggleStatus(user.userId, newStatus);
  };


  if (isUpdating) {
    return <CircularProgress size={20} />;
  }

  return (
    <Tooltip
      title={user.status === 'active' ? 'Deactivate user' : 'Activate user'}
    >
      {/* span wrapper is REQUIRED so tooltip works when button is disabled */}
      <span>
        <IconButton
          onClick={handleToggle}
          size="small"
          aria-label={user.status === 'active' ? 'Deactivate user' : 'Activate user'}
          sx={{
            color: user.status === 'active' ? 'error.main' : 'success.main',
            transition: 'color 0.2s ease',
            '&:hover': {
              color:
                user.status === 'active'
                ? 'error.dark'
                : 'success.dark',
            },
          }}
        >
          {user.status === 'active' ? <CancelIcon /> : <CheckCircleIcon />}
        </IconButton>

      </span>
    </Tooltip>
  );
};
