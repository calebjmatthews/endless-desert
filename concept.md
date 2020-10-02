Incremental idle game about exploration and discovery in an endless desert

Ideas:
  - Basic resources: water, reeds, clay, sand, influence as currency.
  - Foods: Wheat, lentils, figs, dates, fish, bread, beer, onions, garlic, cheese, butter, spices.
  - Animals: Oxen, hens, fish, scarabs (for dye), cats.
  - Manufacturing: Press reeds into papyrus, roofing, or linen; smelt sand into glass lenses or bottles; form clay into bricks or jars.
  - Trading system with shifting prices to acquire iron, copper, various coins, ivory, wine, silk, wool, jade, tea, porcelain, honey, and gunpowder.
  - Research system that uses lenses to break down any item into concepts, ties together concepts into a completed theory. Research categories: philosophy (general knowledge), botany (farming), zoology (ranching), anthropology (music, entertainment, culture), physics (crafting), astrology (new exploration areas), chemistry (crafting), exaltation (mysteriously enhancing humans), and mysticism (contact with beings from another plane).
  - Find artifacts by sending out teams of explorers.
  - Groups lead by a named character with various traits that can be persuaded to stay in your settlement by using up influence or gifts.
  - Group leaders have a favorite food, favorite activity, and a secret wish. Fulfilling the secret wish gives a permanent boost to happiness.
  - Group-specific happiness influenced by quality of house; kind and quality of food, drink, clothing, presence of cats, and treasure; desirability of job. Happiness has a large effect on work performance, is displayed prominently, and can lead to special events.
  - Groups can be assigned to a specific building, which will dramatically increase the output of the building. Otherwise buildings are run by generic citizens (if the building has that capability). Buildings that produce artisan goods or an entertainment bonus can't be run by citizens.

Where is the bottleneck?
  - Creation of basic resources should be based on buildings (rather than working groups), with specialty goods for limited use or trade created by groups.
  - It should be relatively easy to sustain an existing settlement, and easy to expand by adding buildings, but without much value to be gained by stockpiling huge numbers of basic resources. Adding new groups should be difficult, and trading should have relatively low maximum numbers of resources, so the player cannot succeed by trading huge quantities of sand, for example.
  - Advanced products should require a mix of intermediate resources that come from the town and resources that have to be traded for.

Researches (see spredsheet):
- Start with:
  - Philosophy
    - Analysis
    - Botany
      - Lentil Farming
      - Reed Trenching
    - Physics
      - Hut Construction
      - Cistern Water Storage
      - Clay Digging
- Philosophy
  - Analysis: Break down new item to gain knowledge
  - Botany
    - Lentil Farming
      - Simplified Lentil Farming
    - Reed Growth
  - Zoology
  - Anthropology
    - Music
    - Theatre
    - Festivals
  - Physics
    - Basic Construction
    - Water Storage
    - Clay Excavation
    - Sand Excavation
    - Water Condensation
  - Chemistry
    - Cooking
    - Clay Seals: Decreased water usage when cooking
  - Astrology
  - Exaltation
    - Questline around magic lamp with Djinn inside
  - Mysticism

Leaders:
- Favorite activity: exploration, Secret wish: to learn what happened to their mother (exploration/mysticism quests)
- Favorite activity: exploration, Secret wish: to see the legendary crystal sea
- Favorite activity: animal husbandry, Secret wish: to own a cat
- Favorite activity: animal husbandry, Secret wish: to raise a sun ox
- Favorite activity: entertainment, Secret wish: to play music at a year's end festival
- Favorite activity: entertainment, Secret wish: to fly [via transformation into a bird]
- Favorite activity: cooking, Secret wish: to eat every kind of dish
- Favorite activity: cooking, Secret wish: to live in the same city as [other leader]
- Favorite activity: crafting, Secret wish: to weave an exquisite tapestry
- Favorite activity: crafting, Secret wish: to wear a robe of golden thread

Caches:
- Give random amounts of relics and valuable resources
- After creating a new file an "Heirloom Cache" is available for super cheap ($0.50?)
- Otherwise a "Mysterious Cache" is available every week for $1 and a "Grand Cache" is available every month for $5. Grand Caches include a clue that leads to a unique mysticism research and series of explorations

Tabs:
- Map, showing locations of each building and the river running through the middle
- Buildings, with an expandable list of buildings with the resources consumed/produced by each
- Resources, with a list of all items and their current production rate
- Teams, with a list of each team and their current activity
- Research, with current research (if active) and research options (if not active)
- Exploration, with current expedition (if active) and expedition options (if not active)
- The Dreaming, with a map for each of the temporary settlements made in The Dreaming

Starting game state:
  - Buildings: one trading post, one house, one cistern, one lentil field

Example game state:
  - Buildings: one town center, four houses, one cistern, one lentil field, two wheat field, one oxen pasture, one fish pond, three reed deltas, one clay pit, two sand pits, one dairy, three kitchens, two drying yards, one furnace, one glassblower, one amphitheatre
  - Initial products are: 110 water, 11 lentils, 11 wheat, 11 oxen, 11 fish, 33 reeds, 11 clay, 22 sand
  - Intermediate consumption is: 10 water -> 11 lentils, 20 water -> 22 wheat, 30 water + 10 wheat -> 11 oxen, 10 water -> 11 fish, 2 oxen + 5 water -> 16 cheese, 10 lentils + 2 water + 2 reeds -> 11 lentil soup, 10 wheat + 2 water + 2 reeds -> 11 bread, 10 fish + 2 reeds -> 11 baked fish, 10 reeds -> 11 roofing, 10 reeds -> 11 papyrus, 10 clay -> 11 bricks, 10 sand + 2 reeds -> 11 glass, 10 glass + 2 reeds -> 16 lenses
  - Final products are -19 water, 1 lentils, 2 wheat, 9 oxen, 1 fish, 3 reeds, 1 clay, 12 sand, 6 cheese, 1 lentil soup, 1 bread, 1 baked fish, 11 papyrus, 11 roofing, 11 clay bricks, 1 glass, 16 lenses
  - Four groups are eating cheese, lentil soup, bread, baked fish, and drinking water; one exploring, one cheese making, one lens crafting, one playing music.
