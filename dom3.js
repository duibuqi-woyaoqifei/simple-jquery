let $ = jQuery = (function (window) {
  // dom集合存储，生成jquery对象
  function Query(dom, selector) {
    let i, len = dom ? dom.length : 0
    for (i = 0; i < len; i++) {
      this[i] = dom[i]
    }
    this['length'] = len
    this['selector'] = selector || ''
    return this
  }
  
  // Z原型链
  function Z(elements, selector) {
    return Query.call(this,elements,selector)
  }

  // dom查找
  function qsa(element, selector) {
    return element.querySelectorAll(selector)
  }

  Z.prototype = {
    each(callback) {
      [].every.call(this, function (el, index) {
        return callback.call(el,index,el) !== false
      })
    },
    find(selector) {
      let doms = []
      this.each(function (index, el) {
        let childs = this.querySelectorAll(selector)
        doms.push(...childs)
      })
      return new Z(doms,selector)
    },
    addClass(nodeClass) {
      let classList = nodeClass.split(' ')
      classList.forEach(item => {
        this.each(function (index, el) {
          el.classList.add(item)
        })
      });
      return this
    },
    eq(i) {
      let doms = []
      this.each(function (index, el) {
        if (i === index) {
          doms.push(this)
        }
      })
      return new Z(doms,this.selector)
    },
    remove() {
      this.each(function (index, el) {
        this.remove()
      })
    }
  }

  // 全局方法
  function isFunction(value) {
    return typeof value === 'function'
  }
  $.isFunction = isFunction

  function $(nodeSelector) {
    let doms = qsa(document, nodeSelector)
    return new Z(doms,nodeSelector)
  }

  return $
})(window)