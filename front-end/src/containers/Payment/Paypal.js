import React, { useRef, useEffect } from "react";
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPayPal } from '../../actions'
const Paypal = ({ total }) => {
    const paypal = useRef();
    const dispatch = useDispatch();
    const totalBill = useSelector(state => state.user.totalCurrentBill)
    // const [bill, setBill] = useState('')
    // console.log(totalBill)
    useEffect(() => {
        dispatch(getPayPal())
        var Total = total / 23000
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
                                    value: Math.round(total / 23000),
                                },
                            },
                        ],
                    });
                },
                onApprove: async (data, actions) => {
                    const order = await actions.order.capture();
                    console.log(order);
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