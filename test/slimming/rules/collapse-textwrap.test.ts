const chai = require('chai');
const should = chai.should();
import { collapseTextwrap } from '../../../src/slimming/rules/collapse-textwrap';
import { createXML } from '../../../src/slimming/xml/create';
import { parse } from '../../../src/xml-parser';
import { IDomNode } from '../../../typings/node';

describe('rules/collapse-textwrap', () => {
	it('塌陷文本容器', async () => {
		const xml = '<svg><text><tspan>1</tspan></text><text><tspan tx="1">2</tspan></text><text><tspan tx="">3</tspan></text></svg>';
		const dom = await parse(xml) as IDomNode;
		await collapseTextwrap(dom);
		createXML(dom).should.equal('<svg><text>1</text><text><tspan tx="1">2</tspan></text><text>3</text></svg>');
	});
});
