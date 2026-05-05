---
config:
  theme: dark
  look: neo
  layout: dagre
---
classDiagram
    class User {
        +UUID id
        +String email
        +String password
        +DateTime createdAt
        +syncCalendar()
    }

    class Avatar {
        +int level
        +int currentXP
        +int coins
        +updateProgress(xp int, coins int)
    }

    class ITask {
        <<Interface>>
        +execute()
        +getRewards()
    }

    class Habit {
        +int streak
        +Frequency frequency
        +checkIn()
    }

    class Daily {
        +DateTime dueDate
        +boolean isOverdue
    }

    class SkillTree {
        +String category
        +List nodes
        +unlockNode(nodeId)
    }

    class RewardStore {
        +List availableItems
        +processPurchase(user, item)
    }

    class Item {
        +String name
        +int price
        +Rarity rarity
        +applyEffect(avatar)
    }

    class Achievement {
        +String criteria
        +boolean isUnlocked
        +notifyUser()
    }

    class NotificationService {
        +sendWhatsApp(message)
        +pushNotification()
    }
    User "1" *-- "1" Avatar : possui
    User "1" *-- "*" ITask : gerencia
    Avatar "1" -- "*" SkillTree : progride
    ITask <|-- Habit : implementa
    ITask <|-- Daily : implementa
    User "1" --> "1" RewardStore : acessa
    RewardStore "1" o-- "*" Item : contém
    Avatar "1" -- "*" Achievement : conquista
    User "1" ..> NotificationService : utiliza