import { Rule } from 'css';
import { IAttr, ISelector } from 'svg-vdom';

// 选择器权重
export interface ISeletorPriority {
	id: number;
	class: number;
	tag: number;
}

export interface IStyleObj {
	[propName: string]: {
		value: string;
		from: 'attr' | 'styletag' | 'inline' | 'inherit';
		selector?: ISelector[];
		selectorPriority?: ISeletorPriority;
		important?: boolean;
		override?: boolean;
		statusPseudo?: boolean;
		overrideList: Array<{
			from: 'styletag';
			selector: ISelector[];
			selectorPriority: ISeletorPriority;
			important?: boolean;
			value: string;
		} | {
			from: 'inline';
			value: string;
		}>;
	};
}

// 在 shorten-class 和 shorten-id 中会用到，通过设置 ruleId 属性来排重
export interface IExtendRule extends Rule {
	ruleId?: number;
}

export interface IStyleAttr extends IAttr {
	important?: boolean;
}

