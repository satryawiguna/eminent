import {
    useDeleteUser,
    useFetchAllCountries,
    useFetchAllDefaultColumns,
    useFetchAllUser,
    useShowUser
} from "../../../hooks";
import {FC, useCallback, useEffect, useMemo, useState} from "react";
import {ColumnDef, PaginationState, SortingState} from "@tanstack/react-table";
import EVSDatatableCheckbox from "../../../components/EVSDatatableCheckbox";
import {UserType} from "../../../types/UserType";
import {Link} from "react-router-dom";
import EVSBreadcrumb from "../../../components/EVSBreadcrumb";
import {MdAddCircleOutline} from "react-icons/md";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import {FilterUserRequestType} from "../../../types/request/user/FilterUserRequestType";
import EVSDataTable from "../../../components/EVSDataTable";
import {BiEdit} from "react-icons/bi"
import {RiDeleteBin5Line} from "react-icons/ri"
import {IoFilter} from "react-icons/io5";
import EVSAdvanceFilter from "../../../components/EVSAdvanceFilter";
import {Drawer, DrawerInterface, DrawerOptions} from "flowbite";
import {LuView} from "react-icons/lu";
import {Modal} from "flowbite-react";
import {scrollableBody} from "../../../help";
import {toast} from "react-toastify";
import {updateIsLoadingAction} from "../../../store/reducers/globalSlice";
import {useDispatch} from "react-redux";

type UserPagePropType = {
    t: (key: any) => any
}

