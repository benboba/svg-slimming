// elements group
export const animationElements = ['animate', 'animateMotion', 'animateTransform', 'discard', 'set'];
export const animationAttrElements = ['animate', 'animateTransform', 'set'];
export const descriptiveElements = ['desc', 'metadata', 'title'];
export const gradientElements = ['linearGradient', 'radialGradient'];
export const filterPrimitiveElements = ['feBlend', 'feColorMatrix', 'feComponentTransfer', 'feComposite', 'feConvolveMatrix', 'feDiffuseLighting', 'feDisplacementMap', 'feDropShadow', 'feFlood', 'feGaussianBlur', 'feImage', 'feMerge', 'feMorphology', 'feOffset', 'feSpecularLighting', 'feTile', 'feTurbulence'];
export const transferFunctionElements = ['feFuncR', 'feFuncG', 'feFuncB', 'feFuncA'];
export const lightSourceElements = ['feDistantLight', 'fePointLight', 'feSpotLight'];
export const paintServerElements = ['solidcolor', 'linearGradient', 'radialGradient', 'meshgradient', 'pattern', 'hatch'];
export const shapeElements = ['circle', 'ellipse', 'line', 'path', 'polygon', 'polyline', 'rect'];
export const structuralElements = ['defs', 'g', 'svg', 'symbol', 'use'];
export const textContentChildElements = ['tspan', 'textPath'];
export const textContentElements = ['text'].concat(textContentChildElements);
export const graphicsElements = ['audio', 'canvas', 'circle', 'ellipse', 'foreignObject', 'iframe', 'image', 'line', 'mesh', 'path', 'polygon', 'polyline', 'rect', 'text', 'textPath', 'tspan', 'video'];
export const containerElements = ['a', 'clipPath', 'defs', 'g', 'marker', 'mask', 'pattern', 'svg', 'switch', 'symbol', 'unknown'];
export const newViewportsElements = ['svg', 'symbol', 'foreignObject', 'video', 'audio', 'canvas', 'image', 'iframe'];
export const unnecessaryElements = ['desc', 'discard', 'foreignObject', 'video', 'audio', 'iframe', 'canvas', 'metadata', 'script', 'style', 'title', 'unknown', 'image'];
export const geometryElements = ['circle', 'ellipse', 'rect', 'image', 'foreignObject', 'svg'];

// attributes group
// https://www.w3.org/TR/SVG2/interact.html#EventAttributes
export const eventAttributes = ['onabort', 'onafterprint', 'onbeforeprint', 'onbegin', 'oncancel', 'oncanplay', 'oncanplaythrough', 'onchange', 'onclick', 'onclose', 'oncuechange', 'ondblclick', 'ondrag', 'ondragend', 'ondragenter', 'ondragexit', 'ondragleave', 'ondragover', 'ondragstart', 'ondrop', 'ondurationchange', 'onemptied', 'onend', 'onended', 'onerror', 'onerror', 'onfocus', 'onfocusin', 'onfocusout', 'onhashchange', 'oninput', 'oninvalid', 'onkeydown', 'onkeypress', 'onkeyup', 'onload', 'onloadeddata', 'onloadedmetadata', 'onloadstart', 'onmessage', 'onmousedown', 'onmouseenter', 'onmouseleave', 'onmousemove', 'onmouseout', 'onmouseover', 'onmouseup', 'onmousewheel', 'onoffline', 'ononline', 'onpagehide', 'onpageshow', 'onpause', 'onplay', 'onplaying', 'onpopstate', 'onprogress', 'onratechange', 'onrepeat', 'onreset', 'onresize', 'onresize', 'onscroll', 'onscroll', 'onseeked', 'onseeking', 'onselect', 'onshow', 'onstalled', 'onstorage', 'onsubmit', 'onsuspend', 'ontimeupdate', 'ontoggle', 'onunload', 'onunload', 'onvolumechange', 'onwaiting'];
// https://www.w3.org/TR/wai-aria-1.1/#aria-activedescendant
export const ariaAttributes = ['aria-activedescendant', 'aria-atomic', 'aria-busy', 'aria-checked', 'aria-colcount', 'aria-colindex', 'aria-colspan', 'aria-controls', 'aria-current', 'aria-describedby', 'aria-details', 'aria-disabled', 'aria-dropeffect', 'aria-errormessage', 'aria-expanded', 'aria-flowto', 'aria-grabbed', 'aria-haspopup', 'aria-hidden', 'aria-invalid', 'aria-keyshortcuts', 'aria-label', 'aria-labelledby', 'aria-level', 'aria-live', 'aria-modal', 'aria-multiline', 'aria-multiselectable', 'aria-orientation', 'aria-owns', 'aria-placeholder', 'aria-posinset', 'aria-pressed', 'aria-readonly', 'aria-relevant', 'aria-required', 'aria-roledescription', 'aria-rowcount', 'aria-rowindex', 'aria-rowspan', 'aria-selected', 'aria-setsize', 'aria-sort', 'aria-valuemax', 'aria-valuemin', 'aria-valuenow', 'aria-valuetext', 'role'];
export const animationAttributes = ['from', 'to', 'by', 'values'];
export const transformAttributes = ['gradientTransform', 'patternTransform', 'transform'];
export const cantCollapseAttributes = ['id', 'class', 'mask', 'style'];
export const conditionalProcessingAttributes = ['requiredExtensions', 'systemLanguage'];
export const coreAttributes = ['id', 'tabindex', 'lang', 'xml:space', 'class', 'style', 'transform'];
export const deprecatedXlinkAttributes = ['xlink:href', 'xlink:title'];
export const animationAdditionAttributes = ['additive', 'accumulate'];
export const animationTimingAttributes = ['begin', 'dur', 'end', 'min', 'max', 'restart', 'repeatCount', 'repeatDur', 'fill'];
export const animationValueAttributes = ['calcMode', 'values', 'keyTimes', 'keySplines', 'from', 'to', 'by'];
export const rectAttributes = ['x', 'y', 'width', 'height'];
export const transferFunctionElementAttributes = ['type', 'tableValues', 'slope', 'intercept', 'amplitude', 'exponent', 'offset'];
export const geometryProperties = rectAttributes.concat(['cx', 'cy', 'r', 'rx', 'ry']);

// 部分 key，在作为属性时可以省略 px 单位，在 css 中不能省略
export const needUnitInStyle = ['font-size', 'letter-spacing', 'word-spacing'];

// 这些伪类和伪元素只是在某些状态下生效，在解析样式树时要标出来
export const statusPseudoClass = ['target', 'link', 'visited', 'hover', 'active', 'focus'];
export const statusPseudoElement = ['first-letter', 'first-line', 'selection'];
