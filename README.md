[![CircleCI](https://circleci.com/gh/lastmjs/redux-store-element.svg?style=shield)](https://circleci.com/gh/lastmjs/redux-store-element) [![npm version](https://img.shields.io/npm/v/redux-store-element.svg?style=flat)](https://www.npmjs.com/package/redux-store-element)[![dependency Status](https://david-dm.org/lastmjs/redux-store-element/status.svg)](https://david-dm.org/lastmjs/redux-store-element) [![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/lastmjs/redux-store-element)

# &lt;redux-store&gt;
A custom element allowing a more declarative use of Redux.

# Introduction
This custom element offers the basic Redux API declaratively. Because this is a web component, it should be compatible with all major front-end JavaScript frameworks and libraries that allow full interaction with the DOM, including [Polymer](https://github.com/Polymer/polymer), [SkateJS](https://github.com/skatejs/skatejs), [Bosonic](https://github.com/bosonic/bosonic), [X-Tag](https://github.com/x-tag/x-tag), [React](https://github.com/facebook/react), [Angular 2](https://github.com/angular/angular), [Angular 1](https://github.com/angular/angular.js/), [Ember](https://github.com/emberjs/ember.js/), vanilla JavaScript, etc.

## Simple and Declarative
Before we begin, I just want to highlight how easy it is to work with this element declaratively:

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

Now import `redux-store.html`:
```
<link rel="import" href="node_modules/redux-store-element/redux-store.html">
```

This custom element depends on the custom elements and HTML imports web component specifications, which are not supported by all browsers yet. Include the webcomponentjs polyfills to ensure support across all modern browsers:
```
// CONSOLE
npm install --save @webcomponents/webcomponentsjs

// HTML
<script src="node_modules/webcomponentsjs/webcomponents-lite.js"></script>
```

The following examples are written with Polymer. It shouldn't be too hard to adapt them to other libraries and frameworks, keeping in mind their data-binding systems and DOM interactions:

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
* You must pass in your root reducer to any `<redux-store></redux-store>` before actions will be dispatched and state change events raised
* By default there is one store for the entire application. Each instance of a `<redux-store></redux-store>` will use the same store
* The `statechange` event supplies the redux state in the `detail.state` property of the event

## Development
```
bower install
npm install
npm run link
npm run test
```
