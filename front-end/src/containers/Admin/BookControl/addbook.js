import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Row, Col, Button } from 'react-bootstrap';
import { Input } from '../../../components/UI/input';
import 'react-toastify/dist/ReactToastify.css';
import { NavLink } from 'react-router-dom'
import BookControl from './bookcontrol'
import './bookcontrol.css'
import { AddBook, getAllCategories, getAllPublishers } from '../../../actions';

import axios from 'axios'


export const BookAdd = (props) => {

    const dispatch = useDispatch();
    const book = useSelector(state => state.book);
    const err = useSelector(state => state.book.error)
    const categories = useSelector(state => state.category.categories);
    const publishers = useSelector(state => state.publisher.publishers);
    const [tenSach, setTenSach] = useState('');
    const [giaTien, setGiaTien] = useState('');
    const [giamGia, setGiamGia] = useState('');
    const [hinhAnh, setHinhAnh] = useState('');
    const [filehinhAnh, setFileHinhAnh] = useState(null);
    const [moTa, setMoTa] = useState('');
    const [tacGia, setTacGia] = useState('');
    const [soLuongConLai, setSoLuongConLai] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    //const [maDanhMucCon, setMaDanhMucCon] = useState('');
    //const [giaTri, setGiaTri] = useState('')


    const UploadFile = async () => {

        //await setHinhAnh(ramdom+'_'+hinhAnh)
        const fd = new FormData();
        fd.append('file', filehinhAnh, hinhAnh)
        axios.post("http://localhost:3000/upload", fd, {
            onUploadProgress: progressEvent => {
                console.log("Upload Progress: " + Math.round(progressEvent.loaded / progressEvent.total * 100) + '%')
            }
        }).then((e) => {
            //setHinhAnh(ramdom+'_'+hinhAnh)
            console.log('Success')
        })
            .catch((e) => {
                console.error('Error', e)
            })
    }

    useEffect(() => {
        dispatch(getAllCategories())

    }, []);
    useEffect(() => {
        dispatch(getAllPublishers())
    }, []);

    const addBook = async (e) => {
        e.preventDefault();
        //await UploadFile()


        let indexDM = document.getElementById('maDanhMucCon');
        let indexNXB = document.getElementById('maNhaXuatBan');
        //setGiaTri(index.options[index.selectedIndex].value);
        setErrorMessage(err)
        const newbook = {
            tenSach,
            giaTien, giamGia, moTa, hinhAnh, tacGia, soLuongConLai,
            maNhaXuatBan: indexNXB.options[indexNXB.selectedIndex].value,
            maDanhMucCon: indexDM.options[indexDM.selectedIndex].value
        }
        console.log('m?? danh m???c con', newbook.maDanhMucCon)
        console.log('m?? nh?? xu???t b???n', newbook.maNhaXuatBan)
        console.log('>>s??ch m???i:', newbook);
        //const update = JSON.stringify(updatebook)
        //await setHinhAnh(ramdom+'_'+hinhAnh)
        const fd = new FormData();
        if(filehinhAnh!=null)
            fd.append('file', filehinhAnh, hinhAnh)
        await dispatch(AddBook(newbook, fd))
        //await setErrorMessage(err)
        //setmessageError(loi)
        // if(errorMessage) {
        //     console.log("C?? l???i r???i ti???n")
        //     await toast.success(errorMessage);
        // }
        //props.history.push('/admin/book/all')
        //setSach(update)

    }



    // const [error, setError] = useState('');
    return (
        <>
            <BookControl />
            {/* <ErrorHandler coLoi={''} /> */}
            <Form id='form-addbook' onSubmit={addBook} >
                {/* <Form onSubmit={userSignp}> */}
                <Input
                    Label="T??n s??ch"
                    placeholder="Nh???p t??n s??ch"
                    value={tenSach}
                    type="text"
                    onChange={(e) => setTenSach(e.target.value)}
                />
                <Input
                    Label="Gi?? ti???n"
                    placeholder="Nh???p gi?? ti???n"
                    value={giaTien}
                    type="number"
                    min="0"
                    onChange={(e) => setGiaTien(e.target.value)}
                />
                <Input
                    Label="Gi???m gi?? (%)"
                    placeholder="Nh???p ph???n tr??m gi???m gi??"
                    value={giamGia}
                    type="number"
                    min="0"
                    onChange={(e) => setGiamGia(e.target.value)}
                />
                {/* <Input
                    Label="M?? t???"
                    placeholder="M?? t??? cho s??ch"
                    value={book.moTa}
                    type="text"
                 onChange={(e) => setMatkhau(e.target.value)}
                /> */}
                <div>M?? t???</div>
                <textarea
                    Label="M?? t???"
                    placeholder="M?? t??? cho s??ch"
                    value={moTa}
                    type="text"
                    onChange={(e) => setMoTa(e.target.value)}
                />

                <Input
                    type="file"
                    accept=".jpg, .png"
                    Label="H??nh ???nh"
                    name='file'
                    // value={''}
                    onChange={(event) => {
                        console.log('file  h??nh:', event.target.files);
                        //setHinhAnh(event.target.files[0].name);
                        setFileHinhAnh(event.target.files[0]);
                        console.log('file  h??nh2 :', filehinhAnh);
                        setHinhAnh(Date.now() + '_' + event.target.files[0].name);
                    }}
                //onChange={ (e) => fileSeletectedHandler(e)}
                // onChange={(e) => setHinhAnh(e.target.value)}
                />
                <Input
                    Label="T??c gi???"
                    placeholder="Nh???p t??n t??c gi???"
                    value={tacGia}
                    type="text"
                    onChange={(e) => setTacGia(e.target.value)}
                />
                <div>Ch???n nh?? xu???t b???n:</div>

                <select id='maNhaXuatBan'>
                    {publishers.map((publisher, index) =>
                        <>
                            <option value={publisher._id}>{publisher.tenNhaXuatBan}</option>

                        </>

                    )}

                </select>
                {/* <Label for="">Ch???n danh m???c con:</Label> */}
                <div>Ch???n danh m???c con:</div>

                <select id='maDanhMucCon'>
                    {categories.map((category, index) =>
                        <>
                            {category.danhMucCon.map((genres) =>
                                <option value={genres._id}>{genres.tenTheLoai}</option>

                            )}
                        </>
                    )}

                </select>
                <Input
                    Label="S??? l?????ng c??n l???i"
                    placeholder="Nh???p s??? l?????ng"
                    value={soLuongConLai}
                    type="number"
                    min="0"
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

export default BookAdd