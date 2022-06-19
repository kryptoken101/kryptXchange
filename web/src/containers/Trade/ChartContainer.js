import React from 'react';
import { connect } from 'react-redux';
import withConfig from 'components/ConfigProvider/withConfig';
import { bindActionCreators } from 'redux';

import TVChartContainer from './Chart';
import { tradeHistorySelector } from './utils';
import { setChartHigh } from 'actions/orderbookAction';

const ChartContainer = (props) => <TVChartContainer {...props} />;

const mapStateToProps = (state) => {
	const { data: tradeHistory } = tradeHistorySelector(state);

	return {
		tradeHistory,
		constants: state.app.constants,
	};
};

const mapDispatchToProps = (dispatch) => ({
	setChartHigh: bindActionCreators(setChartHigh, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(withConfig(ChartContainer));
