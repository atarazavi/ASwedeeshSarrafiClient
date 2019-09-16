import React from 'react';
import MUIDataTable from "mui-datatables";

// rct card box
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';

// intl messages
import IntlMessages from 'Util/IntlMessages';

import IconButton from '@material-ui/core/IconButton';

import Tooltip from '@material-ui/core/Tooltip';
import { NotificationManager } from "react-notifications";
import AppConfig from 'Constants/AppConfig';

class RequestsList extends React.Component {
	state = {
		theRequestslist: [
            {
				id: 123,
				title : "vaarize nafagheye Amme!",
				accountID: 0,
                accountName: "Amme - Pasargad",
                volume: 1000,
				currency: "Euro",
				status: "Succeed"
            },
        ]
	}
	componentDidMount = () => {	
		(async () => {
			try {
				const rawResponse = await fetch(
					AppConfig.baseURL +
					"/request/forCostumer/" +
					localStorage.getItem('CurrentUsersID'),
					{
						method: "GET",
						headers: {
							"Content-Type": "application/json",
							Authorization: localStorage.getItem("given_token")
						}
					}
				);
				const content = await rawResponse.json();
				if (rawResponse.status === 200) {
					let theRequestslist = content.map(each => {
						console.log(each.state);
						
						return({
							id: each.id,
							title: each.title,
							accountID : each.paymentTargetId,
							accountName: 'felan ye chizi',
							volume: each.volume,
							currency: each.currencyType,
							status: each.state
						})
					})
					this.setState({
						theRequestslist
					});
				} else {
					NotificationManager.error(
						"something went wrong" + rawResponse.status
					);
				}
			} catch (err) {
				NotificationManager.error(
					"something went wrong on Connecting The Server : " + err
				);
			}
		})();
	}
	actionClickhandler = (id, title, action) => {
		switch(action) { 
			case "more": { 
				this.props.history.push({
					pathname: 'requestMoreInfo',
					state: { RequestTitle: title, RequestID: id }
				})
				break; 
			}
			default: { 
				break;              
			} 
		} 
	}
	render() {
		const columns = ["Request Title", "Destination Account", "Amount", "Currency", "Status", "Actions"]
		var tablemessage = "Sorry, no matching records found"
		const data = this.state.theRequestslist.map(eachRequest => {
			return(
				[eachRequest.title, eachRequest.accountName , eachRequest.volume, eachRequest.currency, 
                    eachRequest.status == 'WaitingForAdmin' ?
                    <span className={`badge badge-info`}>{ eachRequest.status }</span>
                    :
                    eachRequest.status == 'Done' ?
                    <span className={`badge badge-success`}>{ eachRequest.status }</span>
                    :
                    eachRequest.status == 'Canceled' ?
                    <span className={`badge badge-danger`}>{ eachRequest.status }</span>
                    :
                    eachRequest.status == 'WaitingForPayment' ?
                    <span className={`badge badge-info`}>{ eachRequest.status }</span>
                    :
                    'unKnown!'
                	,
					<div>
						<Tooltip id="tooltip-fab" title={<IntlMessages id="Details"/>}>
							<IconButton className="text-danger" onClick={() => this.actionClickhandler(eachRequest.id, eachRequest.title, 'more')} aria-label="Details">
								<i className="zmdi zmdi-eye"></i>
							</IconButton>	
						</Tooltip>
					</div>
				]
			)
		})
		const options = {
			filter: false,
			responsive: 'scroll',
			selectableRows: false,
			download: false,
			print: false,
			search: false,
			viewColumns: false,
			sort: true,
			pagination: false
		};
		return (
			<div className="data-table-wrapper">
				<RctCollapsibleCard fullBlock>
					<MUIDataTable
						title="Requests List"
						data={data}
						columns={columns}
						options={options}
					/>
				</RctCollapsibleCard>
			</div>
		);
	}
}

export default RequestsList;
