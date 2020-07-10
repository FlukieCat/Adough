import React, { useState, useRef, useEffect } from 'react';
import Modal from 'react-modal';
import SearchBar from '../layout/Searchbar';
import { connect } from 'react-redux';
import { addFood, clearSuggestion, addFoodGuest } from '../../actions/diary';
import Spinner from '../layout/Spinner';

Modal.setAppElement('body');

Modal.defaultStyles.overlay.background = 'rgba(0, 0, 0, 0.75)';

const AddFoodModal = ({
    isOpen,
    setModalOpen,
    date,
    suggestions,
    loading,
    addFood,
    addFoodGuest,
    clearSuggestion,
    isAuthenticated,
}) => {
    const [quantity, setQuantity] = useState('');
    const [queryId, setQueryId] = useState(null);
    const [showInput, setShowInput] = useState(false);
    const inputRef = useRef(null);
    useEffect(() => {
        if (showInput) {
            inputRef.current.focus();
        }
    }, [showInput]);
    const onRequestClose = () => {
        setModalOpen(false);
        setQueryId(null);
        setShowInput(false);
        clearSuggestion();
    };
    const onSubmit = (e) => {
        e.preventDefault();
        if (isAuthenticated) {
            addFood(queryId, quantity, date);
        } else {
            addFoodGuest(queryId, quantity);
        }
    };
    return (
        <Modal
            className="add-food-modal py-1"
            isOpen={isOpen}
            shouldCloseOnOverlayClick={true}
            onRequestClose={onRequestClose}
        >
            <SearchBar />
            {loading ? (
                <Spinner />
            ) : (
                <select className="suggestions my-1" size="30">
                    {suggestions.map((suggestion) => (
                        <option
                            key={suggestion.fdcId}
                            className="suggestion"
                            onClick={() => {
                                setShowInput(true);
                                setQueryId(suggestion.fdcId);
                            }}
                        >
                            {suggestion.description} {suggestion.brandOwner}
                        </option>
                    ))}
                </select>
            )}

            {showInput && (
                <form className="quantity-form" onSubmit={(e) => onSubmit(e)}>
                    <div className="m-1">Serving Size:</div>
                    <input
                        type="text"
                        name="quantity"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        ref={inputRef}
                    />
                    <div style={{ marginLeft: '5px', marginRight: '1rem' }}>
                        g
                    </div>
                    <button type="submit" className="btn btn-primary">
                        Add food
                    </button>
                </form>
            )}
        </Modal>
    );
};

const mapStateToProps = (state) => ({
    suggestions: state.diary.suggestions,
    loading: state.diary.loading,
    isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, {
    addFood,
    clearSuggestion,
    addFoodGuest,
})(AddFoodModal);
