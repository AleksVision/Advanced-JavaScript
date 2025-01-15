/*Задание 2 (тайминг 20 минут)
Используя Symbol.iterator, создайте объект "Библиотека", который можно итерировать.
Каждая итерация должна возвращать следующую книгу из библиотеки.
1.
Создайте объект library, который содержит массив книг и имеет свойство-символ
2.
3.
Symbol.iterator.
Реализуйте кастомный итератор для объекта library. Итератор должен перебирать книги по порядку.
Используйте цикл for...of для перебора книг в библиотеке и вывода их на консоль.
Массив книг
const books = [
{ title: "1984", author: "George Orwell" },
{title: "Brave New World", author: "Aldous Huxley" }, { title: "Fahrenheit 451", author: "Ray Bradbury" }
*/
//ШАГ 1: Создание объекта "Библиотека"
//Создадим объект library, который содержит массив книг и имеет свойство-символ Symbol.iterator. 
const library = {
    books: [
        { title: "1984", author: "George Orwell" },
        { title: "Brave New World", author: "Aldous Huxley" },
        { title: "Fahrenheit 451", author: "Ray Bradbury" }
    ],

    //ШАГ 2: Реализация кастомного итератора
    //Я создам кастомный итератор для объекта library, используя Symbol.iterator. 
    //Итератор будет перебирать книги по порядку.
    [Symbol.iterator] () {
        let index = 0;
        //Итератор должен возвращать объект с методом next(), который возвращает следующую книгу из библиотеки.
        return {
            next: () => {  //Метод next() должен возвращать объект с двумя свойствами: value и done.
                if (index < this.books.length) { //Если индекс меньше длины массива книг, возвращаем следующую книгу
                    return { value: this.books[index++], 
                    done: false }; //Свойство value содержит текущую книгу, а done - false
                } else {  //Если индекс больше или равен длине массива книг, возвращаем done: true
                    return { done: true };  //Свойство done равно true, когда итерация завершена
                }
            }
        };
    }
};

//ШАГ 3: Использование цикла for...of для перебора книг в библиотеке и вывода их на консоль
//Перебор книг в библиотеке и вывод на консоль
console.log('\n📚 === Список книг в библиотеке === 📚\n');
for (const book of library) {
    console.log(`📖 Название: "${book.title}"`);
    console.log(`✍️ Автор: ${book.author}`);
    console.log('------------------------');
}