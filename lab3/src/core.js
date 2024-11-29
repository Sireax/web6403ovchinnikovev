/**
 * Напишите функцию, которая проверяет, является ли число целым используя побитовые операторы
 * @param {*} n
 */
function isInteger(n) {
    return n === Math.floor(n);
}

/**
 * Напишите функцию, которая возвращает массив четных чисел от 2 до 20 включительно
 */
function even() {
    return Array.from({length: 10}, (_, i) => i * 2 + 2);
}

/**
 * Напишите функцию, считающую сумму чисел до заданного используя цикл
 * @param {*} n
 */
function sumTo(n) {
    let sum = 0;
    for (let i = 1; i <= n; i++) {
        sum += i;
    }
    return sum;
}

/**
 * Напишите функцию, считающую сумму чисел до заданного используя рекурсию
 * @param {*} n
 */
function recSumTo(n) {
    if (n === 1) return 1;
    return n + recSumTo(n - 1);
}

/**
 * Напишите функцию, считающую факториал заданного числа
 * @param {*} n
 */
function factorial(n) {
    if (n < 0) throw new Error('Факториал не определен для отрицательных чисел');
    if (n === 0 || n === 1) return 1;
    return n * factorial(n - 1);
}

/**
 * Напишите функцию, которая определяет, является ли число двойкой, возведенной в степень
 * @param {*} n
 */
function isBinary(n) {
    return n > 0 && (n & (n - 1)) === 0;
}

/**
 * Напишите функцию, которая находит N-е число Фибоначчи
 * @param {*} n
 */
function fibonacci(n) {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
}

/** Напишите функцию, которая принимает начальное значение и функцию операции
 * и возвращает функцию - выполняющую эту операцию.
 * Если функция операции (operatorFn) не задана - по умолчанию всегда
 * возвращается начальное значение (initialValue)
 * @param initialValue
 * @param operatorFn - (storedValue, newValue) => {operation}
 * @example
 * const sumFn =  getOperationFn(10, (a,b) => a + b);
 * console.log(sumFn(5)) - 15
 * console.log(sumFn(3)) - 18
 */
function getOperationFn(initialValue, operatorFn) {
    let storedValue = initialValue;

    return function(value) {
        if (operatorFn) {
            storedValue = operatorFn(storedValue, value);
        }
        return storedValue;
    };
}

/**
 * Напишите функцию создания генератора арифметической последовательности.
 * При ее вызове, она возвращает новую функцию генератор - generator().
 * Каждый вызов функции генератора возвращает следующий элемент последовательности.
 * Если начальное значение не передано, то оно равно 0.
 * Если шаг не указан, то по дефолту он равен 1.
 * Генераторов можно создать сколько угодно - они все независимые.
 *
 * @param {number} start - число с которого начинается последовательность
 * @param {number} step  - число шаг последовательности
 * @example
 * const generator = sequence(5, 2);
 * console.log(generator()); // 5
 * console.log(generator()); // 7
 * console.log(generator()); // 9
 */
function sequence(start=0, step=1) {
    let current = start;

    return function() {
        const result = current;
        current += step;
        return result;
    };
}

/**
 * Напишите функцию deepEqual, которая принимает два значения
 * и возвращает true только в том случае, если они имеют одинаковое значение
 * или являются объектами с одинаковыми свойствами,
 * значения которых также равны при сравнении с рекурсивным вызовом deepEqual.
 * Учитывать специфичные объекты(такие как Date, RegExp и т.п.) не обязательно
 *
 * @param {object} firstObject - первый объект
 * @param {object} secondObject - второй объект
 * @returns {boolean} - true если объекты равны(по содержанию) иначе false
 * @example
 * deepEqual({arr: [22, 33], text: 'text'}, {arr: [22, 33], text: 'text'}) // true
 * deepEqual({arr: [22, 33], text: 'text'}, {arr: [22, 3], text: 'text2'}) // false
 */
function deepEqual(a, b, visited = new WeakMap()) {
    // Проверка ссылочной эквивалентности и NaN
    if (a === b) {
        // Обработка случая +0 и -0
        return a !== 0 || 1 / a === 1 / b;
    }

    if (a !== a && b !== b) { // Проверка NaN
        return true;
    }

    // Проверка на тип и null
    if (
        a == null || typeof a !== 'object' ||
        b == null || typeof b !== 'object'
    ) {
        return false;
    }

    // Проверка циклических ссылок
    if (visited.has(a)) {
        return visited.get(a) === b;
    }
    visited.set(a, b);

    // Сравнение конструкторов
    if (a.constructor !== b.constructor) {
        return false;
    }

    // Обработка массивов
    if (Array.isArray(a)) {
        if (!Array.isArray(b) || a.length !== b.length) {
            return false;
        }
        for (let i = 0; i < a.length; i++) {
            if (!deepEqual(a[i], b[i], visited)) {
                return false;
            }
        }
        return true;
    }

    // Обработка объектов Date
    if (a instanceof Date) {
        return a.getTime() === b.getTime();
    }

    // Обработка объектов RegExp
    if (a instanceof RegExp) {
        return a.toString() === b.toString();
    }

    // Получение всех собственных ключей, включая символы
    const keysA = Reflect.ownKeys(a);
    const keysB = Reflect.ownKeys(b);

    if (keysA.length !== keysB.length) {
        return false;
    }

    for (let key of keysA) {
        if (!keysB.includes(key)) {
            return false;
        }
        if (!deepEqual(a[key], b[key], visited)) {
            return false;
        }
    }

    return true;
}
module.exports = {
    isInteger,
    even,
    sumTo,
    recSumTo,
    factorial,
    isBinary,
    fibonacci,
    getOperationFn,
    sequence,
    deepEqual,
};
