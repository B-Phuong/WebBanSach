import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
//import { Bar, Pie, Doughnut } from 'react-chartjs-2';
import {
    PieChart,
    Pie,
    Tooltip,
    BarChart,
    XAxis,
    YAxis,
    Legend,
    CartesianGrid,
    Bar,
} from "recharts";
//import { CategoryScale } from 'chart.js'
import { getTop10Book } from '../../../actions';
import Home from '../../Home';
import './chart.css'

export const Chart = () => {

    const dispatch = useDispatch();
    const book = useSelector(state => state.book.books)
    const [top10, setTop10] = useState('')
    const [nameTop10, setNameTop10] = useState('')
    const donHang = useSelector(state => state.donHang)
    useEffect(() => {
        dispatch(getTop10Book())
        setTop10(book)
        // setNameTop10(book.tenSach)
    }, [])
    console.log('top10', top10)
    console.log('book', book)
    const data = top10
    let totalAmount = 0;
    donHang &&
        donHang.bills.forEach((item) => {
            totalAmount += item.tongTien
        })
    // { name: "Facebook", users: 2000000000 },
    // { name: "Instagram", users: 1500000000 },
    // { name: "Twiter", users: 1000000000 },
    // { name: "Telegram", users: 500000000 },
    return (
        <div>
            <Home />
            <center>
                <div className="dashboardSummary">
                    <div>
                        <p>
                            Doanh thu cửa hàng: <br /> {totalAmount} VND
                        </p>
                    </div>
                </div>
            </center>
            <center><h5>THỐNG KÊ SỐ SÁCH BÁN CHẠY</h5></center>
            <div >

                <BarChart
                    width={1000}
                    height={300}
                    data={book}
                    margin={{
                        top: 20,
                        right: 10,
                        left: 400,
                        bottom: 5,
                    }}
                    barSize={20}
                >
                    <XAxis
                        dataKey="tenSach"
                        scale="" //"point"
                        padding={{ left: 10, right: 50 }}
                        ticks={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
                    />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Bar dataKey="soLuongBan" fill="#8884d8" background={{ fill: "#eee" }} />
                </BarChart>

            </div>

        </div>
    )
}
export default Chart