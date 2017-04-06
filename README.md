# redux-action-namespacer
Provides a way to define your Redux action types in a structured way.

### Installation
`npm i redux-action-namespacer --save`

### Example of how to use this package
Lets say you have a grid (which can contain rows of data, allows the user to search by keyword, allows the user to sort the columns and also limit the number of results returned). You might ordinarily define your action types like this:

```javascript
const TABLE_LOADING = 'TABLE_LOADING'; // Shows a loading indicator.
const TABLE_DATA = 'TABLE_DATA'; // Stores the table data.
const TABLE_QUERY_SORT = 'TABLE_QUERY_SORT'; // Sets a query parameter to sort the data.
const TABLE_LIMIT = 'TABLE_QUERY_LIMIT'; // Sets a limit on the number of records to return.
const TABLE_SEARCH = 'TABLE_QUERY_SEARCH'; // Sets a search term.
```

With redux-action-namespacer you can structure your action types in a logical way:

(actionTypes/actionTypes.js)
```javascript
import { nsActionTypes } from 'redux-action-namespacer';

let actionTypes = [
    'table', [
        'loading',
        'data',
        'query', [
            'sort',
            'limit',
            'search'
        ]
    ]
];

export const ACTIONS = nsActionTypes(actionTypes);
```

Then, in your reducers file, you can import these action types to use directly in your reducers:

(reducers/reducers.js)
```javascript
import ACTIONS from '../actionTypes/actionTypes.js';

const tablesReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTIONS.table.loading: // Here is where your action type structure works nicely.
            ...
    }
}

export default tablesReducer;
```

The `nsActionTypesCheck()` function can be used check that there are no namespace conflicts within your action type definitions. It would be best to use this function in your test suite to make a one-time test against your action types definitions. For example:

test/test.js
```javascript
import { actionTypes } from '../actionTypes/actionTypes.js';
import { nsActionTypesCheck } from 'redux-action-namespacer';

describe('nsActionTypesCheck()', function() {
    it('should return true when action type definitions are valid', function () {
       let result = nsActionTypesCheck(actionsTypes);
       expect(result).to.be.true;
    });
});
```

### How it works.
As per the example above, when you pass your action type definitions through the nsActionTypes() function, it returns an object structure like this:
```javascript
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
```

This enables you to type your action types with dot-notation and is also code-editor friendly.
