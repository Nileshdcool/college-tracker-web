import React from 'react';
import { Table } from 'reactstrap';
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
    retrieveAllStudents,

} from "../actions/student";
import { AppSpinner } from '../components/spinner';
import GridHeader from "../components/grid-header";
import { SubHeader } from '../components/sub-header';
import Search from '../components/search';
import { Button } from 'reactstrap';

const Student = (props) => {
    const [searchName, setSearchTitle] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [pageSize, setPageSize] = useState(50);

    let students = useSelector(state => {
        debugger;
        if (state.students.length > 0) {
            if (isLoading) {
                setIsLoading(false);
            }
            if (searchName !== '') {
                return state.students.filter((c) => {
                    if (c.name.toLowerCase().includes(searchName.toLowerCase())) {
                        return c;
                    }
                }).slice(0, pageSize);
            }
            return state.students.slice(0, pageSize);
        }
    });

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(retrieveAllStudents());
    }, []);

    const onChangeSearchName = e => {
        const searchTitle = e.target.value;
        setSearchTitle(searchTitle);
    };

    const findByName = () => {
        setIsLoading(true);
        dispatch(retrieveAllStudents());
    };

    const searchData = {
        searchName,
        onChangeSearchName,
        findByName
    }

    const headerData = ['Name', 'Year of Batch','Skills','Action'];

    const renderStars = (ratings) => {
        let stars = ''
        for (let index = 0; index < ratings; index++) {
            stars = stars + '*'
        }
        return stars;
    }

    return (
        <>
            <SubHeader text='Students'></SubHeader>
            {!isLoading ? <>
                <Search searchData={searchData}></Search>
                <Table dark>
                    <GridHeader headerData={headerData}></GridHeader>
                    {students.length > 0 && <tbody>
                        {students.map((student, index) => (
                            <tr key={index}>
                                <td>{student.name}</td>
                                <td>{student.year_of_batch}</td>
                                <td>{student.skills.map((c)=> {
                                    return (
                                        <span> {c} </span>
                                    )
                                })}</td>
                                <td> <Button color="primary">View</Button>{' '}</td>
                            </tr>
                        ))}
                    </tbody>}
                </Table>
            </> : <AppSpinner></AppSpinner>}
        </>
    );
}

export default Student;