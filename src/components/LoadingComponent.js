import React from 'react';

export const Loading = () => {
    return (
        <div className="col-12 d-flex flex-column justify-content-center align-items-center my-5">
            <span className="fa fa-spinner fa-pulse fa-3x fa-fw text-primary"></span>
            <p>Loading . . .</p>
        </div>
    );
};