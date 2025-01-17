/* Задание 1
• Используя Symbol.iterator, создайте объект "Музыкальная коллекция", который можно итерировать. Каждая итерация должна возвращать следующий альбом из коллекции.

• Создайте объект musicCollection, который содержит массив альбомов и имеет свойство-символ Symbol.iterator. Каждый альбом имеет следующую структуру:

{
title: "Название альбома",
artist: "Исполнитель",
year: "Год выпуска"
}

• Реализуйте кастомный итератор для объекта musicCollection. Итератор должен перебирать альбомы по порядку.
• Используйте цикл for...of для перебора альбомов в музыкальной коллекции и вывода их на консоль в формате: Название альбома - Исполнитель (Год выпуска)
*/

// # Задание 1: Музыкальная коллекция

//Решение
// Создаем объект musicCollection, который содержит массив альбомов и имеет свойство-символ Symbol.iterator
const musicCollection = {
   // Массив альбомов
   albums: [
    { title: "The Dark Side of the Moon", artist: "Pink Floyd", year: "1973" },
    { title: "Back in Black", artist: "AC/DC", year: "1980" },
    { title: "Thriller", artist: "Michael Jackson", year: "1982" },
    { title: "The Wall", artist: "Pink Floyd", year: "1979" },
    { title: "Hotel California", artist: "Eagles", year: "1976" }
],
    // Реализация итератора
    [Symbol.iterator]() {
        let index = 0;
        const albums = this.albums;
        return {
            next() {
                if (index < albums.length) {
                    return { value: albums[index++], done: false };
                } else {
                    return { done: true };
                }
            }
        };
    }
};

// Перебор альбомов с помощью for...of
console.log('Музыкальная коллекция:');
for (const album of musicCollection) {
    console.log(`${album.title} - ${album.artist} (${album.year})`);
}