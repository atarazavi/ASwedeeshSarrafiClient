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

class BalanceHistory extends React.Component {
	state = {
		theTransactionsList: [
            {
				id: 123,
                DateTime : "2019/08/21-15:43:23",
                volume: "1000",
                currency: "Euro",
                status: "Pending"
            }
        ]
	}
	componentDidMount = () => {	
	}
	render() {
		const columns = ["Transaction ID", "Date/Time", "Volume", "Currency", "Status"]
		var tablemessage = "Sorry, no matching records found"
		const data = this.state.theTransactionsList.map(eachaction => {
			return(
                [eachaction.id, eachaction.DateTime , eachaction.volume, eachaction.currency, 
                    eachaction.status == 'Pending' ?
                    <span className={`badge badge-info`}>{ eachaction.status }</span>
                    :
                    eachaction.status == 'Done' ?
                    <span className={`badge badge-success`}>{ eachaction.status }</span>
                    :
                    eachaction.status == 'Cancelled' ?
                    <span className={`badge badge-danger`}>{ eachaction.status }</span>
                    :
                    'unKnown!'
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
						title="Transactions List"
						data={data}
						columns={columns}
						options={options}
					/>
				</RctCollapsibleCard>
			</div>
		);
	}
}

export default BalanceHistory;
