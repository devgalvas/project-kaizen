// Enums para padronização de domínios
export enum DifficultyEnum { EASY = 'EASY', MEDIUM = 'MEDIUM', HARD = 'HARD' }
export enum AreaEnum { INTELLECTUAL = 'INTELLECTUAL', PHYSICAL = 'PHYSICAL', SPIRITUAL = 'SPIRITUAL' }
export enum RarityEnum { COMMON = 'COMMON', RARE = 'RARE', EPIC = 'EPIC', LEGENDARY = 'LEGENDARY' }

// 1. Notification
export class Notification {
    constructor(
        public id: string,
        public message: string,
        public type: string,
        public channel: string,
        public sentAt: Date = new Date(),
        public sent: boolean = false
    ) { }

    send(): void {
        this.sent = true;
        console.log(`[${this.channel}] Notificação enviada: ${this.message}`);
    }

    schedule(date: Date): void {
        this.sentAt = date;
    }
}

// 2. Item
export class Item {
    constructor(
        public id: string,
        public name: string,
        public description: string,
        public rarity: RarityEnum,
        public price: number
    ) { }

    purchase(avatar: Avatar): boolean {
        if (avatar.coins >= this.price) {
            avatar.coins -= this.price;
            return true;
        }
        return false;
    }

    getDescription(): string {
        return this.description;
    }
}

// 3. Achievement
export class Achievement {
    constructor(
        public id: string,
        public name: string,
        public description: string,
        public medal: string,
        public xpReward: number,
        public unlockedAt: Date | null = null,
        public unlocked: boolean = false
    ) { }

    unlock(): void {
        this.unlocked = true;
        this.unlockedAt = new Date();
    }

    isUnlocked(): boolean {
        return this.unlocked;
    }
}

// 4. Inventory
export class Inventory {
    public items: Item[] = [];
    public achievements: Achievement[] = [];

    constructor(
        public id: string,
        public capacity: number = 20
    ) { }

    addItem(item: Item): void {
        if (this.items.length < this.capacity) {
            this.items.push(item);
        } else {
            throw new Error("Inventário cheio!");
        }
    }

    removeItem(id: string): void {
        this.items = this.items.filter(i => i.id !== id);
    }

    addAchievement(a: Achievement): void {
        this.achievements.push(a);
    }
}

// 5. Avatar
export class Avatar {
    constructor(
        public id: string,
        public level: number = 1,
        public currentXP: number = 0,
        public totalXP: number = 0,
        public coins: number = 0
    ) { }

    gainXP(amount: number): void {
        this.currentXP += amount;
        this.totalXP += amount;

        while (this.currentXP >= this.getXPToNextLevel()) {
            this.levelUp();
        }
    }

    levelUp(): void {
        this.currentXP -= this.getXPToNextLevel();
        this.level++;
    }

    getXPToNextLevel(): number {
        return this.level * 1000; // Curva de evolução base
    }
}

// 6. SkillTree
export class SkillTree {
    public unlockedNodes: string[] = [];

    constructor(
        public id: string,
        public name: string,
        public area: AreaEnum,
        public totalNodes: number
    ) { }

    unlockNode(nodeName: string): void {
        if (!this.unlockedNodes.includes(nodeName)) {
            this.unlockedNodes.push(nodeName);
        }
    }

    getProgress(): number {
        return this.totalNodes > 0 ? (this.unlockedNodes.length / this.totalNodes) * 100 : 0;
    }

    isCompleted(): boolean {
        return this.unlockedNodes.length >= this.totalNodes;
    }
}

// 7. Base Task (Classe Abstrata)
export abstract class Task {
    constructor(
        public id: string,
        public title: string,
        public description: string,
        public xpReward: number,
        public difficulty: DifficultyEnum,
        public dueDate: Date | null = null,
        public isCompleted: boolean = false
    ) { }

    complete(): void {
        this.isCompleted = true;
    }

    displayInfo(): void {
        console.log(`[Task] ${this.title} | XP: ${this.xpReward} | Status: ${this.isCompleted ? 'Concluída' : 'Pendente'}`);
    }

    // Padrão Prototype e Estratégia
    abstract getBonus(): number;
    abstract clone(): Task;
}

// 8. Mission (Especialização de Task)
export class Mission extends Task {
    public tasks: Task[] = []; // Composição de sub-tarefas

    constructor(
        id: string,
        title: string,
        description: string,
        xpReward: number,
        difficulty: DifficultyEnum,
        dueDate: Date | null,
        public coinReward: number,
        public isDaily: boolean = true
    ) {
        super(id, title, description, xpReward, difficulty, dueDate);
    }

    addTask(task: Task): void {
        this.tasks.push(task);
    }

    // Polimorfismo: Completar a missão completa todas as sub-tarefas
    override complete(): void {
        super.complete();
        this.tasks.forEach(t => t.complete());
    }

    getBonus(): number {
        return this.coinReward * 2; // Bônus multiplicador por ser Missão
    }

    clone(): Mission {
        return new Mission(
            this.id + "_clone", this.title, this.description,
            this.xpReward, this.difficulty, this.dueDate,
            this.coinReward, this.isDaily
        );
    }
}

// 9. Habit (Especialização de Task)
export class Habit extends Task {
    constructor(
        id: string,
        title: string,
        description: string,
        xpReward: number,
        difficulty: DifficultyEnum,
        public area: AreaEnum,
        public streak: number = 0,
        public lastCheckedIn: Date | null = null
    ) {
        super(id, title, description, xpReward, difficulty, null);
    }

    checkIn(): void {
        this.lastCheckedIn = new Date();
        this.streak++;
    }

    // Polimorfismo: Concluir o hábito exige um check-in
    override complete(): void {
        this.checkIn();
        super.complete();
    }

    getBonus(): number {
        return this.streak * 10; // Bônus escalável com a ofensiva
    }

    clone(): Habit {
        return new Habit(
            this.id + "_clone", this.title, this.description,
            this.xpReward, this.difficulty, this.area,
            this.streak, this.lastCheckedIn
        );
    }
}

// 10. User (Entidade Raiz)
export class User {
    public friends: User[] = [];
    public tasks: Task[] = [];
    public skillTrees: SkillTree[] = [];
    public notifications: Notification[] = [];

    constructor(
        public id: string,
        public username: string,
        public email: string,
        public passwordHash: string,
        public createdAt: Date,
        public avatar: Avatar,       // Composição 1:1
        public inventory: Inventory  // Composição 1:1
    ) { }

    static create(username: string, email: string, passwordHash: string, avatar: Avatar, inventory: Inventory): User {
        return new User(
            crypto.randomUUID(),
            username,
            email,
            passwordHash,
            new Date(),
            avatar,
            inventory
        );
    }

    verifyPassword(plain: string): boolean {
        // Na prática, isso seria delegado ao bcrypt importado em hash.ts
        return true;
    }

    addFriend(user: User): void {
        const isAlreadyFriend = this.friends.some(f => f.id === user.id);
        if (!isAlreadyFriend) {
            this.friends.push(user);
        }
    }
}