[![CircleCI](https://circleci.com/gh/lastmjs/redux-store-element.svg?style=shield)](https://circleci.com/gh/lastmjs/redux-store-element) [![npm version](https://img.shields.io/npm/v/redux-store-element.svg?style=flat)](https://www.npmjs.com/package/redux-store-element) [![dependency Status](https://david-dm.org/lastmjs/redux-store-element/status.svg)](https://david-dm.org/lastmjs/redux-store-element) [![devDependency Status](https://david-dm.org/lastmjs/redux-store-element/dev-status.svg)](https://david-dm.org/lastmjs/redux-store-element?type=dev) [![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/lastmjs/redux-store-element)

# &lt;redux-store&gt;
A custom element allowing a more declarative use of Redux.

# Introduction
This custom element offers the basic Redux API declaratively. Because this is a custom element based on the [web components](https://www.webcomponents.org/) standards, it should be compatible with all major front-end JavaScript frameworks and libraries that interoperate with custom elements, including [Polymer](https://github.com/Polymer/polymer), [SkateJS](https://github.com/skatejs/skatejs), [Vue.js](https://github.com/vuejs/vue), [Angular](https://github.com/angular/angular), vanilla JavaScript, etc. See [here](https://custom-elements-everywhere.com/) for more information on interoperability of other frameworks and libraries with custom elements.

## Simple and Declarative
Before we begin, I just want to highlight how easy it is to work with this element declaratively (using Polymer data binding syntax):

* Hook up your root reducer (similar to Redux `createStore`):

  ```
  // HTML
  <redux-store root-reducer="[[rootReducer]]"></redux-store>

  // JS
  import {RootReducer} from '../../redux/reducers';

  ...

  connectedCallback() {
    this.rootReducer = RootReducer;
  }
  ```
* Dispatch actions (similar to Redux `dispatch`):

  ```
  // HTML
  <redux-store action="[[action]]"></redux-store>

  // JS
  fireAnAction() {
    this.action = {
      type: 'CHANGE_THE_STATE'
    };
  }
  ```
* Listen for state changes (similar to Redux `subscribe`):

  ```
  // HTML
  <redux-store on-statechange="stateChange"></redux-store>

  [[valueToBind]]

  // JS
  stateChange(e) {
    const state = e.detail.state;

    this.valueToBind = state.valueToBind;
  }
  ```
* Explicitly grab the state (similar to Redux `getState`):

  ```
  // HTML
  <redux-store id="redux-store-element"></redux-store>

  // JS
  getReduxState() {
    const reduxStoreElement = this.querySelector('#redux-store-element');
    const state = reduxStoreElement.getState();
  }
  ```

# Installation and Setup
Run the following:
```
npm install redux-store-element
```

Now import `redux-store-element.js`:
```
// HTML
<script type="module" src="node_modules/redux-store-element/redux-store-element.js">

// JavaScript

import 'redux-store-element';

```

This custom element depends on the custom elements and HTML imports web component specifications, which are not supported by all browsers yet. Include the webcomponentjs polyfills to ensure support across all modern browsers:
```
// CONSOLE
npm install --save @webcomponents/webcomponentsjs

// HTML
<script src="node_modules/webcomponentsjs/webcomponents-lite.js"></script>
```

This custom element also depends on native ES Modules support and bare specifier support. Use a bundler like [Rollup](https://github.com/rollup/rollup) or [Webpack](https://github.com/webpack/webpack) if your environment doesn't support ES Modules. If your environment does support ES Modules and you do not wish to use a bundler, you will need to use a static file server that provides rewrites for bare specifiers like [Polyserve](https://github.com/Polymer/polyserve) or [Zwitterion](https://github.com/lastmjs/zwitterion).

The following examples are written with Polymer. It shouldn't be too hard to adapt them to other libraries and frameworks, keeping in mind their data binding systems and DOM interactions. This documentation is outdated, using HTML Imports instead of ES Modules, and will be updated in the future:

## Creating the root reducer
At some point before you begin dispatching actions, you need to pass in your root reducer to any `<redux-store></redux-store>` element through the root-reducer attribute. From the example:
```
<link rel="import" href="../../../lib/bower_components/polymer/polymer.html">

<link rel="import" href="../../../src/redux-store.html">
<link rel="import" href="../input-area/input-area.component.html">
<link rel="import" href="../text/text.component.html">

<dom-module id="test-app">
    <template>
        <redux-store root-reducer="[[rootReducer]]"></redux-store>
        <test-input-area></test-input-area>
        <test-text></test-text>
    </template>

    <script>
        Polymer({
            is: 'test-app',
            ready: function() {

                var initialState = {
                    temp: 'initial temp'
                };

                this.rootReducer = function(state, action) {

                    if (!state) {
                        return initialState;
                    }

                    switch(action.type) {
                        case 'CHANGE_TEMP': {
                            var newState = Object.assign({}, state);

                            newState.temp = action.newTemp;

                            return newState;
                        }
                        default: {
                            return state;
                        }
                    };
                };

            }
        });
    </script>
</dom-module>

```

## Subscribing to state changes
If your component needs to listen to state changes, simply pop a `<redux-store></redux-store>` element in and pass a listener function name in for the `statechange` event. From the example:

```
<link rel="import" href="../../../lib/bower_components/polymer/polymer.html">

<link rel="import" href="../../../src/redux-store.html">

<dom-module id="test-text">
    <template>
        <redux-store on-statechange="mapStateToThis"></redux-store>

        <div id="testText">Text from input above will go here</div>
    </template>

    <script>
        Polymer({
            is: 'test-text',
            mapStateToThis: function(e) {
                this.$.testText.innerHTML = e.detail.state.temp;
            }
        });
    </script>
</dom-module>
```

## Dispatching actions
To dispatch from within an element, first bind the action property of the element to the action property on `<redux-store></redux-store>`. When you are ready to dispatch an action, set the action property on the element to the action that you want to dispatch. From the example:

```
<link rel="import" href="../../../src/redux-store.html">

<dom-module id="test-input-area">
    <template>
        <redux-store action="[[action]]"></redux-store>

        <input id="testInput" type="text">
        <button on-click="handleClick">Dispatch</button>
    </template>

    <script>
        Polymer({
            is: 'test-input-area',
            handleClick: function(e) {
                this.action = {
                    type: 'CHANGE_TEMP',
                    newTemp: this.$.testInput.value
                };
            }
        });
    </script>
</dom-module>
```

## Multiple Stores
By default, there is one store for the entire application, meaning that each instance of a `<redux-store></redux-store>` will use the same store. You can however use multiple stores if you've determined it is necessary for your application. Simply reference the store name as follows:

* Hook up your root reducer: `<redux-store root-reducer="[[rootReducer]]" store-name="fooStore"></redux-store>`
* Dispatch actions: `<redux-store action="[[action]]" store-name="fooStore"></redux-store>`
* Listen for state changes: `<redux-store on-statechange="mapStateToThis" store-name="fooStore"></redux-store>`

## Important Things to Know:
* Your runtime environment must support ES Modules natively. Check [here](https://caniuse.com/#feat=es6-module) for compatibility
* You must pass in your root reducer to any `<redux-store></redux-store>` before actions will be dispatched and state change events raised
* By default there is one store for the entire application. Each instance of a `<redux-store></redux-store>` will use the same store
* The `statechange` event supplies the redux state in the `detail.state` property of the event

## Development
```
npm install
npm run test-window
```
