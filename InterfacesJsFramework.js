class Command {
    
    constructor(onExecute, canExecute) {
        this.onExecute = onExecute;
        this.canExecute = canExecute;
    }

    execute(obj) {
        if (!this.canExecute(obj))
            return;

        this.onExecute(obj);
    }
}

class Factory
{
    constructor(createObject)
    {
        this.createObject = createObject;
    }

    create(params)
    {
        return this.createObject(params);
    }
}

function extend( obj, extension ){
    for ( var key in extension ){
      obj[key] = extension[key];
    }
}
