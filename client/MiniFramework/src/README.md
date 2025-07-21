# 🛠️ Mini-Framework JavaScript Documentation

## 📚 Introduction

Ce mini-framework JavaScript a été conçu pour offrir une abstraction simple du DOM, une gestion d'état réactive, un système de routage léger et une gestion centralisée des événements — le tout sans dépendance externe.

Il respecte le principe fondamental d’un framework : **l’inversion de contrôle**. C’est le framework qui appelle votre code, pas l’inverse.

---

## 📂 Project Structure

```
mini-framework/
├── app/
│   ├── dom.js          # Virtual DOM implementation
│   ├── events.js       # Event delegation system
│   ├── router.js       # Hash-based routing
│   └── state.js        # State management
├── src/
│   ├── index.html      # Main HTML file
│   ├── index.css       # Styles
│   └── main.js         # TodoMVC using the framework
├── README.md           # Documentation
```

---

## 🌐 Features Overview

### ✅ DOM Abstraction (`dom.js`)
- `createElement(tag, props, ...children)` : Crée un arbre d'éléments virtuels.
- `render(vnode, container)` : Rend dans le DOM réel.
- `diff(oldVNode, newVNode)` : Compare deux arbres virtuels.
- `patch(container, patches)` : Applique uniquement les changements nécessaires.

### ✅ State Management (`state.js`)
- `useState(initialValue)` : Gère l’état local dans un composant.
- `StoreState(initialState)` : Gère l’état global partagé.
- `store.subscribe({ update: callback })` : Abonne un composant au changement d'état.

### ✅ Routing System (`router.js`)
- Gère les routes via `location.hash`.
- `Router(defaultPath, defaultView, notFoundView, rootElement)`
- `AddPath(path, viewFn)` : Ajoute des routes.

### ✅ Event Handling (`events.js`)
- `eventManager.addevent(type, selector, callback)`
- Délégation via `document` (meilleure performance).
- Prend en charge `click`, `change`, `keydown`, etc.

---

## 🧪 Code Examples

### 🔧 Create an Element

```javascript
const el = createElement(
  "div",
  { class: "box" },
  createElement("h1", {}, "Hello"),
  createElement("button", { class: "btn" }, "Click me")
);
```

### 🔗 Nest Elements

```javascript
const nested = createElement(
  "section",
  {},
  createElement("div", { class: "inner" }, "Content")
);
```

### 🎯 Add Attributes

```javascript
createElement("input", {
  type: "text",
  placeholder: "Enter your name",
  id: "nameInput"
});
```

### 🎉 Add an Event

```javascript
eventManager.addevent("click", ".btn", (e) => {
  console.log("Clicked!", e.target);
});
```

---

## 🔍 How It Works

### 1. Virtual DOM

- `createElement()` retourne un objet JavaScript représentant une structure DOM.
- `render()` transforme cet objet en véritables nœuds DOM.
- `diff()` compare les versions anciennes et nouvelles.
- `patch()` applique seulement les différences détectées.

#### Exemple :
```javascript
const vdom = createElement("div", { class: "container" }, "Bonjour");
render(vdom, document.body);
```

---

### 2. State Management

- `useState()` retourne une paire [valeur, setter].
- `StoreState()` est un magasin global partagé par tous.
- Le store notifie les composants via `.subscribe()`.

#### Exemple :
```javascript
const [count, setCount] = useState(0);
setCount(count + 1);
```

### 3. Routing System

- Utilise `location.hash`.
- Chaque changement de hash déclenche un re-render.

#### Exemple :
```javascript
const router = new Router("#/", HomeView, NotFoundView, rootElement);
router.AddPath("#/todos", TodosView);
```

---

### 4. Event Handling

- Pas d’usage direct de `addEventListener`.
- Un seul gestionnaire centralisé par type d'événement.
- Permet une gestion efficace même avec des éléments dynamiques.

---

## ✅ TodoMVC with the Framework

```javascript
function TodoApp() {
  const [todos, setTodos] = useState([]);

  return createElement("section", { class: "todoapp" },
    createElement("header", {},
      createElement("h1", {}, "todos")
    ),
    createElement("ul", { class: "todo-list" },
      ...todos.map(todo =>
        createElement("li", {}, todo.text)
      )
    )
  );
}
```

---

## 🚀 Getting Started

### Lancer le projet :

```bash
python -m http.server 5501
```

### Ouvrir dans le navigateur :
[http://localhost:5501/src/index.html](http://localhost:5501/src/index.html)

---

## 📚 Recommended File Separation

| Fichier      | Contenu                               |
|--------------|----------------------------------------|
| `DOM.md`     | `createElement`, `render`, `patch`     |
| `State.md`   | `useState`, `StoreState`, `subscribe`  |
| `Router.md`  | `Router`, `AddPath`, `hash` routing    |
| `Events.md`  | `addevent`, délégation d’événements    |

---

## 💡 Why It Works This Way

- Le **Virtual DOM** évite les manipulations directes coûteuses.
- Le **State Management** centralisé permet la synchronisation entre vues.
- Le **Router** basé sur le hash ne nécessite pas de serveur.
- Le **Event Manager** réduit la surcharge en utilisant la délégation.

---

## 🧠 Glossaire

- **Virtual DOM** : Représentation JS du DOM.
- **Diffing** : Détection de changements dans deux arbres DOM.
- **Patch** : Application de changements au DOM réel.
- **Inversion de Contrôle** : Le framework pilote le déroulement.

---

## ✅ Project Highlights

- ✅ Framework 100% Vanilla JS
- ✅ Aucun framework externe
- ✅ Documentation complète
- ✅ Prêt pour être testé et audité

---