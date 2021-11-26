import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllBooks, getAllCategories, getPayPal } from '../../actions';
import PayPal from "./Paypal";
import IndexHome from '../../components/Layout/Header/indexHome'

export const Payment = () => {
    const dispatch = useDispatch();
    const totalBill = useSelector(state => state.user.totalCurrentBill)
    //     const dispatch = useDispatch();
    //     const link = useSelector(state => state.user.paypal)
    //     const [getlink, setGetLink] = useState('')
    //     const thanhtoan = () => {
    //         dispatch(getPayPal())
    //         setGetLink(link);
    //     }
    useEffect(() => {
        dispatch(getPayPal())
        setCheckOut(false)
    }, []);

    const [checkout, setCheckOut] = useState(false);

    return (
        <>
            <IndexHome />
            <div>

            </div>
            <div className='payment-option'>
                {checkout ? (
                    <PayPal
                        total={totalBill} />
                ) : (
                    <button
                        onClick={() => {
                            setCheckOut(true);
                        }}
                    >
                        Thanh toán trực tuyến
                    </button>
                )}
            </div>
        </>
    );
}
export default Payment


