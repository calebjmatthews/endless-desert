# Endless Desert
Incremental idle game about exploration and discovery in an endless desert

ssh -i newsummer cmatthews@64.225.48.128
scp -i newsummer -r /Users/calebmatthews/endless-desert-server-deploy cmatthews@64.225.48.128:/home/cmatthews/

## Ideas:
  - Basic resources: water, reeds, clay, and sand.
  - Foods: Grain, lentils, figs, dates, goards, fish, bread, beer, onions, garlic, cheese, butter, spices (coriander, cinnamon, carob, garlic, chicory).
  - Animals: Ox, quail, fish, bees, scarabs (for dye), cats.
  - Manufacturing: Press reeds into papyrus, roofing, or linen; smelt sand into glass lenses or bottles; form clay into bricks or jars.
  - Trading system with shifting prices to acquire iron, copper, various coins, ivory, wine, silk, wool, jade, tea, porcelain, honey, wax, and gunpowder.
  - Research system that uses lenses to break down any item into concepts, ties together concepts into a completed theory. Research categories: philosophy (general knowledge), biology (farming), zoology (ranching), anthropology (music, entertainment, culture), physics (crafting), astrology (new exploration areas), chemistry (crafting), exaltation (mysteriously enhancing humans), and mysticism (contact with beings from another plane).
  - Find artifacts by sending out teams of explorers.
  - Groups lead by a named character with various traits that can be persuaded to stay in your settlement by using up influence or gifts.
  - Group leaders have a favorite food, favorite activity, and a secret wish. Fulfilling the secret wish gives a permanent boost to happiness.
  - Group leaders can equip clothing, a pack (that goes on the back), and a tool. These can affect their quantity of products created, quality of products created, amount of resources consumed when creating a product, bonus when entertaining the town, speed when traveling to an exploration site, ability to disarm traps when exploring, and resilience to damage when exploring.
  - Group-specific happiness influenced by quality of house; kind and quality of food, drink, clothing, presence of cats, and treasure; desirability of job. Happiness has a large effect on work performance, is displayed prominently, and can lead to special events.
  - Groups can be assigned to a specific building, which will dramatically increase the output of the building. Otherwise buildings are run by generic citizens (if the building has that capability). Buildings that produce artisan goods or an entertainment bonus can't be run by citizens.
  - Sunset gradient: #f58f7d @ 0, #6a41b4 @ 67, #0034aa @ 100
  - Day gradient?: linear-gradient(#009aaa, #a1ded0, #f5cb7d);
  - Night gradient?: linear-gradient(#2a196f, #2f1c94, #886eb1);
  - Chemistry research for Perfumery, need original perfume to be able to duplicate.
  - Logistics research that increases building output if located next to the source of its consumption resources.
  - Logistics research that increases output if group leader lives next to where he/she is working.
  - Product quality:
    - Products can have something akin to a critical success that produces a "fine" version of the resource.
    - A double-critical is also possible: 110% change of quality product would = 90% chance of "fine" and 10% change of "exquisite".
    - A "fine" product is worth 10x the value of a normal product, and has the sentence "It's of fine quality." added to the end of the description.
    - An "exquisite" product is worth 100x the vault of a normal product, and has "The quality is exquisite; this is fit for royalty!" added to the end of the description.
  - Exploring requires a specific set of provisions: initially this just includes food and drink, but later can include things like rope, medicine, shovels, camels, and special clothing.
  - Rendering extracts from various materials for perfumery/other uses
    - Rendering occurs at a crucible. The user can create a repeating pattern of ingredients, and each has set duration to render.
    - Rendering many things in a short time increases the crucible heat from gentle -> moderate -> strong -> incinerating, where a higher heat can produce a higher quality extract but has a higher chance of destroying the ingredient.
    -  Strong heat has the best ratio, and while incinerating technically has a higher chance to return a quality extract, it is almost certain to destroy the item.
    -  Perfumes/other products are created by account-specific combinations of extracts.
    -  Extract types include: Sweet (pink), Sour (green), Bitter (purple), Brackish (dark blue), Savory (orange), Spicy (red), Cooling (light blue), Herbal (green), Deep (shining yellow), Strange (shining purple), Rich (shining green), Airy (shining blue)
  - Somewhat hidden overall goal is to find the secret of undoing death, the quest for which cannot be tainted by killing. There could be a previous explorer (or duo?) who searched for the secret, and an elusive beast that has to willingly give you its eye.
  - Temporary settlements can be made in the Dreaming (the River of Pearls?), last 24 hours (?) before evaporating and allowing the player to claim one single resource.
    - These can have unusual resources, such as iron or wood.
    - They can also be unusually small or large.
    - Some way to apply extreme benefits, often with drawbacks. These could include:
      - Dream build time x 1000 in large island that is continuously shrinking
      - One resource production x 100 (but can't claim that resource)
      - Randomizing the output of resource with a subcategory
      - Broad availability of raw resources, but no leaders can be found
      - Buildings produce much more, but can only be built once and only work for an hour before vanishing
      - Highly beneficial trades arrive each hour, but must be completed within five minutes or the island vanishes
      - Leaders who are incredibly effective at a single task, and vanish after working for one hour
      - No resource can be claimed, but resources can be used towards a single dream expedition one of whose rewards can be claimed
  - Fortuities:
    - Entertainer will perform in settlement, in exchange for several options of items (food, drink, gold, etc)
    - Traveling scholar will offer progress in a started research, or a random research if none are started
    - Explorer offers to unusually good randomly generated expedition
    - Gain of small amount of unusual resource
    - Wanderer offers tip (+ Knowledge)
    - Natural phenomena (animal migration, plant blooming after rain, atrological event) with small knowledge gain and travel notes later
    - Exploring craftsman gives you blueprints
    - Crafting-type leader has an inspiration for a craft, and requires specific resources to create
  - Thief found stealing food/water at your settlement and can either be kicked out or allowed to stay, if allowed to stay will become a trader whose merchandise you can select
  - Building that refines sand into pure sand+subcategory resource
  - Cooking allows free-form selection of ingredients, produces Mistake if not valid recipe
  - Furnaces initially can use reeds as fuel, then require charcoal, then lenses (as a solar furnace)
  - Nearby kingdoms:
    - North: Relatively safe traveling before sea, where many travelers come from. Ruins of an Egypt-inspired kingdom obsessed with the afterlife, many of which disappeared in a single event.
    - East: Salt flats? Large, extant China-inspired kingdom with heavy bureaucracy and centers of learning.
    - South: River that ends in the town stretches away, ruins of a Japan-inspired kingdom dedicated to high art, may still exist in mirages. Clusters of sky-high bamboo-like "dry grass" that makes excellent fuel.
    - West: Mirages? Constant fires? Oceans made from glass? Hanging gardens?
  - Four gods:
    - Branching creation: bountiful, many-from-one. Cicada whose exuvia embody one trait and continue living.
    - Enduring creation: languid, perfection-from-mortality. Scorpion whose venom grants paralyzed eternal life and continually stings itself.
    - Merging creation: harmonious, one-from-many. Termite mound made of termites bonded to one another.
    - Detroying creation: wild, rebirth-from-death. Burying beetle that inters itself and is reborn from the tomb.

## Resource Subcategories:
  - Sand
    * Yellow: Savory   Rich Clay
    * Dune: Sweet      Rust Ore
    * Pale: Cooling    Pale Ore
    * Volcanic: Spicy  Dusty Ore
    * Coral: Brackish  Jade
    * Olivine: Herbal  Greenish Ore
    * Black: Bitter    Charcoal
    * Ochre: Sour      Seeds
    * Pure: None
    * Shining: Airy
    * Purple: Strange
    * Golden: Rich
    * Bone: Deep
  - Wood
    * Oak: Bitter
    * Rowan: Herbal
    * Walnut: Sour
    * Alder: Spicy
    * Maple: Sweet
    * Willow: Brackish
    * Ash: Savory
    * Spruce: Cooling
    * Mahogany: Rich
    * Mangrove: Strange
    * Ebony: Deep
    * Lignum Vitae: Airy
  - Herbs
    * Cinnamon: Savory
    * Carob: Sweet
    * Mint: Cooling
    * Peppercorn: Spicy
    * Salt: Brackish
    * Coriander: Herbal
    * Anise: Bitter
    * Sorrel: Sour
    * Saffron: Airy
    * Truffle: Strange
    * Melange: Rich
    * Taro: Deep
  - Gems
    * Jade: None
    * Amethyst: Cooling
    * Topaz: Savory
    * Jasper: Sour
    * Onyx: Bitter
    * Ruby: Spicy
    * Sapphire: Brackish
    * Emerald: Herbal
    * Diamond: Sweet
    * Moonstone: Airy
    * Opal: Strange
    * Alexandrite: Rich
    * Tanzanite: Deep
  - Produce
    * Lentil: Nothing
    * Grape: Cooling
    * Blueberry: Cooling
    * Squash: Savory
    * Tomato: Savory
    * Kumquat: Sour
    * Lemon: Sour
    * Spinach: Bitter
    * Radish: Bitter
    * Onion: Spicy
    * Chilli Pepper: Spicy
    * Potato: Brackish
    * Lotus Root: Brackish
    * Date: Sweet
    * Fig: Sweet

## Where is the bottleneck?
  - Creation of basic resources should be based on buildings (rather than working groups), with specialty goods for limited use or trade created by groups.
  - It should be relatively easy to sustain an existing settlement, and easy to expand by adding buildings, but without much value to be gained by stockpiling huge numbers of basic resources. Adding new groups should be difficult, and trading should have relatively low maximum numbers of resources, so the player cannot succeed by trading huge quantities of sand, for example.
  - Advanced products should require a mix of intermediate resources that come from the town and resources that have to be traded for.

## Broad gameplay tiers
  - Beginning: Should happen with almost non-existent wait times
    * Repair Cistern, Lentil Field, Study, and Huts
    * Samannoud joins
    * One other leader joins fortuitously
    * Research Scholarship, Study, Analysis, Biology, Lentil Farming, Anthropology, Trading, Physics, Home Construction
    * Three trading partners for early resources
    * Costs are Knowledge, Water, Lentils, Seeds
  - Early: Low knowledge requirements require occational analysing, costs sometimes require resources from trading
    * Research Reed Cultivation, Grain Farming, Olive Farming, Efficient Lentil Farming, Quail Husbandry, Physics, Clay Excavation, Sand Excavation, Compaction, Chemistry, Dehydration, Combustion, Cooking, Basic Education
    * Three more leaders: one from a trading partner, one random, one from research
    * One more trading partner from fortuity (after Basic Education)
    * Costs now include Sand, Clay, Reeds, Wood
  - Mid: Higher knowledge requirements require frequent analysing, costs require resources from crafting, fields notes, and more advanced trading
    * Research Observation (Field Notes), Keen Analysis (Analysis with lenses), Simplified Grain Farming, Simplified Olive Farming, Simplified Quail Husbandry, Ox Husbandry, Herb Farming, Quality Clay Excavation, Rapid Sand Excavation, Simplified Compaction, Improved Home Construction,  Weaving, Grinding, Tailoring (Clothing), Outfitting (Back Equipment), Tool Fabrication, Simplified Dehydration, Simplified Combustion, Ventilated Combustion, Bountiful Cooking, Glassblowing, Solvents (Laboratory), Pottery, Brewing, Astrology, Exploration, Exploration Locations (Four Different Researches), Mysticism, The Pathway through Smoke
    * Six more leaders: two from trading partners, one random, one from research, two from exploration¸
    * Two more trading partners, both from exploration
    * Six exploration areas, one initial, four from researches, one from previous exploration
    * Costs now include Field Notes, Bricks, Thatch, Papyrus, Glass, Iron, Artisan Goods, Food
  - Late: Research costs now require field notes and artifacts from exploration
    * Deep Analysis (Analysis with lenses, papyrus, and ink), Grape Farming, Flower Farming, Mulberry Farming, Bee Husbandry, Silkworm Husbandry, Performance, Neighboring Peoples, Further Education, Companionship (allows pets), Rapid Weaving, Mechanisms, Flowstone, Custom Home Construction, Winemaking, Distillation (Perfumery), Dyemaking, Sand Purification, Solar Combustion, The Yearning Obelisk, Exaltation, The River of Pearls
  - Deep: The Orchids Aspire

## Researches (see spredsheet):
- Start with:
  - Analysis
  - Biology
    - Lentil Farming
    - Reed Trenching
  - Physics
    - Hut Construction
    - Cistern Water Storage
    - Clay Digging
- Analysis: Break down new item to gain knowledge
- Biology
  - Lentil Farming: Upgrades simplify, then lower water usage and increase production
    - Simplified Lentil Farming
  - Reed Growth: Begins simplified, further upgrades lower water usage and dramatically increase production
  - Grain
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

## Research options:
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
  - Biology
    - Use lentils
    - Use seeds
    - Use water
    - Use any plant
    - Use sand
    - Use clay
    - Use field notes on landscape
    - Use field notes on plants
    - Use field notes on animals

## Research option flow:
  - Pull the options specific to the research, then the options for its category and difficulty
  - Remove the options that have already been used as part of this research
  - Look at the number of remaining steps: if there are <= steps as research-specific options, only choose from those
  - If there are >, choose from any in the pool
  - If there are no options remaining in the pool, restore all previously used options

## Option cost application:
  - If specificity is exact, deduct material at once
  - If specificity is tag or category, open resource selection modal
  - Check if all costs have been fulfilled, if so mark research completed and change component to "Finished!"
  - If not, add research option paid (research option name -> cost type) cost object to research options deck

## Resource selection:
  - Only show matching resources, sorted with highest quantity first
  - If only one matching resource exists, have it auto-selected
  - Can manually enter in quantity after selecting, but auto-fills to cost quantity

## Leaders:
  - Need open housing for leader+crew to move in
  - "Leaders" tab that shows each leader with equipment selection, what building they're assigned to
  - Section on buildings description to assign a leader
  - Changes to Hourglass method to account for leader happiness boost
  - Stats: Production+ category specific (animal husbandry, entertainment, cooking, etc), Production+ product specific (grain, glass, etc), Quality+ category specific, Quality+ resource specific, Efficiency+ (use less of consumed resources), Health+ for exploring, Trap resistance for exploring, Speed for exploring, Bonus rewards for exploring, Increase settlement happiness
  - Kinds:
    * Favorite activity: exploration, Secret wish: to learn what happened to their mother (exploration/mysticism quests)
    * Favorite activity: exploration, Secret wish: to see the legendary crystal sea
    * Favorite activity: animal husbandry, Secret wish: to own a cat
    * Favorite activity: animal husbandry, Secret wish: to raise a sun ox
    * Favorite activity: entertainment, Secret wish: to play music at a year's end festival
    * Favorite activity: entertainment, Secret wish: to fly [via transformation into a bird]
    * Favorite activity: cooking, Secret wish: to eat every kind of dish
    * Favorite activity: cooking, Secret wish: to live in the same city as [other leader]
    * Favorite activity: crafting, Secret wish: to weave an exquisite tapestry
    * Favorite activity: crafting, Secret wish: to wear a robe of golden thread
    * Old friend of player, first leader but then disappears
    * Old friend's second in command

## Caches:
  - Give random amounts of relics, which are resources used to construct cosmetics
  - After creating a new file an "Heirloom Cache" is available for super cheap ($0.50?)
  - Otherwise a "Mysterious Cache" is available every week for $1 and a "Grand Cache" is available every month for $5. Grand Caches include a clue that leads to a unique mysticism research and series of explorations that result in more relics

## Research:
  - Study action, inspect an item that has not been studied before to gain knowledge
  - Analyse action, Gain knowledge by destroying a resource and studying its parts
  - Field notes are brought back by explorers, even when an exploration fails. There are also ways of gathering field notes about the town itself. Example field notes are "Notes on the Western Stars", "Notes on the Waning Moon", "Notes on Flowing Water", "Notes on Caves Beneath the Sand", etc.
  - Research difficulty works as follows:
    - Easiest difficulty uses very small amounts of knowledge, water, and lentils
    - Easy difficulty uses small amounts of knowledge water, lentils, clay, sand, wood, and reeds
    - Moderate difficulty uses early refined materials such as glass and bricks, more advanced dishes, as well as papyrus and ink
    - Higher difficulty uses field notes and higher refined materials
    - High difficulty uses rarer field notes, high-quality dishes, complex refined materials, and rarer exploration rewards

## Traders:
  - Individual trader ideas:
    - European traders that give metals
    - Scholar pirates that receives knowledge, field notes, and parchment in exchange for gems, gold, and weapons
    - Exploring trader that receives food, drink, and exploration supplies
    - Treasure hunting trader that exchanges artifacts for different artifacts
    - Jeweler trader that receives jade and exchanges other gems
    - Royal trader that receieves large quantities of artisan goods in exchange for jade
    - Greenhouse trader that receives glass, clay, and fertilizer in exchange for crops, seeds, spices, and tools
    - Astronomer trader that receives lenses, parchment, field notes, and star maps in exchange for metal ore, chemicals
  - Very early traders: give seeds, wood, sand, clay; receive water, lentils, reeds
  - Early traders: receive thatch, olive oil, flour, bricks, glass, payrus
  - Middle traders: receive dishes, textiles, pottery, tools, field notes

## Equipment:
  - Tools: Apply happiness to production (heavy tools), quality (precise tools), or efficiency (long tools)
    * Building specific: mattock (generic - speed), implements (generic - quality), pole (generic - efficiency), dowsing rod (water), hoe (field-crop), shovel (pit-earth), weight (press-pressed), bellows (furnace-smelted), rake (dried-drying yard), pan (dish-kitchen), loom (textile), tongs (glassblower), needle (tailor), scissors (outfitter), hammer (fabricator)
    * Unique tools: Prismatic Shovel (X% chance sand harvested becomes any type), Temperate Char-bellows (Large increase in charcoal efficiency), Fervent Char-bellows (Large increase in charcoal quality, decrease in efficiency)
  - Clothing: Usually increases happiness or generic increases to production, quality, or efficiency
    * Ascetic's Robe: Decreases food and drink usage
    * Can be a broader category, rather than building specific: gatherer's tunic (water+pit), craftsman's apron (crafting)
  - Back: Effects are varied and have a negative element, but usually just a single effect per equipment
    * Journeyman's Haversack: + speed but - quality/efficiency
    * Journeyman's Gearbag: + efficiency but - quality/speed
    * Journeyman's Toolpack: + quality but - speed/efficiency
  - Effect ideas: + production but - efficiency, + quality but - production/efficiency, + efficiency but - production, decreased food consumption, increased Knowledge from studying/analysis, decreased build time, special fortuities, increased basic status but decreased happiness
  - Tiers of equipment are from 1 - 5, with probs as follows:
    * Basic unmarked equipment is 80% 1, 18% 2, 2% 3
    * Fine unmarked equipment is 80% 2, 18% 3, 2% 4
    * Exquisite unmarked equipment is 80% 3, 18% 4, 2% 5
  - Effect display for leaders combines identical effects, and shows the cumulative total of overlapping effects. For example: Speed +10%, Speed +5%, Drink Speed +10%, Water Speed +5% would give the final effects Speed +16%, Drink Speed +27%, and Water Speed +33%

## Cooking:
  - Any combination of five ingredients can be selected, quality is a sum of ingredient quality + a multiplier for the dish
  - Several things can be used as a main ingredient: Lentils, Quail, Fish, Onion, Dates
  - These create the psuedo resource type for the final dish resource according to the tag they fall into: for example Lentils are a vegetable, so a dish with Lentils, Milk, and Water would be called "Plain Lentil Soup", but would have the resource type of "Vegetable Soup" for the purposes of grouping and studying
  - Soup = Ingredient + Water
  - Bread = Grain + Water
  - Omelet = Ingredient + Egg + Water
  - Stew = Ingredient + Milk
  - Pie = Ingredient + Grain + Water
  - Cake = Ingredient + Grain + Milk + Egg
  - Oil and spice can be added to any recipe to increase value
  - Adjectives come from a spice used in the dish (or oil), then the main ingredient used in the dish. "Plain" is used if there is no spice or oil, "Tasty" is used if there is oil but no spice, and "Spiced" is used if there is more than one spice. For example, Lentils + Water + Olive Oil = "Tasty Lentil Soup", Fish + Grain + Water + Peppercorns = "Peppered Fish Pie", Onion + Egg + Water = "Plain Onion Omelet"

## Expeditions:
- Colossal underground "House of Form" produced honey that healed all sickness and sated all hunger, and had some method of existing in multiple locations at once (?); Various expeditions go to different locations within the House:
  - Gardens with reward of rare seeds and plant-related equipment
  - Library with knowledge-related rewards
  - Kitchens with recipes, rare ingredients, and cooking-related equipment

## Field Notes:
  - Required for many research options of difficulty 2 and higher
  - You can gain some Field Notes from observing buildings or the sky. These take 1000 knowledge, 400 papyrus, 80 ink, and 1 hour of study to produce
    -  Notes on the Boundless Sky (sky during day)
    -  Notes on Stars Beyond Counting (sky during night)
    -  Notes on Flowing Water (Cistern)
    -  Notes on the Reluctant Earth (Clay Pit, Sand Pit, Press, etc)
    -  Notes on Scintillating Heat (Drying Yard, Furnace, etc)
    -  Notes on Gentle Cultivation (Lentil Field, Quail Pen, etc)

## Tabs:
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

## Useful icons:
  Entypo: 500px (infinity), address (post), bell, flower, lab-flask, mask,
    round-brush, swarm (bee), lightbulb-cfl-spiral ()
  FontAwesome: leaf, bolt, building-o, beer, medkit, paw, diamond, snowflake
  FontAwesome5: anchor, ankh, archway, bahai, book-dead, broom, burn, campground, cat,
    carrot, cheese, chess, church, cloud, coins, crow, crown, dharmachakra, dice,
    disease, dna, dog, dove, dragon, drum, dungeon, egg, fan, fist, frog,
    gopuram (building), guitar, hamsa, hand, hat-wizard, hippo, holly-berry, horse,
    hospital, hotel, icicles, igloo, kaaba (building), kiwi-bird, landmark (building),
    lemon, meteor, monument, mortar-pestle, mug, om, otter, pastafarianism, pepper,
    spa, stroopwafel, theater, torii-gate, vihara (building)
  Flaticon:
    https://www.flaticon.com/packs/carpenter-27?k=1619116521843
    https://www.flaticon.com/packs/outdoor-landscape-2
    https://www.flaticon.com/packs/mandalas-5
    https://www.flaticon.com/packs/japan-52
    https://www.flaticon.com/packs/landmark-21
    https://www.flaticon.com/packs/prehistoric-age
    https://www.flaticon.com/packs/morocco-16

    <div>Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
    <div>Icons made by <a href="https://www.flaticon.com/authors/smashicons" title="Smashicons">Smashicons</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
    <div>Icons made by <a href="https://www.flaticon.com/authors/pixelmeetup" title="Pixelmeetup">Pixelmeetup</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
    <div>Icons made by <a href="https://www.flaticon.com/authors/roundicons" title="Roundicons">Roundicons</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
    <div>Icons made by <a href="https://www.flaticon.com/authors/dinosoftlabs" title="DinosoftLabs">DinosoftLabs</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
    <div>Icons made by <a href="https://www.flaticon.com/authors/surang" title="surang">surang</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
    <div>Icons made by <a href="https://www.flaticon.com/authors/photo3idea-studio" title="photo3idea_studio">photo3idea_studio</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
  Value symbol options: ѵ, ұ,

## Time cycle:
  - The desert transitions from day to night over the course of an hour.
  - Morning is from :00 - :15, day from :15 - :30, evening from :30 - :45, and night from :45 - :00
  - Night is from :50 - :05, morning from :05 - :20, day from :20 - :35, evening from :35 - :50.
  - Twenty four days consitute a month, and twenty eight to thirty one days consistute a year.

## Example game state:
  - Buildings: one town center, four houses, one cistern, one lentil field, two grain field, one oxen pasture, one fish pond, three reed deltas, one clay pit, two sand pits, one dairy, three kitchens, two drying yards, one furnace, one glassblower, one amphitheatre
  - Initial products are: 110 water, 11 lentils, 11 grain, 11 oxen, 11 fish, 33 reeds, 11 clay, 22 sand
  - Intermediate consumption is: 10 water -> 11 lentils, 20 water -> 22 grain, 30 water + 10 grain -> 11 oxen, 10 water -> 11 fish, 2 oxen + 5 water -> 16 cheese, 10 lentils + 2 water + 2 reeds -> 11 lentil soup, 10 grain + 2 water + 2 reeds -> 11 bread, 10 fish + 2 reeds -> 11 baked fish, 10 reeds -> 11 roofing, 10 reeds -> 11 papyrus, 10 clay -> 11 bricks, 10 sand + 2 reeds -> 11 glass, 10 glass + 2 reeds -> 16 lenses
  - Final products are -19 water, 1 lentils, 2 grain, 9 oxen, 1 fish, 3 reeds, 1 clay, 12 sand, 6 cheese, 1 lentil soup, 1 bread, 1 baked fish, 11 papyrus, 11 roofing, 11 clay bricks, 1 glass, 16 lenses
  - Four groups are eating cheese, lentil soup, bread, baked fish, and drinking water; one exploring, one cheese making, one lens crafting, one playing music.

## Calculating timestep:
  - "Hourglass" class used to calculate tick related events
  - Production/consumption always calculated using a diff between two timestamps
  - P/C sets for buildings have a "tier" which is determined by the complexity of the resources they're consuming, one higher than the highest tiered resource that went into its production. For example, a cistern has a tier of 0 because it consumes nothing to produce water. Bread has a tier of 2, because it consumes water (tier 0, ignored) and grain (tier 1, increased by 1)
  - The effective rates of all buildings are calculated, relative to the resources available, and this rate is stored and used until one or more buildings are changed. Resources will be used at 100% capacity until a required resource is exhaused
  - When calculating larger timestamp durations (>10 seconds), if one or more resources have a negative production the hourglass will calculate when the negative resource will run out, and then recalculate rates for that resource. The resource will be rounded down and set at 0 at this point
  - Example: Beginning with timestamp 2000, with Red Clay|0 running out at 2800 and Lentils|0 running out at 3200, and current timestamp of 4000. First soonestExhaustion at 2800, calculate results between 2000 and 2800. Inactivate buildings that use Red Clay|0 by recalculating rates, second soonestExhaustion at 3200 and calculate results between 2800 and 3200. Inactivate buildings that use Lentils|0 by recalculating rates and calculate results between 3200 and 4000.

## Building display:
  - Start by going through each building, and creating an array the building types with duplicates
  - Go through each building again, creating a display object that can be either a building group or a single building, with a building group for those with duplicates
  - Pull the building specific or building group rates from the rate reducer

## Beginning of game:
  - Some messages to introduce setting
    * "Rumors say anything can be found in the desert: ancient knowledge, buried jade, even a path back from the land of the dead. But perhaps it was foolish to run towards its center on your own."
    * "Your food and water are long gone, your breath gasping and your steps slow, when you find a ruined village."
  - Start with no tabs, just a single button that says "Look around". Clicking this displays another introductory message, unlocks the "Resources" and "Buildings" tabs, and gives a small quantity of water, lentils, seeds, clay, wood, and sand
    * "There are signs of conflict here: a shattered gate, broken doors, and ransacked huts. But there aren't any bodies. Maybe the villagers fled as the raiders approached. You find some meager leavings in the rubble."
  - Inside the "Buildings" tab have "Broken cistern", "Decaying study", "Ruined huts", "Fallow field", "Shattered dome", and "Abandoned market"
  - Second action is in the "Build" button: "Repair cistern", which creates the cistern building and gives a large amount of water
    * Repairing the broken cistern wasn't difficult, and the results are well worth it. Instead of streaming through the cracked side, water begins steadily filling the gigantic basin.
  - Third action: "Refurbish housing", which creates one hut and the study, and unlocks the "Research" tab
    * With some effort, you fix the broken doors, sweep out the sand, and patch the walls to keep out howling winds. There are now a handful of tiny but livable huts, and a small study you can use for your own purposes.
  - Fourth action: "Restore field", which creates one lentil field
    * You'd never tilled the ground before, and it wasn't pleasant. But there were enough leftover bags of seed and fallow lentil plants to make a productive field.
  - Event where one leader moves in and unlocks the "Leaders" tab
  - Action after researching "Trading": "Revamp market" which opens the "Trading" tab
  - Action after researching "Exploration" "Recreate gate" which opens the "Exploration" tab

## Music
  - Daily card-based minigame that creates a benefit that applies to your entire town for 36 hours.
  - Cards can be created from Inspiration; one is created from the daily performance.
  - Cards have positive and negative effects on resource rates, as well as directly increasing or decreasing resources. The can also affect research, building speed, and exploration.
  - Also, cards have meta-effects within the performance mini-game (draw cards, discard cards, retreive from discard, permanently create cards, permanently destroy cards).

## Hawk Bazaar
  - Hawk your wares!
  - One per day, send out a passenger hawk containing any quantity of a resource at a price set by the player
  - Use hawk scrip to send out more hawks than the single daily hawk
  - Buy as many things from the Hawk Bazaar as you wish
  - When sending out a hawk, see a suggested price based on the average of the last ten? successful trades, excluding outliers?, and lacking recent trades the total value of the resources to be traded

## Tips
  - Dishes make excellent trade goods. It can be useful to build a Kitchen, even before the town is producing enough ingredients to run it continuously.
  - As trading partners come to trust you, they will set aside a larger part of their caravan's capacity for you. This means larger trades are possible.
  - More complicated buildings require the skilled hand of a leader to keep them running. But as your research improves, you'll be able to build simplified versions that don't need a leader.
  - It's only possible to analyze 100 of anything at a time, and the more valuable something is the longer it takes to analyze. However, it might eventually be possible to analyze much faster.

## Value checking table
  - Should display current value, name, building that produces, computed value from rate of production + value of ingredients + value of building

## Styling:
  - Fine border:
    border-style: outset;
    border-width: 3px;
    border-color: #aecae0;
  - Fine text:
    color: #6a7791;
    text-shadow: 0px 0px 1px #a3bcdb;
  - Aroma tag:
    background-color: #fff
    border-color: #fff;
    box-shadow: 0 0px 5px 3px #ffffff6b;

## Play test
  [X] Repairing study and huts is too cheap
  [X] Repairing market should come before huts
  [X] Iron for grinding mill takes too long to acquire
  [X] Olive should be +4/m
  [X] Grain should be +20/m
  [X] Cooking should be +20/m
  [X] Leaders should begin with a tool, except for Da Nang
  [X] Can be frustrating to wait for usable trade, e.g. Ferrous Ink => Artisan Good
  [X] Multiple Crop types
  [X] Improved subcategories
  [X] Upgraded versions of Grain, Olive, Reed buildings
  [X] Paper from mill + press
  [X] Clay should be +6/m
  [X] Multiple Clay types
  [X] Multiple Sand types
  [X] New crops in trader pools
  [X] Resource selection for inexact building recipes
  [X] Multiple Seed types
  [X] Fix Android window height
  [X] Add study/research blacklist
  [X] Add Special resource category and plot item
  [ ] House into upgrade, rather than stand-alone
  [ ] Travel-ready food like salted meat, dried fruit, waybread
  [ ] Fortuity should grant ore, equipment, food
  [ ] Consistent rounding of numbers, probably floor() for formatting, so supply doesn't show "20" while upgrade shows insufficient "19"
  [ ] Consistent sorting in tabs/selection components
  [ ] Hide resources with <1 quantity in selection components
  [ ] Show resource descriptive name, not id name in selection components
  [ ] Show detail modals when pressing on icon, e.g. on buildings
  [ ] Olives before grain
  [ ] Fish before quail
  [ ] Fix for stuck without sand before trading unlocked
  [ ] Fix for building recipe un-selection when opening detail modal
  [ ] Trader trust to affect # of items
  [ ] Increase # of traders research
  [ ] Easier to gain first trading level
  [ ] Traders to use a mix of exact, tag, subcategory specificities
  [ ] Glassware to use cloth subcategory an ingredient
  [ ] Tool for Reed Deltas

## Commands
### Delete all records from all tables:
USE `endless_desert`;
DELETE FROM `buildings`;
DELETE FROM `buildings_construction`;
DELETE FROM `research_option_decks`;
DELETE FROM `research_status`;
DELETE FROM `timers`;
DELETE FROM `trading_status`;
DELETE FROM `vault`;
DELETE FROM `accounts`;
DELETE FROM `leaders`;
DELETE FROM `equipment`;
DELETE FROM `users`;
DELETE FROM `sessions`;

### Create user table:
CREATE TABLE `endless_desert`.`users` (
  `id` VARCHAR(8) NOT NULL,
  `email` VARCHAR(254) NOT NULL,
  `password` VARCHAR(256) NOT NULL,
  `registered_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`));

CREATE TABLE `endless_desert`.`sessions` (
  `id` VARCHAR(16) NOT NULL,
  `user_id` VARCHAR(8) NOT NULL,
  `expires_at` BIGINT(32) NOT NULL,
  PRIMARY KEY (`id`));

## Debug functions
### Get one of every basic equipment:
```
dispatch(increaseResources(vault,
  [new Resource({ type: (EQUIPMENT_TYPES.COARSE_IMPLEMENTS + " (Unmarked)"),
    quality: 0, quantity: 1 }),
  new Resource({ type: (EQUIPMENT_TYPES.JOURNEYMANS_GEARBAG + " (Unmarked)"),
    quality: 0, quantity: 1 }),
  new Resource({ type: (EQUIPMENT_TYPES.JOURNEYMANS_HAVERSACK + " (Unmarked)"),
    quality: 0, quantity: 1 }),
  new Resource({ type: (EQUIPMENT_TYPES.JOURNEYMANS_TOOLPACK + " (Unmarked)"),
    quality: 0, quantity: 1 }),
  new Resource({ type: (EQUIPMENT_TYPES.ROUGH_MATTOCK + " (Unmarked)"),
    quality: 0, quantity: 1 }),
  new Resource({ type: (EQUIPMENT_TYPES.SIMPLE_ROBE + " (Unmarked)"),
    quality: 0, quantity: 1 }),
  new Resource({ type: (EQUIPMENT_TYPES.WOODEN_POLE + " (Unmarked)"),
    quality: 0, quantity: 1 })] ));
```

### Remove all current resources:
```
let resources: Resource[] = [];
Object.keys(vault.resources).map((typeQuality) => {
  resources.push(vault.resources[typeQuality]);
});
dispatch(consumeResources(vault, resources));
```

### Desert Test Kitchen:
```
let testKitchen = new Building({id: '12341234',
  buildingType: BUILDING_TYPES.KITCHEN, suffix: 1, name: 'Kitchen',
  recipeSelected: 0, recipe: null });
let dish = testKitchen.getDishFromIngredients([
  resourceTypes[RESOURCE_TYPES.WATER],
  resourceTypes[RESOURCE_TYPES.GRAIN],
  resourceTypes[RESOURCE_TYPES.SALT]],
  resourceTypes);
console.log('dish');
console.log(dish);
```

### Add one of every resource:
```
let allResources: Resource[] = [];
Object.keys(resourceTypes).map((typeName) => {
  allResources.push(new Resource({ type: typeName, quality: 0, quantity: 1 }));
});
dispatch(increaseResources(vault, allResources));
```

### Build one of every building:
```
Object.keys(buildingTypes).map((typeName) => {
  let buildingType = buildingTypes[typeName];
  let suffix = 1;
  let name = buildingType.name;
  let building = new Building({
    id: utils.randHex(16),
    buildingType: buildingType.name,
    suffix: suffix,
    name: name,
    paidCosts: {},
    paidResources: [],
    paidUpgradeCosts: {},
    paidUpgradeResources: [],
    resourcesSelected: {},
    recipe: null
  });
  dispatch(addBuilding(building));
});
```
