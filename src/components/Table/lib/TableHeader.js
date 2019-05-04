import React from 'react';
import PropTypes from 'prop-types';

const TableHeader = (props) => {

    const { data } = props;

    return (
        <div className="tableHead row">
        { data && data.length > 0 &&
            Object.keys(data[0]).map(key=>(
                <div key={key} className="cell">
                    { key }
                </div>
            ))
        }
        </div>
    );
}

TableHeader.propTypes = {
    data: PropTypes.array.isRequired
};

export default TableHeader;