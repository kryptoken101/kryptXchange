import React, { Component } from 'react';
import { SubmissionError } from 'redux-form';
import { uploadFiles } from './actions';
import { message as AntdMessage } from 'antd';

import { AdminHocForm } from '../../../components';

// import { isSupport } from '../../../utils';

const UploadForm = AdminHocForm('UPLOAD_FORM', 'verification-form');

const FORM_FIELDS = {
	type: {
		type: 'select',
		label: 'Type',
		options: [
			{ label: 'National Id', value: 'id' },
			{ label: 'Passport', value: 'passport' },
		],
	},
	number: {
		type: 'text',
		label: 'Document number',
		validate: [],
	},
	front: {
		type: 'file',
		label: 'Front',
		validate: [],
	},
	back: {
		type: 'file',
		label: 'Back',
		validate: [],
	},
	proof_of_residency: {
		type: 'file',
		label: 'Proof of Residence',
		validate: [],
	},
};

class UploadIds extends Component {
	onSubmit = (refreshData) => (values) => {
		return uploadFiles(this.props.user_id, values)
			.then(({ data }) => {
				if (data.data) {
					const imageFiles = ['back', 'front', 'proof_of_residency'];
					let updatedData = {};
					Object.keys(data.data).forEach(item => {
						if (imageFiles.includes(item)) {
							updatedData = {
								...updatedData,
								[item]: data.data[item]
							}
						}
					});
					refreshData(updatedData, 'files');
				}
				if (data.user) {
					refreshData(data.user);
				}
				this.props.closeUpload();
				AntdMessage.success('Files upload successfully', 5);
			})
			.catch((err) => {
				let message = err && err.data ? err.data.message : err.message;
				if (message && message.includes('404')) {
					message = 'Admin upload is not available';
				}
				AntdMessage.error(message, 5);
				throw new SubmissionError({ _error: message });
			});
	};

	render() {
		const { refreshData } = this.props;
		return (
			<div>
				<UploadForm
					fields={FORM_FIELDS}
					onSubmit={this.onSubmit(refreshData)}
					buttonText="Upload"
					buttonClass="green-btn"
				/>
			</div>
		);
	}
}
export default UploadIds;
