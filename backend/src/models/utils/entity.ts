// 1. Classe de Notificação (Base para alertas de WhatsApp/Push)
export class Notification {
    constructor(
        public id: string,
        public message: string,
        public type: 'WHATSAPP' | 'APP',
        public sentAt: Date = new Date()
    ) { }
}

// 2. Classe Item (Produtos da loja de recompensas)
export class Item {
    constructor(
        public id: string,
        public name: string,
        public price: number,
        public rarity: 'COMMON' | 'RARE' | 'LEGENDARY'
    ) { }
}

// 3. Classe RewardStore (Agregação de itens)
export class RewardStore {
    private items: Item[] = [];
    constructor(public id: string) { }

    addItem(item: Item): void { this.items.push(item); }
    getItems(): Item[] { return this.items; }
}

// 4. Classe Achievement (Conquistas desbloqueadas)
export class Achievement {
    constructor(
        public id: string,
        public title: string,
        public unlockedAt: Date = new Date()
    ) { }
}

// 5. Classe base abstrata Task (Generalização)
export abstract class Task {
    constructor(
        public id: string,
        public title: string,
        public xpReward: number,
        public isCompleted: boolean = false
    ) { }
    abstract complete(): void;
}

// 6. Classe Habit (Especialização de Task)
export class Habit extends Task {
    constructor(
        id: string,
        title: string,
        xpReward: number,
        public streak: number = 0
    ) { super(id, title, xpReward); }

    complete(): void {
        this.isCompleted = true;
        this.streak++;
    }
}

// 7. Classe DailyTask (Especialização de Task)
export class DailyTask extends Task {
    constructor(
        id: string,
        title: string,
        xpReward: number,
        public dueDate: Date
    ) { super(id, title, xpReward); }

    complete(): void { this.isCompleted = true; }
}

// 8. Classe SkillNode (Parte da Árvore de Habilidades)
export class SkillNode {
    constructor(
        public id: string,
        public name: string,
        public isUnlocked: boolean = false
    ) { }
}

// 9. Classe Avatar (O personagem que evolui)
export class Avatar {
    private achievements: Achievement[] = [];
    constructor(
        public id: string,
        public level: number = 1,
        public xp: number = 0,
        public coins: number = 0
    ) { }

    addAchievement(a: Achievement): void { this.achievements.push(a); }
}

// 10. Classe User (Entidade Raiz - Composição)
export class User {
    private tasks: Task[] = [];
    private notifications: Notification[] = [];

    constructor(
        public id: string,
        public username: string,
        public email: string,
        public avatar: Avatar // Composição 1:1
    ) { }

    addTask(task: Task): void { this.tasks.push(task); }
    receiveNotification(n: Notification): void { this.notifications.push(n); }
}