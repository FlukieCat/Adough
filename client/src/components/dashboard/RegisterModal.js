import React from 'react';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';

Modal.setAppElement('body');

Modal.defaultStyles.overlay.background = 'rgba(0, 0, 0, 0.75)';

const RegisterModal = ({ isOpen, setModalOpen }) => {
    const onRequestClose = () => {
        setModalOpen(false);
    };
    return (
        <Modal
            className="register-modal py-1"
            isOpen={isOpen}
            shouldCloseOnOverlayClick={true}
            onRequestClose={onRequestClose}
        >
            Login or register to start your food diary.
            <div className="buttons">
                <Link to="/login" className="btn btn-primary">
                    Login
                </Link>
                <Link to="/register" className="btn btn-primary">
                    Register
                </Link>
            </div>
        </Modal>
    );
};

export default RegisterModal;
