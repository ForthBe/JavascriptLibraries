
//#region Arrays

function all(items, condition) {
    if(!items)
        return false;

    return !items.some(element => !condition(element))
}

function any(items, condition) {
    if (!items)
        return false;

    return condition
        ? items.some(condition)
        : items.length > 0;
}

function filter(items, condition) {
    var itemsFiltered = [];
    
    items.forEach(element => {
        if (condition(element))
            itemsFiltered.push(element);
    });

    return itemsFiltered;
}

function count(items, condition) {
    if (!condition)
        return items.length;

    let count = 0;
    items.forEach(element => {
        if (condition(element))
            count++;
    });
    return count;
}

function skip(items, count)//TODO: check for duplicated values
{
    if(count < 0 || !any(items))
        return undefined;
    // var duplicatedObjStored = [];

    return filter(items, x => 
        {
            // if(count(items, i => i == x) > 1)
            //     {
            //         duplicatedObjStored.push({ "value" : x, "occurrencies":});
            //     }
            items.indexOf(x) >= count;
        });
}

function take(items, count)//TODO: check for duplicated values
{
    if(count < 0 || !any(items))
        return undefined;
    
    return filter(items, x => items.indexOf(x) < count);
}

function forEach(items, action)
{
    items.forEach(x => action(x, items.indexOf(x)));
}


function forEachAndGet(items, action)
{
    items.forEach(x => action(x, items.indexOf(x)));
    return items;
}

//#endregion

//#region Strings

function startsWith(text, startText) {
    if (!text)
        return !startText;

    if (!startText)
        return true;

    var textFirstChar = firstOrDefault(text);
    var startTextFirstChar = firstOrDefault(startText);
    return text.includes(startText) && textFirstChar == startTextFirstChar;
}

function endsWith(text, endText) {
    if (!text)
        return !endText;

    if (!endText)
        return true;

    var textLastChar = lastOrDefault(text);
    var endTextLastChar = lastOrDefault(endText);
    return text.includes(endText) && textLastChar == endTextLastChar;
}

//#endregion

//#region Arrays and Strings

function singleOrDefault(items, condition) {
    var itemsType = typeof items;

    if (itemsType == "string")
        return singleOrDefaultForStringInternal(items, condition);

    function singleOrDefaultForStringInternal(items, condition) {
        if (condition) {
            var filteredItems = filter(items, condition);
            return filteredItems.length == 1
                ? firstOrDefault(items)
                : undefined
        }

        return !items || items.length != 1
            ? undefined
            : items.substring(0,1)
    }

    if (Array.isArray(items))
        return singleOrDefaultForArrayInternal(items, condition);

    function singleOrDefaultForArrayInternal(items, condition) {
        if (condition) {
            var filteredItems = filter(items, condition);
            return filteredItems.length == 1
                ? firstOrDefault(items)
                : undefined
        }

        return items.length == 1
            ? items[0]
            : undefined
    }

    return undefined;
}

function firstOrDefault(items, condition) {
    var itemsType = typeof items;

    if (itemsType == "string")
        return firstOrDefaultForStringInternal(items, condition);

    function firstOrDefaultForStringInternal(items, condition) {
        if (condition)
            return firstOrDefault(filter(items, condition));

        return !items
            ? undefined
            : items.substring(0,1)
    }

    if (Array.isArray(items))
        return firstOrDefaultForArrayInternal(items, condition);

    function firstOrDefaultForArrayInternal(items, condition) {
        if (condition)
            return firstOrDefault(filter(items, condition));

        return any(items)
            ? items[0]
            : undefined
    }

    return undefined;
}

function lastOrDefault(items, condition) {
    var itemsType = typeof items;

    if (itemsType == "string")
        return lastOrDefaultForStringInternal(items, condition);

    function lastOrDefaultForStringInternal(items, condition) {
        if (condition)
            return lastOrDefault(filter(items, condition));

        return !items
            ? undefined
            : items.substring(items.length - 1, items.length);
    }

    if (Array.isArray(items))
        return lastOrDefaultForArrayInternal(items, condition);

    function lastOrDefaultForArrayInternal(items, condition) {
        if (condition)
            return lastOrDefault(filter(items, condition));

        if (Array.isArray(items))
            return any(items)
                ? items[items.length - 1]
                : undefined;

        return undefined;
    }
}

//#endregion