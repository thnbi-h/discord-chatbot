module.exports = {
	env: {
		browser: true,
		commonjs: true,
		es2021: true,
	},
	extends: ["eslint:recommended", "plugin:node/recommended"],
	overrides: [
		{
			plugins: ["prettier"],
			files: ["*.ts", "*.tsx"],
		},
	],
	parserOptions: {
		ecmaVersion: "latest",
	},
	rules: {
		"prettier/prettier": "error",
	},
};
