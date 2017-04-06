'use strict';

/**
 * Converts a hash of structured action types into .
 * @param {object} hash - A structured hash of action types.
 * @param {string} 
 * @return {object} messages
 *
 * Example: 
 * export const ACTIONS = namespaceActionTypes({
 *   dataTable: {
 *       loading: true,
 *       controls: {
 *           load: true,
 *           save: true
 *       }
 *   }
 * });
 */
 const namespaceActionTypes = (hash, prependName=null) => {

    let actionTypeObj = {};
    for(let key in hash){

        let value = hash[key];
        let namespacedName;
        if (prependName !== null) {
            namespacedName = prependName + '.' + key;
        } else {
            namespacedName = key;
        }
        if (value === true) {
            actionTypeObj[key] = namespacedName;
        } else {
            actionTypeObj[key] = namespaceActionTypes(value, namespacedName);
        }
    }

    return actionTypeObj;
};


var reduxActionNamespacer = {
    nsActionTypes: nsActionTypes
};
module.exports = reduxActionNamespacer;