const UserListPage: FC<UserPagePropType> = ({t}) => {
    const dispatch = useDispatch()
    
    const initialFilterUser: FilterUserRequestType = {
        keyword: '',
        sortId: 'created_at',
        sortOrder: 1,
        pageIndex: 0,
        pageSize: 10,
        countryId: '',
    }

    const [filterUser, setFilterUser] = useState<FilterUserRequestType>(initialFilterUser)
    const [rowSelectionUser, setRowSelectionUser] = useState<any>({})
    const [sortingUser, setSortingUser] = useState<SortingState>([])
    const [{pageIndex, pageSize}, setPagination] = useState<PaginationState>({
        pageIndex: initialFilterUser.pageIndex,
        pageSize: initialFilterUser.pageSize
    })
    const [userId, setUserId] = useState<string>()
    const [viewModal, setViewModal] = useState<string | undefined>()
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const [drawerAdvanceFilter, setDrawerAdvanceFilter] = useState<DrawerInterface>(null)


    const columnsUser = useMemo<ColumnDef<UserType>[]>(
        () => [
            {
                id: 'select',
                header: ({table}) => (
                    <EVSDatatableCheckbox
                        checked={table.getIsAllRowsSelected()}
                        indeterminate={table.getIsSomeRowsSelected()}
                        onChange={table.getToggleAllRowsSelectedHandler()}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                ),
                cell: ({row}) => (
                    <div className="px-1">
                        <EVSDatatableCheckbox
                            checked={row.getIsSelected()}
                            indeterminate={row.getIsSomeSelected()}
                            onChange={row.getToggleSelectedHandler()}
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />
                    </div>
                ),
                enableSorting: false,
                enableColumnFilter: false
            },
            {
                id: 'Full Name',
                header: () => <span>{t('label.full_name')}</span>,
                columns: [
                    {
                        accessorFn: row => row.profile.title,
                        id: 'title',
                        cell: cell => cell.getValue(),
                        header: () => <span>{t('label.name_title')}</span>,
                        enableSorting: false,
                        enableColumnFilter: false
                    },
                    {
                        accessorFn: row => row.profile.firstName,
                        id: 'firstName',
                        cell: cell => cell.getValue(),
                        header: () => <span>{t('label.first_name')}</span>,
                        enableSorting: true,
                        enableColumnFilter: false
                    },
                    {
                        accessorFn: row => row.profile.lastName,
                        id: 'lastName',
                        cell: cell => cell.getValue(),
                        header: () => <span>{t('label.last_name')}</span>,
                        enableSorting: true,
                        enableColumnFilter: false
                    },
                ],
            },
            {
                id: 'Reside Location',
                header: () => <span>{t('label.reside_location')}</span>,
                columns: [
                    {
                        accessorFn: row => row.profile.city,
                        id: 'city',
                        cell: cell => cell.getValue(),
                        header: () => <span>{t('label.city')}</span>,
                        enableSorting: true,
                        enableColumnFilter: false
                    },
                    {
                        accessorFn: row => row.profile.stateProvince,
                        id: 'stateProvince',
                        cell: cell => cell.getValue(),
                        header: () => <span>{t('label.state_or_province')}</span>,
                        enableSorting: true,
                        enableColumnFilter: false
                    },
                    {
                        accessorFn: row => row.profile.country?.name,
                        id: 'country',
                        cell: cell => cell.getValue(),
                        header: () => <span>{t('label.country')}</span>,
                        enableSorting: true,
                        enableColumnFilter: false
                    },
                ]
            },
            {
                accessorFn: row => row.email,
                id: 'email',
                cell: cell => cell.getValue(),
                header: () => <span>{t('label.email')}</span>,
                enableSorting: true,
                enableColumnFilter: false
            },
            {
                accessorFn: row => row.role?.name,
                id: 'role',
                cell: cell => cell.getValue(),
                header: () => <span>{t('label.role')}</span>,
                enableSorting: true,
                enableColumnFilter: false
            },
            {
                accessorKey: 'actions',
                header: () => <span>{t('label.action')}</span>,
                cell: cell => {
                    return (
                        <div className="inline-flex gap-x-2">
                            <a onClick={() => handleOpenViewDetail(cell.row.original.id)}
                               className="btn-primary-table cursor-pointer">
                                <LuView/>{t('label.view')}
                            </a>
                            <Link to={`./${cell.row.original.id}/edit`}
                                  className="btn-primary-table">
                                <BiEdit/>{t('label.edit')}
                            </Link>
                            <a onClick={() => handleDelete(cell.row.original.id)}
                               className="btn-primary-table cursor-pointer">
                                <RiDeleteBin5Line/>{t('label.delete')}
                            </a>
                        </div>
                    )
                },
                enableSorting: false,
                enableColumnFilter: false
            }
        ], []
    )


    const {data: dataCountries, isLoading: isLoadingCountries} = useFetchAllCountries()
    const {data: dataUser, isLoading: isLoadingUser, refetch: refetchUser} = useFetchAllUser(filterUser)
    const {data: dataDefaultColumn} = useFetchAllDefaultColumns()


    const {mutate: mutateDeleteUser} = useDeleteUser(
        (res: boolean) => {
            dispatch(updateIsLoadingAction({isLoading: false}))

            toast.success(t('text.delete_user_success'))

            refetchUser()
        },
        (err: any) => {
            toast.error(err.message)
        }
    )


    useEffect(() => {
        setFilterUser({...filterUser, pageIndex: pageIndex + 1, pageSize: pageSize})
    }, [pageIndex, pageSize])

    useEffect(() => {
        if (sortingUser.length > 0) {
            setFilterUser({
                ...filterUser,
                sortId: sortingUser[0].id,
                sortOrder: Number(sortingUser[0].desc)
            })
        }
    }, [sortingUser])

    useEffect(() => {
        const $targetEl: HTMLElement | null = document.getElementById('drawerRightAdvanceFilter')
        const options: DrawerOptions = {
            placement: 'right',
            backdrop: true,
            bodyScrolling: false,
            edge: false,
            edgeOffset: '',
            backdropClasses: 'bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-30'
        }

        setDrawerAdvanceFilter(new Drawer($targetEl, options))
    }, [])


    const handleSearch = useCallback(
        (e: any) => {
            setFilterUser({...filterUser, keyword: e.target.value})

            refetchUser()
        },
        [filterUser]
    )

    const handleFilterCountry = useCallback(
        (value: any) => {
            setFilterUser({...filterUser, countryId: value?.id || ''})

            refetchUser()
        },
        [filterUser]
    )

    const handleDelete = (id: string | undefined) => {
        const DeleteSwal = withReactContent(Swal)

        DeleteSwal.fire({
            title: t('text.are_you_sure_?'),
            text: t('text.you_want_delete_this'),
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: t('text.yes_delete')
        }).then((result) => {
            if (result.isConfirmed) {
                // mutateDeleteUser(id)
            }
        })
    }

    const handleOpenViewDetail = useCallback(
        (id: string | undefined) => {
            setUserId(id)
            setViewModal('open')
        }, [userId, viewModal]
    )

    const handleCloseViewModal = useCallback(
        () => {
            setUserId(undefined)
            setViewModal(undefined)
            scrollableBody()
        }, [userId, viewModal]
    )

    const stickyColumns: Array<string> = dataDefaultColumn ? [...dataDefaultColumn, "title", "firstName", "lastName"] : []

    return (
        <>
            <EVSBreadcrumb t={t}/>
            <div className="flex flex-col md:inline-flex md:flex-row-reverse w-full mt-8 gap-2">
                <Link to={'./add'}
                      className="btn-primary">
                    <MdAddCircleOutline className="h-5 w-5"/>
                    {t('label.add_new')}
                </Link>
                <button
                    className="btn-danger">
                    <RiDeleteBin5Line className="h-5 w-5"/>
                    {t('label.bulk_delete')}
                </button>
            </div>
            <div className="grid lg:grid-cols-3 sm:grid-cols-1 gap-4 mt-8">
                <input type="text"
                       name="search"
                       id="search"
                       className="input-secondary"
                       placeholder={t('label.search')}
                       onChange={handleSearch}
                />
                <button
                    className="btn-primary justify-self-start"
                    onClick={() => drawerAdvanceFilter.show()}>
                    <IoFilter className="h-5 w-5"/>
                    Advance Filter
                </button>
            </div>
            <EVSAdvanceFilter t={t}
                              filterContext="user-list"
                              filter={filterUser}
                              dataCountries={dataCountries}
                              isLoadingCountries={isLoadingCountries}
                              drawerAdvanceFilter={drawerAdvanceFilter}
                              handleFilterCountry={handleFilterCountry}/>
            <div className="rounded bg-gray-50 dark:bg-gray-800 mb-4 mt-4">
                <EVSDataTable t={t}
                              data={dataUser}
                              isLoading={isLoadingUser}
                              columns={columnsUser}
                              sorting={sortingUser}
                              onSortingChange={setSortingUser}
                              rowSelection={rowSelectionUser}
                              onRowSelectionChange={setRowSelectionUser}
                              pageIndex={pageIndex}
                              pageSize={pageSize}
                              onPaginationChange={setPagination}
                              stickyColumns={stickyColumns}/>
            </div>
            {viewModal !== undefined && <UserViewModal t={t}
                                                       handleCloseViewModal={handleCloseViewModal}
                                                       viewModal={viewModal}
                                                       userId={userId}/>}
            <pre className="text-white">{JSON.stringify(filterUser, null, 2)}</pre>
        </>
    )
}

