import {
    ColumnDef,
    ColumnSort,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getSortedRowModel,
    OnChangeFn,
    PaginationState,
    RowSelectionState,
    SortingState,
    useReactTable
} from "@tanstack/react-table";
import EVSBaseFilter from "./EVSBaseFilter";
import {FaSortAlphaDown, FaSortAlphaUpAlt} from 'react-icons/fa';
import {IoIosArrowBack, IoIosArrowForward} from 'react-icons/io';
import {FC, useMemo} from "react";

type EvsDatatablePropType = {
    t: (key: any) => any,
    data: any,
    isLoading: boolean,
    columns: Array<ColumnDef<any>>,
    sorting: Array<ColumnSort>,
    onSortingChange: OnChangeFn<SortingState>,
    rowSelection: any,
    onRowSelectionChange: OnChangeFn<RowSelectionState>,
    pageIndex: number,
    pageSize: number,
    onPaginationChange: OnChangeFn<PaginationState>,
    stickyColumns: Array<string>
}

const EvsDatatable: FC<EvsDatatablePropType> = ({
                                                    t,
                                                    data,
                                                    isLoading,
                                                    columns,
                                                    sorting,
                                                    onSortingChange,
                                                    rowSelection,
                                                    onRowSelectionChange,
                                                    pageIndex,
                                                    pageSize,
                                                    onPaginationChange,
                                                    stickyColumns
                                                }) => {
    const defaultData = useMemo(() => [], [])
    const pagination = useMemo(
        () => ({
            pageIndex,
            pageSize,
        }),
        [pageIndex, pageSize]
    )

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const xPagination = JSON.parse((data?.headers?.['x-pagination'] || "{}") as string)

    const table = useReactTable({
        data: data?.result ?? defaultData,
        columns,
        state: {
            sorting,
            rowSelection,
            pagination
        },
        pageCount: xPagination?.TotalPages ?? -1,
        onPaginationChange: onPaginationChange,
        onSortingChange: onSortingChange,
        onRowSelectionChange: onRowSelectionChange,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        // getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        manualPagination: true,
    })

    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                {table.getHeaderGroups().map(headerGroup => (
                    <tr key={headerGroup.id}>
                        {headerGroup.headers.map(header => {
                            return (
                                <th key={header.id} colSpan={header.colSpan} scope="col" className="px-6 py-3">
                                    {header.isPlaceholder ? null : (
                                        <div>
                                            <div {...{
                                                className: header.column.getCanSort()
                                                    ? 'cursor-pointer select-none'
                                                    : '',
                                                onClick: header.column.getToggleSortingHandler(),
                                            }}>
                                                {flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                                {{
                                                    asc: <FaSortAlphaDown/>,
                                                    desc: <FaSortAlphaUpAlt/>,
                                                }[header.column.getIsSorted() as string] ?? null}
                                            </div>

                                            {header.column.getCanFilter() ? (
                                                <div>
                                                    <EVSBaseFilter t={t} column={header.column} table={table}/>
                                                </div>
                                            ) : null}
                                        </div>
                                    )}
                                </th>
                            )
                        })}
                    </tr>
                ))}
                </thead>
                <tbody>
                {
                    isLoading ?
                        <tr className={(parseInt("1") % 2 === 0) ? "bg-white border-b dark:bg-gray-900 dark:border-gray-700" : "border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700"}>
                            <td colSpan={table.getAllFlatColumns().length}
                                align={"center"}
                                className="px-6 py-4">Loading...
                            </td>
                        </tr> :
                        table.getRowModel().rows.map(row => {
                            return (
                                <tr key={row.id}
                                    className={(parseInt(row.id) % 2 === 0) ? "bg-white border-b dark:bg-gray-900 dark:border-gray-700" : "border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700"}>
                                    {row.getVisibleCells().map(cell => {
                                        return (
                                            <td key={cell.id} className="px-6 py-4">
                                                {flexRender(
                                                    cell.column.columnDef.cell,
                                                    cell.getContext()
                                                )}
                                            </td>
                                        )
                                    })}
                                </tr>
                            )
                        })
                }
                </tbody>
            </table>
            <div className="px-4 py-4 pt-2">
                <div className="flex items-center gap-2 text-gray-900 dark:text-white mt-4">
                    <ul className="inline-flex -space-x-px text-sm">
                        <li>
                            <button
                                className="flex items-center justify-center px-3 h-8 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                                onClick={() => table.setPageIndex(0)}
                                disabled={!table.getCanPreviousPage()}
                            >
                                {
                                    <div className="inline-flex">
                                        <IoIosArrowBack/><IoIosArrowBack/>
                                    </div>
                                }
                            </button>
                        </li>
                        <li>
                            <button
                                className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                                onClick={() => table.previousPage()}
                                disabled={!table.getCanPreviousPage()}
                            >
                                {<IoIosArrowBack/>}
                            </button>
                        </li>
                        <li>
                            <button
                                className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                                onClick={() => table.nextPage()}
                                disabled={!table.getCanNextPage()}
                            >
                                {<IoIosArrowForward/>}
                            </button>
                        </li>
                        <li>
                            <button
                                className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                                onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                                disabled={!table.getCanNextPage()}
                            >
                                {
                                    <div className="inline-flex">
                                        <IoIosArrowForward/><IoIosArrowForward/>
                                    </div>
                                }
                            </button>
                        </li>
                    </ul>
                    <span className="flex items-center gap-1 whitespace-nowrap">
                        {t('label.page')}{" "}<strong>{table.getState().pagination.pageIndex + 1}{' '}{t('text.of')}{' '}{table.getPageCount()}</strong>
                    </span>
                    {" "}
                    <span className="flex items-center gap-2">
                        {t('label.go_to_page')}
                        <input
                            type="number"
                            defaultValue={table.getState().pagination.pageIndex + 1}
                            onChange={e => {
                                const page = e.target.value ? Number(e.target.value) - 1 : 0
                                table.setPageIndex(page)
                            }}
                            className="bg-gray-50 border border-gray-300 text-xs text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-16 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        />
                    </span>
                    {" "}
                    <select value={table.getState().pagination.pageSize}
                            onChange={e => {
                                table.setPageSize(Number(e.target.value))
                            }}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-20 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                        {[10, 20, 30, 40, 50].map(pageSize => (
                            <option key={pageSize} value={pageSize}>
                                {t('label.show')} {" "} {pageSize}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <div className="inline-flex px-4 py-4 pt-2 w-full bg-gray-50 dark:bg-gray-800">
                {table.getAllLeafColumns().map(column => {
                    return ((stickyColumns.indexOf(column.id) === -1) &&
                        <div key={column.id} className="px-2 text-gray-800 dark:text-white">
                            <label>
                                <input
                                    type="checkbox"
                                    checked={column.getIsVisible()}
                                    onChange={column.getToggleVisibilityHandler()}
                                    className="mr-1"
                                />
                                {column.id}
                            </label>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default EvsDatatable
