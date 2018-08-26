export const MUSTACHE_TAG_REG = /\{\{\s*?(\S+)\s*?\}\}/

export const isNodeElement = node => node.nodeType === 1
export const isNodeText = node => node.nodeType === 3
export const isMustacheTagText = text => MUSTACHE_TAG_REG.test(text)
export const isObject = obj => obj !== null && typeof obj === 'object'