type UserViewPropType = {
    t: (key: any) => any,
    handleCloseViewModal: () => void
    viewModal: string
}

const UserViewModal: FC<UserViewPropType & any> = ({
                                                       t,
                                                       handleCloseViewModal,
                                                       viewModal,
                                                       ...props
                                                   }) => {
    if (!props.userId) {
        return false
    }

    const {
        data: dataUser,
        isLoading: isLoadingUser
    } = useShowUser(props.userId)

    return (
        <Modal show={viewModal === 'open'}
               onClose={handleCloseViewModal}>
            <Modal.Header>{t('label.preview')}</Modal.Header>
            <Modal.Body>
                {isLoadingUser ? <div className="dark:text-white">Loading...</div> : <div className="space-y-6">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <tbody>
                        <tr className="border border-gray-200 dark:border-gray-600">
                            <th scope="row"
                                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                                {t('label.first_name')}
                            </th>
                            <td className="px-6 py-4 w-full">
                                {dataUser.result.profile.title}{' '}{dataUser.result.profile.firstName}
                            </td>
                        </tr>
                        <tr className="border border-gray-200 dark:border-gray-600">
                            <th scope="row"
                                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                                {t('label.last_name')}
                            </th>
                            <td className="px-6 py-4 w-full">
                                {dataUser.result.profile.lastName}
                            </td>
                        </tr>
                        <tr className="border border-gray-200 dark:border-gray-600">
                            <th scope="row"
                                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                                {t('label.address')}
                            </th>
                            <td className="px-6 py-4 w-full">
                                {dataUser.result.profile.address1}
                            </td>
                        </tr>
                        <tr className="border border-gray-200 dark:border-gray-600">
                            <th scope="row"
                                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                                {t('label.city')}
                            </th>
                            <td className="px-6 py-4 w-full">
                                {dataUser.result.profile.city}
                            </td>
                        </tr>
                        <tr className="border border-gray-200 dark:border-gray-600">
                            <th scope="row"
                                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                                {t('label.country')}
                            </th>
                            <td className="px-6 py-4 w-full">
                                {dataUser.result.profile.country?.name}
                            </td>
                        </tr>
                        <tr className="border border-gray-200 dark:border-gray-600">
                            <th scope="row"
                                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                                {t('label.postal_code')}
                            </th>
                            <td className="px-6 py-4 w-full">
                                {dataUser.result.profile.postalCode}
                            </td>
                        </tr>
                        <tr className="border border-gray-200 dark:border-gray-600">
                            <th scope="row"
                                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                                {t('label.email')}
                            </th>
                            <td className="px-6 py-4 w-full">
                                {dataUser.result.email}
                            </td>
                        </tr>
                        <tr className="border border-gray-200 dark:border-gray-600">
                            <th scope="row"
                                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                                {t('label.status')}
                            </th>
                            <td className="px-6 py-4 w-full">
                                {dataUser.result.isActive ? <span
                                        className="bg-green-100 text-green-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">{t('label.active')}</span> :
                                    <span
                                        className="bg-red-100 text-red-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300">{t('label.not_active')}</span>}
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>}
            </Modal.Body>
            <Modal.Footer>
                <button className="btn-primary" onClick={handleCloseViewModal}>
                    Close
                </button>
            </Modal.Footer>
        </Modal>
    )
}

export default UserListPage


