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
  - Leader-specific happiness influenced by quality of house; kind and quality of food, drink, clothing, presence of cats, and treasure; desirability of job. Happiness has a large effect on work performance, is displayed prominently, and can lead to special events.
  - Groups can be assigned to a specific building, which will dramatically increase the output of the building. Otherwise buildings are run by generic citizens (if the building has that capability). Buildings that produce artisan goods or an entertainment bonus can't be run by citizens.
  - Sunset gradient: #f58f7d @ 0, #6a41b4 @ 67, #0034aa @ 100
  - Day gradient?: linear-gradient(#009aaa, #a1ded0, #f5cb7d);
  - Night gradient?: linear-gradient(#000d2d, #001869, #484396);
  - Chemistry research for Perfumery, need original perfume to be able to duplicate.
  - Logistics research that increases building output if located next to the source of its consumption resources.
  - Logistics research that increases output if group leader lives next to where he/she is working.
  - Product quality:
    - Products can have something akin to a critical success that produces a "fine" version of the resource.
    - A double-critical is also possible: 110% change of quality product would = 90% chance of "fine" and 10% change of "exquisite".
    - A "fine" product is worth 4x the value of a normal product, and has the sentence "It's of fine quality." added to the end of the description.
    - An "exquisite" product is worth 16x the vault of a normal product, and has "The quality is exquisite; this is fit for royalty!" added to the end of the description.
  - Exploring requires a specific set of provisions: initially this just includes food and drink, but later can include things like rope, medicine, shovels, camels, and special clothing.
  - Rendering extracts from various materials for perfumery/other uses
    - Rendering occurs at a crucible. The user can create a repeating pattern of ingredients, and each has set duration to render.
    - Rendering many things in a short time increases the crucible heat from gentle -> moderate -> strong -> incinerating, where a higher heat can produce a higher quality extract but has a higher chance of destroying the ingredient.
    -  Strong heat has the best ratio, and while incinerating technically has a higher chance to return a quality extract, it is almost certain to destroy the item.
    -  Perfumes/other products are created by account-specific combinations of extracts.
    -  Extract types include: Sweet (pink), Sour (green), Bitter (purple), Brackish (dark blue), Savory (orange), Spicy (red), Cooling (light blue), Herbal (green), Deep (shining yellow), Strange (shining purple), Rich (shining green), Airy (shining blue)
  - Somewhat hidden overall goal is to find the secret of undoing death, the quest for which cannot be tainted by killing. There could be a previous explorer (or duo?) who searched for the secret, and an elusive beast that has to willingly give you its eye.
    - Brother (Dani) left to look for a path into death (after his fianceé died (of some sickness?)
    - PC didn't like fianceé because she acted as a wedge between them, and tried to persuade his brother to let her go
    - Idle game-esque themes about endlessly pushing forward
  - Temporary settlements can be made in the Dreaming (the River of Pearls?), last 24 hours (?) before evaporating and allowing the player to claim one single resource.
    - These can have produce unusual resources, such as metal, wood, or stone.
    - These can have unusual ruined buildings, such as sculpture gardens and luthiers.
    - They can also be unusually small or large.
    - Some way to apply extreme benefits, often with drawbacks. These could include:
      - Build time x 1000 in large island that is continuously shrinking
      - One resource production x 100 (but can't claim that resource)
      - Randomizing the output of resources with a subcategory
      - Broad availability of raw resources, but just one leader
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
  - The Firefly
    - "Who are you?" "flame     flying   fires      soaring     heat air     fiery wind"
    - Giver of most quests
  - Late game long term craft: create a moon
    - Gives an array of bonuses that apply to your town during a specific time or times of day
    - Common for a moon to have one set of bonuses for half the day, and a different for the remainder; e.g. a moon with + Quality for Dishes in the dawn and dusk and + Speed for Crops in the noon and night
    - Can create a moon with specific attributes to appeal to certain buyers
  - Expedition introductory quest
    - Cries in the night: Samannoud wants to  investigate unexplained cries coming from nearby in the night
    - Some connection with Alabaster; refugees? bandits?
  - Expeditions:
    - Thieves' Hideout
    - Under-Reservoir
    - Hall of Silken Mirrors
    - Painted Ravine
  - Expedition relics:
    - Shell from something mythical
    - Resin from something mythical
    - Maps to find other expeditions
    - Ancient seeds
    - Petrtified wood tablets containing poetry, dice, masks
    - Stone figurines in the shape of many different animals
    - Instruments made from various woods
  - There's a need for more high-value trade goods:
    - More jewels/precious goods: coral, ivory
    - Ice, as recipe ingredient
    - Ingredients used in advanced implements? Medicinal herbs, plaster molds, resin, golden oil
    - Rumors (of various areas), used to create starcharts: Rumors of the Near Desert, Rumors of the All-River Deltas, Rumors of Larcenous Activity, Rumors of Deep Strangeness, Rumors of Long Antiquity, Rumors of a Translocated Hall
    - Herbs!
    - Field Notes
    - Honey, wax

## Resource Subcategories:
  - Sand
    * Yellow: Savory   Rich Clay
    * Dune: Sweet      Rust Ore
    * Pale: Cooling    Pale Ore
    * Volcanic: Spicy  Dusty Ore
    * Coral: Brackish  Coral
    * Olivine: Herbal  Greenish Ore
    * Black: Bitter    Charcoal
    * Ochre: Sour      Date Seeds
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
    * Sugar Cane: Sweet
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
    * Jade Token: None
    * Dusky Amethyst: Cooling
    * Topaz Slate: Savory
    * Lapis Lazuli: Sour
    * Onyx Husk: Bitter
    * Cursed Ruby: Spicy
    * Floating Sapphire: Brackish
    * Refracting Emerald: Herbal
    * Irradient Diamond: Sweet
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
  - Tea
    * Darjeeling: Indian
    * Assam: Indian/Chinese, savory
    * Nilgiri: Indian, subtle
    * Kukicha (twigs): Japanese
    * Ryokucha: Japanese, green tea
    * Chartreuse: Yellow-green
    * Celadon: Ceramic resembling jade
    * Myrtle: Evergreen shrub
    * Jannah: Islamic heaven

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
  - Questline around magic coin? with Djinn inside
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
  - If there are unused manditory options => remaining rounds, use one of those as only option
  - Remove the options that have already been used as part of this research
  - Look at the number of remaining steps: if there are <= steps as research-specific options, only choose from those
  - If the card slot is > 1, include secondary options in pool
  - If there are >, make weighted choice from any in the pool
  - If there are no non-secondary options remaining in the pool, restore all previously used options

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
  - Analyze action, Gain knowledge by destroying a resource and studying its parts
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
  - Foxfire Ascetics
    - Initial quantity: medium
    - Quantity gain: fast
    - Tier increase fast
  - Trefoil Islands
    - Initial quantity: medium
    - Quantity gain: medium
    - Tier increase: fast, then medium
  - Red Crow Traders
    - Initial quantity: medium
    - Quantity gain: slow
    - Tier increase: fast, then medium-slow
  - Tourmaline Jewelers
    - Initial quantity: very low
    - Quantity gain: very slow
    - Tier increase: slow
  - Spring-Autumn Kingdom
    - Initial quantity: high
    - Quantity gain: slow
    - Tier increase: slow

## Equipment:
  - Tools: Apply happiness to production (heavy tools), quality (precise tools), or efficiency (long tools)
    * Building specific: mattock (generic - speed), implements (generic - quality), pole (generic - efficiency), pot of sealant pitch (water), hoe (field-crop), shovel (pit-earth), weight (press-pressed), bellows (furnace-smelted), rake (dried-drying yard), pan (dish-kitchen), loom (textile), tongs (glassblower), spanner (atelier), needle (tailor), scissors (outfitter), hammer (fabricator)
    * Unique tools: Prismatic Shovel (X% chance sand harvested becomes any type), Temperate Char-bellows (Large increase in charcoal quality, wood efficiency), Fervent Char-bellows (Large increase in charcoal speed, decrease in wood efficiency), Olive Grafting Tongs (increase in Olive quality, increase in Water efficiency), Reed Mud-hoe (large increase in Reed speed, decrease in efficiency), Broad Clay-Spade (moderate increase to Clay speed)
  - Clothing: Usually increases happiness or generic increases to production, quality, or efficiency
    * Ascetic's Robe: Decreases food and drink usage
    * Can be a broader category, rather than building specific: gatherer's tunic (earth), craftsman's overalls (refined materials), artisan's apron (artisan goods)
  - Back: Effects are varied and have a negative element, but usually just a single effect per equipment
    * Journeyman's Haversack: + speed but - quality/efficiency
    * Journeyman's Gearbag: + efficiency but - quality/speed
    * Journeyman's Toolpack: + quality but - speed/efficiency
    * Unique tools: Shoulder parasol (huge increase to Water efficiency, decreased general speed), Fan-shaped Cloak (increased Fuel efficiency, decreased general speed)
  - Effect ideas: + production but - efficiency, + quality but - production/efficiency, + efficiency but - production, decreased food consumption, increased Knowledge from studying/analysis, decreased build time, special fortuities, increased basic status but decreased happiness
  - Tiers of equipment are from 1 - 5, with probs as follows:
    * Basic unmarked equipment is 80% 1, 18% 2, 2% 3
    * Fine unmarked equipment is 80% 2, 18% 3, 2% 4
    * Exquisite unmarked equipment is 80% 3, 18% 4, 2% 5
  - Effect display for leaders combines identical effects, and shows the cumulative total of overlapping effects. For example: Speed +10%, Speed +5%, Drink Speed +10%, Water Speed +5% would give the final effects Speed +16%, Drink Speed +27%, and Water Speed +33%
  - Implements:
    - Iron Edge: Iron x10 (Relic: Menacing)
    - Vitreous Edge: Float Glass x5, Steel x2
    - Hardened Slab: Iron x5, Bronze x5 (Relic: Steadfast)
    - Unbreakable Slab: Steel x20, Ceramic Hull x1
    - Crude Needle: Iron x4, Bronze x1 (Relic: Precise)
    - Delicate Needle: Vitreous Sheet x1, Brass x4
    - Gearwork: Bronze x2, Brass x4 (Relic: Ingenious)
    - Precise Gearwork: Ceramic Hull x12, Steel x4
    - Rough Rope: Thatch x20, Papyrus x20 (Relic: Connecting)
    - Ceramic Cable: Terracotta x100, Thatch x20
    - Torch: Wood x5, Charcoal x10 (Relic: Luminous)
    - Reed Binding: Reeds x40, Pulp x40 (Relic: Healing)
  - Recipes:
    * Rough Mattock: Wood x40, Iron Edge x2
    * Wooden Pole: Wood x60, Hardened Slab x1
    * Coarse Instruments: Gearwork x1, Crude Needle x1, Lens x10
    * Rags: Reedcloth x10
    * Simple Robe: Reedcloth x15, Crude Needle x2
    * Shoulder Pouch: Reedcloth x5
    * Journeyman's Haversack: Reedcloth x20, Crude Needle x1, Rope x1
    * Journeyman's Gearbag: Reedcloth x10, Crude Needle x1, Binding x1
    * Journeyman's Toolpack: Reedcloth x10, Crude Needle x1, Gearwork x1

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
- Colossal underground "House of Forms" produced fungus (?) that healed all sickness and sated all hunger, and had some method of existing in multiple locations at once (?); Various expeditions go to different locations within the House:
  - Gardens with reward of rare seeds and plant-related equipment
  - Library with knowledge-related rewards
  - Kitchens with recipes, rare ingredients, and cooking-related equipment
  - Storehouse with high quality base resources
  - Armory with combat-themed equipment
  - Bedrooms with luxury clothing
  - Servant's quarters with working tools and clothes
- Expedition method:
  - Pick a cardinal direction, a previously visited region (if map making has been learned), or previously visited destination (also if map making has been leared),
  - For every area that is traversed through, various random events can occur. This could:
    - Change the direction the expedition is heading (the party gets lost)
    - Delay the party unless food, drink, or a specific implement is used up, or unless the leader is a certain personality type
    - Give an opportunity to plant special seeds (e.g. date) for later retrieval
    - Capture an animal with rope
    - Meet with a special trading partner
    - Start a special repeatable quest
    - Unexpected expedition destination (mirage castle?)

## Exploration:
- Implements give points in the following categories:
  - Seek (Torch): Spotting treasure, traps, and enemies
  - Break (Slab): Breaking through containers and walls
  - Trap (Gearwork): Immobilizing foes
  - Loose (Edge): Escaping immobilization
  - Heal (Binding): Undoing damage
- Leaders learn techniques from codexes, each technique uses a combination of points from implements
- Attitudes determine how a leader moves through the site
  - Cautious: Avoid enemies
  - Swift: Leave after finding grand treasure
  - Curious: Seek out all treasures
  - Reckless: Seek out and trap enemies

## Field Notes:
  - Required for many research options of difficulty 2 and higher
  - You can gain some Field Notes from observing buildings or the sky. These take 1000 knowledge, 400 papyrus, 80 ink, and 1 hour of study to produce
    -  Notes on the Boundless Sky (sky during day)
    -  Notes on Stars Beyond Counting (sky during night)
    -  Notes on Flowing Water (Cistern)
    -  Notes on the Reluctant Earth (Clay Pit, Sand Pit, Press, etc)
    -  Notes on Scintillating Heat (Drying Yard, Furnace, etc)
    -  Notes on Gentle Cultivation (Lentil Field, Quail Pen, etc)

## Quests:
  - Introduction of concepts:
    - Complete "Study" research and study five different resources
    - Construct a building
    - Complete a trade
    - Upgrade three buildings
    - Put a building into storage
    - Give leader food, drink, shelter, and a place to work
    - Claim an unmarked piece of equipment for your town
  - Story quests:
    - Thrice locked book
  - Daily quests:
    - Produce some # of a resource
    - Analyze some # of a resource
    - Cook a dish with X traits
    - Complete some # of trades
    - Mark some # of equipment
    - Mark one equipment of X tier
    - Rewards are: Knowledge, unlocked Trade Goods

## Kingdoms:
  ### North
    - Relatively safe traveling before sea, where many travelers come from. A huge Arabian kingdom (Alabaster) govered by the five faction sultanate: Tourmaline Jewelers (Sultanate of Gems), Sandstone Edificers (Sultanate of Pillars), Wet-Wax Chandlers (Sultanate of Candles), Cochineal Scribes (Sultanate of Scrolls), and Keepers of the Hanging Gardens (Sultanate of Vines).
    - God of detroying creation: wild, rebirth-from-death. Burying beetle that inters itself and is reborn from the tomb.
    - Understanding of Rhapsodic Auto-Exhumation
    - Trading partners: Tourmaline Jewelers, Sandstone Edificers, Wet-Wax Chandlers, Cochineal Scribes, and Keepers of the Hanging Gardens
    - People: You (Gardens), Samannoud (Gardens), Kubra (Tourmaline), Najran (Tourmaline), Asyut (Sandstone)
  ### East
    - Salt flats? Large, extant China-inspired kingdom (Spring-Autumn Kingdom) with heavy bureaucracy and centers of learning.
    - God of branching creation: bountiful, many-from-one. Tarantula whose exuvia embody one trait and continue living.
    - Understanding of Inflorencent Fission
    - Trading partners: Spring-Autumn Kingdom
    - People: Guangzhou, Weifang
  ### South
    - River that ends in the town stretches away, ruins of a Japan-inspired kingdom dedicated to high art, may still exist in mirages. Clusters of sky-high bamboo-like "dry grass" that makes excellent fuel.
    - God of enduring creation: languid, perfection-from-mortality. Scorpion whose venom grants paralyzed eternal life and continually stings itself.
    - Understanding of Athanastic Catalepsy
    - Trading partners: ?
    - People:
  ### West
    - Mirages? Constant fires? Oceans made from glass? Hanging gardens?
    - God of merging creation: harmonious, one-from-many. Swarm of cicadas that create weather, visions, etc.
    - Understanding of Aeolian Concordance
    - Trading partners: ?
    - People:
  ### Nowhere, Everywhere
    - The Translocated Hall
    - The lost Eternal Beast, and the lost people
    - Understanding of Unrepining Omnipresence
  ### Nomads
    - Trading partners: Foxfire Ascetics (unless they're from the West?), Red Crow Traders
    - People:
  ### Far North
    - Distant islands in the sea north of Alabaster
    - Trading partners: Trefoil Islands
    - People:

## Scholar level
  - Begins at "Novice", transitions through a series of other titles? Initiate, Pupil, Student, Disciple, Collegian, Scholar, Researcher, Intellect, Sophist, Authority, Maven, Virtuoso, Master, Polymath, Cognoscente, Sage, Illuminant
  - Brainstorming for bonuses: Study+Analysis 25% (50%, 75%) Less Time, Study+Analysis 50% (100%, 150%) more Knowledge, Field Notes 50% Less Time, Field Notes 50% Cheaper

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
      - Analyze: Gain knowledge by destroying a resource and studying its parts
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
    https://www.flaticon.com/packs/prehistoric-age
    https://www.flaticon.com/packs/morocco-16\
    https://www.svgrepo.com/collection/landscapes-collection/
    https://www.svgrepo.com/collection/landscapes-22/
    https://www.svgrepo.com/collection/landscapes-18/
    https://www.svgrepo.com/collection/italy-4/
    https://www.svgrepo.com/collection/japan-13/
    https://www.svgrepo.com/collection/japan-10/
    https://www.svgrepo.com/collection/japan-9/
    https://www.svgrepo.com/collection/china/
    https://www.svgrepo.com/collection/chinese-new-year-3/
    https://www.svgrepo.com/collection/india-6/
    https://www.svgrepo.com/collection/bugs-insects/
    https://www.svgrepo.com/collection/meals-3/
    https://www.svgrepo.com/collection/circle-color-food/
    https://www.svgrepo.com/collection/food-set-2/1
    https://www.svgrepo.com/collection/knowledge-4/
    https://www.svgrepo.com/collection/science-10/
    https://www.svgrepo.com/collection/scientific-study-2/
    https://www.svgrepo.com/collection/design-tools-6/
    https://www.svgrepo.com/collection/gym-and-fitness-2/
    https://www.svgrepo.com/collection/labour-day/
    https://www.svgrepo.com/collection/crafting-3/
    https://www.svgrepo.com/collection/real-assets-5/
    https://www.svgrepo.com/collection/furniture-12/
    https://www.svgrepo.com/collection/musical-instruments-9/
    https://www.svgrepo.com/collection/in-the-forest-6/
    https://www.svgrepo.com/collection/camping-5/
    https://www.svgrepo.com/collection/camping-12/
    https://www.svgrepo.com/collection/man-clothes/
    https://www.svgrepo.com/collection/woman-clothes/
    https://www.svgrepo.com/collection/pretty-2/
    https://www.svgrepo.com/collection/clothes-13/
    https://www.svgrepo.com/collection/clothes-18/
    https://www.svgrepo.com/collection/clothes-24/
    https://www.svgrepo.com/collection/animals-26/
    https://www.svgrepo.com/collection/halloween-19/
    https://www.svgrepo.com/collection/feathers-set-2/
    https://www.svgrepo.com/collection/saint-patrick-day-5/
    https://www.svgrepo.com/collection/prehistoric-age/
    https://www.svgrepo.com/collection/jewelry-3/
    https://www.svgrepo.com/collection/gardening-9/
    https://www.svgrepo.com/collection/spring-4/
    https://www.svgrepo.com/collection/autumn-2/
    https://www.svgrepo.com/collection/symbol-set/
    https://www.svgrepo.com/collection/symbol/
    https://www.svgrepo.com/collection/kitchenware-2/
    https://www.svgrepo.com/collection/ice-cream-icon-collection/
    https://www.svgrepo.com/collection/holidays-2/
    https://www.svgrepo.com/collection/beauty-30/
    https://www.shareicon.net/pack/landscapes?p=4
    https://www.shareicon.net/pack/landscapes-collection?p=2
    https://www.svgrepo.com/collection/landscapes-22/
    https://www.svgrepo.com/collection/stationery-elements/
    https://www.svgrepo.com/collection/weapons-5/

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
  - One per day, receive a Hawk Chit which allows any quantity of a single resource to be purchased from another player, at the price they have set
  - Sell as many things in the Hawk Bazaar as you wish
  - When setting up a resource for sale, see a suggested price based on the average of the last ten? successful trades, excluding outliers?, and lacking recent trades the total value of the resources to be traded
  - For early game when there are few players, have auto-generated trades from "Shades"?

## Building Limits
  - Initial stage, 6 to start: 3 special, 1 housing, 2 material
  - At Field Notes stage, 22 is comfortable: 3 special, 4 housing, 10 material, 5 refinement
  - Stages could go: 12, 15, 20, 25, 31, 36, 40
  - Starting, Sand+Clay, Wood+Brick, Iron+Bronze, Steel+Ceramic, Artifact, Pearl-thing

## Secondary Research Options
  - Knowledge cost to discard current options and redraw
  - Reduce progress by one to gain scholarship-type field notes
  - Large resource cost to gain scholarship-type field notes
  - Large dish and drink cost
  - Leader specific assistance

## How to handle surplus of leaders?
  - Don't have an option of too many leaders
    - This isn't ideal, could be fun to have tons of seasonal or premium leaders
  - Different housing types that can hold more than one leader (and crew)
  - Moving fortress that runs on waterwheels turned by golden oil, surplus leaders can work there for ocational non-scaling benefits

## Expeditions
  - Select starchart
  - Select leader, display expedition/exploration related effects
  - Select camels, display speed and carrying capacity
  - Select food, drink, and implements
  - Go!

## Tips
  - Dishes make excellent trade goods. It can be useful to build a Kitchen, even before the town is producing enough ingredients to run it continuously.
  - As trading partners come to trust you, they will set aside a larger part of their caravan's capacity for you. This means larger trades are possible.
  - More complicated buildings require the skilled hand of a leader to keep them running. But as your research improves, you'll be able to build simplified versions that don't need a leader.
  - It's only possible to analyze 100 of anything at a time, and the more valuable something is the longer it takes to analyze. However, it might eventually be possible to analyze much faster.

## Value checking table
  - Should display current value, name, building that produces, computed value from rate of production + value of ingredients + value of building

## Equipment marking modal
  - Separate modals for marking a single equipment vs. multiple
  - Single equipment:
    - Shows name and rarity in large characters at top: Basic, Notable, Eminent, Superior, Peerless, Transcendent
    - Below that effects of equipment
    - Options at bottom to Deconstruct or Keep the equipment
    - If deconstuct is selected, quick timer bar, then show resources gained, then button changes to Next
  - Multiple equipment:
    - Shows a count of best rarity at top, with lesser rarities below
    - Each rarity section can be expanded, with selection buttons on left
    - Deconstruct all button below each section, which changes to Deconstruct selected if any are selected
    - After equipment are deconstructed, they are removed from the list
    - At very bottom of modal is a Keep all button that changes to Keep remaining if any have been deconstructed, or Next if all have been deconstructed
    - Keep all or Keep remaining button changes to "No room! (1104 / 1000)" if capacity is exceeded
  - Keep status of marking modal in its own reducer, for the purposes of closing and reopening the app

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
  [X] Easier to gain first trading level
  [X] Scarred Scholar => Scarred Navigator
  [X] Refactor leader joining events
  [X] Sorta fix cooking
  [X] Fix for building recipe un-selection when opening detail modal
  [X] Maximum # buildings and town expansion researches
  [X] Store/Unstore buildings
  [X] Add cottage
  [X] House into upgrade, rather than stand-alone
  [X] Equipment effects exclude trade items
  [X] Disassembly of equipment
  [X] Travel-ready food like salted meat, dried fruit, waybread
  [X] Repeatable fortuities happen only once per day
  [X] Building and analyzing high value things goes faster
  [X] Consistent rounding of numbers, probably floor() for formatting, so supply doesn't show "20" while upgrade shows insufficient "19"
  [X] Consistent sorting in tabs/selection components
  [X] Hide resources with <1 quantity in selection components
  [X] Show detail modals when pressing on icon, e.g. on buildings
  [X] Olives before grain
  [X] Fish before quail
  [X] Resource exhaustion display
  [X] Quest system
  [X] Tutorial quests
  [X] Daily quests
  [X] Trader trust to affect # of items
  [X] Field note research costs to use large quantities of other resources
  [X] Dish-specific subcategory
  [X] Conversation doesn't correctly check for dishes
  [X] Add animation to conversations
  [X] Swap Lentil Farming and Reed Cultivation difficulties
  [X] Brine trade good
  [X] Mussels in Fishing Pond
  [X] Reedcloth resource type
  [X] Mysticism quest
  [X] Fortuities aren't marked as "seen" until viewed, not just set as current
  [X] Quest deletionQuest deletion
  [X] Auto generated quests use available buildings for production tasks
  [X] Cooking experimentation checks for a match with an existing recipe
  [X] Mysticism research
  [X] Drinks
  [X] Level 2 category researches
  [X] Increase difficulty of Field Notes-locked upgrades
  [X] Conjecture research
  [X] Add time elapsed to "While you were gone" memo
  [X] Save after calculating "While you were gone" tick
  [X] When consumptions expire, change recipe selected to -1
  [X] Save icon/button
  [X] Revamp messages
  [X] When consumptions expire, show a message
  [X] Add consumptions expired "While you were gone" memo
  [X] Stop building upon resource lack within hourglass calc
  [X] Correctly show empty leader equipment slots
  [X] Upgrading house and changing leader vars recalc rates
  [X] Show resource descriptive name, not id name in selection components
  [X] JSON export/import methods
  [X] All level 2 research options to use Field Notes
  [X] Fix Kitchen missing resource repeated notice bug
  [X] Fix exponential production bug
  [X] Click on message bar to view all messages
  [X] Only deliver most recent messages
  [X] Quests to introduce new traders
  [X] Trading party type selection less random
  [X] Increase # of traders research and market upgrade
  [X] Add implements
  [X] Show resource descriptions
  [X] Add fish to trading partner options
  [X] Add fishing building upgrade researches
  [X] Add implements to trading partner options
  [X] Simplify trading partner options
  [X] Traders to use a mix of exact, tag, subcategory specificities
  [X] Atelier building and research
  [X] Add one new early trading partner
  [X] Terrain generation
  [X] Map display
  [X] Initial building placement
  [X] Terrain actions and reducer
  [X] Click on map building for building detail modal
  [X] Combine map and buildings tabs
  [X] Click on terrain to build
  [X] Click on terrain to place from storage
  [X] Gate upgrades effect terrain
  [X] Show leader positioning on map
  [X] Show building problems on map
  [X] Rebalance implements
  [X] Fortuities appear above map
  [X] Terrain should contain a river bend in row 1 or 2
  [X] Fix fortuity frequency
  [X] Trade option multipliers
  [X] Implements in separate trade good category
  [X] Textile precursors in tier 3 trading
  [X] Rename gems
  [X] New equipment
  [X] Show equipment descriptions
  [X] Add new equipment to tier 3 trading
  [X] Crystal glass in blast furnace
  [X] Combine simplified and blast furnaces
  [X] Glassware to use textile tag as an ingredient
  [X] Dark bricks to use trade sand, red bricks to use rust ore, blue bricks to use salt
  [X] Difficulty 2 buildings to use implements and specific bricks/wood
  [X] Rename simplified buildings
  [X] New building upgrades: Channeled Reed Delta, Auroch Paddock, Adept Atelier
  [X] Bountiful Kitchen gives Speed x 1.5
  [X] Research to increase speed of field notes
  [X] Charcoal is twice as effective as fuel
  [X] Long-term exploration prep quests
  [X] Navbar to replace main dropdown menu
  [X] Additional message events: new quest from Firefly, quest ready to complete, trader left, new fortuity
  [X] Fix message fetching
  [X] Fix buggy cooking
  [X] Map icon that shows resting buildings
  [X] Remove De Nang, too boring
  [X] Very early quest about displaced, beaten down, sassy royalty? Introduction into Alabaster society?
  [X] Rebalance resource values
  [X] Leader selection in building detail
  [X] Resource selection in inexact rates in building detail
  [X] Vault quantities and exhaustions in building detail
  [X] Leader-affected resource rates in building detail
  [X] Building problems in building detail header
  [X] Hide inapplicable fields from building in progress detail
  [X] Tab linking buttons on special buildings (Study, Market)
  [X] Dromedarian fortuities and quests
  [X] Tea, jewels, second tier implement ingredients, rumors, and textile sources as trade goods
  [X] New implements
  [X] Wine from brewery
  [X] Equipment production unlocked after study
  [X] Fortuities with options for new equipment quests
  [X] Refactor equipment
  [X] Research to increase max analysis with items studied
  [X] Single equipment marked modal
  [X] All equipment marked modal
  [X] Increase basic Mysticism research costs by a power of ten
  [X] Equipment detail modal
  [X] Treasures given by research
  [X] Treasure in account reducer and actions
  [X] Display treasures on/remove treasures from Wall
  [X] Displayed treasure effects can affect rates
  [ ] Other reasearches to improve researching (speed, knowledge gain)
  [ ] Scale Firefly quests with # resources studied

  [ ] ?

  [ ] Firefly mother quests?
  [ ] Trader conversations
  [ ] Flashy display for rare trades
  [ ] Ingredient-specific cooking recipes
  [ ] Expeditions! (without exploration)

  [ ] Mass deconstruct option in Equipment tab
  [ ] Store memo/ui state in reducer
  [ ] Load equipment marked state
  [ ] Autoselect first resource
  [ ] Add animations to memos
  [ ] Storing an occupied house kicks out the leader
  [ ] Storing an assigned to building removes leader
  [ ] Conversations can be repeatable, but not daily
  [ ] Store conversation state in reducer
  [ ] Compressed resource view
  [ ] Fix for stuck without sand/knowledge before trading unlocked
  [ ] Fix for impossible expensive trades
  [ ] More repeatable fortuities
  [ ] Leaders running out of consumed food/drink begin foraging
  [ ] Resource production/consumption breakdown in resource detail
  [ ] Combine "While you were away" memos
  [ ] Select non-exact resources in quest completion
  [ ] Select non-exact resources in conversations
  [ ] Hide recipes missing ingredients
  [ ] Handle number parsing within ResourceSelectOne

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

### Create data tables:
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

CREATE TABLE `equipment_marked` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` varchar(16) NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `value` mediumtext,
  PRIMARY KEY (`id`));

CREATE TABLE `messages` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` varchar(16) NOT NULL,
  `timestamp` BIGINT(32) NOT NULL,
  `text` VARCHAR(1024),
  `type` VARCHAR(32),
  `icon` VARCHAR(512),
  PRIMARY KEY (`id`)
)
CREATE INDEX `index_user_id` ON `messages`(`user_id`);
CREATE INDEX `index_timestamp` ON `messages`(`timestamp`);


## Debug functions
### Get one of every basic equipment:
```
dispatch(increaseResources(vault,
  [new Resource({ type: (EQUIPMENT_TYPES.COARSE_MEASURES + " (U)"),
    quality: 0, quantity: 1 }),
  new Resource({ type: (EQUIPMENT_TYPES.JOURNEYMANS_GEARBAG + " (U)"),
    quality: 0, quantity: 1 }),
  new Resource({ type: (EQUIPMENT_TYPES.JOURNEYMANS_HAVERSACK + " (U)"),
    quality: 0, quantity: 1 }),
  new Resource({ type: (EQUIPMENT_TYPES.JOURNEYMANS_TOOLPACK + " (U)"),
    quality: 0, quantity: 1 }),
  new Resource({ type: (EQUIPMENT_TYPES.ROUGH_MATTOCK + " (U)"),
    quality: 0, quantity: 1 }),
  new Resource({ type: (EQUIPMENT_TYPES.SIMPLE_ROBE + " (U)"),
    quality: 0, quantity: 1 }),
  new Resource({ type: (EQUIPMENT_TYPES.WOODEN_POLE + " (U)"),
    quality: 0, quantity: 1 })] ));
```

### Add one of every resource:
```
let allResources: Resource[] = [];
Object.keys(resourceTypes).map((typeName) => {
  allResources.push(new Resource({ type: typeName, quality: 0, quantity: 1 }));
});
dispatch(increaseResources(vault, allResources));
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
  resourcesSelected: {}, recipeSelected: 0, recipe: null });
dispatch(addBuilding(testKitchen));

let dish = new Building(buildings['12341234']).getDishFromIngredients([
  resourceTypes[RESOURCE_TYPES.WATER],
  resourceTypes[RESOURCE_TYPES.FLOUR],
  resourceTypes[RESOURCE_TYPES.DATE]],
  resourceTypes);
console.log('dish');
console.log(dish);
dispatch(increaseResources(vault, [dish.resource]));
dispatch(setBuildingSpecificRecipe(buildings['12341234'], dish.recipe, 0));
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

### View a conversation:
```
dispatch(addMemos([new Memo({
  name: 'test',
  title: 'A Familiar Figure',
  convoName: CONVERSATIONS.AUW_A_BROKEN_KEY
})]));
```

### Trigger a fortuity check
```
dispatch(addTimer(new Timer({
  name: 'Fortuity',
  endsAt: (new Date(Date.now()).valueOf() + 100),
  fortuityCheck: true
})));
```

### Trigger a quest check
```
dispatch(addTimer(new Timer({
  name: 'Daily quest',
  endsAt: (new Date(Date.now()).valueOf() + 100),
  dailyQuestCheck: true
})));
```

### Begin a quest
```
dispatch(addQuest(quests[QUESTS.MYSTICISM_A_TERRACED_PLATFORM]));
const rtgExisting =
  quests[QUESTS.MYSTICISM_A_TERRACED_PLATFORM].taskCheckExisting(vault,
    new ResearchStatus(null));
rtgExisting.forEach((questActivity) => {
  dispatch(addToActivityQueue(questActivity));
});
```

### Generate a quest
```
const quest = questGen({ vault, buildings });
console.log('quest');
console.log(quest);
if (quest) { dispatch(addQuest(quest)); }
```

length: 96' x 48' (to screened in porch)
sip: 12' x 15'

### Correct uncontrolled resources
```
const rtc =  [`${RTY.WATER}|0`, `${RTY.REEDS}|0`, `${RTY.LENTIL}|0`, `${RTY.SAND_YELLOW}|0`, `${RTY.CLAY_MUDDY}|0`, `${RTY.GRAIN}|0`].map((typeQuality) => {
  const [type, quality] = typeQuality.split('|');
  return new Resource({ type, quality: parseInt(quality), quantity: 2000000000000000 })
});
consumeResources(vault, rtc);
const rtg = rtc.map((resource) => {
  return new Resource({...resource, quantity: 20000});
});
increaseResources(vault, rtg);
```

### Minor timeskip
```
const timeskipVault = new Vault({...vault,
  lastTimestamp: (new Date(Date.now()).valueOf() - 600000)
});
dispatch(setVault(timeskipVault));
```

### Terrain test
```
const { terrain: newTerrain } = new Terrain(null).generateTerrain(null);
const oneTerrain = newTerrain.addColumn(newTerrain, 'left');
const twoTerrain = oneTerrain.addColumn(oneTerrain, 'right');
const threeTerrain = twoTerrain.addRow(twoTerrain);
const fourTerrain = threeTerrain.addRow(threeTerrain);
const fiveTerrain = fourTerrain.addRow(fourTerrain);
const sixTerrain = fiveTerrain.addRow(fiveTerrain);
const sevenTerrain = sixTerrain.addRow(sixTerrain);
const eightTerrain = sevenTerrain.flowRiver(sevenTerrain);
dispatch(setTerrain(eightTerrain));
```

## Infrastructure
### 2022-02-23 Updates
`expo upgrade`
`The following packages were not updated. You should check the READMEs for those repositories to determine what version is compatible with your new set of packages:
@types/react-redux, react-native-vector-icons, react-redux, redux, @types/random, @types/react-native-vector-icons, @types/redux`

border: 2px solid #fff;
border-bottom: none;
border-radius: 10px 10px 0 0;
padding: 0 10px;
background: #0434a9;
