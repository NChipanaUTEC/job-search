import { useTable, usePagination } from "react-table";
import './Table.css'

function Table ({ columns, data}) {
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        prepareRow,
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        state: { pageIndex, pageSize },
    } = useTable({
        columns,
        data,
        initialState: { pageIndex: 0 },
    }, usePagination);

    return (
        <>
        <table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    <div className="pagination">
        <span>
          Page{' '}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{' '}
        </span>
        <div className="page-switch">
            <button className="btn btn-outline-secondary" onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
            {'<<'}
            </button>{' '}
            <button className="btn btn-outline-secondary" onClick={() => previousPage()} disabled={!canPreviousPage}>
            {'<'}
            </button>{' '}
            <button className="btn btn-outline-secondary" onClick={() => nextPage()} disabled={!canNextPage}>
            {'>'}
            </button>{' '}
            <button className="btn btn-outline-secondary" onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
            {'>>'}
            </button>{' '}
        </div>
        <div className="page-selector">
            Go to page:{' '}
          <input
            type="number"
            className="form-control"
            defaultValue={pageIndex + 1}
            onChange={e => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0
              gotoPage(page)
            }}
            style={{ width: '100px' }}
          />
        <select
          value={pageSize}
          onChange={e => {
            setPageSize(Number(e.target.value))
          }}
        >
          {[10, 20, 30, 40, 50].map(pageSize => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
        </div>
      </div>
        </>
    );

}

export default Table;