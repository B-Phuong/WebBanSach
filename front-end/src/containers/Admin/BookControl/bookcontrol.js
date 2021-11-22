import React from 'react'

import { NavLink } from 'react-router-dom'
import Home from '../../Home'
import './bookcontrol.css'

export const BookControl = (props) => {
    return (
        <>
            <Home />
            <div className='book-content'>
                <div>
                    <div className='button'>
                        <NavLink to='/admin/book/all'> <span >Hiển thị danh sách </span></NavLink>
                    </div>
                    <div className='button'>
                        <NavLink to='/admin/book/add'> <span >Thêm sách </span></NavLink>

                    </div>
                </div>
            </div>

        </>


    )

}

export default BookControl