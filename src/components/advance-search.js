import React from 'react';
import { Row, Col, Input, Button, Container } from 'reactstrap';

const AdvanceSearch = (props) => {
    return (
        <>
            <Container>
                <Row md="4" style={{ marginBottom: '10px' }}>
                    <Col>
                        <Input type="select" name="location" id="location">
                            <option>1</option>
                        </Input>
                    </Col>
                    <Col>
                        <Input type="select" name="courses" id="courses">
                            <option>1</option>
                        </Input>
                    </Col>
                    <Col>
                        <Input type="select" name="range" id="range">
                            <option>1</option>
                        </Input>
                    </Col>
                    <Col>
                        <Button color="info" onClick={() => props.toggleGrid(false)}>Grid</Button>{' '}
                        <Button color="info" onClick={() => props.toggleGrid(true)}>Charts</Button>{' '}
                    </Col>
                </Row>
            </Container>

        </>
    )
}
export default AdvanceSearch;