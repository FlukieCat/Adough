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
import { getDiary } from '../../actions/diary';
import { loadUser } from './actions/auth';

const Dashboard = ({ diary, isAuthenticated, getDiary, loading, loadUser }) => {
    const [date, setDate] = useState(new Date());
    const [modalOpen, setModalOpen] = useState(false);
    const [registerModalOpen, setRegisterModalOpen] = useState(false);

    useEffect(() => {
        if (diary.suggestions.length !== 0) {
            setModalOpen(true);
        }
        loadUser();
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        if (!loading && isAuthenticated) getDiary(date);
    }, [date, isAuthenticated, loading, getDiary]);

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
                <Diary date={date} diary={diary.diary} />
            </div>

            <div className="macros">
                <div className="calories">
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
    getDiary: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    loading: state.auth.loading,
    diary: state.diary,
});

export default connect(mapStateToProps, { getDiary, loadUser })(Dashboard);
