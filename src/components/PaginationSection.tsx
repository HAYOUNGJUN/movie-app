import type { ReactNode, ComponentProps } from 'react';
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
} & ComponentProps<'nav'>;

export default function PaginationSection({
  totalPages,
  ...props
}: PaginationSectionProps) {
  let content: ReactNode;
  const pages: number[] = [];

  if (totalPages <= 5) {
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
    content = pages.map((page) => (
      <PaginationItem>
        <PaginationLink>{page}</PaginationLink>
      </PaginationItem>
    ));
  } else {
    for (let i = 1; i <= 3; i++) {
      pages.push(i);
    }
    content = pages.map((page) => (
      <PaginationItem>
        <PaginationLink>{page}</PaginationLink>
      </PaginationItem>
    ));

    return (
      <>
        <Pagination {...props}>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href='#' />
            </PaginationItem>
            {content}
            {totalPages > 5 && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}
            <PaginationItem>
              <PaginationNext href='#' />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </>
    );
  }
}
