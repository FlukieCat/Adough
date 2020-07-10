import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { suggestSearchResult } from '../../actions/diary';

const Searchbar = ({ suggestSearchResult, history, fromLanding = false }) => {
    const [text, setText] = useState('');
    const onSubmit = (e) => {
        e.preventDefault();
        suggestSearchResult(text, history, fromLanding);
    };

    return (
        <form className="searchbar" onSubmit={(e) => onSubmit(e)}>
            <input
                className="input-field-searchbar"
                type="text"
                placeholder="Enter food detail here"
                onChange={(e) => setText(e.target.value)}
            />
            <button className="btn" type="submit">
                <i className="fa fa-search"></i>
            </button>
        </form>
    );
};

Searchbar.propTypes = {
    suggestSearchResult: PropTypes.func.isRequired,
};

export default connect(null, { suggestSearchResult })(withRouter(Searchbar));
