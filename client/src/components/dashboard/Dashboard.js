import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Diary from './Diary';
import AddFoodModal from './AddFoodModal';
import RegisterModal from './RegisterModal';
import SettingModal from './SettingModal';
import MacroPie from './MacroPie';
import MacroBar from './MacroBar';
import Calories from './Calories';
import VitaminRadar from './VitaminRadar';
import MineralRadar from './MineralRadar';
import { getDiary, updateNutrition } from '../../actions/diary';
import { loadUser } from '../../actions/auth';
import { loadSetting } from '../../actions/setting';

const Dashboard = ({
    diary,
    isAuthenticated,
    getDiary,
    loading,
    loadUser,
    loadSetting,
    updateNutrition,
}) => {
    const [date, setDate] = useState(new Date());
    const [modalOpen, setModalOpen] = useState(false);
    const [registerModalOpen, setRegisterModalOpen] = useState(false);
    const [settingModalOpen, setSettingModalOpen] = useState(false);

    useEffect(() => {
        if (diary.suggestions.length !== 0) {
            setModalOpen(true);
        }
        loadUser();
        if (isAuthenticated) loadSetting();
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        if (isAuthenticated) loadSetting();
        if (!loading && isAuthenticated) getDiary(date);
    }, [date, isAuthenticated, loading, getDiary, loadSetting]);

    useEffect(() => {
        updateNutrition();
    }, [diary.diary, updateNutrition]);

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
            <div className="micros">
                <div className="settings">
                    <div className="edit-setting-btn">
                        <a
                            href="#!"
                            className="btn btn-primary"
                            onClick={() => setSettingModalOpen(true)}
                        >
                            <i className="fas fa-user-edit"></i> Edit Setting
                        </a>
                    </div>
                    <span className="text-light">
                        Tell us more about you to access your nutrition score
                    </span>
                </div>
                <div className="minerals">
                    <h3 className="text-light">Minerals</h3>
                    {isAuthenticated ? (
                        <MineralRadar />
                    ) : (
                        <span
                            className="text-light"
                            style={{ margin: '2rem auto' }}
                        >
                            Login to see more details
                        </span>
                    )}
                </div>
                <div className="vitamins">
                    <h3 className="text-light">Vitamins</h3>
                    {isAuthenticated ? (
                        <VitaminRadar />
                    ) : (
                        <span
                            className="text-light"
                            style={{ margin: '2rem auto' }}
                        >
                            Login to see more details
                        </span>
                    )}
                </div>
            </div>
            <AddFoodModal
                isOpen={modalOpen}
                setModalOpen={setModalOpen}
                date={date}
            />
            <RegisterModal
                isOpen={registerModalOpen}
                setModalOpen={setRegisterModalOpen}
            />
            <SettingModal
                isOpen={settingModalOpen}
                setModalOpen={setSettingModalOpen}
            />
        </div>
    );
};

Dashboard.propTypes = {
    diary: PropTypes.object.isRequired,
    getDiary: PropTypes.func.isRequired,
    loadUser: PropTypes.func.isRequired,
    loadSetting: PropTypes.func.isRequired,
    updateNutrition: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    loading: state.auth.loading,
    diary: state.diary,
});

export default connect(mapStateToProps, {
    getDiary,
    loadUser,
    loadSetting,
    updateNutrition,
})(Dashboard);
