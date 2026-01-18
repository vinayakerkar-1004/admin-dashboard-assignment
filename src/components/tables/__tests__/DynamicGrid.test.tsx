import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { DynamicGrid } from '../DynamicGrid';
import type { User } from '@/types';
import { userColumnMetadata } from '@/utils/columnConfig';

/**
 * Mock Material React Table to capture cell rendering
 */
vi.mock('material-react-table', async () => {
  return {
    MaterialReactTable: ({ table }: any) => {
      const firstRow = table.options.data[0];
      const columns = table.options.columns;

      return (
        <div>
          {columns.map((col: any) => (
            <div key={col.accessorKey}>
              {col.Cell({
                cell: {
                  getValue: () => firstRow[col.accessorKey],
                },
              })}
            </div>
          ))}
        </div>
      );
    },
    useMaterialReactTable: (options: any) => ({ options }),
  };
});

const mockUser: User = {
  userId: '1',
  name: 'John Doe',
  email: 'john@example.com',
  status: 'active',
  createdAt: '2024-01-01',
  groups: [
    {
      groupId: 'g1',
      groupName: 'Admin',
      roles: [],
    },
    {
      groupId: 'g2',
      groupName: 'Editor',
      roles: [],
    },
  ],
};

describe('DynamicGrid column rendering', () => {
  it('renders string, badge, date and chiplist columns correctly', () => {
    render(
      <DynamicGrid
        data={[mockUser]}
        columns={userColumnMetadata}
        totalCount={1}
        isLoading={false}
        pagination={{ pageIndex: 0, pageSize: 10 }}
        onPaginationChange={vi.fn()}
        columnVisibility={{}}
        onColumnVisibilityChange={vi.fn()}
        sorting={[]}
        onSortingChange={vi.fn()}
      />
    );

    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('john@example.com')).toBeInTheDocument();

    expect(screen.getByText('active')).toBeInTheDocument();

    expect(screen.getByText('2024-01-01')).toBeInTheDocument();

    expect(screen.getByText('Admin')).toBeInTheDocument();
    expect(screen.getByText('Editor')).toBeInTheDocument();
  });

  it('renders "No groups" when groups array is empty', () => {
    render(
      <DynamicGrid
        data={[{ ...mockUser, groups: [] }]}
        columns={userColumnMetadata}
        totalCount={1}
        isLoading={false}
        pagination={{ pageIndex: 0, pageSize: 10 }}
        onPaginationChange={vi.fn()}
        columnVisibility={{}}
        onColumnVisibilityChange={vi.fn()}
        sorting={[]}
        onSortingChange={vi.fn()}
      />
    );

    expect(screen.getByText('No groups')).toBeInTheDocument();
  });
});
