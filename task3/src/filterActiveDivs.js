/**
 * Задание 3: Фильтрация активных DOM элементов
 * ============================================
 * 
 * Задача:
 * Написать функцию для фильтрации div элементов с атрибутом data-active.
 * 
 * Проблема:
 * DOM коллекции (например, результат querySelectorAll) не являются массивами,
 * поэтому у них нет методов массивов (map, filter и т.д.).
 * 
 * Решение:
 * Используем Array.from для преобразования DOM коллекции в массив.
 * 
 * Пример HTML:
 * <div>Element 1</div>
 * <div data-active="true">Element 2</div>
 * <div>Element 3</div>
 * <div data-active="true">Element 4</div>
 */

/**
 * Фильтрует активные div элементы на странице
 * @returns {Array} Массив div элементов с атрибутом data-active
 */
function filterActiveDivs() {
    // Шаг 1: Получаем все div элементы на странице
    // querySelectorAll возвращает NodeList (не массив!)
    const divs = document.querySelectorAll('div:not(.result)');
    
    // Шаг 2: Преобразуем NodeList в массив и фильтруем
    // Array.from создает массив из DOM коллекции
    // filter оставляет только элементы с data-active
    const activeDivs = Array.from(divs).filter(div => div.hasAttribute('data-active'));
    
    // Шаг 3: Выводим результат в консоль для отладки
    console.log('Найдены активные элементы:', activeDivs);
    
    // Шаг 4: Отображаем результат на странице
    const result = document.getElementById('result');
    if (result) {
        result.innerHTML = `
            <h3>Результаты фильтрации:</h3>
            <p>Найдено активных элементов: ${activeDivs.length}</p>
            <p>Содержимое активных элементов:</p>
            <ul>
                ${activeDivs.map(div => `<li>${div.textContent}</li>`).join('')}
            </ul>
        `;
    }

    return activeDivs;
}

// Запускаем функцию после полной загрузки DOM
document.addEventListener('DOMContentLoaded', filterActiveDivs);