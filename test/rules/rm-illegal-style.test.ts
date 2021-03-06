import { parse } from 'svg-vdom';
import { createRuleConfig } from '../../src/config/create-rule-config';
import { mergeConfig } from '../../src/config/merge';
import { combineStyle } from '../../src/default-rules/combine-style';
import { rmIllegalStyle } from '../../src/rules/rm-illegal-style';
import { createXML } from '../../src/xml/create';

describe('rules/rm-illegal-style', () => {
	test('缩短 style 元素', async () => {
		const xml = `<svg>
		<style>
		@charset 'utf-8';
		/* comment */
		@import ('test.css');
		@keyframes empty {
		}
		@font-face {
		}
		@media empty {
		}
		@keyframes test {
			100% {
				fill: blue;
			}
		}
		@media test {
			text::before {
				amplitude: 0;
				fill:green;
			}
		}
		#redText {
			/* hahaha */
			fill: red;
			fill: blue;
			fill: yellow;
			flex-rap: wrap;
			letter-spacing:1.23;
		}
		text[id^=red] {
			fill: red;
			fill: blue;
			fill: yellow;
			flex-rap: wrap;
		}
		a::first-letter {
			fill:blue;
		}
		</style>
		<a><text id="redText" style="letter-spacing:1.23">123</text></a>
		</svg>`;
		const dom = await parse(xml);
		await combineStyle(dom);
		const config = createRuleConfig(mergeConfig({
			rules: {
				'shorten-style-tag': [true],
			},
			params: {
				rmAttrEqDefault: false,
			},
		}), 'shorten-style-tag');
		await rmIllegalStyle(dom, config);
		expect(createXML(dom).replace(/>\s+</g, '><')).toBe('<svg><style>@charset \'utf-8\';@import (\'test.css\');@keyframes test{100%{fill:blue}}@media test{text::before{fill:green}}#redText{fill:yellow}text[id^=red]{fill:yellow}a::first-letter{fill:blue}</style><a><text id="redText">123</text></a></svg>');
	});

	test('移除默认值', async () => {
		const xml = `<svg>
		<style>
		rect {
			fill-opacity: 1;
		}
		</style>
		<rect/>
		</svg>`;
		const dom = await parse(xml);
		await combineStyle(dom);
		const config = createRuleConfig(mergeConfig(null), 'rm-illegal-style');
		await rmIllegalStyle(dom, config);
		expect(createXML(dom).replace(/>\s+</g, '><')).toBe('<svg><rect/></svg>');
	});

	test('ignore known css', async () => {
		const xml = `<svg>
		<style>
		rect {
			text-align: center;
		}
		</style>
		<rect style="fill:black;flex-grow:1"/>
		</svg>`;
		const dom = await parse(xml);
		await combineStyle(dom);
		const config = createRuleConfig(mergeConfig({
			params: {
				ignoreKnownCSS: true,
				rmAttrEqDefault: false,
			}
		}), 'rm-illegal-style');
		await rmIllegalStyle(dom, config);
		expect(createXML(dom).replace(/>\s+</g, '><')).toBe('<svg><rect style="fill:black"/></svg>');
	});
});
