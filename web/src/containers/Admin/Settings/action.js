import { requestAuthenticated } from '../../../utils';

export const updatePlugins = (values) => {
	const options = {
		method: 'PUT',
		body: JSON.stringify(values),
	};
	return requestAuthenticated(`/admin/kit`, options);
};

export const getConstants = () => requestAuthenticated('/admin/kit');

export const getCompleteSetup = () =>
	requestAuthenticated('/admin/complete-setup');

export const updateTestEmail = (values) => {
	const options = {
		method: 'POST',
		body: JSON.stringify(values),
	};
	return requestAuthenticated('/admin/send-email-test', options);
};