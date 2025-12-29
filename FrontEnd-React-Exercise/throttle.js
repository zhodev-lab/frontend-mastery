const throttle = (func, delay) => {

    let lastTime = 0;

    return (...args) => {
        const context = this;
        const now = Data.now()
        if(now - lastTime >= delay){
            func.apply(context, args)
        } 

    }
}