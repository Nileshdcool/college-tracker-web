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
import AdvanceSearch from '../components/advance-search';
import { Button } from 'reactstrap';
import CollegeModal from '../modals/college.modal';
import Chart from "react-google-charts";

const Dashboard = (props) => {
    const [searchName, setSearchTitle] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [pageSize, setPageSize] = useState(50);
    const [modal, setModal] = useState('');
    const [toggleGrid, setToggleGrid] = useState(false);
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

    const renderChart = () => {
        return (
            <Chart
                width={'500px'}
                height={'300px'}
                chartType="PieChart"
                loader={<div>Loading Chart</div>}
                data={[
                    ['Task', 'Hours per Day'],
                    ['Work', 11],
                    ['Eat', 2],
                    ['Commute', 2],
                    ['Watch TV', 2],
                    ['Sleep', 7],
                ]}
                options={{
                    title: 'My Daily Activities',
                    // Just add this option
                    is3D: true,
                }}
                rootProps={{ 'data-testid': '2' }}
            />
        )
    }

    const viewStudents = (college) => {
        setStudents(college.students);
        setModal(true);
    }

    const renderTable = () => {
        return (
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
                                <td> <Button color="primary" onClick={() => viewStudents(college)}>View</Button>{' '}</td>
                            </tr>
                        ))}
                    </tbody>}
                </Table>
        )
    }

    return (
        <>
            <SubHeader text='Welcome to the College Tracker'></SubHeader>
            {!isLoading ? <>
                <Search searchData={searchData}></Search>
                <AdvanceSearch toggleGrid={(value)=>setToggleGrid(value)}></AdvanceSearch>
                <CollegeModal students={students} modal={modal} setModal={setModal}></CollegeModal>
                {toggleGrid ? renderChart() : renderTable()}
            </> : <AppSpinner></AppSpinner>}
        </>
    );
}

export default Dashboard;