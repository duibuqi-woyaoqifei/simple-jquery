class Jquery {
  constructor(nodeSelector) {
    this.nodeSelector = nodeSelector;
    this.nodes = document.querySelectorAll(nodeSelector);
  }

  addClass(nodeClass) {
    nodeClass.split(" ").forEach((item) => {
      this.each((obj) => {
        obj.classList.add(item);
      });
    });
    return this;
  }
  append(html) {
    this.each((obj) => {
      obj.innerHTML += html;
    });
    return this;
  }
  bind(type, callback) {
    this.each((obj) => {
      obj.addEventListener(type, callback);
    });
  }
  children() {
    let children = [];
    this.each((obj) => {
      children.push(...obj.children);
    });
    this.nodeSelector += ">[children]";
    this.nodes = children;
    return this;
  }
  click(callback) {
    this.each((obj) => {
      obj.onclick = callback;
    });
  }
  css(propName, value) {
    this.each((obj) => {
      console.log(obj.style);
      obj.style = `${propName}: ${value}`;
    });
    return this;
  }
  each(callback) {
    this.nodes.forEach((item, index) => {
      callback(item, index);
    });
  }
  empty() {
    this.each((obj) => {
      obj.innerHTML = "";
    });
    return this;
  }
  eq(n) {
    const node = this.nodes[n - 1];
    this.nodeSelector += `:nth-child(${n})`;
    this.nodes = node;
    return this;
  }
  filter(condition = "") {
    const nodes = document.querySelectorAll(this.nodeSelector + condition);
    const c = condition === "" ? "*" : condition;
    this.nodeSelector += "~" + c;
    this.nodes = nodes;
    return this;
  }
  find(nodeSelector) {
    let nodeList = [];
    this.each((obj) => {
      obj.querySelectorAll(nodeSelector).forEach((item) => {
        nodeList.push(item);
      });
    });

    this.nodeSelector += " " + nodeSelector;
    this.nodes = nodeList;
    return this;
  }
  focus(callback) {
    this.each((obj) => {
      obj.onfocus = callback;
    });
  }
  hide(callback = null) {
    this.each((obj) => {
      obj.style = "display:none";
    });
    if (callback) {
      callback();
    }
  }
  html(html = null) {
    if (html === null) return this.nodes[0].innerHTML;
    this.each((obj) => {
      obj.innerHTML = html;
    });
    return this;
  }
  mouseover(callback) {
    this.each((obj) => {
      obj.onmouseover = callback;
    });
  }
  not(condition = "") {
    const nodes = document.querySelectorAll(this.nodeSelector + condition);
    let allNodes = [...this.nodes];
    nodes.forEach((item) => {
      allNodes.splice(allNodes.indexOf(item), 1);
    });

    this.nodeSelector += " [not]" + condition;
    this.nodes = allNodes;
    return this;
  }
  parent() {
    return this.nodes[0].parentElement;
  }
  prepend(html) {
    this.each((obj) => {
      const h = obj.innerHTML;
      obj.innerHTML = html + h;
    });
    return this;
  }
  remove() {
    let el;
    this.each((obj) => {
      el = obj;
      el.remove();
    });
  }
  removeClass(className) {
    this.each((obj) => {
      obj.classList.remove(className);
    });
    return this;
  }
  show(callback = null) {
    this.each((obj) => {
      obj.style = "display:block";
    });
    if (callback) {
      callback();
    }
    return this;
  }
  siblings() {
    const node = this.nodes[0];
    const nodes = [...node.parentNode.children];
    nodes.splice(nodes.indexOf(node), 1);
    this.nodeSelector += "[siblings]";
    this.nodes = nodes;
    return this;
  }
  text(text = null) {
    if (text === null) return this.nodes[0].textContent;
    this.each((obj) => {
      obj.textContent = text;
    });
    return this;
  }
  toggle() {
    this.each((obj) => {
      if (obj.style.display !== "" || obj.style.display !== "none") {
        obj.style = "display:none";
      } else {
        obj.style = "display:block";
      }
    });
    return this;
  }
  val(value = null) {
    if (value || value === "") {
      this.each((obj) => {
        if (typeof value === "string") {
          obj.value = value;
        }
        if (typeof value === "function") {
          obj.value = value();
        }
      });
    } else {
      return this.nodes[0].value;
    }
  }
}

const $ = (nodeSelector) => {
  return new Jquery(nodeSelector);
};

$.req = (options, callback) => {
  let xhr = new XMLHttpRequest();
  xhr.open(options.method, options.url, true);
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
  xhr.send("data=" + JSON.stringify(options.params));
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      if (callback) {
        const resData = JSON.parse(xhr.responseText);
        callback(resData);
      }
    }
  };
};
$.get = (url, callback) => {
  $.req(
    {
      method: "GET",
      url,
      params: "",
    },
    callback
  );
};
$.post = (url, data = "", callback) => {
  $.req(
    {
      method: "POST",
      url,
      params: data,
    },
    callback
  );
};
