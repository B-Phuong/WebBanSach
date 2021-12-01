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
    const Format = (x) => {
        return x.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })
    }
    console.log('top10', top10)
    console.log('book', book)
    const data = top10
    let totalAmount = 0;
    donHang &&
        donHang.bills.forEach((item) => {

            if(item.daThanhToan == true) 
            {
            totalAmount += item.tongTien 
            
            }
            else{
            item.orderStatus.forEach(xa=> {
                if(xa.type == 'delivered' && xa.isCompleted === true )
                totalAmount += item.tongTien
            }) 
        }
            
        })
    
    let tongDonHang = 0;
    donHang&&
        donHang.bills.forEach((item)=>{
            tongDonHang = tongDonHang +1
        })
    // { name: "Facebook", users: 2000000000 },
    // { name: "Instagram", users: 1500000000 },
    // { name: "Twiter", users: 1000000000 },
    // { name: "Telegram", users: 500000000 },
    return (
        <div>
            <Home />
            <div className='chart-content'></div>
            <center>
                <div className="dashboardSummary">
                    <div>
                        <p>
                            Doanh thu cửa hàng: <br /> {Format(totalAmount)} 
                            
                        </p>
                        <p>
                            Tổng số đơn hàng: <br />{tongDonHang} Đơn hàng
                        </p>
                    </div>
                </div>
            </center>
            <center><h5>THỐNG KÊ SỐ SÁCH BÁN CHẠY</h5></center>
            <div >
                <div className="BarChartCss">
                <BarChart
                    width={1000}
                    height={300}
                    data={book}
                    margin={{
                        top: 20,
                        right: 10,
                        left: 200,
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
            <div className='staff-content'></div>
        </div>
    )
}
export default Chart