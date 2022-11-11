export enum RESEARCH_OPTIONS {
  SECONDARY = "Secondary",

  // Secondary Options Lv 0
  FRUSTRUATION = "Frustration",
  EXPLORING_POSSIBILITIES = "Exploring Possibilities",
  RECKLESS_CONCENTRATION = "Reckless Concentration",

  // Secondary Options Lv 1
  AGGRIVATION = "Aggrivation",
  A_WORTHWHILE_DISTRACTION = "A Worthwhile Distraction",

  // Scholarship Lv 0
  AN_INKLING = "An Inkling",
  A_GUESS = "A Guess",
  PRODUCTIVE_DESTRUCTION = "Productive Destruction",
  VARIETY_IN_APPROACH = "Variety in Approach",
  A_SNACK = "A Snack",
  CASUAL_INSPECTION = "Casual Inspection",
  SAND_VARIETY = "Sand Variety",
  CLAY_VARIETY = "Clay Variety",
  BRICK_VARIETY = "Brick Variety",

  // Scholarship Lv 1
  EXCESSIVE_NOTE_TAKING = "Excessive Note Taking",
  METAL_VARIETY = "Metal Variety",
  WOOD_VARIETY = "Wood Variety",
  SYSTEMS_OF_EXAMINATION = "Systems of Examination",
  METHODS_OF_EXAMINATION = "Methods of Examination",

  // Scholarship Lv 2
  BRACHYGRAPHIC_SYMBOLS = "Brachiographic Symbols",
  MAGNIFIED_EXAMINATION = "Magnified Examination",
  ASSISTED_EXAMINATION = "Assisted Examination",
  EXPANDED_EXAMINATION = "Expanded Examination",
  AUGMENTED_EXAMINATION = "Augmented Examination",

  // Biology Lv 1
  LEGUME_DISSECTION = "Legume Dissection",
  WATER_UNDER_THE_SUN = "Water Under the Sun",
  BOTANICAL_HEARSAY = "Botanical Hearsay",
  GERMINATION = "Germination",

  // Biology Lv 2
  CROP_COMPARISON = "Crop Comparison",
  SOIL_QUALITY = "Soil Quality",
  FROM_DOMESTICATION = "From Domestication",
  FINAL_EDIBILITY = "Final Edibility",

  // Anthropology Lv 1
  REMEMBERED_MEETINGS = "Remembered Meetings",
  LINGUISTIC_GUESSWORK = "Linguistic Guesswork",
  FAMILIAR_CUISINE = "Familiar Cuisine",
  SANDY_LIMERICKS = "Sandy Limericks",

  // Anthropology Lv 2
  CULINARY_INSIGHTS = "Culinary Insights",
  CURRENCY_IS_A_CONCEPT = "Currency is a Concept",
  WIDE_OPEN_SPACES = "Wide Open Spaces",
  LINGUISTIC_PROGRESSION = "Linguistic Progression",

  // Poem Translation
  REASSEMBLING_METER = "Reassembling Meter",
  POETIC_CONTEXT = "Poetic Context",
  FORGOTTEN_IMAGERY = "Forgotten Imagery",

  // Physics Lv 1
  EARLY_PRINCIPLES = "Early Principles",
  SAND_AND_SOIL = "Sand and Soil",
  BORROWED_CLUES = "Borrowed Clues",
  TO_BUILD_A_HOME = "To Build a Home",

  // Physics Lv 2
  MIDDLE_PRICIPLES = "Middle Principles",
  GRAVITY_UPON_STATE = "Gravity Upon State",
  AIR_AND_FLOW = "Air and Flow",
  MATERIAL_CONJUNCTION = "Material Conjunction",

  // Chemistry Lv 1
  HINTS_FROM_ALCHEMY = "Hints from Alchemy",
  DISTILLATION = "Distillation",
  FIRE_STARTING = "Fire Starting",
  HIDDEN_IN_THE_SAND = "Hidden in the Sand",

  // Chemistry Lv 2
  ZYMOLOGY = "Zymology",
  VENTILATION_OF_FLAME = "Ventilation of Flame",
  BITTER_FUMES = "Bitter Fumes",
  CHEMICAL_FIXATION = "Chemical Fixation",

  // Astrology Lv 1
  NAVIGATION_BY_STARS = "Navigation by Stars",

  // Astrology Lv 2
  BEARING_EAGLES_TALON = "Bearing: Eagle's Talon",             // RUMORS_LARCENOUS_ACTIVITY
  BEARING_TRAILING_BEHIND = "Bearing: Trailing Behind",        // RUMORS_LARCENOUS_ACTIVITY
  BEARING_GLIMMERING_CLUSTER = "Bearing: Glimmering Cluster",  // RUMORS_LONG_ANTIQUITY
  BEARING_RIGHT_OF_HANDS = "Bearing: Right of Hands",          // RUMORS_LONG_ANTIQUITY
  BEARING_TWO_BEHIND = "Bearing: Two Behind",                  // RUMORS_ALL_RIVER_DELTA
  BEARING_DANCERS_CREST = "Bearing: Dancer's Crest",           // RUMORS_ALL_RIVER_DELTA
  BEARING_AZURE_BODY = "Bearing: Azure Body",                  // RUMORS_NEAR_DESERT
  BEARING_THE_ARCHER = "Bearing: The Archer",                  // RUMORS_NEAR_DESERT
  BEARING_WHITE_HEIGHTS = "Bearing: White Heights",            // RUMORS_LARCENOUS_ACTIVITY
  BEARING_SPIRAL_STAIRS = "Bearing: Spiral Stairs",            // RUMORS_LARCENOUS_ACTIVITY
  BEARING_DESSICATED_RIVER = "Bearing: Dessicated River",      // RUMORS_LONG_ANTIQUITY
  BEARING_MARKED_COLUMNS = "Bearing: Marked Columns",          // RUMORS_LONG_ANTIQUITY
  BEARING_ANCIENT_BASIN = "Bearing: Ancient Basin",            // RUMORS_ALL_RIVER_DELTA
  BEARING_RUINED_WATCHTOWER = "Bearing: Ruined Watchtower",    // RUMORS_ALL_RIVER_DELTA
  BEARING_GIANTS_FURROWS = "Bearing: Giant's Furrows",         // RUMORS_NEAR_DESERT
  BEARING_SCARLET_TRIO = "Bearing: Scarlet Trio",              // RUMORS_NEAR_DESERT
  BEARING_REFERENCED_TEXTS = "Bearing: Referenced Texts",      // STARCHART
  BEARING_COMBINED_REFERENCES = "Bearing: Combined References",// STARCHART
  // RUMORS_LARCENOUS_ACTIVITY
  // options: [RESEARCH_OPTIONS.BEARING_EAGLES_TALON, RESEARCH_OPTIONS.BEARING_TRAILING_BEHIND, 
  //   RESEARCH_OPTIONS.BEARING_WHITE_HEIGHTS, RESEARCH_OPTIONS.BEARING_SPIRAL_STAIRS,
  //   RESEARCH_OPTIONS.BEARING_REFERENCED_TEXTS, RESEARCH_OPTIONS.BEARING_COMBINED_REFERENCES ],
  // RUMORS_LONG_ANTIQUITY
  // options: [RESEARCH_OPTIONS.BEARING_GLIMMERING_CLUSTER, RESEARCH_OPTIONS.BEARING_RIGHT_OF_HANDS, 
  //   RESEARCH_OPTIONS.BEARING_DESSICATED_RIVER, RESEARCH_OPTIONS.BEARING_MARKED_COLUMNS,
  //   RESEARCH_OPTIONS.BEARING_REFERENCED_TEXTS, RESEARCH_OPTIONS.BEARING_COMBINED_REFERENCES ],
  // RUMORS_ALL_RIVER_DELTA
  // options: [RESEARCH_OPTIONS.BEARING_TWO_BEHIND, RESEARCH_OPTIONS.BEARING_DANCERS_CREST, 
  //   RESEARCH_OPTIONS.BEARING_ANCIENT_BASIN, RESEARCH_OPTIONS.BEARING_RUINED_WATCHTOWER,
  //   RESEARCH_OPTIONS.BEARING_REFERENCED_TEXTS, RESEARCH_OPTIONS.BEARING_COMBINED_REFERENCES ],
  // RUMORS_NEAR_DESERT
  // options: [RESEARCH_OPTIONS.BEARING_AZURE_BODY, RESEARCH_OPTIONS.BEARING_THE_ARCHER, 
  //   RESEARCH_OPTIONS.BEARING_GIANTS_FURROWS, RESEARCH_OPTIONS.BEARING_SCARLET_TRIO,
  //   RESEARCH_OPTIONS.BEARING_REFERENCED_TEXTS, RESEARCH_OPTIONS.BEARING_COMBINED_REFERENCES ],

  // Mysticism Lv 0
  WRITERS_UPON_WRITERS = "Writers Upon Writers",
  OBLIQUE_REFERENCES = "Oblique References",
  NEWBORN_LANGUAGE = "Newborn Language",

  // Mysticism Lv 1
  THE_REDOLENCE_OF_VINES = "The Redolence of Vines",
  THE_SAVOR_OF_THE_VERDANT = "The Savor of the Verdant",
  THE_GERMINATION_OF_PROMISE = "The Germination of Promise",
  THE_SCINTILLATION_OF_RINGS = "The Scintillation of Rings",
  THE_EMINENCE_OF_SMOKE = "The Eminence of Smoke",
  THE_LEAPING_OF_THE_SILVER_CORDS = "The Leaping of the Silver Cords",
  THE_MURMURATION_OF_SHIFTING_DUNES = "The Murmuration of Shifting Dunes",
  THE_CONSEQUENCE_OF_PONDEROUS_EARTH = "The Consequence of Ponderous Earth",
  THE_ABSTRACTION_OF_THE_INWARD_SPACE = "The Abstraction of the Inward Space",
  THE_DIAPHONY_OF_THE_GOLDEN_SHEET = "The Diaphony of the Golden Sheet"
}
