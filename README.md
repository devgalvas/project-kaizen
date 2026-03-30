Your existing classes (kept and improved):
User, Task (abstract), Habit, Mission, Achievement, Item, Inventory, DifficultyEnum — all good, just refined with better attributes and methods.
New classes I added (to reach 10 and improve the design):

SkillTree — you mentioned "skill trees" as a core feature (Programação, Fitness, Finanças). This becomes a real class with a relationship to User.
SkillNode — each node inside a skill tree. This gives you a natural Composite pattern opportunity (nodes can have prerequisites, forming a tree).
Notification — your scope document explicitly mentions WhatsApp Business API and Google Calendar. This class represents a notification event sent to the user (level-up alerts, check-in reminders), with a channel field to distinguish email/WhatsApp/push.
Reward — your scope mentions a "store where users spend coins". This is a separate concept from Item (an Item is something owned; a Reward is something purchasable from the shop).

New enums:

AreaEnum — INTELLECTUAL, PHYSICAL, SPIRITUAL (which you already had as subclasses of Task — better as an enum attached to Habit and SkillTree).
RarityEnum — COMMON, RARE, EPIC, LEGENDARY for items.

Interface:

Cloneable (with clone() and createDefault()) — you already had the Prototype pattern partially drawn in your .dia file. Making it explicit via an interface is cleaner.

Design patterns used:

Prototype — Task implements Cloneable, letting you clone daily mission templates.
Composite — SkillTree contains SkillNode objects that can have prerequisites (nodes referencing other nodes).
Strategy (implicit) — getBonus() on Task can vary by subtype without needing a separate class for now.