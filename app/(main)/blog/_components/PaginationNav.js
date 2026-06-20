'use client';

import { Pagination } from '@mui/material';
import { useRouter } from 'next/navigation';

export default function PaginationNav({ page, totalPages }) {
  const router = useRouter();

  return (
    <Pagination
      count={totalPages}
      page={page}
      onChange={(_, value) => router.push(`/blog?page=${value}`)}
      shape="rounded"
      sx={{
        '& .MuiPaginationItem-root': {
          fontWeight: 500,
          borderRadius: 2,
        },
      }}
    />
  );
}
