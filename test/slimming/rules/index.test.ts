const chai = require('chai');
const should = chai.should();
import { combineStyle } from '../../../src/slimming/default-rules/combine-style';
import { rmIrregularTag } from '../../../src/slimming/rules/rm-irregular-tag';
import { rmPx } from '../../../src/slimming/rules/rm-px';
import { rmUnnecessary } from '../../../src/slimming/rules/rm-unnecessary';
import { createXML } from '../../../src/slimming/xml/create';
import { parse } from '../../../src/xml-parser';

describe('rules/覆盖率补齐', () => {
	it('rm-irregular-tag', async () => {
		const xml = '<svg><undef/><def/></svg>';
		const dom = await parse(xml) as IDomNode;
		await rmIrregularTag(dom, { option: { ignore: ['def'] } });
		createXML(dom).should.equal('<svg><def/></svg>');
	});

	it('rm-unnecessary', async () => {
		const xml = '<svg><title/></svg>';
		const dom = await parse(xml) as IDomNode;
		await rmUnnecessary(dom, { option: { tags: [] } });
		createXML(dom).should.equal('<svg><title/></svg>');
	});

	it('rm-px', async () => {
		const xml = '<svg width="1000px" viewBox="0 0 1000 800" version="1.1" style="height:800px"><style>rect {height: 20px}</style><rect width="0em" style="height:0pt;fill:red" id="r;1px"/></svg>';
		const dom = await parse(xml) as IDomNode;
		await combineStyle(dom);
		await rmPx(dom);
		createXML(dom).should.equal('<svg width="1000" viewBox="0 0 1000 800" version="1.1" style="height:800"><style>rect{height:20}</style><rect width="0" style="height:0;fill:red" id="r;1px"/></svg>');
	});
});
