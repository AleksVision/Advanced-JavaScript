/**
 * Итераторы в JavaScript
 * Подробное руководство с примерами и практическими задачами
 */

// ----------------------------------------
// 1. ОСНОВЫ ИТЕРАТОРОВ
// ----------------------------------------

/**
 * Базовый пример: создание простого итератора вручную
 * Показывает внутреннее устройство итератора
 */
const simpleIterator = {
    data: [1, 2, 3],
    currentIndex: 0,
    
    // Метод next() - основа работы итератора
    next() {
        if (this.currentIndex < this.data.length) {
            return {
                value: this.data[this.currentIndex++],
                done: false
            };
        }
        return { done: true };
    }
};

// Демонстрация работы простого итератора
console.log(simpleIterator.next()); // { value: 1, done: false }
console.log(simpleIterator.next()); // { value: 2, done: false }
console.log(simpleIterator.next()); // { value: 3, done: false }
console.log(simpleIterator.next()); // { done: true }

// ----------------------------------------
// 2. ВСТРОЕННЫЕ ИТЕРАТОРЫ
// ----------------------------------------

/**
 * Демонстрация работы со встроенными итераторами
 */
function demonstrateBuiltInIterators() {
    // Массивы
    const array = ['a', 'b', 'c'];
    const arrayIterator = array[Symbol.iterator]();
    console.log(arrayIterator.next()); // { value: 'a', done: false }
    
    // Строки
    const string = "Hello";
    const stringIterator = string[Symbol.iterator]();
    console.log(stringIterator.next()); // { value: 'H', done: false }
    
    // Map
    const map = new Map([['name', 'John'], ['age', 30]]);
    const mapIterator = map[Symbol.iterator]();
    console.log(mapIterator.next()); // { value: ['name', 'John'], done: false }
    
    // Set
    const set = new Set([1, 2, 3]);
    const setIterator = set[Symbol.iterator]();
    console.log(setIterator.next()); // { value: 1, done: false }
}

// ----------------------------------------
// 3. СОЗДАНИЕ ИТЕРИРУЕМЫХ ОБЪЕКТОВ
// ----------------------------------------

/**
 * Пример: Диапазон чисел
 * Создаёт итерируемый объект, который генерирует числа в заданном диапазоне
 */
class Range {
    constructor(start, end) {
        this.start = start;
        this.end = end;
    }

    [Symbol.iterator]() {
        let current = this.start;
        const end = this.end;

        return {
            next() {
                if (current <= end) {
                    return { value: current++, done: false };
                }
                return { done: true };
            }
        };
    }
}

// Использование Range
const range = new Range(1, 3);
for (const num of range) {
    console.log(num); // 1, 2, 3
}

/**
 * Пример: Последовательность Фибоначчи
 * Бесконечный итератор с ограничением в цикле
 */
const Fibonacci = {
    [Symbol.iterator]() {
        let prev = 0, curr = 1;
        
        return {
            next() {
                [prev, curr] = [curr, prev + curr];
                return { value: prev, done: false };
            }
        };
    }
};

// Использование Fibonacci с ограничением
for (const num of Fibonacci) {
    if (num > 100) break;
    console.log(num); // 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89
}

// ----------------------------------------
// 4. ПРОДВИНУТЫЕ ПРИМЕРЫ
// ----------------------------------------

/**
 * Пример: Циклический итератор
 * Бесконечно перебирает элементы массива по кругу
 */
class CyclicIterator {
    constructor(array) {
        this.array = array;
        this.index = 0;
    }

    [Symbol.iterator]() {
        return {
            next: () => {
                if (this.array.length === 0) {
                    return { done: true };
                }
                
                const value = this.array[this.index];
                this.index = (this.index + 1) % this.array.length;
                return { value, done: false };
            }
        };
    }
}

// Использование CyclicIterator
const colors = new CyclicIterator(['red', 'green', 'blue']);
let count = 0;
for (const color of colors) {
    if (count++ > 5) break;
    console.log(color); // red, green, blue, red, green, blue
}

/**
 * Пример: Итератор случайных чисел
 * Генерирует случайные числа в заданном диапазоне
 */
class RandomIterator {
    constructor(min, max, count) {
        this.min = min;
        this.max = max;
        this.count = count;
        this.current = 0;
    }

    [Symbol.iterator]() {
        return {
            next: () => {
                if (this.current >= this.count) {
                    return { done: true };
                }
                
                const value = Math.floor(
                    Math.random() * (this.max - this.min + 1) + this.min
                );
                this.current++;
                return { value, done: false };
            }
        };
    }
}

// Использование RandomIterator
const random = new RandomIterator(1, 10, 5);
for (const num of random) {
    console.log(num); // Случайные числа от 1 до 10
}

// ----------------------------------------
// 5. ПРАКТИЧЕСКИЕ ЗАДАНИЯ
// ----------------------------------------

/**
 * Задание 1: Итератор для двумерного массива
 * Реализуйте функцию createMatrixIterator, которая создаст итератор
 * для перебора элементов двумерного массива
 */
function createMatrixIterator(matrix) {
    return {
        [Symbol.iterator]() {
            let row = 0;
            let col = 0;
            
            return {
                next() {
                    while (row < matrix.length) {
                        if (col < matrix[row].length) {
                            const value = matrix[row][col++];
                            return { value, done: false };
                        }
                        row++;
                        col = 0;
                    }
                    return { done: true };
                }
            };
        }
    };
}

// Проверка решения
const matrix = [[1, 2], [3, 4], [5]];
for (const value of createMatrixIterator(matrix)) {
    console.log(value); // 1, 2, 3, 4, 5
}

/**
 * Задание 2: Итератор с фильтрацией
 * Создайте итератор, который будет возвращать только чётные числа из массива
 */
function createEvenIterator(array) {
    return {
        [Symbol.iterator]() {
            let index = 0;
            
            return {
                next() {
                    while (index < array.length) {
                        const value = array[index++];
                        if (value % 2 === 0) {
                            return { value, done: false };
                        }
                    }
                    return { done: true };
                }
            };
        }
    };
}

// Проверка решения
const numbers = [1, 2, 3, 4, 5, 6];
for (const num of createEvenIterator(numbers)) {
    console.log(num); // 2, 4, 6
}

// ----------------------------------------
// 6. ДОПОЛНИТЕЛЬНЫЕ ЗАДАЧИ ДЛЯ ПРАКТИКИ
// ----------------------------------------

/**
 * TODO: Реализуйте следующие итераторы:
 * 1. Итератор, который возвращает только уникальные элементы массива
 * 2. Итератор, который возвращает элементы в обратном порядке
 * 3. Итератор, который объединяет элементы из нескольких массивов
 * 4. Итератор, который возвращает только элементы, удовлетворяющие условию
 */

// Пример структуры для решения
function createReverseIterator(array) {
    return {
        [Symbol.iterator]() {
            let index = array.length - 1;
            
            return {
                next() {
                    if (index >= 0) {
                        return { value: array[index--], done: false };
                    }
                    return { done: true };
                }
            };
        }
    };
}

function createUniqueIterator(array) {
    const seen = new Set();
    return {
        [Symbol.iterator]() {
            let index = 0;
            return {
                next() {
                    while (index < array.length) {
                        const value = array[index++];
                        if (!seen.has(value)) {
                            seen.add(value);
                            return { value, done: false };
                        }
                    }
                    return { done: true };
                }
            };
        }
    };
}

// Проверка
for (const value of createUniqueIterator([1, 2, 2, 3, 4, 4, 5])) {
    console.log(value); // 1, 2, 3, 4, 5
}
