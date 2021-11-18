import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import { Container, Row, Col, Modal, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { addCategory, getAllCategory } from '../../actions';
import {Input} from '../../components/UI/input'
/**
* @author
* @function Category
**/

export const Category = (props) => {

    const category = useSelector(state => state.category);
    const [tenDanhMuc, setTenDanhMuc] = useState('');
    const [parentCategoryId, setParentCategoryId] = useState('');
    const [categoryImage, setCategoryImage] = useState('');
    const [show, setShow] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        console.log(`Category.js`)
        dispatch(getAllCategory());

    }, []);

    const handleClose = () => {
        const form = new FormData();
        form.append('tenDanhMuc', tenDanhMuc);
        form.append('parentId', parentCategoryId);
        form.append('categoryImage', categoryImage);
        dispatch(addCategory(form));
        setShow(false);
    }
    const handleShow = () => setShow(true);

    const renderCategories = (categories) => {

        let myCategories = [];
        for (let category of categories) {
            myCategories.push(
                <li key={category.tenDanhMuc}>
                    {category.tenDanhMuc}
                    {category.children.length > 0 ? (<ul>{renderCategories(category.children)}</ul>) : null}
                </li>
            );
        }
        return myCategories;
    }

    const createCategoryList = (categories, options = []) =>{
        for(let category of categories){
            options.push({value: category._id, tenDanhMuc: category.tenDanhMuc});
            if(category.children.length>0){
                createCategoryList(category.children, options)
            }
        }
        return options;

    }

    const handleCategoryImage = (e) =>{
        setCategoryImage(e.target.files[0]);
    }

    return (
        <Layout sidebar>
            <Container>
                <Row>
                    <Col md={12}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <h3>Danh mục</h3>
                            <button onClick={handleShow}>Thêm danh mục</button>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <ul>
                            {renderCategories(category.categories)}
                        </ul>
                    </Col>
                </Row>
            </Container>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Thêm danh mục mới</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Input
                        value={tenDanhMuc}
                        placeholder={`Tên danh mục`}
                        onChange={(e)=> setTenDanhMuc(e.target.value)}
                    />
                    &nbsp;
                    <select 
                    className ="form-control" 
                    value={parentCategoryId}
                    onChange={(e)=> setParentCategoryId(e.target.value)}>
                        <option>Chọn danh mục</option>
                        {
                            createCategoryList(category.categories).map(option=>
                                <option key={option.value} value ={option.value}>{option.tenDanhMuc}</option>)
                        }
                    </select>
                    <input type="file" name ="Hình ảnh danh mục" onChange={handleCategoryImage}/>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary">
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </Layout>
    )

}