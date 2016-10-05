# redux-store-element
A simple Polymer web component that allows a more declarative use of Redux.

# Introduction
So far the Polymer solutions using Redux that I have seen don't seem to take full advantage of the declarativeness of web components. I'm hoping this element solves that problem.

## Simple and Declarative
Before we begin, I just want to highlight how easy it is to work with this component declaratively:

* Hook up your root reducer (similar to Redux `createStore`): 

  ```
  <redux-store root-reducer="[[rootReducer]]"></redux-store>
  ```
* Dispatch actions (similar to Redux `dispatch`): `<redux-store action="[[action]]"></redux-store>`
* Listen for state changes (similar to Redux `subscribe`): `<redux-store on-statechange="mapStateToThis"></redux-store>`
* Explicitly grab the state, but only if you must, prefer listening for state changes (similar to Redux `getState`):
  ```
  //HTML
  <redux-store id="redux-store-element></redux-store-element>
  
  //JS
  const reduxStoreElement = this.querySelector('#redux-store-element');
  const state = reduxStoreElement.getState();
  ```

That is the entirety of the API exposed to you through HTML.

# Installation and Setup
Run the following:
```
bower install --save redux-store-element
npm install --save redux
```
Now you can import `redux-store.html` and the component is yours to use.

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
If your component needs to listen to state changes, simply pop a `<redux-store></redux-store>` element in and pass a listener function in for the `statechange` event. From the example:

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
* You must pass in your root reducer to any `<redux-store></redux-store>` before you can dispatch actions and receive state changes
* By default there is one store for the entire application. Each instance of a `<redux-store></redux-store>` will use the same store
* The `statechange` event supplies the redux state in the `detail.state` property on the event

## Development
To play with the example, clone the repo, go to the root of the project, and run the following commands:
```
bower install
npm install
npm start
```
Open up to localhost:[whatever port the terminal says]. The port is usually localhost:8080. Go to the example directory and open example/index.html.
