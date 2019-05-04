import React from 'react';
import PropTypes from 'prop-types';
import TableHeader from './lib/TableHeader';
import TableBody from './lib/TableBody';


export const Table = (props) => {

    const { data } = props;

    return (
        <div className="table">
            <TableHeader data={data} />
            <TableBody data={data} />
        </div>
    );
}

Table.propTypes = {
    data: PropTypes.array.isRequired
};