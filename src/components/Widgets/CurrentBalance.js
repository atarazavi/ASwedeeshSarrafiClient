/**
 * Today Orders Stats
 */
import React from 'react';
import CountUp from 'react-countup';

// intl messages
import IntlMessages from 'Util/IntlMessages';

// rct card box
import { RctCardContent } from 'Components/RctCard';

const CurrentBalance = (props) => (
    <div className="current-widget bg-primary">
        <RctCardContent>
            <div className="d-flex justify-content-between">
                <div className="align-items-start">
                    <h3 className="mb-10">Your Current Balance</h3>
                    <h2 className="mb-0"><CountUp separator="," start={0} end={14255} /></h2>
                </div>
                <div className="align-items-end">
                    {props.currency === "USD" && <i className="zmdi zmdi-money"></i>} 
                </div>
            </div>
        </RctCardContent>
    </div>
);

export default CurrentBalance;
