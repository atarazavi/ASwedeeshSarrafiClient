/**
 * Active User Component
 */
import React, { Component, Fragment } from 'react';
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import { Scrollbars } from 'react-custom-scrollbars';

// intl messages
import IntlMessages from 'Util/IntlMessages';

const data = [
    {
        id: 1,
        flag: 'icons8-usa',
        countryName: 'US Dollars',
        userCount: 15000,
    },
    {
        id: 2,
        flag: 'icons8-hungary',
        countryName: 'Hungary',
        userCount: 18000,
    },
    {
        id: 3,
        flag: 'icons8-france',
        countryName: 'France',
        userCount: 8600,
    },
    {
        id: 4,
        flag: 'icons8-japan',
        countryName: 'Japan',
        userCount: 24300,
    },
    {
        id: 5,
        flag: 'icons8-china',
        countryName: 'China',
        userCount: 155000,
    },
];

export default class RecentTransferRates extends Component {
    render() {
        return (
            <Fragment>
                <div className="rct-block-title border-0 text-white bg-primary">
                    <h2 className="d-flex justify-content-between mb-0 font-weight-light">
                        <span>Today's Transfer Rates (Rials)</span>
                    </h2>
                </div>
                <Scrollbars className="rct-scroll" autoHeight autoHeightMin={100} autoHeightMax={380} autoHide>
                    <List className="list-unstyled p-0">
                        {(data && data.length > 0) && data.map((data, key) => (
                            <ListItem key={key} className="border-bottom d-flex justify-content-between align-items-center p-20">
                                <div className="w-60 d-flex">
                                    <div className="flag-img mr-30">
                                        <img src={require(`Assets/flag-icons/${data.flag}.png`)} alt="flag-img" className="img-fluid" width="44" height="30" />
                                    </div>
                                    <span>{data.countryName}</span>
                                </div>
                                <div className="w-40 d-flex justify-content-between">
                                    <span>{data.userCount}</span>
                                    <div>
                                        Rials
                                    </div>
                                </div>
                            </ListItem>
                        ))}
                    </List>
                </Scrollbars>
            </Fragment>
        )
    }
}
