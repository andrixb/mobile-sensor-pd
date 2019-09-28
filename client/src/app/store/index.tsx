import { applyMiddleware, combineReducers, createStore } from 'redux';
import reduxThunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

// import socketReducer from './socket/reducer';
// import socketMiddleware from './socket/middleware';

const rootReducer = combineReducers({
    // socketState: socketReducer,
});

export default function configureStore() {
    const middlewares = [
        reduxThunk, 
        // socketMiddleware,
    ];
    const middleWareEnhancer = applyMiddleware(...middlewares);

    const store = createStore(
        rootReducer,
        composeWithDevTools(middleWareEnhancer)
    );

    return store;
}

export type AppState = ReturnType<typeof rootReducer>;
