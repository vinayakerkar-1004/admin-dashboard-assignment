import React from 'react';
import { IconButton, Tooltip, CircularProgress } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import type { User } from '@/types';
import { isAdmin } from '@/utils/roleUtils';

interface UserActionsProps {
  user: User;
  onToggleStatus: (userId: string, newStatus: 'active' | 'inactive') => void;
  isUpdating?: boolean;
  onRequestDeactivate?: (user: User) => void;
}
const CURRENT_USER_IS_ADMIN = true;

export const UserActions: React.FC<UserActionsProps> = ({
  user,
  onToggleStatus,
  isUpdating = false,
  onRequestDeactivate,
}) => {

  const userIsAdmin = isAdmin(user);
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

  if (!CURRENT_USER_IS_ADMIN) {
    return (
      <Tooltip title="You do not have permission to perform this action">
        <span>
          <IconButton size="small" disabled aria-label="No permission">
            <CancelIcon />
          </IconButton>
        </span>
      </Tooltip>
    );
  }

  const isSelfAdminActionBlocked =
    user.status === 'active' && userIsAdmin;

  return (
    <Tooltip
      title={
        isSelfAdminActionBlocked
          ? 'Admin users cannot be deactivated'
          : user.status === 'active'
          ? 'Deactivate user'
          : 'Activate user'
      }
    >
      {/* span wrapper is REQUIRED so tooltip works when button is disabled */}
      <span>
        <IconButton
          onClick={handleToggle}
          size="small"
          disabled={isSelfAdminActionBlocked}
          aria-label={
            isSelfAdminActionBlocked
              ? 'Admin deactivation disabled'
              : user.status === 'active'
              ? 'Deactivate user'
              : 'Activate user'
          }
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
