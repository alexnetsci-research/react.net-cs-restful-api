import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';


import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const MySwal = withReactContent(Swal);

const AddCustomer = () => {
    const navigate = useNavigate();
    const [customerInput, setCustomer] = useState({
        first_name: '',
        last_name: '',
        email: '',
        error_list: []
    });

    const handleInput = (e) => {
        e.persist();
        setCustomer({ ...customerInput, [e.target.name]: e.target.value })
    }

    const submit = (e) => {
        e.preventDefault();

        const data = {
            first_name: customerInput.first_name,
            last_name: customerInput.last_name,
            email: customerInput.email,
        }

        axios.post(`customer`, data).then(res => {

            if (res.data.status === 200) {
                MySwal.fire({
                    title: 'Success!',
                    html: `${res.data.message}`,
                    icon: 'success',
                    confirmButtonColor: '#a5dc86',
                    confirmButtonText: 'Ok',
                    showClass: {
                        popup: 'animate__animated animate__fadeInDown'
                    },
                    hideClass: {
                        popup: 'animate__animated animate__fadeOutUp'
                    }
                });
                setCustomer({
                    first_name: '',
                    last_name: '',
                    email: '',
                    error_list: [],
                });
                navigate('/customers', { replace: true });
            } else if (res.data.status === 422) {
                setCustomer({ ...customerInput, error_list: res.data.errors });
                if (res.data.errors) {
                    MySwal.fire({
                        title: `${Object.values(res.data.errors)[0]}`,
                        icon: 'warning',
                        confirmButtonColor: '#facea8',
                        confirmButtonText: 'Ok',
                        showClass: {
                            popup: 'animate__animated animate__fadeInDown'
                        },
                        hideClass: {
                            popup: 'animate__animated animate__fadeOutUp'
                        }
                    });
                }
            }
        });
    }

    return (
        <Container>
            <Row className='justify-content-center'>
                <Col md={9}>
                    <Card>
                        <Card.Header>
                            <h3>Add Customer
                                <Link to={'/customers'} className='btn btn-secondary btn-sm float-end'>Back</Link>
                            </h3>
                        </Card.Header>
                        <Card.Body>
                            <Form onSubmit={submit}>
                                <Form.Group className='mb-3' controlId='exampleForm.ControlInput1'>
                                    <Form.Control type='text' name='first_name' onChange={handleInput} value={customerInput.first_name} placeholder='First name' />
                                    <span className="text-danger">{customerInput.error_list.first_name}</span>
                                </Form.Group>

                                <Form.Group className='mb-3' controlId='exampleForm.ControlInput1'>
                                    <Form.Control type='text' name='last_name' onChange={handleInput} value={customerInput.last_name} placeholder='Last name' />
                                    <span className="text-danger">{customerInput.error_list.last_name}</span>
                                </Form.Group>

                                <Form.Group className='mb-3' controlId='exampleForm.ControlInput1'>
                                    <Form.Control type='email' name='email' onChange={handleInput} value={customerInput.email} placeholder='Email address' />
                                    <span className="text-danger">{customerInput.error_list.email}</span>
                                </Form.Group>

                                <Form.Group>
                                    <Button type='submit' variant='success btn-sm'>Submit</Button>
                                </Form.Group>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default AddCustomer;
