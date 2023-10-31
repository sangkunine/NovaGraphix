"use client"

import { useRouter } from 'next/navigation';
import { encodeURIData } from '@/utils/novaUtils';

const SearchDB = () =>
{
    const router = useRouter();

    const onSubmit = (e) =>
    {
        e.preventDefault(); // prevents the form from autosubmitting

        // (cf)
        // e.target === <form>
        // e.target['search'] === <input>
        // e.target['search'].value === input.value

        const searchValue = e.target['search'].value;

        // filter
        let filter = {
            property: 'name',
            rich_text: { contains: searchValue }
        }
        filter = encodeURIData( JSON.stringify( filter ) );

        // sorts
        let sorts = [{ property: 'name', direction: 'ascending' }];
        sorts = encodeURIData( JSON.stringify( sorts ) );

        router.push( `/marketplace/${filter}/${sorts}` );
    }

    return (
        <div className="mx-auto w-screen max-w-screen-sm leading-6">
            <form autoComplete="on" onSubmit={onSubmit} action="#" method="GET" className="relative mx-auto flex w-full max-w-2xl items-center justify-between rounded-md border shadow-lg">
                <svg className="absolute left-2 block h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8" className=""></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65" className=""></line>
                </svg>
                <input type="name" name="search" placeholder="Search 3D models" className="h-10 w-full rounded-md py-4 pr-40 pl-12 outline-none focus:ring-2" />
                <button type="submit" className="absolute right-0 mr-1 inline-flex h-8 items-center justify-center rounded-md bg-gray-900 px-10 font-medium text-white focus:ring-4 hover:bg-gray-700">
                    Search
                </button>
            </form>
        </div>
    );
}

export default SearchDB;