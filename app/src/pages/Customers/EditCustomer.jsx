import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
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

const EditCustomer = () => {
    const [loading, setLoading] = useState(true);
    const [customerInput, setCustomer] = useState([]);
    const [errorInput, setError] = useState([]);

    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        let isMounted = true;
        axios.get(`customer/${id}/edit`).then(res => {
            if (isMounted && res.data.status === 200) {
                setCustomer(res.data.customer);
                setLoading(false);
            } else if (res.data.status === 404) {
                MySwal.fire({
                    title: `${res.data.message}`,
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
                navigate('/', { replace: true });
            }
        });
        return () => { isMounted = false };
    }, [id, navigate]);

    const handleInput = (e) => {
        e.persist();
        setCustomer({ ...customerInput, [e.target.name]: e.target.value });
    }

    const submit = (e) => {
        e.preventDefault();

        const data = {
            first_name: customerInput.first_name,
            last_name: customerInput.last_name,
            email: customerInput.email,
        }

        axios.put(`customer/${id}`, data).then(res => {
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
                setError([]);
                navigate('/customers', { replace: true });
            } else if (res.data.status === 422) {
                if (res.data.errors) {
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
                setError(res.data.errors);
            } else if (res.data.status === 404) {
                if (res.data.errors) {
                    MySwal.fire({
                        title: `${res.data.message}`,
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
                navigate('/customers', { replace: true });
            }
        });
    }

    if (loading) {
        return (
            <Container>
                <Row className='justify-content-center'>
                    <Col md={9}>
                        <Card>
                            <Card.Body className='text-center'>
                                Loading...
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        );
    }

    return (
        <Container>
            <Row className='justify-content-center'>
                <Col md={9}>
                    <Card>
                        <Card.Header>
                            <h3>Edit {customerInput.first_name} {customerInput.last_name}
                                <Link to={'/customers'} className='btn btn-secondary btn-sm float-end'>Back</Link>
                            </h3>
                        </Card.Header>
                        <Card.Body>
                            <Form onSubmit={submit}>
                                <Form.Group className='mb-3' controlId='exampleForm.ControlInput1'>
                                    <Form.Control type='text' name='first_name' onChange={handleInput} value={customerInput.first_name} placeholder='First name' />
                                    <span className='text-danger'>{errorInput.first_name}</span>
                                </Form.Group>

                                <Form.Group className='mb-3' controlId='exampleForm.ControlInput1'>
                                    <Form.Control type='text' name='last_name' onChange={handleInput} value={customerInput.last_name} placeholder='Last name' />
                                    <span className='text-danger'>{errorInput.last_name}</span>
                                </Form.Group>

                                <Form.Group className='mb-3' controlId='exampleForm.ControlInput1'>
                                    <Form.Control type='email' name='email' onChange={handleInput} value={customerInput.email} placeholder='Email address' />
                                    <span className='text-danger'>{errorInput.email}</span>
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

export default EditCustomer;
