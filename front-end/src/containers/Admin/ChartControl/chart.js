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
import { CategoryScale } from 'chart.js'
import { getTop10Book } from '../../../actions';
import Home from '../../Home';
import './chart.css'

export const Chart = () => {

    const dispatch = useDispatch();
    const book = useSelector(state => state.book.books)
    const [top10, setTop10] = useState('')
    const [nameTop10, setNameTop10] = useState('')
    useEffect(() => {
        dispatch(getTop10Book())
        setTop10(book)
        // setNameTop10(book.tenSach)
    }, [])
    console.log('top10', top10)
    console.log('book', book)
    const data = top10
    // { name: "Facebook", users: 2000000000 },
    // { name: "Instagram", users: 1500000000 },
    // { name: "Twiter", users: 1000000000 },
    // { name: "Telegram", users: 500000000 },
    return (
        <div>
            <Home />
            {/* <div >   style={{ textAlign: "center" }} */}
            <div >
                <h1>THỐNG KÊ</h1>
                {/* <PieChart width={400} height={400} margin={200}>
                    <Pie
                        dataKey="soLuongBan" //users
                        isAnimationActive={false}
                        data={book}
                        cx={200}
                        cy={200}
                        outerRadius={80}
                        fill="#8884d8"
                        label
                    />
                    <Tooltip />
                </PieChart> */}
                <BarChart
                    width={500}
                    height={300}
                    data={book}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 200,
                        bottom: 5,
                    }}
                    barSize={30}
                >
                    <XAxis
                        dataKey="tenSach"
                        scale="" //"point"
                        padding={{ left: 5, right: 5 }}
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