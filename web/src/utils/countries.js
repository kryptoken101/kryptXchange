// https://github.com/OpenBookPrices/country-data
import React from 'react';
import classnames from 'classnames';
import { countries } from 'country-data';
import STRINGS from '../config/localizedStrings';
import { DEFAULT_COUNTRY } from '../config/constants';

const convertCountry = (value = {}) => {
	return {
		value: value.alpha2,
		name: value.name,
		label: value.name,
		phoneCodes: value.countryCallingCodes,
		phoneCode: '', // Temporarily kept for compatibility purposes
		flag: (
			<span
				className={classnames(
					'flag-icon',
					`flag-icon-${value.alpha2.toLowerCase()}`,
					'icon'
				)}
			/>
		),
	};
};

const filterCountries = (country) =>
	country.status === 'assigned' && country.alpha2;

export const initialCountry = convertCountry(countries[DEFAULT_COUNTRY]);
export const NATIONAL_COUNTRY_VALUE = initialCountry.value;

export const COUNTRIES = countries.all
	.filter(filterCountries)
	.map(convertCountry);

export default COUNTRIES;

export const COUNTRIES_OPTIONS = COUNTRIES.map((country) => ({
	label: country.name,
	value: country.value,
	icon: country.flag,
}));

const getPhoneOptions = () => {
	const phoneOptions = [];

	COUNTRIES.forEach((country) => {
		country.phoneCodes.forEach((phoneCode) => {
			phoneOptions.push({
				label: STRINGS.formatString(
					STRINGS[
						'USER_VERIFICATION.USER_DOCUMENTATION_FORM.FORM_FIELDS.PHONE_CODE_DISPLAY'
					],
					phoneCode,
					country.name
				).join(''),
				value: phoneCode,
				icon: country.flag,
			});
		});
	});

	return phoneOptions;
};

export const PHONE_OPTIONS = getPhoneOptions();
