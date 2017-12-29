import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.js';
import { AppContainer } from 'react-hot-loader';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import reducer from './reducer';
import { getCharacters} from "./reducer/characters/actions";


// creating a store.
// this include chrome dev tool extension.
const store = createStore(reducer, compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension(): f => f
));

store.dispatch(getCharacters());

require('./index.html');

const container = document.getElementById('app-container');
ReactDOM.render(
    <AppContainer>
        <Provider store={store}>
           <App />
        </Provider>
    </AppContainer>,
container
);

if (module.hot){
    module.hot.accept('./components/App', () => {
        ReactDOM.render(
            <AppContainer>
                <Provider store={store}>
                    <App />
                </Provider>
            </AppContainer>
            , container
        );
    });
}