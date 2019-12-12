import { propEq } from 'ramda';
import { douglasPeucker } from '../algorithm/douglas-peucker';
import { plus } from '../math/plus';
import { doCompute } from '../path/do-compute';
import { execPath } from '../path/exec';
import { traversalNode } from '../xml/traversal-node';
import { stringifyPath } from '../path/stringify';
import { rmNode } from '../xml/rm-node';

const DPItemNormalize = (pathItem: IPathResultItem): IPathResultItem => {
	switch (pathItem.type) {
		case 'l':
			pathItem.val[0] = plus(pathItem.val[0], pathItem.from[0]);
			pathItem.val[1] = plus(pathItem.val[1], pathItem.from[1]);
			break;
		case 'H':
			pathItem.val.push(pathItem.from[1]);
			break;
		case 'h':
			pathItem.val[0] = plus(pathItem.val[0], pathItem.from[0]);
			pathItem.val.push(pathItem.from[1]);
			break;
		case 'V':
			pathItem.val.unshift(pathItem.from[0]);
			break;
		case 'v':
			pathItem.val.unshift(pathItem.from[0]);
			pathItem.val[1] = plus(pathItem.val[1], pathItem.from[1]);
			break;
		default:
			break;
	}
	pathItem.type = 'L';
	return pathItem;
};

const DPItemMerge = (lastItem: IPathResultItem, pathItem: IPathResultItem): void => {
	lastItem.val = lastItem.val.concat(DPItemNormalize(pathItem).val);
};

// 道格拉斯普克只支持直线类型
const DPAvailTypes = 'LlHhVv';

const DPInit = (threshold: number, pathArr: IPathResultItem[]): IPathResultItem[] => {
	const pathResult: IPathResultItem[] = [];
	let len = 0;
	for (let i = 0, l = pathArr.length; i < l; i++) {
		const pathItem = pathArr[i];
		if (DPAvailTypes.indexOf(pathItem.type) !== -1) {
			const lastItem = pathResult[len - 1];
			if (lastItem.type === 'L') {
				DPItemMerge(lastItem, pathItem);
			} else {
				pathResult.push(DPItemNormalize(pathItem));
				len++;
			}
		} else {
			if (len > 0 && pathResult[len - 1].type === 'L') {
				const lastItem = pathResult[len - 1];
				lastItem.val = douglasPeucker(threshold, lastItem.from.concat(lastItem.val)).slice(2);
			}
			pathResult.push(pathItem);
			len++;
		}
	}
	if (pathResult[len - 1].type === 'L') {
		const lastItem = pathResult[len - 1];
		lastItem.val = douglasPeucker(threshold, lastItem.from.concat(lastItem.val)).slice(2);
	}
	return pathResult;
};

const PATH_CONFIG_DIGIT_1 = 3;
const PATH_CONFIG_DIGIT_2 = 4;

export const computePath = async (rule: TConfigItem[], dom: INode): Promise<null> => new Promise((resolve, reject) => {
	if (rule[0]) {
		traversalNode<ITagNode>(propEq('nodeName', 'path'), node => {
			const attrD = node.getAttribute('d');
			if (attrD) {
				let pathResult = doCompute(execPath(attrD));

				// 如果存在道格拉斯 - 普克规则，则执行道格拉斯普克算法，之后需要再次更新
				if (rule[1] && rule[2]) {
					pathResult = doCompute(DPInit(rule[2] as number, pathResult));
				}

				// 移除掉末尾无意义的 m 指令
				while (pathResult.length && pathResult[pathResult.length - 1].type.toLowerCase() === 'm') {
					pathResult.pop();
				}

				if (!pathResult.length) {
					rmNode(node);
					return;
				}

				node.setAttribute('d', stringifyPath(pathResult, rule[PATH_CONFIG_DIGIT_1] as number, rule[PATH_CONFIG_DIGIT_2] as number));
			} else {
				rmNode(node);
			}

		}, dom);
	}
	resolve();
});
