import React from 'react';
import PropTypes from 'prop-types';

export const Button = (props) => {

    const { style, text, onClick, color, disabled } = props;
    
    return (
        <button 
            className={`button button--${disabled ? 'gray' : color}`}
            style={style}
            onClick={onClick}
            disabled={disabled}
        >
            { text }
        </button>
    );
}

Button.propTypes = {
    style: PropTypes.object,
    text: PropTypes.string,
    color: PropTypes.string,
    disabled: PropTypes.bool,
    onClick: PropTypes.func.isRequired,
};