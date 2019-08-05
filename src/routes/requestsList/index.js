import React from 'react';
import MUIDataTable from "mui-datatables";

// rct card box
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';

// intl messages
import IntlMessages from 'Util/IntlMessages';

import IconButton from '@material-ui/core/IconButton';

import Tooltip from '@material-ui/core/Tooltip';
// app config
import AppConfig from 'Constants/AppConfig';

class RequestsList extends React.Component {
	state = {
		theRequestslist: [
            {
				id: 123,
                title : "vaarize nafagheye Amme!",
                Account: "Amme - Pasargad",
                volume: "1000",
				currency: "Euro",
				status: "Succeed"
            }
        ]
	}
	componentDidMount = () => {	
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
		const data = this.state.theRequestslist.map(eachaction => {
			return(
				[eachaction.title, eachaction.Account , eachaction.volume, eachaction.currency, 
                    eachaction.status == 'Pending' ?
                    <span className={`badge badge-info`}>{ eachaction.status }</span>
                    :
                    eachaction.status == 'Succeed' ?
                    <span className={`badge badge-success`}>{ eachaction.status }</span>
                    :
                    eachaction.status == 'Cancelled' ?
                    <span className={`badge badge-danger`}>{ eachaction.status }</span>
                    :
                    'unKnown!'
                	,
					<div>
						<Tooltip id="tooltip-fab" title={<IntlMessages id="Details"/>}>
							<IconButton className="text-danger" onClick={() => this.actionClickhandler(eachaction.id, eachaction.title, 'more')} aria-label="Details">
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
