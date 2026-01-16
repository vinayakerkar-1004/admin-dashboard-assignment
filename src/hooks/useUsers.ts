import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchUsers, updateUserStatus } from '@/api';
import type { PaginationParams } from '@/types';

// Query keys
export const userQueryKeys = {
  all: ['users'] as const,
  list: (params: PaginationParams) => ['users', 'list', params] as const,
};
/**
 * Hook to fetch users with pagination and filters
 */
export const useUsers = (params: PaginationParams) => {
  return useQuery({
    queryKey: userQueryKeys.list(params),
    queryFn: () => fetchUsers(params),
  });
};

/**
 * Hook to update user status
 *
 * BUG: After updating user status, the table doesn't refresh.
 * The user needs to manually refresh to see the updated status.
 * TODO: Fix the cache invalidation issue.
 */
export const useUpdateUserStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      userId,
      status,
    }: {
      userId: string;
      status: 'active' | 'inactive';
    }) => updateUserStatus(userId, status),

    // OPTIMISTIC UPDATE
    onMutate: async ({ userId, status }) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: userQueryKeys.all });

      // Snapshot previous state
      const previousQueries = queryClient.getQueriesData({
        queryKey: userQueryKeys.all,
      });

      // Optimistically update ALL user lists
      queryClient.setQueriesData(
        { queryKey: userQueryKeys.all },
        (old: any) => {
          if (!old?.data?.users) return old;

          return {
            ...old,
            data: {
              ...old.data,
              users: old.data.users.map((user: any) =>
                user.id === userId ? { ...user, status } : user
              ),
            },
          };
        }
      );

      // Return context for rollback
      return { previousQueries };
    },

    // ROLLBACK IF ERROR
    onError: (_err, _vars, context) => {
      context?.previousQueries?.forEach(([key, data]) => {
        queryClient.setQueryData(key, data);
      });
    },

    // SYNC WITH SERVER
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: userQueryKeys.all });
    },
  });
};

/**
 * Hook to manually invalidate users cache
 */
export const useInvalidateUsersCache = () => {
  const queryClient = useQueryClient();

  return {
    invalidateAll: () =>
      queryClient.invalidateQueries({ queryKey: userQueryKeys.all }),
  };
};
