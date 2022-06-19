export const generateGlobalId = (pluginName = 'UNKNOWN_PLUGIN') => (
	key = 'UNKNOWN_KEY'
) => `RC_${pluginName.toUpperCase()}_${key.toUpperCase()}`;

export const generateDynamicTarget = (
	pluginName = 'UNKNOWN_PLUGIN',
	type = 'page',
	subType = ''
) => {
	const name = pluginName.toUpperCase();
	const sub = subType.toUpperCase();
	switch (type) {
		case 'verification':
			return `REMOTE_VERIFICATION_TAB__${name}__${sub}`;
		case 'page':
			return `REMOTE_ROUTE__${name}`;
		default:
			return `UNKNOWN_DYNAMIC_TARGET_${name}`;
	}
};

export const generateFiatWalletTarget = (type = '', currency = '') => {
	switch (type) {
		case 'deposit':
			return `REMOTE_COMPONENT__FIAT_WALLET_DEPOSIT__${currency.toUpperCase()}`;
		case 'withdraw':
			return `REMOTE_COMPONENT__FIAT_WALLET_WITHDRAW__${currency.toUpperCase()}`;
		default:
			return `UNKNOWN_FIAT_WALLET_TARGET_${type.toUpperCase()}`;
	}
};

export const globalize = (name) => ({ is_global, id }) => {
	return is_global ? id : generateGlobalId(name)(id);
};
