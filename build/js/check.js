function getMessage (a, b) {
    if (typeof a === 'boolean') {
        if (a === true) {
            return "Я попал в " + b;
        }
        else {
            return "Я никуда не попал";
        }
    }
    if (typeof a === 'number') {
        return  "Я прыгнул на " + a * 100 + " сантиметров";
    }

    if (Array.isArray(a) && !Array.isArray(b)) {
        var numberOfSteps = 0;
        for (var i = 0; i < a.length; i++) {
            numberOfSteps += a[i];
        }
        return "Я прошёл " + numberOfSteps + " шагов";
    }

    if (Array.isArray(a) && Array.isArray(b)) {
        var distancePath = 0;
        var sum = 0;
        for (var y = 0; y < a.length; y++) {
            sum = a[y] +b[y];
            distancePath += sum;
        }
        return "Я прошёл " + distancePath + " метров";
    }
}
