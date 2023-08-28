import {FC} from "react";
import EVSComboBox from "./EVSComboBox";

type EVSAdvanceSearchPropType = {
    t: (key: any) => any,
    filterContext: string,
    filter: any
}

const EVSAdvanceFilter: FC<EVSAdvanceSearchPropType & any> = ({t, filterContext, filter, ...props}) => {
    return (
        <div id="drawerRightAdvanceFilter"
             className="fixed top-[60px] right-0 z-40 h-screen p-4 -transition-transform translate-x-full bg-white w-80 dark:bg-gray-800">
            <h5 id="drawer-body-advance-filter-label"
                className="text-base font-semibold text-gray-500 uppercase dark:text-gray-400">Advance Filter</h5>
            <button type="button"
                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 absolute top-2.5 right-2.5 inline-flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white"
                    onClick={() => props.drawerAdvanceFilter.hide()}>
                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                     viewBox="0 0 14 14">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                          d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                </svg>
                <span className="sr-only">Close menu</span>
            </button>
            <div className="grid grid-cols-1 gap-4 mt-10">
                {filterContext === 'user-list' && <>
                    <EVSComboBox t={t}
                                 label="label.country"
                                 name="country"
                                 placeholder="label.country"
                                 data={props.dataCountries?.result}
                                 isLoading={props.isLoadingCountries}
                                 dataKey="id"
                                 textField="name"
                                 handleOnChange={props.handleFilterCountry}/>
                </>}

            </div>
        </div>
    )
}

export default EVSAdvanceFilter
