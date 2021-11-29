// import React, { useEffect } from 'react'
// // import 'bootstrap/dist/css/bootstrap.min.css'
// // import { BootstrapTable } from 'react-bootstrap-table'
// import { getAllBooks } from '../../../actions';
// import { useDispatch, useSelector } from 'react-redux';
// export const Test1 = () => {
//     const dispatch = useDispatch();
//     const books = useSelector(state => state.book.books);
//     //const [sach, setSach] = useState('');
//     const columns = [
//         { dataFiled: 'tenSach', text: 'tenSach' },
//         { dataFiled: 'giaTien', text: 'giaTien' },
//         { dataFiled: '_id', text: '_id' },
//         { dataFiled: 'soLuongConLai', text: 'soLuongConLai' }
//         //{ dataFiled: 'stt', text: 'STT' }
//     ]
//     useEffect(() => {
//         // const params = getParams(props.location.search);
//         // console.log({params});
//         // const payload = {
//         //     params
//         // }
//         dispatch(getAllBooks());
//         //setSach(books)
//     }, []);

//     return (
//         <div>
//             <BootstrapTable keyField='_id' columns={columns} data={books} />
//         </div>
//     )
// }
// export default Test1