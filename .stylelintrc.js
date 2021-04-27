module.exports = {
	extends: [
		'stylelint-config-sass-guidelines',
		'stylelint-config-prettier',
		'stylelint-config-standard',
	],
	rules: {
		indentation: 'tab',
		'max-nesting-depth': 2,
		'number-leading-zero': 'always',
		'at-rule-no-unknown': null,
		'scss/at-rule-no-unknown': null,
		'declaration-block-trailing-semicolon': null,
		'no-descending-specificity': null,
		'declaration-empty-line-before': null,
		'value-list-comma-newline-after': null,
		'declaration-colon-newline-after': null,
	},
	exclude: ['./assets/main.scss'],
}
