import { defineComponent as k, getCurrentInstance as w, reactive as S, ref as O, onMounted as P, onUpdated as C, onBeforeUnmount as x, watch as A, h as E, onUnmounted as K } from "vue";
import u from "konva";
function _(a) {
  if (!u.autoDrawEnabled) {
    const o = a.getLayer() || a.getStage();
    o && o.batchDraw();
  }
}
const m = { key: !0, style: !0, elm: !0, isRootInsert: !0 }, N = ".vue-konva-event";
function T(a, o, n, c) {
  const e = a.__konvaNode, i = {};
  let t = !1;
  for (let r in n) {
    if (m.hasOwnProperty(r))
      continue;
    const d = r.slice(0, 2) === "on", v = n[r] !== o[r];
    if (d && v) {
      let s = r.slice(2).toLowerCase();
      s.slice(0, 7) === "content" && (s = "content" + s.slice(7, 1).toUpperCase() + s.slice(8)), e == null || e.off(s + N, n[r]);
    }
    !o.hasOwnProperty(r) && (e == null || e.setAttr(r, void 0));
  }
  for (let r in o) {
    if (m.hasOwnProperty(r))
      continue;
    let d = r.slice(0, 2) === "on";
    const v = n[r] !== o[r];
    if (d && v) {
      let f = r.slice(2).toLowerCase();
      f.slice(0, 7) === "content" && (f = "content" + f.slice(7, 1).toUpperCase() + f.slice(8)), o[r] && (e == null || e.off(f + N), e == null || e.on(f + N, o[r]));
    }
    !d && (o[r] !== n[r] || c && o[r] !== (e == null ? void 0 : e.getAttr(r))) && (t = !0, i[r] = o[r]);
  }
  t && e && (e.setAttrs(i), _(e));
}
const R = "v";
function M(a) {
  function o(n) {
    return n != null && n.__konvaNode ? n : n != null && n.parent ? o(n.parent) : (console.error("vue-konva error: Can not find parent node"), null);
  }
  return o(a.parent);
}
function L(a) {
  return a.component ? a.component.__konvaNode || L(a.component.subTree) : null;
}
function I(a) {
  const { el: o, component: n } = a, c = L(a);
  if (o != null && o.tagName && n && !c) {
    const e = o.tagName.toLowerCase();
    return console.error(
      `vue-konva error: You are trying to render "${e}" inside your component tree. Looks like it is not a Konva node. You can render only Konva components inside the Stage.`
    ), null;
  }
  return c;
}
function U(a) {
  const o = (e) => !!(e != null && e.hasOwnProperty("component")), n = (e) => Array.isArray(e), c = (e) => o(e) ? [e, ...c(e.children)] : n(e) ? e.flatMap(c) : [];
  return c(a.children);
}
function b(a, o) {
  const n = U(a), c = [];
  n.forEach((i) => {
    const t = I(i);
    t && c.push(t);
  });
  let e = !1;
  c.forEach((i, t) => {
    i.getZIndex() !== t && (i.setZIndex(t), e = !0);
  }), e && _(o);
}
const j = k({
  name: "Stage",
  props: {
    config: {
      type: Object,
      default: function() {
        return {};
      }
    },
    __useStrictMode: {
      type: Boolean
    }
  },
  inheritAttrs: !1,
  setup(a, { attrs: o, slots: n, expose: c }) {
    const e = w();
    if (!e)
      return;
    const i = S({}), t = O(null), r = new u.Stage({
      width: a.config.width,
      height: a.config.height,
      container: document.createElement("div")
      // Fake container. Will be replaced
    });
    e.__konvaNode = r, f();
    function d() {
      return e == null ? void 0 : e.__konvaNode;
    }
    function v() {
      return e == null ? void 0 : e.__konvaNode;
    }
    function f() {
      if (!e)
        return;
      const s = i || {}, g = {
        ...o,
        ...a.config
      };
      T(e, g, s, a.__useStrictMode), Object.assign(i, g);
    }
    return P(() => {
      t.value && (t.value.innerHTML = "", r.container(t.value)), f();
    }), C(() => {
      f(), b(e.subTree, r);
    }), x(() => {
      r.destroy();
    }), A(() => a.config, f, { deep: !0 }), c({
      getStage: v,
      getNode: d
    }), () => {
      var s;
      return E("div", { ref: t }, (s = n.default) == null ? void 0 : s.call(n));
    };
  }
}), V = ".vue-konva-event", F = {
  Group: !0,
  Layer: !0,
  FastLayer: !0,
  Label: !0
};
function G(a, o) {
  return k({
    name: a,
    props: {
      config: {
        type: Object,
        default: function() {
          return {};
        }
      },
      __useStrictMode: {
        type: Boolean
      }
    },
    setup(n, { attrs: c, slots: e, expose: i }) {
      const t = w();
      if (!t)
        return;
      const r = S({}), d = new o();
      t.__konvaNode = d, t.vnode.__konvaNode = d, s();
      function v() {
        return t == null ? void 0 : t.__konvaNode;
      }
      function f() {
        return t == null ? void 0 : t.__konvaNode;
      }
      function s() {
        if (!t)
          return;
        const l = {};
        for (const h in t == null ? void 0 : t.vnode.props)
          h.slice(0, 2) === "on" && (l[h] = t.vnode.props[h]);
        const p = r || {}, y = {
          ...c,
          ...n.config,
          ...l
        };
        T(t, y, p, n.__useStrictMode), Object.assign(r, y);
      }
      P(() => {
        var p;
        const l = (p = M(t)) == null ? void 0 : p.__konvaNode;
        l && "add" in l && l.add(d), _(d);
      }), K(() => {
        _(d), d.destroy(), d.off(V);
      }), C(() => {
        s(), b(t.subTree, d);
      }), A(() => n.config, s, { deep: !0 }), i({
        getStage: f,
        getNode: v
      });
      const g = F.hasOwnProperty(a);
      return () => {
        var l;
        return g ? E("template", {}, (l = e.default) == null ? void 0 : l.call(e)) : null;
      };
    }
  });
}
typeof window < "u" && !window.Konva && require("konva");
const D = {
  install: (a, o) => {
    const n = (o == null ? void 0 : o.prefix) || R, c = {
      Arc: u.Arc,
      Arrow: u.Arrow,
      Circle: u.Circle,
      Ellipse: u.Ellipse,
      FastLayer: u.FastLayer,
      Group: u.Group,
      Image: u.Image,
      Label: u.Label,
      Layer: u.Layer,
      Line: u.Line,
      Path: u.Path,
      Rect: u.Rect,
      RegularPolygon: u.RegularPolygon,
      Ring: u.Ring,
      Shape: u.Shape,
      Sprite: u.Sprite,
      Star: u.Star,
      Tag: u.Tag,
      Text: u.Text,
      TextPath: u.TextPath,
      Transformer: u.Transformer,
      Wedge: u.Wedge,
      ...o == null ? void 0 : o.customNodes
    };
    [
      j,
      ...Object.entries(c).map(
        ([i, t]) => G(i, t)
      )
    ].forEach((i) => {
      a.component(`${n}${i.name}`, i);
    });
  }
};
export {
  D as default
};
