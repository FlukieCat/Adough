import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { saveSetting } from '../../actions/setting';
import { setAlert } from '../../actions/alert';
import { connect } from 'react-redux';

Modal.setAppElement('body');

Modal.defaultStyles.overlay.background = 'rgba(0, 0, 0, 0.75)';

const SettingModal = ({
    isOpen,
    setModalOpen,
    setting: { loading, setting },
    saveSetting,
    setAlert,
}) => {
    const [formData, setFormData] = useState({
        gender: '',
        age: '',
        height: '',
        weight: '',
        activeLevel: '',
    });
    useEffect(() => {
        if (!loading) {
            setFormData({
                gender: setting.gender,
                age: setting.age,
                height: setting.height,
                weight: setting.weight,
                activeLevel: setting.activeLevel,
            });
        }
    }, [
        loading,
        setting.gender,
        setting.age,
        setting.height,
        setting.weight,
        setting.activeLevel,
    ]);
    const { gender, age, height, weight, activeLevel } = formData;
    const onChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };
    const onSubmit = (e) => {
        e.preventDefault();
        if (gender && age && height && weight && activeLevel) {
            saveSetting(formData);
            setModalOpen(false);
        } else {
            setAlert('Please enter all fields', 'danger');
        }
    };
    const onRequestClose = () => {
        setModalOpen(false);
    };
    return (
        <Modal
            className="setting-modal py-1"
            isOpen={isOpen}
            shouldCloseOnOverlayClick={true}
            onRequestClose={onRequestClose}
        >
            <form onSubmit={(e) => onSubmit(e)} className="form">
                <div className="form-group">
                    <label htmlFor="gender">Gender:</label>
                    <select
                        name="gender"
                        id="gender"
                        value={gender}
                        onChange={(e) => onChange(e)}
                        required
                    >
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="age">Age:</label>
                    <input
                        type="text"
                        name="age"
                        value={age}
                        onChange={(e) => onChange(e)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="height">
                        Height <span className="text-light">(cm)</span> :
                    </label>
                    <input
                        type="text"
                        name="height"
                        value={height}
                        onChange={(e) => onChange(e)}
                        required
                    />{' '}
                </div>
                <div className="form-group">
                    <label htmlFor="weight">
                        Weight <span className="text-light">(kg)</span> :
                    </label>
                    <input
                        type="text"
                        name="weight"
                        value={weight}
                        onChange={(e) => onChange(e)}
                        required
                    />{' '}
                </div>
                <div className="form-group">
                    <label htmlFor="activeLevel">Active level:</label>
                    <select
                        name="activeLevel"
                        id="activeLevel"
                        value={activeLevel}
                        onChange={(e) => onChange(e)}
                        required
                    >
                        <option value="Little to no exercise">
                            Little to no exercise
                        </option>
                        <option value="Light exercise">Light exercise</option>
                        <option value="Moderate exercise">
                            Moderate exercise
                        </option>
                        <option value="Heavy exercise">Heavy exercise</option>
                        <option value="Athlete">Athlete</option>
                    </select>
                </div>
                <input type="submit" className="btn btn-primary" value="Save" />
            </form>
        </Modal>
    );
};

const mapStateToProps = (state) => ({
    setting: state.setting,
});

export default connect(mapStateToProps, { saveSetting, setAlert })(
    SettingModal
);
