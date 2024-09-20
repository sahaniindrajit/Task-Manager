import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

const BottomWarning = React.memo(function ({ label, buttonText, to }) {
    return (
        <div className='text-md text-black py-2 flex justify-center'>
            <div>{label}</div>

            <Link className='underline pl-1 cursor-pointer' href={to}>
                {buttonText}
            </Link>
        </div>
    );
});

BottomWarning.displayName = "BottomWarning";

BottomWarning.propTypes = {
    buttonText: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired,
};

export default BottomWarning;
