import React from 'react';
import { Row, Col, Input, Button, Container } from 'reactstrap';

const AdvanceSearch = ({data,toggleGrid}) => {
    return (
        <>
            <Container>
                <Row md="4" style={{ marginBottom: '10px' }}>
                    <Col>
                        <Input type="select" name="location" id="location">
                            {data.map((c)=>{
                                return (
                                    <option>{c.location.state}</option>
                                )
                            })}
                        </Input>
                    </Col>
                    <Col>
                        <Input type="select" name="location" id="location">
                            {data.map((c)=>{
                                return (
                                    <option>{c.location.city}</option>
                                )
                            })}
                        </Input>
                    </Col>
                    <Col>
                        <Input type="select" name="courses" id="courses">
                           {data.map((c)=>{
                               return (
                                <option>{c.courses}</option>
                               )
                           })}
                        </Input>
                    </Col>
                    <Col>
                        <Button color="info" onClick={() => toggleGrid(false)}>Grid</Button>{' '}
                        <Button color="info" onClick={() => toggleGrid(true)}>Charts</Button>{' '}
                    </Col>
                </Row>
            </Container>

        </>
    )
}
export default AdvanceSearch;