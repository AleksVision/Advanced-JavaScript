/* 
* Задание 1: Система управления метаданными книг
* =============================================
* Цель: Создать безопасный механизм добавления метаданных к книгам
*
* Что такое Symbol?
* ----------------
* Symbol - это уникальный и неизменяемый тип данных в JavaScript
* Он полезен, когда нам нужны гарантированно уникальные идентификаторы
* Пример: Symbol('name') !== Symbol('name') // всегда true
*/

// Создаем уникальные символы для разных типов метаданных
const reviewsSymbol = Symbol('reviews'); // Для хранения отзывов
const ratingSymbol = Symbol('rating');   // Для хранения оценок
const tagsSymbol = Symbol('tags');       // Для хранения тегов

/**
 * Добавляет метаданные к книге
 * @param {Object} book - Объект книги
 * @param {Symbol} symbol - Символ для типа метаданных
 * @param {any} value - Значение для добавления
 */
function addMetadata(book, symbol, value) {
    // Проверяем, существует ли массив метаданных
    if (!book[symbol]) {
        book[symbol] = [];
    }
    // Если передан массив, добавляем все его элементы
    if (Array.isArray(value)) {
        book[symbol] = [...book[symbol], ...value];
    } else {
        // Если передано одно значение, добавляем его
        book[symbol].push(value);
    }
}

/**
 * Получает метаданные книги
 * @param {Object} book - Объект книги
 * @param {Symbol} symbol - Символ для типа метаданных
 * @returns {Array} - Массив метаданных
 */
function getMetadata(book, symbol) {
    return book[symbol] || []; // Возвращаем массив или пустой массив
}

/**
 * Вычисляет средний рейтинг
 * @param {Array<number>} ratings - Массив оценок
 * @returns {string} - Средний рейтинг с одним знаком после запятой
 */
function getAverageRating(ratings) {
    if (!ratings || ratings.length === 0) return '0.0';
    return (ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length).toFixed(1);
}

// Пример использования
// ------------------

// Создаем книгу
let book = {
    title: 'Мастер и маргарита',
    author: 'Михаил Булгаков',
    year: 1967
};

// Добавляем разные типы метаданных
addMetadata(book, reviewsSymbol, 'Отличная книга!');
addMetadata(book, reviewsSymbol, 'Мой любимый роман');
addMetadata(book, ratingSymbol, 4.8);
addMetadata(book, ratingSymbol, 5.0);
addMetadata(book, tagsSymbol, ['Русская литература', 'Классика']);
addMetadata(book, tagsSymbol, 'Фантастика');

// Красивый вывод результатов
console.log('\n📚 === Информация о книге === 📚');
console.log(`📖 Название: ${book.title}`);
console.log(`✍️ Автор: ${book.author}`);
console.log(`📅 Год: ${book.year}`);

console.log('\n📝 === Метаданные === 📝');
console.log('💭 Отзывы:');
const reviews = getMetadata(book, reviewsSymbol);
reviews.forEach((review, index) => console.log(`   ${index + 1}. ${review}`));

console.log('\n⭐ Рейтинги:');
const ratings = getMetadata(book, ratingSymbol);
console.log(`   Все оценки: ${ratings.join(', ')}`);
console.log(`   Средний рейтинг: ${getAverageRating(ratings)} ⭐`);

console.log('\n🏷️ Теги:');
const tags = getMetadata(book, tagsSymbol);
console.log(`   ${tags.join(', ')}`);// Создаем массив для хранения всех книг
const books = [];

// Функция для создания новой книги
function createBook(title, author, year) {
    return {
        title,
        author,
        year
    };
}

// Функция для вывода информации о книге
function printBookInfo(book) {
    console.log('\n📚 === Информация о книге === 📚');
    console.log(`📖 Название: ${book.title}`);
    console.log(`✍️ Автор: ${book.author}`);
    console.log(`📅 Год: ${book.year}`);

    console.log('\n📝 === Метаданные === 📝');
    console.log('💭 Отзывы:');
    const reviews = getMetadata(book, reviewsSymbol);
    reviews.forEach((review, index) => console.log(`   ${index + 1}. ${review}`));

    console.log('\n⭐ Рейтинги:');
    const ratings = getMetadata(book, ratingSymbol);
    console.log(`   Все оценки: ${ratings.join(', ')}`);
    console.log(`   Средний рейтинг: ${getAverageRating(ratings)} ⭐`);

    console.log('\n🏷️ Теги:');
    const tags = getMetadata(book, tagsSymbol);
    console.log(`   ${tags.join(', ')}`);
}

// Создаем книги
const book1 = createBook('Мастер и маргарита', 'Михаил Булгаков', 1967);
const book2 = createBook('Преступление и наказание', 'Фёдор Достоевский', 1866);

// Добавляем метаданные к первой книге
addMetadata(book1, reviewsSymbol, 'Отличная книга!');
addMetadata(book1, ratingSymbol, 4.8);
addMetadata(book1, tagsSymbol, ['Русская литература', 'Классика']);

// Добавляем метаданные ко второй книге
addMetadata(book2, reviewsSymbol, 'Великое произведение!');
addMetadata(book2, ratingSymbol, 4.9);
addMetadata(book2, tagsSymbol, ['Русская классика', 'Психологический роман']);

// Добавляем книги в массив
books.push(book1, book2);

// Выводим информацию о всех книгах
books.forEach((book, index) => {
    console.log(`\n=== Книга ${index + 1} ===`);
    printBookInfo(book);
});