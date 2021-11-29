import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDetailBook } from '../../actions';
import IndexHome from '../../components/Layout/Header/indexHome'
import './detail.css'

const BookDetail = (props) => {
    const dispatch = useDispatch();
    const book = useSelector(state => state.book.bookDetails);
    const [qty, setQty] = useState(1);
    // const [book, setBook] = useState('');
    // const books = [{ tenSach: 'sách1' }, { tenSach: 'ténach2' }]
    // const { page } = product;
    useEffect(() => {
        const { id } = props.match.params;
        console.log(id);
        console.log('chi tiết sách ở trang chủ', book)
        // const payload = {
        //     params: {
        //         id,
        //     },
        // };
        // const params = getParams(props.location.search);
        // console.log({params});
        // const payload = {
        //     params
        // }
        dispatch(getDetailBook(id));
        //setBook(books)
    }, []);
    const AddQuatity = (e) => {
        if (qty + 1 > book.soLuongBan) return;
        setQty(qty + 1);
    }
    const SubQuatity = (e) => {
        if (qty <= 1) return;
        setQty(qty - 1);
    }
    const ChangeQuatity = (e) => {

        console.log("e.value")
    }
    const Format = (x) => {
        return x.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })
    }
    return (
        <>
            <IndexHome />
            <div className='detail'>

                <div className='tam'>
                    <div id='image'>
                        <img src={`http://localhost:3000/images/${book.hinhAnh}`} alt="Ảnh bị lỗi hiển thị" />
                    </div>
                    <div id='author'>
                        <span>Tác giả:<> <b>{book.tacGia}</b></></span>
                    </div>
                    <div id='publisher'>
                        <span>Nhà xuất bản:<> <b>{book.maNhaXuatBan.tenNhaXuatBan ? book.maNhaXuatBan.tenNhaXuatBan : ""}</b></></span>
                    </div>

                </div>


                <div className='detail-sidebar'>
                    <h3 style={{ margin: '20px 20px 30px 20px' }}>{book.tenSach}</h3>
                    <div style={{ height: '50px', width: '550px', margin: '20px' }}>
                        {
                            book.giamGia > 0 ?
                                <div className="price">
                                    <span className="price_before_sale" ><b>{book.giaTien && Format(book.giaTien)}</b> </span>
                                    <span className="price_after_sale" ><b>{book.giaTien && Format(book.giaTien * (1 - book.giamGia / 100))}</b></span>
                                    <span className="sale_off_percent"><b>-{book.giamGia}%</b></span>
                                </div>
                                : <div className="price">
                                    <span ><b>{book.giaTien && Format(book.giaTien)}</b> </span>
                                    {/* <span className="price_after_sale" ><b>{Format(abook.giaTien * (1 - abook.giamGia * 100))}</b></span> */}
                                </div>
                        }
                    </div>
                    <div className="buttons_added">
                        <h4 >Số lượng </h4>
                        <input className="minus is-form" type='button' value='-' onClick={SubQuatity}></input>
                        <input className="input-qty" type='number' value={qty} min="1" max="5" onChange={(e) => ChangeQuatity(e.target.value)}></input>
                        <input className="plus is-form" type='button' value='+' onClick={AddQuatity}></input>
                    </div>
                    <div><h4 style={{ margin: '20px' }}>Số lượng bán: {book.soLuongBan}</h4></div>
                    <div className='button'>
                        <span>Thêm vào giỏ hàng </span>
                    </div>

                </div>
            </div>
            <div style={{ height: '20px' }}></div>
            <div id='description'>
                <h4 style={{ margin: '20px' }}><b>Mô tả</b></h4>
                <div style={{ margin: '20px' }}>{book.moTa}</div>
            </div>
            <h4 style={{ margin: '20px' }}>Bình luận và đánh giá của khách</h4>
            <div className='comment'>
                <div className='nameuser'>
                    <div style={{ margin: '20px' }}>avatar</div>
                    <div style={{ margin: '20px' }}>tên người bình luận</div>
                </div>
                <div className='content'>
                    <div style={{ margin: '20px' }}>Đánh giá</div>
                    <div style={{ margin: '20px', color: 'green' }}><b>Đã mua hàng</b></div>
                    <div style={{ margin: '20px' }}>Nội dung bình luận</div>
                </div>
            </div>


        </>
    )
}
export default BookDetail

//ĐƯỜNG link tạo button tăng giảm sl: https://www.thietkeblogspot.com/2019/12/cach-tao-cac-button-tang-giam-so-luong-cho-theme-blogspot.html
