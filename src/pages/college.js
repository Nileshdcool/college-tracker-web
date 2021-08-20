import React from 'react';
import { Table } from 'reactstrap';
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
    retrieveAllColleges,

} from "../actions/college";
import { AppSpinner } from '../components/spinner';
import GridHeader from "../components/grid-header";
import { SubHeader } from '../components/sub-header';
import Search from '../components/search';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import { Row, Col, Button, Container, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import CollegeModal from '../modals/college.modal';
const College = (props) => {
    const [searchName, setSearchTitle] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [pageSize, setPageSize] = useState(50);
    const [modal, setModal] = useState(false);
    const [isStudentsModal, setIsStudentModal] = useState(false);
    const [students, setStudents] = useState([]);

    let colleges = useSelector(state => {
        if (state.colleges.length > 0) {
            if (isLoading) {
                setIsLoading(false);
            }
            if (searchName !== '') {
                return state.colleges.filter((c) => {
                    if (c.name.toLowerCase().includes(searchName.toLowerCase())) {
                        return c;
                    }
                }).slice(0, pageSize);
            }
            return state.colleges.slice(0, pageSize);
        }
    });

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(retrieveAllColleges(''));
    }, []);

    const onChangeSearchName = e => {
        const searchTitle = e.target.value;
        setSearchTitle(searchTitle);
    };

    const findByName = () => {
        setIsLoading(true);
        dispatch(retrieveAllColleges(''));
    };

    const searchData = {
        searchName,
        onChangeSearchName,
        findByName
    }

    const headerData = ['Name', 'Year Founded', 'City', 'State', 'Country', 'Ratings', 'Action'];

    const renderCollegeModal = () => {
        return (
            <div>
                <Modal isOpen={modal} toggle={() => setModal(!modal)}>
                    <ModalHeader toggle={() => setModal(!modal)}>Add New College</ModalHeader>
                    <ModalBody>
                        <AvForm>
                            <AvField name="name" label="Name" required />
                            <AvField name="yearFounded" label="Year Founded" type="number" />
                            <AvField type="select" name="country" label="Country" helpMessage="Please Select Country">
                                <option>1</option>
                            </AvField>
                            <AvField type="select" name="state" label="State" helpMessage="Please Select State">
                                <option>1</option>
                            </AvField>
                            <AvField type="select" name="city" label="City" helpMessage="Please Select City">
                                <option>1</option>
                            </AvField>
                            <AvField name="ratings" label="Ratings" type="number" max="10" />
                        </AvForm>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={() => setModal(false)}>Add</Button>{' '}
                        <Button color="secondary" onClick={() => setModal(false)}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }

    const viewStudentDetails = () => {
        return (
            <CollegeModal students={students} modal={isStudentsModal} setModal={setIsStudentModal}></CollegeModal>
        )
    }

    const onViewStudentClickHandler = (college) => {
        setStudents(college.students);
        setIsStudentModal(true);
    }

    return (
        <>
            {renderCollegeModal()}
            {viewStudentDetails()}
            <SubHeader text='Colleges'></SubHeader>
            {!isLoading ? <>
                <Search searchData={searchData}></Search>
                <Container style={{ marginBottom: '10px' }}>
                    <Row>
                        <Col sm={{ size: 'auto', offset: 11 }}>
                            <Button onClick={() => setModal(true)} color="primary">Add</Button>{' '}
                        </Col>
                    </Row>
                </Container>
                <Table dark>
                    <GridHeader headerData={headerData}></GridHeader>
                    {colleges.length > 0 && <tbody>
                        {colleges.map((college, index) => (
                            <tr key={index}>
                                <td>{college.name}</td>
                                <td>{college.year_founded}</td>
                                <td>{college.location.city}</td>
                                <td>{college.location.state}</td>
                                <td>{college.location.country}</td>
                                <td>****</td>
                                <td>
                                    <Row>
                                        <Col>
                                            <Button onClick={() => onViewStudentClickHandler(college)} color="primary">View Students</Button>{' '}
                                        </Col>
                                        <Col>
                                            <Button onClick={() => setModal(true)} color="primary">Edit</Button>{' '}
                                        </Col>
                                    </Row>
                                </td>
                            </tr>
                        ))}
                    </tbody>}
                </Table>
            </> : <AppSpinner></AppSpinner>}
        </>
    );
}

export default College;