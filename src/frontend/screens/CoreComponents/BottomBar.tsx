
import React from 'react'
import { useAuth } from "../UserComponents/Authorizer.tsx";


export default function BottomBar() {

    const {logout} = useAuth();
    return (

        <div className="fixed bottom-0 w-full bg-white shadow-md">
        <div className="flex justify-center py-4 sm:px-6 lg:px-8">
            <button
            onClick={logout} // Your logout function here
            className="rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
            Logout
            </button>
        </div>
        </div>
    )
}