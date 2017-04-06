'use strict';

/**
 * Converts an array of structured action types into an object.
 * @param {array} arr - A structured hash of action types.
 * @param {string} prependName - A value that represents the current namespace name. It is used when the function calls itself.
 * @return {object}
 *
 * Example of usage:
 * export const ACTIONS = nsActionTypes([
 *  'table', [
 *      'loading',
 *      'data',
 *      'query', [
 *          'sort',
 *          'limit',
 *          'search'
 *      ]
 *  ]
 *]);
 */
const nsActionTypes = (arr, prependName=null) => {

    let actionTypeObj = {};
    let newArr = arr.slice();
    for(let i=0 ; i < newArr.length ; i++){

        let value = newArr[i];
        let next = newArr[(i+1)];

        let namespacedName;
        if (prependName !== null) {
            namespacedName = prependName + '.' + value;
        }
        else{
            namespacedName = value;
        }

        if (Array.isArray(next)) {
            actionTypeObj[value] = nsActionTypes(next, namespacedName);
        } else {
            if (!Array.isArray(value)) {
                actionTypeObj[value] = namespacedName;
            }
        }
    }

    return actionTypeObj;
};


/**
 * Tests an array to see if there are any duplicate keys.
 * @param {array} arr - A structured array of action types.
 * @param {number} level - The depth level of the array. It is used when the function calls itself.
 * @return {true} - Throws an Error if array is not supplied/is invalid.
 */
const nsActionTypesCheck = (arr, level=0) => {

    if(typeof arr === "undefined"){
        throw new Error("Action type array was not supplied to the function nsActionTypesCheck()");
    }

    let keysArray = [];
    let newArr = arr.slice();
    for(let i=0 ; i < newArr.length ; i++){

        let value = newArr[i];
        let next = newArr[(i+1)];

        if(keysArray.indexOf(value) !== -1){
            throw new Error("Duplicate action type value '" + value + "' at level " + level + ".");
        }
        else{
            keysArray.push(value);
        }

        if (Array.isArray(next)) {
            level++;
            nsActionTypesCheck(next, level);
        }
    }

    return true;
};


const reduxActionNamespacer = {
    nsActionTypes: nsActionTypes,
    nsActionTypesCheck: nsActionTypesCheck
};
module.exports = reduxActionNamespacer;