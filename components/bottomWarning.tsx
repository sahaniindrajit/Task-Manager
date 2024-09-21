import React from 'react';
import Link from 'next/link';

interface BottomWarningProps {
    label: string;
    buttonText: string;
    to: string;
}

const BottomWarning: React.FC<BottomWarningProps> = ({ label, buttonText, to }) => {
    return (
        <div className='text-md text-black py-2 flex justify-center'>
            <div>{label}</div>

            <Link href={to} passHref>
                <p className='underline pl-1 cursor-pointer'>{buttonText}</p>
            </Link>
        </div>
    );
};

export default BottomWarning;
