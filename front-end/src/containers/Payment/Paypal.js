import React, { useRef, useEffect } from "react";
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPayPal, orderDefault } from '../../actions'
const Paypal = ({ total, diaChiGiaoHang, soDienThoai }) => {

    const paypal = useRef();
    const dispatch = useDispatch();
    const totalBill = useSelector(state => state.user.totalCurrentBill)
    // const [bill, setBill] = useState('')
    // console.log(totalBill)
    useEffect(async () => {

        await dispatch(getPayPal())

        var Total = total + 20000

        window.paypal
            .Buttons({
                createOrder: (data, actions, err) => {
                    return actions.order.create({
                        intent: "CAPTURE",
                        purchase_units: [
                            {
                                description: "Thanh toán sản phẩm",
                                amount: {
                                    currency_code: 'CAD',
                                    value: Math.round(Total / 23000),
                                },
                            },
                        ],
                    });
                },
                onApprove: async (data, actions) => {
                    const order = await actions.order.capture();
                    console.log(order);
                    dispatch(orderDefault({ diaChiGiaoHang: diaChiGiaoHang, soDienThoai: soDienThoai, daThanhToan: true }));
                },
                onError: (err) => {
                    console.log(err);
                },
            })
            .render(paypal.current);

    }, []);

    return (
        <div>
            <div ref={paypal}></div>
        </div>
    );
}
export default Paypal