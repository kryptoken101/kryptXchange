'use strict';

const TABLE = 'Users';
const COLUMN = 'last_name';

module.exports = {
	up: (queryInterface, Sequelize) =>
		queryInterface.removeColumn(TABLE, COLUMN),
	down: (queryInterface, Sequelize) =>
		queryInterface.addColumn(TABLE, COLUMN, {
			type: Sequelize.STRING,
			defaultValue: ''
		})
};