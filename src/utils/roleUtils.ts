import type { User } from '@/types';

export const hasRole = (user: User, roleName: string): boolean => {
  return user.groups.some(group =>
    group.roles.some(role => role.roleName === roleName)
  );
};

export const isAdmin = (user: User): boolean => {
  return hasRole(user, 'Admin');
};
