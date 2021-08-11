import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { ListGroup, ListGroupItem } from 'reactstrap';

const CollegeModal = (props) => {
    const {
        modal,
        setModal,
        students
    } = props;

    const hideModal = () => {
        setModal(false);
    }
    return (
        <div>
            <Modal isOpen={modal} toggle={hideModal}>
                <ModalHeader toggle={hideModal}>Student Details</ModalHeader>
                <ModalBody>
                    <ListGroup>
                        {students.map((s)=>(
                            <ListGroupItem>{s.name}</ListGroupItem>
                        ))}
                    </ListGroup>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={hideModal}>Ok</Button>{' '}
                </ModalFooter>
            </Modal>
        </div>
    );
}

export default CollegeModal;