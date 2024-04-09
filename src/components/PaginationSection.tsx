import type { ComponentProps, Dispatch, SetStateAction } from 'react';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationLink,
  PaginationEllipsis,
  PaginationNext,
} from './ui/pagination';

type PaginationSectionProps = {
  totalPages: number;
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
} & ComponentProps<'nav'>;

export default function PaginationSection({
  totalPages,
  currentPage,
  setCurrentPage,
  ...props
}: PaginationSectionProps) {
  const pages: number[] = [];

  if (totalPages <= 5) {
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
  } else {
    if (currentPage < 5) {
      for (let i = 1; i <= 5; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= totalPages - 2) {
        for (let i = currentPage - 2; i <= currentPage + 2; i++) {
          pages.push(i);
        }
      } else {
        for (let i = totalPages - 4; i <= totalPages; i++) {
          pages.push(i);
        }
      }
    }
  }

  function handlePrevPage() {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }

  function handleNextPage() {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  }

  return (
    <>
      <Pagination {...props}>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={handlePrevPage}
              className='cursor-pointer'
            />
          </PaginationItem>
          {totalPages > 5 && currentPage >= 5 && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}
          {pages.map((page) => (
            <PaginationItem key={page}>
              <PaginationLink
                onClick={() => setCurrentPage(page)}
                isActive={page === currentPage}
                className='cursor-pointer'
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ))}
          {totalPages > 5 && currentPage < totalPages - 2 && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}
          <PaginationItem>
            <PaginationNext
              onClick={handleNextPage}
              className='cursor-pointer'
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </>
  );
}
