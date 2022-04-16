import { defineConfig } from 'windicss/helpers';
import typography from 'windicss/plugin/typography';

export default defineConfig({
	shortcuts: {
		row: 'flex flex-row',
		column: 'flex flex-col',
	},
	plugins: [typography()],
});
