import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Row, Col, Button } from 'react-bootstrap';
import { Input } from '../../../components/UI/input';
import BookControl from './bookcontrol'
import './bookcontrol.css'
import { putEditBook, getDetailBook } from '../../../actions';
import axios from '../../../helpers/axios';


export const BookEdit = (props) => {

    const dispatch = useDispatch();
    //let book, maNhaXuatBan, maDanhMucCon;// = useSelector(state => state.book.bookDetails);
    const book = useSelector(state => state.book.bookDetails);
    const [Book, setBook] = useState('')
    const [tenSach, setTenSach] = useState('');
    const [giaTien, setGiaTien] = useState('');
    const [giamGia, setGiamGia] = useState('');
    const [fileHinhAnh, setFileHinhAnh] = useState(null);
    const [hinhAnh, setHinhAnh] = useState('');
    const [moTa, setMoTa] = useState('');
    const [tacGia, setTacGia] = useState('');
    const [soLuongConLai, setSoLuongConLai] = useState('');
    const [soLuongMin, setSoLuongMin] = useState('');
    useEffect(() => {

        const { id } = props.match.params;
        console.log(id);

        // dispatch(getDetailBook(id));
        // console.log('sách hiện tại', book)

        // setTenSach(book.tenSach)
        // setGiaTien(book.giaTien)
        // setGiamGia(book.giamGia)
        // // setHinhAnh(book.hinhAnh)
        // setMoTa(book.moTa)
        // setTacGia(book.tacGia)
        // setSoLuongConLai(book.soLuongConLai)



        axios.get(`/book/${id}`)
            .then(res => {
                if (res.status === 200) {
                    setBook(res.data[0])
                    //setBook(res.data[0])
                    setTenSach(res.data[0].tenSach)
                    setGiaTien(res.data[0].giaTien)
                    setGiamGia(res.data[0].giamGia)
                    setHinhAnh(res.data[0].hinhAnh)
                    setMoTa(res.data[0].moTa)
                    setTacGia(res.data[0].tacGia)
                    setSoLuongConLai(res.data[0].soLuongConLai)
                    setSoLuongMin(res.data[0].soLuongConLai)
                    console.log('lấy chi tiết', res.data[0])
                }
            })
            .catch(err => console.log('Lỗi'))

        // const b = store.getState().book.bookDetails;
        // console.log('state', b)
        //setBook(bookDetail)
        //setBook(bookDetail)
    }, []);
    console.log('>>trước khi cập nhật 1', book)
    // // let update;

    // const update = (e) => {
    //     e.preventDefault();

    //     //console.log([e.target.name.tenSach])
    //     //setTenSach(e.target.value)
    //     // setBook({ ...book, [e.target.name]: e.target.value })//{
    //     //     ...book,
    //     //     [e.target.name]: e.target.value,
    //     //     //hinhAnh: e.target.name.hinhAnh.files[0].name
    //     // }
    //     // setbook(book)
    // }
    const updateBook = (e) => {
        e.preventDefault();
        const { id } = props.match.params;
        console.log('id', id)
        //const newbook = new FormData()
        const updatebook = {
            ...Book,
            tenSach, hinhAnh,
            giaTien, giamGia, moTa, tacGia, soLuongConLai
        }
        // newbook.append('tenSach', tenSach)
        // newbook.append('giaTien', giaTien)
        // newbook.append('hinhAnh', hinhAnh)
        // newbook.append('giamGia', giamGia)

        console.log('>>trước khi cập nhật', Book)
        console.log('>>sẽ cập nhật:', updatebook);
        const fd = new FormData();
        if(fileHinhAnh!=null)
            fd.append('file', fileHinhAnh, hinhAnh)
        //const update = JSON.stringify(updatebook)
        dispatch(putEditBook(id, updatebook, fd));
        //setSach(update)
        //props.history.push('/admin/book/all')
    }

    // const [error, setError] = useState('');
    return (
        <>
            <BookControl />
            { }
            <Form id='form-editbook' onSubmit={updateBook} >
                {/* <Form onSubmit={userSignp}> */}
                <Input
                    Label="Tên sách"
                    placeholder="Nhập tên sách"
                    value={tenSach}
                    type="text"
                    name='tenSach'
                    onChange={(e) => setTenSach(e.target.value)}  /*(e) => setTenSach(e.target.value) */
                />
                <Input
                    Label="Giá tiền"
                    placeholder="Nhập giá tiền"
                    value={giaTien}
                    name='giaTien'
                    type="number"
                    min="0"
                    onChange={(e) => setGiaTien(e.target.value)} /**(e) => setGiaTien(e.target.value) */
                />
                <Input
                    Label="Giảm giá (%)"
                    placeholder="Nhập phần trăm giảm giá"
                    value={giamGia}
                    type="number"
                    name='giamGia'
                    min="0"
                    onChange={(e) => setGiamGia(e.target.value)}
                />
                {/* <Input
                    Label="Mô tả"
                    placeholder="Mô tả cho sách"
                    value={book.moTa}
                    type="text"
                 onChange={(e) => setMatkhau(e.target.value)}
                /> */}
                <div>Mô tả</div>
                <textarea
                    Label="Mô tả"
                    placeholder="Mô tả cho sách"
                    value={moTa}
                    name='moTa'
                    type="text"
                    onChange={(e) => setMoTa(e.target.value)}
                />

                <Input
                    type="file"
                    accept=".jpg, .png"
                    Label="Hình ảnh"
                    name='file'
                    // value={''}
                    onChange={(event) => {
                        console.log('file  hình:', event.target.files);
                        //setHinhAnh(event.target.files[0].name);
                        setFileHinhAnh(event.target.files[0]);
                        console.log('file  hình2 :', fileHinhAnh);
                        setHinhAnh(Date.now() + '_' + event.target.files[0].name);
                    }}
                //onChange={ (e) => fileSeletectedHandler(e)}
                // onChange={(e) => setHinhAnh(e.target.value)}
                />
                <Input
                    Label="Tác giả"
                    placeholder="Nhập tên tác giả"
                    value={tacGia}
                    type="text"
                    name='tacGia'
                    onChange={(e) => setTacGia(e.target.value)}
                />
                <Input
                    Label="Số lượng còn lại"
                    placeholder="Nhập số lượng"
                    value={soLuongConLai}
                    name='soLuongConLai'
                    type="number"

                    min={soLuongMin}
                    // max="99"
                    onKeyPress="if(this.value>99){this.value='99';}else if(this.value<0){this.value='0';}"
                    onChange={(e) => setSoLuongConLai(e.target.value)}
                />

                <Form.Group className="mb-3" >
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        
        </>


    )

}

export default BookEdit