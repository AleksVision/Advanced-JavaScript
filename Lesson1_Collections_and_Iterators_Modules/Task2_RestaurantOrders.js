/**
 * Класс управления заказами ресторана
 * Использует Map для хранения связей между блюдами, поварами и заказами
 */
class RestaurantManager {
    constructor() {
        // Инициализация Map коллекций
        this.dishToCookMap = new Map([
            ['Пицца Пепперони', 'Виктор'],
            ['Пицца Маргарита', 'Виктор'],
            ['Суши Калифорния', 'Ольга'],
            ['Тирамису', 'Дмитрий'],
            ['Чизкейк', 'Дмитрий']
        ]);
        
        this.orders = new Map();
        this.orderStatus = new Map();
    }

    addOrder(client, dishes) {
        if (!client?.name || !Array.isArray(dishes) || dishes.length === 0) {
            throw new Error('Некорректные данные заказа');
        }

        // Проверяем доступность блюд
        for (const dish of dishes) {
            if (!this.dishToCookMap.has(dish)) {
                throw new Error(`Блюдо "${dish}" отсутствует в меню`);
            }
        }

        this.orders.set(client.name, new Set(dishes));
        this.orderStatus.set(client.name, 'Принят');
        return this;
    }

    showOrders() {
        console.log('\nТекущие заказы:');
        for (const [clientName, dishes] of this.orders) {
            console.log(`\nКлиент: ${clientName} (Статус: ${this.orderStatus.get(clientName)})`);
            for (const dish of dishes) {
                const cook = this.dishToCookMap.get(dish);
                console.log(`- ${dish} (готовит ${cook})`);
            }
        }
    }
}

// Тестирование
try {
    const restaurant = new RestaurantManager();
    
    restaurant
        .addOrder({ name: 'Алексей' }, ['Пицца Пепперони', 'Тирамису'])
        .addOrder({ name: 'Мария' }, ['Суши Калифорния'])
        .showOrders();
} catch (error) {
    console.error('Ошибка:', error.message);
}