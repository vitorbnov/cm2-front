import React from 'react'
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap'
import './Pagination.scss'

export default ({ page, itemsPerPage, totalItems, goToPage }) => {
  const firstPage = 1
  const lastPage = Math.floor(totalItems / itemsPerPage) + (totalItems % itemsPerPage > 0 ? 1 : 0)

  const onClickToFirstPage = () => {
    goToPage(1)
  }

  const onClickToPreviousPage = () => {
    goToPage(page - 1)
  }
  
  const onClickToNextPage = () => {
    goToPage(page + 1)
  }
  
  const onClickToLastPage = () => {
    goToPage(lastPage)
  }

  const isFirstPage = page === firstPage
  const isLastPage = page === lastPage

  return (
    <Pagination size="sm">
      <PaginationItem>
        <PaginationLink first onClick={onClickToFirstPage} disabled={isFirstPage} />
      </PaginationItem>
      <PaginationItem>
        <PaginationLink previous onClick={onClickToPreviousPage} disabled={isFirstPage} />
      </PaginationItem>
      { [-2, -1, 0, 1, 2].map(offset => {
        if (page + offset < firstPage || page + offset > lastPage) return null
        return (
          <PaginationItem key={page + offset}>
            <PaginationLink onClick={() => goToPage(page + offset)} disabled={offset === 0}>{page + offset}</PaginationLink>
          </PaginationItem>
        )
      })}
      <PaginationItem>
        <PaginationLink next onClick={onClickToNextPage} disabled={isLastPage} />
      </PaginationItem>
      <PaginationItem>
        <PaginationLink last onClick={onClickToLastPage} disabled={isLastPage} />
      </PaginationItem>
    </Pagination>
  )
}
