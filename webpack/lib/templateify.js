function templateify(nodes) {
    let str = childrenTemplate(nodes.children)
    return `<view name="html-view-nodes">${str}</view>`
}
function childrenTemplate(childrenNodes) {
    let str = ''
    debugger;
    childrenNodes.map((item, index) => {
        let {
            type = ''
        } = item
        let text = '',
            view = ''

        if (type === 'Text') {
            text = `${item.content}`
            str = `${text}`
        } else {
            view = viewTemplate(item)
            str += `${view}`
        }

    })
    return str
}
function viewTemplate(item) {
    let {
        children = []
    } = item
    let str = `${item.wxTag !== 'text' ? 
                `<${item.wxTag} ${item.attrStr}>
                    ${children.length >0 ? childrenTemplate(item.children):''}
                </${item.wxTag}>` :''} 
                ${item.wxTag === 'text' ? 
                `<text  ${item.attrStr}>
                    ${children.length >0 ? childrenTemplate(item.children):''}
                </text>` :''} `
    return str
}

module.exports = templateify