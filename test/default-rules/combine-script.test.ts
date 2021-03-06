import { combineScript } from '../../src/default-rules/combine-script';
import { createXML } from '../../src/xml/create';
import { parse } from 'svg-vdom';

describe('default-rules/combine-script', () => {
	test('合并 script 标签', async () => {
		const xml = '<svg><style >#id{fill:red}</style><script >console.log(1)</script><g><style>.class{fill:blue}</style><script>console.log(2);</script></g><script >console.log(3)</script></svg>';
		const dom = await parse(xml);
		await combineScript(dom);
		expect(createXML(dom)).toBe('<svg><style>#id{fill:red}</style><g><style>.class{fill:blue}</style></g><script>console.log(1);console.log(2);console.log(3)</script></svg>');
	});

	test('CDATA 分支', async () => {
		const xml = '<svg><style >#id{fill:red}</style><script >console.log(1)</script><g><style>.class{fill:blue}</style><script><![CDATA[a < b;]]></script></g></svg>';
		const dom = await parse(xml);
		await combineScript(dom);
		expect(createXML(dom)).toBe('<svg><style>#id{fill:red}</style><g><style>.class{fill:blue}</style></g><script><![CDATA[console.log(1);a < b]]></script></svg>');
	});

	test('移除非文本子节点 && 移除空 script 标签 && 移除非法 type', async () => {
		const xml = '<svg><script type="template">{{=item.title}}</script><style >#id{fill:red}</style><script ><b>123</b></script><g><style>.class{fill:blue}</style><script><![CDATA[]]></script></g></svg>';
		const dom = await parse(xml);
		await combineScript(dom);
		expect(createXML(dom)).toBe('<svg><style>#id{fill:red}</style><g><style>.class{fill:blue}</style></g></svg>');
	});
});
