import React from 'react'

import { NavLink } from 'react-router-dom'
import Home from '../../Home'
import './staffcontrol.css'

export const StaffControl = (props) => {
    return (
        <>
            <Home />
            <div className='staff-content'>
                <div>
                    <div className='button'>
                        <NavLink to='/admin/staff/all'> <span >Hiển thị danh sách </span></NavLink>
                    </div>
                    <div className='button'>
                        <NavLink to='/admin/staff/add'> <span >Thêm nhân viên </span></NavLink>

                    </div>
                </div>
            </div>

        </>


    )

}

export default StaffControl