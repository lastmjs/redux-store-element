# polymer-redux-store
A simple Polymer web component that allows a more declarative use of Redux.

# Introduction
This is a Polymer web component in very early development, but the concept works. So far the Polymer solutions using Redux that I have seen
don't seem to take full advantage of the declarativeness of web components. Hopefully this element is a good start.

# Setup
Clone the repo and run the following:
```
npm install
npm start
```

Open up to localhost:[whatever port the terminal says]. The port is usually localhost:8080.

# Use
For a simple working example, look in the example directory and run example/index.html.

## Creating the root reducer
For now, manually edit src/redux-store.ts and import your root reducer. Your reducers are now hooked up.

## Subscribing to state changes
If your component needs to listen to state changes, simply pop a redux-store element in it and add a listener for the `stateChange` event. From the example:

```
<link rel="import" href="../../../lib/bower_components/polymer/polymer.html">

<link rel="import" href="../../../src/redux-store.html">

<dom-module id="test-text">
    <template>
        <redux-store></redux-store>

        <div id="testText">Text from input above will go here</div>
    </template>

    <script>
        Polymer({
            is: 'test-text',
            listeners: {
                'stateChange': 'mapStateToThis'
            },
            mapStateToThis: function(e) {
                e.stopPropagation();

                this.$.testText.innerHTML = e.detail.state.temp;
            }
        });
    </script>
</dom-module>
```

Things to know:
* The `stateChange` event supplies the redux state in the `detail.state` property on the event
* You should stop the event from propagating (`e.stopPropagation`) or else all parent elements beyond the immediate element that `<redux-store></redux-store>` is declared in will potentially react to the event

## Dispatching actions
To dispatch from within an element, first bind the action property of the element to the action property on `redux-store`. When you are ready to dispatch an action, set the action property on the element to the action that you want to dispatch. From the example:

```
<link rel="import" href="../../../src/redux-store.html">

<dom-module id="test-input-area">
    <template>
        <redux-store action="{{action}}"></redux-store>

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

That's it for now.
