# Урок 1: Коллекции, итераторы и модули в JavaScript

## Содержание
1. Коллекции: Map, Set, WeakMap, WeakSet
2. Итераторы: for...of и создание своих итераторов
3. Модули: Экспорт и импорт

## Как работать с этим уроком
1. Читайте материал последовательно
2. Пробуйте запускать все примеры кода
3. Выполняйте практические задания
4. Изучайте дополнительные материалы по ссылкам

## 1. Коллекции в JavaScript

### Map - умная записная книжка 📝

Представьте себе записную книжку, где вы можете записывать что угодно. Map - это именно такая "умная книжка" в JavaScript.

```javascript
// Создаём новую "записную книжку"
const userProfile = new Map();

// Записываем информацию
userProfile.set('имя', 'Анна');
userProfile.set('возраст', 25);
userProfile.set('любимыеЦвета', ['синий', 'зелёный']);

// Читаем информацию
console.log(userProfile.get('имя')); // Выводит: Анна
```

#### Чем Map лучше обычного объекта?
1. В Map ключом может быть что угодно, даже другой объект:
```javascript
const userObject = { id: 1 };
userProfile.set(userObject, 'Важная информация');
```

2. Легко узнать размер:
```javascript
console.log(userProfile.size); // Покажет количество записей
```

3. Удобно проверять наличие данных:
```javascript
if (userProfile.has('имя')) {
    console.log('Имя указано!');
}
```

### Set - коробка с уникальными предметами 📦

Set похож на коробку, где каждая вещь может быть только в одном экземпляре. Дубликаты автоматически игнорируются.

```javascript
// Создаём список тегов статьи
const tags = new Set();

// Добавляем теги
tags.add('javascript');
tags.add('программирование');
tags.add('javascript'); // Этот тег не добавится, так как он уже есть
tags.add('обучение');

console.log(tags); // Выведет только уникальные теги
```

#### Популярный пример: удаление дубликатов из массива
```javascript
const numbers = [1, 2, 2, 3, 3, 3, 4, 4, 4, 4];
const uniqueNumbers = [...new Set(numbers)];
console.log(uniqueNumbers); // [1, 2, 3, 4]
```

### WeakMap и WeakSet - умные помощники 🧹

WeakMap и WeakSet похожи на обычные Map и Set, но с одной особенностью: они не мешают JavaScript автоматически удалять неиспользуемые объекты для освобождения памяти.

#### Когда использовать WeakMap:
```javascript
// Представьте, что у вас есть система кэширования
let userObject = { id: 1, name: 'Анна' };
const cache = new WeakMap();

// Сохраняем результаты вычислений
cache.set(userObject, 'Результаты вычислений');

// Если userObject больше не используется:
userObject = null;
// JavaScript может автоматически очистить память
```

#### Практический пример WeakSet:
```javascript
// Отслеживание уже обработанных объектов
const processedItems = new WeakSet();
let item = { id: 1, data: 'важные данные' };

processedItems.add(item);

// Проверяем, был ли объект обработан
if (processedItems.has(item)) {
    console.log('Этот объект уже обработан');
}
```

## 2. Итераторы

### Цикл for...of - простой способ перебора элементов

```javascript
// Перебор массива
const fruits = ['яблоко', 'банан', 'апельсин'];
for (const fruit of fruits) {
    console.log(fruit);
}

// Перебор Map
const userProfile = new Map([
    ['имя', 'Иван'],
    ['возраст', 25]
]);

for (const [key, value] of userProfile) {
    console.log(`${key}: ${value}`);
}
```

### Создание своего итератора

```javascript
// Создаём объект с итератором для чисел Фибоначчи
const fibonacciIterator = {
    // Метод Symbol.iterator делает объект итерируемым
    [Symbol.iterator]() {
        let prev = 0, curr = 1;
        
        return {
            // Метод next() возвращает следующее значение
            next() {
                [prev, curr] = [curr, prev + curr];
                return { value: prev, done: false };
            }
        };
    }
};

// Используем наш итератор
for (const num of fibonacciIterator) {
    if (num > 100) break;
    console.log(num);
}
```

## 3. Модули

### Экспорт функций и переменных

```javascript
// math.js
export const sum = (a, b) => a + b;
export const multiply = (a, b) => a * b;

// Также можно экспортировать по умолчанию
export default class Calculator {
    // ...
}
```

### Импорт в другой файл

```javascript
// main.js
import Calculator, { sum, multiply } from './math.js';

console.log(sum(2, 3)); // 5
console.log(multiply(2, 3)); // 6

const calc = new Calculator();
```

## Практические задания

### Задание 1: Работа с Map
Создайте телефонную книгу, используя Map:
```javascript
const phoneBook = new Map();

// Добавьте контакты
phoneBook.set('Мама', '+7-123-456-78-90');
phoneBook.set('Папа', '+7-098-765-43-21');

// Найдите номер
console.log(phoneBook.get('Мама'));
```

### Задание 2: Работа с Set
Создайте список уникальных посетителей сайта:
```javascript
const visitors = new Set();

// Добавьте посетителей
visitors.add('user123');
visitors.add('admin');
visitors.add('user123'); // Дубликат

console.log(visitors.size); // 2
```

## Заключение

В этом уроке мы изучили:
1. Коллекции Map и Set для хранения данных
2. WeakMap и WeakSet для работы с объектами
3. Итераторы для перебора данных
4. Модули для организации кода

### Дополнительные материалы
- [MDN Web Docs: Map](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Map)
- [MDN Web Docs: Set](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Set)
- [MDN Web Docs: Итераторы и генераторы](https://developer.mozilla.org/ru/docs/Web/JavaScript/Guide/Iterators_and_Generators)

### Следующие шаги
1. Попрактикуйтесь с каждым типом коллекций
2. Создайте свои итераторы для разных задач
3. Попробуйте разделить существующий код на модули
