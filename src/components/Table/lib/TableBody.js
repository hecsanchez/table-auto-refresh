import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const TableBody = (props) => {

    const { data } = props;

    return (
        <Fragment>
            { data.map(item=>(
                <div key={item.number} className="row">
                    {Object.keys(item).map(key=>(
                        <div key={key} className="cell">
                            { item[key] }
                        </div>
                    ))}
                </div>
            ))}
        </Fragment>
    );
}

TableBody.propTypes = {
    data: PropTypes.array.isRequired
};

export default TableBody;
