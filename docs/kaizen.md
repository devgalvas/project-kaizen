classDiagram
  class User {
    -String id
    -String username
    -String email
    -String passwordHash
    -Date createdAt
    -User[] friends
    +create(username, email, password)$ User
    +verifyPassword(plain) boolean
    +addFriend(user User) void
  }

  class Avatar {
    -String id
    -int level
    -int currentXP
    -int totalXP
    -int coins
    +gainXP(amount int) void
    +levelUp() void
    +getXPToNextLevel() int
  }

  class Task {
    -String id
    -String title
    -String description
    -int xpReward
    -DifficultyEnum difficulty
    -Date dueDate
    -boolean isCompleted
    +complete() void
    +getBonus() int
    +clone() Task
    +displayInfo() void
  }

  class Mission {
    -int coinReward
    -boolean isDaily
    -Task[] tasks
    +addTask(task Task) void
    +complete() void
    +getBonus() int
    +clone() Task
  }

  class Habit {
    -int streak
    -Date lastCheckedIn
    -AreaEnum area
    +checkIn() void
    +complete() void
    +getBonus() int
    +clone() Task
  }

  class Achievement {
    -String id
    -String name
    -String description
    -String medal
    -int xpReward
    -Date unlockedAt
    -boolean unlocked
    +unlock() void
    +isUnlocked() boolean
  }

  class Inventory {
    -String id
    -Item[] items
    -Achievement[] achievements
    -int capacity
    +addItem(item Item) void
    +removeItem(id String) void
    +addAchievement(a Achievement) void
  }

  class Item {
    -String id
    -String name
    -String description
    -RarityEnum rarity
    -int price
    +purchase(avatar Avatar) boolean
    +getDescription() String
  }

  class SkillTree {
    -String id
    -String name
    -AreaEnum area
    -String[] unlockedNodes
    -int totalNodes
    +unlockNode(nodeName String) void
    +getProgress() float
    +isCompleted() boolean
  }

  class Notification {
    -String id
    -String message
    -String type
    -String channel
    -Date sentAt
    -boolean sent
    +send() void
    +schedule(date Date) void
  }

  User "1" *-- "1" Avatar : owns
  User "1" *-- "1" Inventory : owns
  User "1" o-- "*" Task : creates
  User "1" o-- "*" SkillTree : tracks
  User "1" o-- "*" Notification : receives

  Mission --|> Task : extends
  Habit --|> Task : extends

  Inventory "1" *-- "*" Item : holds
  Inventory "1" *-- "*" Achievement : holds

  Item "*" --o "1" Inventory : belongs to
