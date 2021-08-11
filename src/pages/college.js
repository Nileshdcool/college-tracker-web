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
import { Row, Col, Button, Container } from 'reactstrap';
import CollegeModal from '../modals/college.modal';


function numberWithCommas(x) {
    if (!x) {
        return '';
    }
    return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
}

const College = (props) => {
    const [searchName, setSearchTitle] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [pageSize, setPageSize] = useState(50);
    const [modal, setModal] = useState(false);

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
        dispatch(retrieveAllColleges());
    }, []);

    const onChangeSearchName = e => {
        const searchTitle = e.target.value;
        setSearchTitle(searchTitle);
    };

    const findByName = () => {
        setIsLoading(true);
        dispatch(retrieveAllColleges());
    };

    const searchData = {
        searchName,
        onChangeSearchName,
        findByName
    }

    const headerData = ['Name', 'Year Founded', 'City', 'State', 'Country', 'Ratings', 'Action'];

    const renderStars = (ratings) => {
        let stars = ''
        for (let index = 0; index < ratings; index++) {
            stars = stars + '*'
        }
        return stars;
    }

    const view = () => {
        return (
            <CollegeModal modalState={true}></CollegeModal>
        )
    }

    return (
        <>
            <SubHeader text='Colleges'></SubHeader>
            {!isLoading ? <>
                <Search searchData={searchData}></Search>
                <Container style={{marginBottom:'10px'}}>
                    <Row>
                        <Col sm={{ size: 'auto', offset: 11 }}>
                            <Button color="primary">Add</Button>{' '}
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
                                <td> <Button color="primary">View</Button>{' '}</td>
                            </tr>
                        ))}
                    </tbody>}
                </Table>
            </> : <AppSpinner></AppSpinner>}
        </>
    );
}

export default College;