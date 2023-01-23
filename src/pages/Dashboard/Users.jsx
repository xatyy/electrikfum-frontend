import React from 'react'
import {Routes, Route} from "react-router-dom"
import UsersTable from '../../components/UsersTable/UsersTable'
import UserProfile from './UserProfile'

const Users = () => {
    return(
        <div className="users">
            <Routes>
                <Route path="/" element={<UsersTable />} />
                <Route path="/:id" element={<UserProfile />} />
            </Routes>
        </div>
    )
}

export default Users;