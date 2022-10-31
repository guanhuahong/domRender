(function (w) {
    /**
     * Render Dom
     * @param {string|HTMLElement} element 
     * @param {ElementAttr} config 
     * @param {HTMLElement|HTMLElement[]} childern 
     */
    const render = (/* string|HTMLElement */element, config, /* HTMLElement|HTMLElement[] */childern) => {
        if(typeof element === 'string') {
            element = parseTarget(element)
        } else if (element instanceof HTMLElement) {
            // nothing to do
        } else {
            throw new Error("Render Error: element 必须是<string>类型或者<HTMLElement>'s node");
        }

        for (const key in config) {
            if (Object.hasOwnProperty.call(config, key)) {
                const value = config[key];
                if (key.indexOf('on') === 0 && typeof value === 'function') {
                    element.addEventListener(key.slice(1), value)
                } else if (key === 'style' && typeof value === 'object') {
                    for (const styleName in value) {
                        if (Object.hasOwnProperty.call(value, styleName)) {
                            const style = value[styleName];
                            element.style.setProperty(styleName, style)
                        }
                    }
                } else {
                    element.setAttribute(key, value)
                }
            }
        }
        return element
    }

    /**
     * 
     * @param {string} target 
     *      eg: div
     *      eg: div#id
     *      eg: div#id.class
     *      eg: div.class.class2
     *      eg: #id
     *      eg: .class
     *      eg: #id.class
     */
    const parseTarget = (target) => {
        // 只有target
        if (target.indexOf('#') === -1 && target.indexOf('.') === -1) {
            return document.createElement(target)
        }

        // 获取NodeName
        let nodeName = 'div'
        const nodeNameMatch = target.match(/^[a-z]+/i)
        if (nodeNameMatch.length > 0) nodeName = nodeNameMatch[0]
        
        let dom = document.createElement(target)

        // 获取ID
        let ID = ''
        const IDMatch = target.match(/#([a-z][a-z0-9\-_]*)/i)
        if (IDMatch !== null) {
            ID = IDMatch[0]
            dom.setAttribute('id', ID)
        }

        // 获取classList
        let classes = []
        const classesMatch = target.match(/\.([a-z][a-z0-9\-_]*)/ig)
        if (classesMatch !== null) {
            classes = classesMatch.map(c => c.slice(1))
            dom.classList.add(...classes)
        }
        return dom
    }

    window.render = render
}(window))