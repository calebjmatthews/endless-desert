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
  - Group leaders can equip clothing, a pack (that goes on the back), and a tool. These can affect their quantity of products created, quality of products created, amount of resources consumed when creating a product, bonus when entertaining the town, speed when traveling to an exploration site, ability to disarm traps when exploring, and resilience to damage when exploring
  - Group-specific happiness influenced by quality of house; kind and quality of food, drink, clothing, presence of cats, and treasure; desirability of job. Happiness has a large effect on work performance, is displayed prominently, and can lead to special events.
  - Groups can be assigned to a specific building, which will dramatically increase the output of the building. Otherwise buildings are run by generic citizens (if the building has that capability). Buildings that produce artisan goods or an entertainment bonus can't be run by citizens.
  - Sunset gradient: #f58f7d @ 0, #6a41b4 @ 67, #0034aa @ 100
  - Chemistry research for Perfumery, need original perfume to be able to duplicate
  - Logistics research that increases building output if located next to the source of its consumption resources
  - Logistics research that increases output if group leader lives next to where he/she is working

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

Research options:
  - Scholarship:
    - Use knowledge
    - Use any material
    - Use water
    - Use lentils + water
    - Use any field notes
  - General:
    - Take a break: get new options
    - Reconsider progress: go back one step in exchange for twice value in knowledge (min 10)
    - Use knowledge for an extra option for remainder of research
    - Use knowledge (proportional)
    - Use high knowledge to produce field notes
    - Use high knowledge + field notes to reveal hidden research
    - Use food (proportional)
    - Use coffee
  - Botany
    - Use lentils
    - Use seeds
    - Use water
    - Use any plant
    - Use sand
    - Use clay
    - Use field notes on landscape
    - Use field notes on plants
    - Use field notes on animals

Research option flow:
  - Pull the options specific to the research, then the options for its category and difficulty
  - Remove the options that have already been used as part of this research
  - Look at the number of remaining steps: if there are <= steps as research-specific options, only choose from those
  - If there are >, choose from any in the pool
  - If there are no options remaining in the pool, restore all previously used options

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

Research:
  - Study action, inspect an item that has not been studied before to gain knowledge
  - Analyse action, Gain knowledge by destroying a resource and studying its parts
  - Field notes are brought back by explorers, even when an exploration fails. There are also ways of gathering field notes about the town itself. Example field notes are "Notes on the Western Stars", "Notes on the Waning Moon", "Notes on Flowing Water", "Notes on Caves Beneath the Sand", etc.

Tabs:
  - Map, showing locations of each building and the river running through the middle
  - Buildings, with an expandable list of buildings with the resources consumed/produced by each
    - Section headers with the category of building (Service?, Agriculture, Artisan???)
    - Resources consumed/rate (vertically scrolling if more than one)
    - Resources produced/rate
    - Production % and issue if less than 100%
  - Resources, with a list of all items and their current production rate
  - Leaders, with a list of each team and their current activity
  - Research, with current research (if active) and research options (if not active)
    - Current activity button/display, when clicked gives options:
      - Study: Inspect an item that has not been studied before to gain knowledge
      - Analyse: Gain knowledge by destroying a resource and studying its parts
    - Research map
  - Exploration, with current expedition (if active) and expedition options (if not active)
  - The Dreaming, with a map for each of the temporary settlements made in The Dreaming

Starting game state:
  - Buildings: one trading post, one hut, one cistern, one lentil field

Example game state:
  - Buildings: one town center, four houses, one cistern, one lentil field, two wheat field, one oxen pasture, one fish pond, three reed deltas, one clay pit, two sand pits, one dairy, three kitchens, two drying yards, one furnace, one glassblower, one amphitheatre
  - Initial products are: 110 water, 11 lentils, 11 wheat, 11 oxen, 11 fish, 33 reeds, 11 clay, 22 sand
  - Intermediate consumption is: 10 water -> 11 lentils, 20 water -> 22 wheat, 30 water + 10 wheat -> 11 oxen, 10 water -> 11 fish, 2 oxen + 5 water -> 16 cheese, 10 lentils + 2 water + 2 reeds -> 11 lentil soup, 10 wheat + 2 water + 2 reeds -> 11 bread, 10 fish + 2 reeds -> 11 baked fish, 10 reeds -> 11 roofing, 10 reeds -> 11 papyrus, 10 clay -> 11 bricks, 10 sand + 2 reeds -> 11 glass, 10 glass + 2 reeds -> 16 lenses
  - Final products are -19 water, 1 lentils, 2 wheat, 9 oxen, 1 fish, 3 reeds, 1 clay, 12 sand, 6 cheese, 1 lentil soup, 1 bread, 1 baked fish, 11 papyrus, 11 roofing, 11 clay bricks, 1 glass, 16 lenses
  - Four groups are eating cheese, lentil soup, bread, baked fish, and drinking water; one exploring, one cheese making, one lens crafting, one playing music.

Calculating timestep:
  - "Hourglass" class used to calculate tick related events
  - Production/consumption always calculated using a diff between two timestamps
  - P/C sets for buildings have a "tier" which is determined by the complexity of the resources they're consuming, one higher than the highest tiered resource that went into its production. For example, a cistern has a tier of 0 because it consumes nothing to produce water. Bread has a tier of 2, because it consumes water (tier 0, ignored) and wheat (tier 1, increased by 1)
  - The effective rates of all buildings are calculated, relative to the resources available, and this rate is stored and used until one or more buildings are changed. Lower tiered products are given priority. For example, if there was not enough water to fulfill all buildings, a kitchen could be producing bread at 100% capacity but another kitchen could only be producing honeyed bread at 67% capacity (assuming 2/min water was available out of 3/min water requirement)
  - When calculating larger timestamp durations (>10 seconds), if one or more resources have a negative production the hourglass will calculate what % of the diff the building can operate before its resource is exhausted, and this will be set as the end of the end of the calculation. Another calculation will be performed with the remainder of the time, treating the stockpile of the resource as exhausted
