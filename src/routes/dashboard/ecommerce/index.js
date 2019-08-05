/**
 * Ecommerce Dashboard
 */

import React, { Component } from 'react'
import { Helmet } from "react-helmet";
// intl messages
import IntlMessages from 'Util/IntlMessages';

// page title bar
import PageTitleBar from 'Components/PageTitleBar/PageTitleBar';

// rct collapsible card
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';

import {
	Euro2RialAreaChart,
	USD2RialAreaChart,
	SEK2RialAreaChart,
	RecentOrdersWidget,
	CurrentBalance,
	RequestExpirationcountDown,
	Notes
} from "Components/Widgets";

// widgets data
import {
	visitorsData,
	salesData,
	ordersData,
} from './data';

export default class EcommerceDashboard extends Component {
	render() {
		const { match } = this.props;
		return (
			<div className="ecom-dashboard-wrapper">
				<Helmet>
					<title>Dashboard</title>
					<meta name="description" content="Reactify Ecommerce Dashboard" />
				</Helmet>
				<PageTitleBar title="My Dashboard" match={match} />
				<div className="row">
					<div className="col-sm-6 col-md-4 w-xs-half-block">
						<Euro2RialAreaChart
							data={visitorsData}
						/>
					</div>
					<div className="col-sm-12 col-md-4 w-xs-half-block">
						<SEK2RialAreaChart
							data={ordersData}
						/>
					</div>
					<div className="col-sm-6 col-md-4 w-xs-full">
						<USD2RialAreaChart
							data={salesData}
						/>
					</div>
				</div>
				<div className="row">
					<div className="col-sm-12 col-md-4 col-lg-4 d-sm-full">
						<div className="row">
							<div className="col-sm-12 col-md-12 col-lg-12">
								<CurrentBalance currency="USD" />
								<RequestExpirationcountDown remainingtime={5000} />
								<div className="dash-cards">
									<Notes />
								</div>
							</div>
						</div>
					</div>
					<RctCollapsibleCard
						colClasses="col-sm-12 col-md-8 col-lg-8 d-sm-full"
						heading={<IntlMessages id="widgets.RecentOrders" />}
						collapsible
						reloadable
						closeable
						fullBlock
					>
						<RecentOrdersWidget />
					</RctCollapsibleCard>
				</div>
			</div>
		)
	}
}
