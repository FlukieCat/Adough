import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Diary from './Diary';
import AddFoodModal from './AddFoodModal';
import RegisterModal from './RegisterModal';
import MacroPie from './MacroPie';
import MacroBar from './MacroBar';
import Calories from './Calories';

const Dashboard = ({ diary, isAuthenticated }) => {
    const [date, setDate] = useState(new Date());
    const [modalOpen, setModalOpen] = useState(false);
    const [registerModalOpen, setRegisterModalOpen] = useState(false);

    useEffect(() => {
        if (diary.suggestions.length !== 0) {
            setModalOpen(true);
        }
        // eslint-disable-next-line
    }, []);

    const onClickDay = (d) => {
        if (isAuthenticated) {
            setDate(d);
        } else {
            setRegisterModalOpen(true);
        }
    };

    return (
        <div className="dashboard">
            <div className="calendar">
                <div className="dashboard-buttons">
                    <a
                        href="#!"
                        className="btn btn-primary"
                        onClick={() => setModalOpen(true)}
                    >
                        <i className="fas fa-plus"></i> Add Food
                    </a>
                </div>
                <Calendar onClickDay={(d) => onClickDay(d)} value={date} />
            </div>
            <div className="diary">
                <Diary date={date} />
            </div>

            <div className="macros">
                <div class="calories">
                    <Calories />
                </div>
                <div className="pie">
                    <MacroPie />
                </div>
                <div className="bar">
                    <MacroBar />
                </div>
            </div>
            <div className="macros-num"></div>
            <div className="micros-vitamin"></div>
            <div className="micros-mineral"></div>
            <AddFoodModal
                isOpen={modalOpen}
                setModalOpen={setModalOpen}
                date={date}
            />
            <RegisterModal
                isOpen={registerModalOpen}
                setModalOpen={setRegisterModalOpen}
            />
        </div>
    );
};

Dashboard.propTypes = {
    diary: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    diary: state.diary,
});

export default connect(mapStateToProps, {})(Dashboard);
