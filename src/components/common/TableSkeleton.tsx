import { Box, Skeleton } from '@mui/material';

type TableSkeletonProps = {
  rows?: number;
  columns: number;
};

export const TableSkeleton: React.FC<TableSkeletonProps> = ({
  rows = 10,
  columns,
}) => {
  return (
    <Box p={2}>
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <Box
          key={rowIndex}
          display="flex"
          gap={2}
          mb={1}
        >
          {Array.from({ length: columns }).map((_, colIndex) => (
            <Skeleton
              key={colIndex}
              variant="rectangular"
              height={32}
              width="100%"
            />
          ))}
        </Box>
      ))}
    </Box>
  );
};
