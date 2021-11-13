import React from 'react'
import { propTypes } from 'react-bootstrap/esm/Image'
import { Form } from 'react-bootstrap'
/**
* @author
* @function Input
**/

export const Input = (props) => {
    return (
        <Form.Group controlId="formBasicEmail">
            <Form.Label>{props.Label}</Form.Label>
            <Form.Control
                type={props.type}
                placeholder={props.placeholder}
                value = {props.value}
                onChange ={props.onChange} />
            <Form.Text className="text-muted">
                {props.errorMessage}
            </Form.Text>
        </Form.Group>
    )

}