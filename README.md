# redux-action-namespacer
Provides a way to define your action types in a structured way.

### Installation
`npm i redux-action-namespacer --save`

### Example of how to use this package
Lets say you have a grid (which can contain rows of data, allows the user to search by keyword, allows the user to sort the columns and also limit the number of results returned). You might ordinarily define your action types like this:

```
const TABLE_LOADING = 'TABLE_LOADING'; // Shows a loading indicator.
const TABLE_DATA = 'TABLE_DATA'; // Stores the table data.
const TABLE_QUERY_SORT = 'TABLE_QUERY_SORT'; // Sets a query parameter to sort the data.
const TABLE_LIMIT = 'TABLE_QUERY_LIMIT'; // Sets a limit on the number of records to return.
const TABLE_SEARCH = 'TABLE_QUERY_SEARCH'; // Sets a search term.
```

With redux-action-namespacer you can structure your action types in a logical way (this structure is IDE friendly):

(actionTypes.js)
```
import { nsActionTypes } from 'redux-action-namespacer';

export const ACTIONS = nsActionTypes({
    table: {
        loading: true,
        data: true,
        query: {
            sort: true,
            limit: true,
            search: true
        }
    }
});
```
Note that the value `true` simply represents a value that the `nsActionTypes()` function uses the know when to stop going deeper within that branch - the value is always `true`.
Then, in your reducers file, you can import these action types to use directly in your reducers:

(reducers.js)
```
import ACTIONS from './actionTypes.js';

// This illustrates the store state for your table.
const initialState = {
    table: {
        loading: false,
        data: [],
        query: {
            sort: {},
            limit: 50,
            search: ""
        }
    }
};

const tablesReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTIONS.table.loading: // HERE is where your action type structure works nicely.
            return {...state, table: { ...state.table, loading: action.payload.loading }};
    }
}
export default tablesReducer;
```

### How it works.
As per the example above, when you pass your action type definitions through the nsActionTypes() function...
```
export const ACTIONS = nsActionTypes({
    table: {
        loading: true,
        data: true,
        query: {
            sort: true,
            limit: true,
            search: true
        }
    }
});
```

this is the resulting value of the ACTIONS constant:

export const ACTIONS = {
    table: {
        loading: 'table.loading',
        data: 'table.data',
        query: {
            sort: 'table.query.sort',
            limit: 'table.query.limit',
            search: 'table.query.search'
        }
    }
};
