const restaurantData = [
  {
    restaurantID: "66f5arc",
    restaurantName: "McDonalds",
    restaurantAddress: "McDonalds, 124 E State St, West Lafayette, IN 47906",
    distance: 0.5,
    menu: [
      "Big Mac",
      "Chicken Nuggets",
      "Fries",
      "Coke",
      "Cheeseburger",
      "McChicken",
      "Mocha Frappe",
      "Egg McMuffin",
      "Ice Cream cone",
      "Happy Meal",
    ],
    menuOptions: [
      [//"Big Mac"
        {
          optionName: 'Required Changes',
          required: true,
          multiSelect: false,
          options: []
        },
        {
          optionName: 'Optional Changes',
          required: false,
          multiSelect: true,
          options:[
            {
              optionList: [{optionName: "No Sauce", optionPrice: 0}, {optionName: "Extra Sauce", optionPrice: 0.4}]
            },
            {
              optionList: [{optionName: "No Onion", optionPrice: 0}, {optionName: "Extra Onion", optionPrice: 0}]
            },
            {
              optionList: [{optionName: "No Lettuce", optionPrice: 0}, {optionName: "Extra Lettuce", optionPrice: 0}]
            },
            {
              optionList: [{optionName: "No Pickle", optionPrice: 0}, {optionName: "Extra Pickle", optionPrice: 0}]
            },
            {
              optionList: [{optionName: "No Cheese", optionPrice: 0}, {optionName: "Extra Cheese", optionPrice: 0.7}]
            },
            {
              optionList: 
              [
                {optionName: "No Patties", optionPrice: 0}, {optionName: "Remove 1 Patty", optionPrice: 0}, 
                {optionName: "Add 1 Patty", optionPrice: 1.2}, {optionName: "Add 2 Patties", optionPrice: 2.4}
              ]
            },
            {
              optionList: [{optionName: "No Salt", optionPrice: 0}, {optionName: "Extra Salt", optionPrice: 0}]
            },
            {
              optionList: [{optionName: "No Bun", optionPrice: 0}]
            },
            //Add Ons
            {
              optionList: [{optionName: "Add Tomato", optionPrice: 0.6}, {optionName: "Add Extra Tomato", optionPrice: 1.2}]
            },
            {
              optionList: [{optionName: "Add Mayonnaise", optionPrice: 0.4}, {optionName: "Add Extra Mayonnaise", optionPrice: 0.8}]
            },
          ]
        }
      ],
      [//"Chicken Nuggets"
        {
          optionName: 'Required Changes',
          required: true,
          multiSelect: false,
          options: [
            {
              optionList: 
              [
                {optionName: "4 Piece", optionPrice: 0}, {optionName: "6 Piece", optionPrice: 1},
                {optionName: "10 Piece", optionPrice: 3}, {optionName: "20 Piece", optionPrice: 6}
              ]
            },
            {
              optionList: 
              [
                {optionName: "No Sauce", optionPrice: 0}, {optionName: "Add Ketchup Packet", optionPrice: 0},
                {optionName: "Add Tangy BBQ Sauce", optionPrice: 0}, {optionName: "Add Sweet N Sour Sauce", optionPrice: 0},
                {optionName: "Add Honey Packet", optionPrice: 0}, {optionName: "Add Hot Mustard Dipping Sauce Sauce", optionPrice: 0},
                {optionName: "Add Creamy Ranch Sauce", optionPrice: 0}, {optionName: "Add Hot Picante Sauce", optionPrice: 0},
                {optionName: "Add Mild Picante Sauce", optionPrice: 0}, {optionName: "Add Honey Mustard", optionPrice: 0},
                {optionName: "Add Spicy Buffalo Sauce", optionPrice: 0}
              ]
            }
          ]
        },
        {
          optionName: 'Optional Changes',
          required: false,
          multiSelect: true,
          options: []
        }
      ],
      [//"Fries"
        {
          optionName: 'Required Changes',
          required: true,
          multiSelect: false,
          options: [
            {
              optionList: 
              [
                {optionName: "Small", optionPrice: 0},{optionName: "Medium", optionPrice: 0.8},
                {optionName: "Large", optionPrice: 1.5}
              ]
            },
            {
              optionList: 
              [
                {optionName: "No Sauce", optionPrice: 0}, {optionName: "Add Ketchup Packet", optionPrice: 0},
                {optionName: "Add Tangy BBQ Sauce", optionPrice: 0}, {optionName: "Add Sweet N Sour Sauce", optionPrice: 0},
                {optionName: "Add Honey Packet", optionPrice: 0}, {optionName: "Add Hot Mustard Dipping Sauce Sauce", optionPrice: 0},
                {optionName: "Add Creamy Ranch Sauce", optionPrice: 0}, {optionName: "Add Hot Picante Sauce", optionPrice: 0},
                {optionName: "Add Mild Picante Sauce", optionPrice: 0}, {optionName: "Add Honey Mustard", optionPrice: 0},
                {optionName: "Add Spicy Buffalo Sauce", optionPrice: 0}
              ]
            }
          ]
        },
        {
          optionName: 'Optional Changes',
          required: false,
          multiSelect: true,
          options: [
            {
              optionList: [{optionName: "No Salt", optionPrice: 0}, {optionName: "Extra Salt", optionPrice: 0}]
            }
          ]
        }
      ],
      [//"Coke"
        {
          optionName: 'Required Changes',
          required: true,
          multiSelect: false,
          options: [
            {
              optionList: 
              [
                {optionName: "Extra Small", optionPrice: 0}, {optionName: "Small", optionPrice: 0},
                {optionName: "Medium", optionPrice: 1}, {optionName: "Large", optionPrice: 1.5}
              ]
            }
          ]
        },
        {
          optionName: 'Optional Changes',
          required: false,
          multiSelect: true,
          options: [
            {
              optionList: [{optionName: "No Ice", optionPrice: 0}, {optionName: "Extra Ice", optionPrice: 0}]
            }
          ]
        }
      ],
      [//"Cheeseburger"
        {
          optionName: 'Required Changes',
          required: true,
          multiSelect: false,
          options: []
        },
        {
          optionName: 'Optional Changes',
          required: false,
          multiSelect: true,
          options:[
            {
              optionList: [{optionName: "No Mustard", optionPrice: 0}, {optionName: "Extra Mustard", optionPrice: 0}]
            },
            {
              optionList: [{optionName: "No Ketchup", optionPrice: 0}, {optionName: "Extra Ketchup", optionPrice: 0}]
            },
            {
              optionList: [{optionName: "No Onion", optionPrice: 0}, {optionName: "Extra Onion", optionPrice: 0}]
            },
            {
              optionList: [{optionName: "No Pickle", optionPrice: 0}, {optionName: "Extra Pickle", optionPrice: 0}]
            },
            {
              optionList: [{optionName: "No Cheese", optionPrice: 0}, {optionName: "Extra Cheese", optionPrice: 0.7}]
            },
            {
              optionList: [{optionName: "No Patty", optionPrice: 0}]
            },
            {
              optionList: [{optionName: "No Salt", optionPrice: 0}, {optionName: "Extra Salt", optionPrice: 0}]
            },
            {
              optionList: [{optionName: "No Bun", optionPrice: 0}]
            },
            //Add ons
            {
              optionList: [{optionName: "Add Bacon", optionPrice: 1.6}, {optionName: "Add Extra Bacon", optionPrice: 3.2}]
            },
            {
              optionList: [{optionName: "Add Lettuce", optionPrice: 0.5}, {optionName: "Add Extra Lettuce", optionPrice: 1}]
            },
            {
              optionList: [{optionName: "Add Tomato", optionPrice: 0.6}, {optionName: "Add Extra Tomato", optionPrice: 1.2}]
            },
            {
              optionList: [{optionName: "Add Mayonnaise", optionPrice: 0.4}, {optionName: "Add Extra Mayonnaise", optionPrice: 0.8}]
            },
          ]
        }
      ],
      [//"McChicken"
        {
          optionName: 'Required Changes',
          required: true,
          multiSelect: false,
          options: []
        },
        {
          optionName: 'Optional Changes',
          required: false,
          multiSelect: true,
          options:[
            {
              optionList: [{optionName: "No Lettuce", optionPrice: 0}, {optionName: "Extra Lettuce", optionPrice: 0.5}]
            },
            {
              optionList: [{optionName: "No Mayonnaise", optionPrice: 0}, {optionName: "Extra Mayonnaise", optionPrice: 0.4}]
            },
            {
              optionList: [{optionName: "No Patty", optionPrice: 0}, {optionName: "Extra Patty", optionPrice: 1.5}]
            },
            {
              optionList: [{optionName: "No Bun", optionPrice: 0}]
            },
            //Add ons
            {
              optionList: [{optionName: "Add Mustard", optionPrice: 0}, {optionName: "Add Extra Mustard", optionPrice: 0}]
            },
            {
              optionList: [{optionName: "Add Ketchup", optionPrice: 0}, {optionName: "Add Extra Ketchup", optionPrice: 0}]
            },
            {
              optionList: [{optionName: "Add Pickle", optionPrice: 0}, {optionName: "Add Extra Pickle", optionPrice: 0}]
            },
            {
              optionList: [{optionName: "Add Cheese", optionPrice: 0.7}, {optionName: "Add Extra Cheese", optionPrice: 1.4}]
            },
            {
              optionList: [{optionName: "Add Bacon", optionPrice: 1.6}, {optionName: "Add Extra Bacon", optionPrice: 3.2}]
            },
            {
              optionList: [{optionName: "Add Tomato", optionPrice: 0.6}, {optionName: "Add Extra Tomato", optionPrice: 1.2}]
            },
          ]
        }
      ],
      [//"Mocha Frappe"
        {
          optionName: 'Required Changes',
          required: true,
          multiSelect: false,
          options: [
            {
              optionList: 
              [
                {optionName: "Small", optionPrice: 0}, {optionName: "Medium", optionPrice: 1},
                {optionName: "Large", optionPrice: 1.5}
              ]
            },
          ]
        },
        {
          optionName: 'Optional Changes',
          required: false,
          multiSelect: true,
          options: [
            {
              optionList: 
              [
                {optionName: "No Ice", optionPrice: 0}, {optionName: "Extra Ice", optionPrice: 0},
                {optionName: "2x Extra Ice", optionPrice: 1}
              ]
            },
            {
              optionList: 
              [
                {optionName: "No Whipped Cream", optionPrice: 0}, {optionName: "Extra Whipped Cream", optionPrice: 0.5},
                {optionName: "2x Extra Whipped Cream", optionPrice: 1}
              ]
            },
            {
              optionList: 
              [
                {optionName: "No Chocolate Drizzle", optionPrice: 0}, {optionName: "Extra Chocolate Drizzle", optionPrice: 0.5},
                {optionName: "2x Extra Chocolate Drizzle", optionPrice: 1}
              ]
            },
            //Add ons
            {
              optionList: 
              [
                {optionName: "Add 1 Crushed Oreo", optionPrice: 0.5}, {optionName: "Add 2 Crushed Oreo", optionPrice: 1},
                {optionName: "Add 3 Crushed Oreo", optionPrice: 1.5}
              ]
            },
          ]
        }
      ],
      [//"Egg McMuffin"
        {
          optionName: 'Required Changes',
          required: true,
          multiSelect: false,
          options: []
        },
        {
          optionName: 'Optional Changes',
          required: false,
          multiSelect: true,
          options:[
            {
              optionList: [{optionName: "No Butter", optionPrice: 0}, {optionName: "Extra Butter", optionPrice: 0.25}]
            },
            {
              optionList: [{optionName: "No Cheese", optionPrice: 0}, {optionName: "Extra Cheese", optionPrice: 0.7}]
            },
            {
              optionList: [{optionName: "No Round Egg", optionPrice: 0}, {optionName: "Extra Round Egg", optionPrice: 2}]
            },
            {
              optionList: [{optionName: "No Canadian Bacon", optionPrice: 0}, {optionName: "Extra Canadian Bacon", optionPrice: 1.5}]
            },
            {
              optionList: [{optionName: "No English McMuffin", optionPrice: 0}]
            },
            //Add ons
            {
              optionList: [{optionName: "Add Bacon", optionPrice: 1.6}, {optionName: "Add Extra Bacon", optionPrice: 3.2}]
            },
          ]
        }
      ],
      [//"Ice Cream cone"
        {
          optionName: 'Required Changes',
          required: true,
          multiSelect: false,
          options: []
        },
        {
          optionName: 'Optional Changes',
          required: false,
          multiSelect: true,
          options:[]
        }
      ],
      [//"Happy Meal"
        {
          optionName: 'Required Changes',
          required: true,
          multiSelect: false,
          options: [
            {
              optionList: [{optionName: "4 Piece", optionPrice: 0}, {optionName: "6 Piece", optionPrice: 1}]
            },
            {
              optionList: 
              [
                {optionName: "No Sauce", optionPrice: 0}, {optionName: "Add Ketchup Packet", optionPrice: 0},
                {optionName: "Add Tangy BBQ Sauce", optionPrice: 0}, {optionName: "Add Sweet N Sour Sauce", optionPrice: 0},
                {optionName: "Add Honey Packet", optionPrice: 0}, {optionName: "Add Hot Mustard Dipping Sauce Sauce", optionPrice: 0},
                {optionName: "Add Creamy Ranch Sauce", optionPrice: 0}, {optionName: "Add Hot Picante Sauce", optionPrice: 0},
                {optionName: "Add Mild Picante Sauce", optionPrice: 0}, {optionName: "Add Honey Mustard", optionPrice: 0},
                {optionName: "Add Spicy Buffalo Sauce", optionPrice: 0}
              ]
            }
          ]
        },
        {
          optionName: 'Optional Changes',
          required: false,
          multiSelect: true,
          options: []
        }
      ]
    ],
    menuDietaryViolations: [
      ["vegetarian", "vegan", "gluten-free", "dairy-free"], // Big Mac
      ["vegetarian", "vegan", "gluten-free", "dairy-free"], // Chicken Nuggets
      [], // Fries
      [], // Coke
      ["vegetarian", "vegan", "gluten-free", "dairy-free"], // Cheeseburger
      ["vegetarian", "vegan", "gluten-free", "dairy-free"], // McChicken
      ["vegan", "dairy-free"], // Mocha Frappe
      ["vegetarian", "vegan", "gluten-free", "dairy-free"], // Egg McMuffin
      ["vegan", "dairy-free", "gluten-free"], // Ice Cream cone
      ["vegetarian", "vegan", "gluten-free", "dairy-free"], // Happy Meal
    ],
    ubereatsMenuPrice: [
      5.53, 5.67, 3.07, 2.89, 3.69, 4.89, 3.29, 2.79, 1.07, 3.29,
    ],
    doordashMenuPrice: [
      5.97, 5.43, 3.81, 2.44, 3.12, 4.55, 3.16, 2.95, 1.03, 3.67,
    ],
    grubhubMenuPrice: [
      5.24, 5.51, 3.54, 2.13, 3.88, 4.15, 3.99, 2.54, 1.01, 3.24,
    ],
    ubereatsAvailable: true,
    doordashAvailable: false,
    grubhubAvailable: true,
    cuisineType: "American",
    operatingHours: ["All Day"],
    restaurantImage: "images/mcd/mcd-logo.png",
    menuItemImages: [
      "/images/mcd/big mac.jpeg",
      "/images/mcd/mcnuggets.png",
      "/images/mcd/fries.jpeg",
      "/images/mcd/coke.jpeg",
      "/images/mcd/cheeseburger.jpg",
      "/images/mcd/mcchicken.jpeg",
      "/images/mcd/mochafrappe.jpeg",
      "/images/mcd/egg-mcmuffin.jpeg",
      "/images/mcd/icecream-cone.jpeg",
      "/images/mcd/happymeal.jpg",
    ],
    websiteURL: "https://www.mcdonalds.com/us/en-us.html",
  },
  {
    restaurantID: "13c821c",
    restaurantName: "McDonalds",
    restaurantAddress: "McDonalds, 605 W Stadium Ave, West Lafayette, IN 47906",
    distance: 0.8,
    menu: [
      "Big Mac",
      "Chicken Nuggets",
      "Fries",
      "Coke",
      "Cheeseburger",
      "McChicken",
      "Mocha Frappe",
      "Egg McMuff in",
      "Ice Cream cone",
      "Happy Meal",
    ],
    menuOptions: [
      [//"Big Mac"
        {
          optionName: 'Required Changes',
          required: true,
          multiSelect: false,
          options: []
        },
        {
          optionName: 'Optional Changes',
          required: false,
          multiSelect: true,
          options:[
            {
              optionList: [{optionName: "No Sauce", optionPrice: 0}, {optionName: "Extra Sauce", optionPrice: 0.4}]
            },
            {
              optionList: [{optionName: "No Onion", optionPrice: 0}, {optionName: "Extra Onion", optionPrice: 0}]
            },
            {
              optionList: [{optionName: "No Lettuce", optionPrice: 0}, {optionName: "Extra Lettuce", optionPrice: 0}]
            },
            {
              optionList: [{optionName: "No Pickle", optionPrice: 0}, {optionName: "Extra Pickle", optionPrice: 0}]
            },
            {
              optionList: [{optionName: "No Cheese", optionPrice: 0}, {optionName: "Extra Cheese", optionPrice: 0.7}]
            },
            {
              optionList: 
              [
                {optionName: "No Patties", optionPrice: 0}, {optionName: "Remove 1 Patty", optionPrice: 0}, 
                {optionName: "Add 1 Patty", optionPrice: 1.2}, {optionName: "Add 2 Patties", optionPrice: 2.4}
              ]
            },
            {
              optionList: [{optionName: "No Salt", optionPrice: 0}, {optionName: "Extra Salt", optionPrice: 0}]
            },
            {
              optionList: [{optionName: "No Bun", optionPrice: 0}]
            },
            //Add Ons
            {
              optionList: [{optionName: "Add Tomato", optionPrice: 0.6}, {optionName: "Add Extra Tomato", optionPrice: 1.2}]
            },
            {
              optionList: [{optionName: "Add Mayonnaise", optionPrice: 0.4}, {optionName: "Add Extra Mayonnaise", optionPrice: 0.8}]
            },
          ]
        }
      ],
      [//"Chicken Nuggets"
        {
          optionName: 'Required Changes',
          required: true,
          multiSelect: false,
          options: [
            {
              optionList: 
              [
                {optionName: "4 Piece", optionPrice: 0}, {optionName: "6 Piece", optionPrice: 1},
                {optionName: "10 Piece", optionPrice: 3}, {optionName: "20 Piece", optionPrice: 6}
              ]
            },
            {
              optionList: 
              [
                {optionName: "No Sauce", optionPrice: 0}, {optionName: "Add Ketchup Packet", optionPrice: 0},
                {optionName: "Add Tangy BBQ Sauce", optionPrice: 0}, {optionName: "Add Sweet N Sour Sauce", optionPrice: 0},
                {optionName: "Add Honey Packet", optionPrice: 0}, {optionName: "Add Hot Mustard Dipping Sauce Sauce", optionPrice: 0},
                {optionName: "Add Creamy Ranch Sauce", optionPrice: 0}, {optionName: "Add Hot Picante Sauce", optionPrice: 0},
                {optionName: "Add Mild Picante Sauce", optionPrice: 0}, {optionName: "Add Honey Mustard", optionPrice: 0},
                {optionName: "Add Spicy Buffalo Sauce", optionPrice: 0}
              ]
            }
          ]
        },
        {
          optionName: 'Optional Changes',
          required: false,
          multiSelect: true,
          options: []
        }
      ],
      [//"Fries"
        {
          optionName: 'Required Changes',
          required: true,
          multiSelect: false,
          options: [
            {
              optionList: 
              [
                {optionName: "Small", optionPrice: 0},{optionName: "Medium", optionPrice: 0.8},
                {optionName: "Large", optionPrice: 1.5}
              ]
            },
            {
              optionList: 
              [
                {optionName: "No Sauce", optionPrice: 0}, {optionName: "Add Ketchup Packet", optionPrice: 0},
                {optionName: "Add Tangy BBQ Sauce", optionPrice: 0}, {optionName: "Add Sweet N Sour Sauce", optionPrice: 0},
                {optionName: "Add Honey Packet", optionPrice: 0}, {optionName: "Add Hot Mustard Dipping Sauce Sauce", optionPrice: 0},
                {optionName: "Add Creamy Ranch Sauce", optionPrice: 0}, {optionName: "Add Hot Picante Sauce", optionPrice: 0},
                {optionName: "Add Mild Picante Sauce", optionPrice: 0}, {optionName: "Add Honey Mustard", optionPrice: 0},
                {optionName: "Add Spicy Buffalo Sauce", optionPrice: 0}
              ]
            }
          ]
        },
        {
          optionName: 'Optional Changes',
          required: false,
          multiSelect: true,
          options: [
            {
              optionList: [{optionName: "No Salt", optionPrice: 0}, {optionName: "Extra Salt", optionPrice: 0}]
            }
          ]
        }
      ],
      [//"Coke"
        {
          optionName: 'Required Changes',
          required: true,
          multiSelect: false,
          options: [
            {
              optionList: 
              [
                {optionName: "Extra Small", optionPrice: 0}, {optionName: "Small", optionPrice: 0},
                {optionName: "Medium", optionPrice: 1}, {optionName: "Large", optionPrice: 1.5}
              ]
            }
          ]
        },
        {
          optionName: 'Optional Changes',
          required: false,
          multiSelect: true,
          options: [
            {
              optionList: [{optionName: "No Ice", optionPrice: 0}, {optionName: "Extra Ice", optionPrice: 0}]
            }
          ]
        }
      ],
      [//"Cheeseburger"
        {
          optionName: 'Required Changes',
          required: true,
          multiSelect: false,
          options: []
        },
        {
          optionName: 'Optional Changes',
          required: false,
          multiSelect: true,
          options:[
            {
              optionList: [{optionName: "No Mustard", optionPrice: 0}, {optionName: "Extra Mustard", optionPrice: 0}]
            },
            {
              optionList: [{optionName: "No Ketchup", optionPrice: 0}, {optionName: "Extra Ketchup", optionPrice: 0}]
            },
            {
              optionList: [{optionName: "No Onion", optionPrice: 0}, {optionName: "Extra Onion", optionPrice: 0}]
            },
            {
              optionList: [{optionName: "No Pickle", optionPrice: 0}, {optionName: "Extra Pickle", optionPrice: 0}]
            },
            {
              optionList: [{optionName: "No Cheese", optionPrice: 0}, {optionName: "Extra Cheese", optionPrice: 0.7}]
            },
            {
              optionList: [{optionName: "No Patty", optionPrice: 0}]
            },
            {
              optionList: [{optionName: "No Salt", optionPrice: 0}, {optionName: "Extra Salt", optionPrice: 0}]
            },
            {
              optionList: [{optionName: "No Bun", optionPrice: 0}]
            },
            //Add ons
            {
              optionList: [{optionName: "Add Bacon", optionPrice: 1.6}, {optionName: "Add Extra Bacon", optionPrice: 3.2}]
            },
            {
              optionList: [{optionName: "Add Lettuce", optionPrice: 0.5}, {optionName: "Add Extra Lettuce", optionPrice: 1}]
            },
            {
              optionList: [{optionName: "Add Tomato", optionPrice: 0.6}, {optionName: "Add Extra Tomato", optionPrice: 1.2}]
            },
            {
              optionList: [{optionName: "Add Mayonnaise", optionPrice: 0.4}, {optionName: "Add Extra Mayonnaise", optionPrice: 0.8}]
            },
          ]
        }
      ],
      [//"McChicken"
        {
          optionName: 'Required Changes',
          required: true,
          multiSelect: false,
          options: []
        },
        {
          optionName: 'Optional Changes',
          required: false,
          multiSelect: true,
          options:[
            {
              optionList: [{optionName: "No Lettuce", optionPrice: 0}, {optionName: "Extra Lettuce", optionPrice: 0.5}]
            },
            {
              optionList: [{optionName: "No Mayonnaise", optionPrice: 0}, {optionName: "Extra Mayonnaise", optionPrice: 0.4}]
            },
            {
              optionList: [{optionName: "No Patty", optionPrice: 0}, {optionName: "Extra Patty", optionPrice: 1.5}]
            },
            {
              optionList: [{optionName: "No Bun", optionPrice: 0}]
            },
            //Add ons
            {
              optionList: [{optionName: "Add Mustard", optionPrice: 0}, {optionName: "Add Extra Mustard", optionPrice: 0}]
            },
            {
              optionList: [{optionName: "Add Ketchup", optionPrice: 0}, {optionName: "Add Extra Ketchup", optionPrice: 0}]
            },
            {
              optionList: [{optionName: "Add Pickle", optionPrice: 0}, {optionName: "Add Extra Pickle", optionPrice: 0}]
            },
            {
              optionList: [{optionName: "Add Cheese", optionPrice: 0.7}, {optionName: "Add Extra Cheese", optionPrice: 1.4}]
            },
            {
              optionList: [{optionName: "Add Bacon", optionPrice: 1.6}, {optionName: "Add Extra Bacon", optionPrice: 3.2}]
            },
            {
              optionList: [{optionName: "Add Tomato", optionPrice: 0.6}, {optionName: "Add Extra Tomato", optionPrice: 1.2}]
            },
          ]
        }
      ],
      [//"Mocha Frappe"
        {
          optionName: 'Required Changes',
          required: true,
          multiSelect: false,
          options: [
            {
              optionList: 
              [
                {optionName: "Small", optionPrice: 0}, {optionName: "Medium", optionPrice: 1},
                {optionName: "Large", optionPrice: 1.5}
              ]
            },
          ]
        },
        {
          optionName: 'Optional Changes',
          required: false,
          multiSelect: true,
          options: [
            {
              optionList: 
              [
                {optionName: "No Ice", optionPrice: 0}, {optionName: "Extra Ice", optionPrice: 0},
                {optionName: "2x Extra Ice", optionPrice: 1}
              ]
            },
            {
              optionList: 
              [
                {optionName: "No Whipped Cream", optionPrice: 0}, {optionName: "Extra Whipped Cream", optionPrice: 0.5},
                {optionName: "2x Extra Whipped Cream", optionPrice: 1}
              ]
            },
            {
              optionList: 
              [
                {optionName: "No Chocolate Drizzle", optionPrice: 0}, {optionName: "Extra Chocolate Drizzle", optionPrice: 0.5},
                {optionName: "2x Extra Chocolate Drizzle", optionPrice: 1}
              ]
            },
            //Add ons
            {
              optionList: 
              [
                {optionName: "Add 1 Crushed Oreo", optionPrice: 0.5}, {optionName: "Add 2 Crushed Oreo", optionPrice: 1},
                {optionName: "Add 3 Crushed Oreo", optionPrice: 1.5}
              ]
            },
          ]
        }
      ],
      [//"Egg McMuffin"
        {
          optionName: 'Required Changes',
          required: true,
          multiSelect: false,
          options: []
        },
        {
          optionName: 'Optional Changes',
          required: false,
          multiSelect: true,
          options:[
            {
              optionList: [{optionName: "No Butter", optionPrice: 0}, {optionName: "Extra Butter", optionPrice: 0.25}]
            },
            {
              optionList: [{optionName: "No Cheese", optionPrice: 0}, {optionName: "Extra Cheese", optionPrice: 0.7}]
            },
            {
              optionList: [{optionName: "No Round Egg", optionPrice: 0}, {optionName: "Extra Round Egg", optionPrice: 2}]
            },
            {
              optionList: [{optionName: "No Canadian Bacon", optionPrice: 0}, {optionName: "Extra Canadian Bacon", optionPrice: 1.5}]
            },
            {
              optionList: [{optionName: "No English McMuffin", optionPrice: 0}]
            },
            //Add ons
            {
              optionList: [{optionName: "Add Bacon", optionPrice: 1.6}, {optionName: "Add Extra Bacon", optionPrice: 3.2}]
            },
          ]
        }
      ],
      [//"Ice Cream cone"
        {
          optionName: 'Required Changes',
          required: true,
          multiSelect: false,
          options: []
        },
        {
          optionName: 'Optional Changes',
          required: false,
          multiSelect: true,
          options:[]
        }
      ],
      [//"Happy Meal"
        {
          optionName: 'Required Changes',
          required: true,
          multiSelect: false,
          options: [
            {
              optionList: [{optionName: "4 Piece", optionPrice: 0}, {optionName: "6 Piece", optionPrice: 1}]
            },
            {
              optionList: 
              [
                {optionName: "No Sauce", optionPrice: 0}, {optionName: "Add Ketchup Packet", optionPrice: 0},
                {optionName: "Add Tangy BBQ Sauce", optionPrice: 0}, {optionName: "Add Sweet N Sour Sauce", optionPrice: 0},
                {optionName: "Add Honey Packet", optionPrice: 0}, {optionName: "Add Hot Mustard Dipping Sauce Sauce", optionPrice: 0},
                {optionName: "Add Creamy Ranch Sauce", optionPrice: 0}, {optionName: "Add Hot Picante Sauce", optionPrice: 0},
                {optionName: "Add Mild Picante Sauce", optionPrice: 0}, {optionName: "Add Honey Mustard", optionPrice: 0},
                {optionName: "Add Spicy Buffalo Sauce", optionPrice: 0}
              ]
            }
          ]
        },
        {
          optionName: 'Optional Changes',
          required: false,
          multiSelect: true,
          options: []
        }
      ]
    ],
    menuDietaryViolations: [
      ["vegetarian", "vegan", "gluten-free", "dairy-free"], // Big Mac
      ["vegetarian", "vegan", "gluten-free", "dairy-free"], // Chicken Nuggets
      [], // Fries
      [], // Coke
      ["vegetarian", "vegan", "gluten-free", "dairy-free"], // Cheeseburger
      ["vegetarian", "vegan", "gluten-free", "dairy-free"], // McChicken
      ["vegan", "dairy-free"], // Mocha Frappe
      ["vegetarian", "vegan", "gluten-free", "dairy-free"], // Egg McMuffin
      ["vegan", "dairy-free", "gluten-free"], // Ice Cream cone
      ["vegetarian", "vegan", "gluten-free", "dairy-free"], // Happy Meal
    ],
    ubereatsMenuPrice: [
      30.00, 5.62, 3.87, 2.14, 3.35, 4.74, 3.89, 2.12, 1.12, 3.73,
    ],
    doordashMenuPrice: [
      5.85, 5.68, 3.18, 2.81, 3.38, 4.22, 3.2, 2.77, 1.11, 3.59,
    ],
    grubhubMenuPrice: [
      5.65, 5.15, 3.51, 2.88, 3.77, 4.91, 3.22, 2.75, 1.04, 3.99,
    ],
    ubereatsAvailable: false,
    doordashAvailable: true,
    grubhubAvailable: true,
    cuisineType: "American",
    operatingHours: ["All Day"],
    restaurantImage: "images/mcd/mcd-logo.png",
    menuItemImages: [
      "/images/mcd/big mac.jpeg",
      "/images/mcd/mcnuggets.png",
      "/images/mcd/fries.jpeg",
      "/images/mcd/coke.jpeg",
      "/images/mcd/cheeseburger.jpg",
      "/images/mcd/mcchicken.jpeg",
      "/images/mcd/mochafrappe.jpeg",
      "/images/mcd/egg-mcmuffin.jpeg",
      "/images/mcd/icecream-cone.jpeg",
      "/images/mcd/happymeal.jpg",
    ],
    websiteURL: "https://www.mcdonalds.com/us/en-us.html",
  },
  {
    restaurantID: "21e7b6f",
    restaurantName: "McDonalds",
    restaurantAddress: "McDonalds, 613 Sagamore Pkwy W, West Lafayette, IN 47906",
    distance: 1.2,
    menu: [
      "Big Mac",
      "Chicken Nuggets",
      "Fries",
      "Coke",
      "Cheeseburger",
      "McChicken",
      "Mocha Frappe",
      "Egg McMuffin",
      "Ice Cream cone",
      "Happy Meal",
    ],
    menuOptions: [
      [//"Big Mac"
        {
          optionName: 'Required Changes',
          required: true,
          multiSelect: false,
          options: []
        },
        {
          optionName: 'Optional Changes',
          required: false,
          multiSelect: true,
          options:[
            {
              optionList: [{optionName: "No Sauce", optionPrice: 0}, {optionName: "Extra Sauce", optionPrice: 0.4}]
            },
            {
              optionList: [{optionName: "No Onion", optionPrice: 0}, {optionName: "Extra Onion", optionPrice: 0}]
            },
            {
              optionList: [{optionName: "No Lettuce", optionPrice: 0}, {optionName: "Extra Lettuce", optionPrice: 0}]
            },
            {
              optionList: [{optionName: "No Pickle", optionPrice: 0}, {optionName: "Extra Pickle", optionPrice: 0}]
            },
            {
              optionList: [{optionName: "No Cheese", optionPrice: 0}, {optionName: "Extra Cheese", optionPrice: 0.7}]
            },
            {
              optionList: 
              [
                {optionName: "No Patties", optionPrice: 0}, {optionName: "Remove 1 Patty", optionPrice: 0}, 
                {optionName: "Add 1 Patty", optionPrice: 1.2}, {optionName: "Add 2 Patties", optionPrice: 2.4}
              ]
            },
            {
              optionList: [{optionName: "No Salt", optionPrice: 0}, {optionName: "Extra Salt", optionPrice: 0}]
            },
            {
              optionList: [{optionName: "No Bun", optionPrice: 0}]
            },
            //Add Ons
            {
              optionList: [{optionName: "Add Tomato", optionPrice: 0.6}, {optionName: "Add Extra Tomato", optionPrice: 1.2}]
            },
            {
              optionList: [{optionName: "Add Mayonnaise", optionPrice: 0.4}, {optionName: "Add Extra Mayonnaise", optionPrice: 0.8}]
            },
          ]
        }
      ],
      [//"Chicken Nuggets"
        {
          optionName: 'Required Changes',
          required: true,
          multiSelect: false,
          options: [
            {
              optionList: 
              [
                {optionName: "4 Piece", optionPrice: 0}, {optionName: "6 Piece", optionPrice: 1},
                {optionName: "10 Piece", optionPrice: 3}, {optionName: "20 Piece", optionPrice: 6}
              ]
            },
            {
              optionList: 
              [
                {optionName: "No Sauce", optionPrice: 0}, {optionName: "Add Ketchup Packet", optionPrice: 0},
                {optionName: "Add Tangy BBQ Sauce", optionPrice: 0}, {optionName: "Add Sweet N Sour Sauce", optionPrice: 0},
                {optionName: "Add Honey Packet", optionPrice: 0}, {optionName: "Add Hot Mustard Dipping Sauce Sauce", optionPrice: 0},
                {optionName: "Add Creamy Ranch Sauce", optionPrice: 0}, {optionName: "Add Hot Picante Sauce", optionPrice: 0},
                {optionName: "Add Mild Picante Sauce", optionPrice: 0}, {optionName: "Add Honey Mustard", optionPrice: 0},
                {optionName: "Add Spicy Buffalo Sauce", optionPrice: 0}
              ]
            }
          ]
        },
        {
          optionName: 'Optional Changes',
          required: false,
          multiSelect: true,
          options: []
        }
      ],
      [//"Fries"
        {
          optionName: 'Required Changes',
          required: true,
          multiSelect: false,
          options: [
            {
              optionList: 
              [
                {optionName: "Small", optionPrice: 0},{optionName: "Medium", optionPrice: 0.8},
                {optionName: "Large", optionPrice: 1.5}
              ]
            },
            {
              optionList: 
              [
                {optionName: "No Sauce", optionPrice: 0}, {optionName: "Add Ketchup Packet", optionPrice: 0},
                {optionName: "Add Tangy BBQ Sauce", optionPrice: 0}, {optionName: "Add Sweet N Sour Sauce", optionPrice: 0},
                {optionName: "Add Honey Packet", optionPrice: 0}, {optionName: "Add Hot Mustard Dipping Sauce Sauce", optionPrice: 0},
                {optionName: "Add Creamy Ranch Sauce", optionPrice: 0}, {optionName: "Add Hot Picante Sauce", optionPrice: 0},
                {optionName: "Add Mild Picante Sauce", optionPrice: 0}, {optionName: "Add Honey Mustard", optionPrice: 0},
                {optionName: "Add Spicy Buffalo Sauce", optionPrice: 0}
              ]
            }
          ]
        },
        {
          optionName: 'Optional Changes',
          required: false,
          multiSelect: true,
          options: [
            {
              optionList: [{optionName: "No Salt", optionPrice: 0}, {optionName: "Extra Salt", optionPrice: 0}]
            }
          ]
        }
      ],
      [//"Coke"
        {
          optionName: 'Required Changes',
          required: true,
          multiSelect: false,
          options: [
            {
              optionList: 
              [
                {optionName: "Extra Small", optionPrice: 0}, {optionName: "Small", optionPrice: 0},
                {optionName: "Medium", optionPrice: 1}, {optionName: "Large", optionPrice: 1.5}
              ]
            }
          ]
        },
        {
          optionName: 'Optional Changes',
          required: false,
          multiSelect: true,
          options: [
            {
              optionList: [{optionName: "No Ice", optionPrice: 0}, {optionName: "Extra Ice", optionPrice: 0}]
            }
          ]
        }
      ],
      [//"Cheeseburger"
        {
          optionName: 'Required Changes',
          required: true,
          multiSelect: false,
          options: []
        },
        {
          optionName: 'Optional Changes',
          required: false,
          multiSelect: true,
          options:[
            {
              optionList: [{optionName: "No Mustard", optionPrice: 0}, {optionName: "Extra Mustard", optionPrice: 0}]
            },
            {
              optionList: [{optionName: "No Ketchup", optionPrice: 0}, {optionName: "Extra Ketchup", optionPrice: 0}]
            },
            {
              optionList: [{optionName: "No Onion", optionPrice: 0}, {optionName: "Extra Onion", optionPrice: 0}]
            },
            {
              optionList: [{optionName: "No Pickle", optionPrice: 0}, {optionName: "Extra Pickle", optionPrice: 0}]
            },
            {
              optionList: [{optionName: "No Cheese", optionPrice: 0}, {optionName: "Extra Cheese", optionPrice: 0.7}]
            },
            {
              optionList: [{optionName: "No Patty", optionPrice: 0}]
            },
            {
              optionList: [{optionName: "No Salt", optionPrice: 0}, {optionName: "Extra Salt", optionPrice: 0}]
            },
            {
              optionList: [{optionName: "No Bun", optionPrice: 0}]
            },
            //Add ons
            {
              optionList: [{optionName: "Add Bacon", optionPrice: 1.6}, {optionName: "Add Extra Bacon", optionPrice: 3.2}]
            },
            {
              optionList: [{optionName: "Add Lettuce", optionPrice: 0.5}, {optionName: "Add Extra Lettuce", optionPrice: 1}]
            },
            {
              optionList: [{optionName: "Add Tomato", optionPrice: 0.6}, {optionName: "Add Extra Tomato", optionPrice: 1.2}]
            },
            {
              optionList: [{optionName: "Add Mayonnaise", optionPrice: 0.4}, {optionName: "Add Extra Mayonnaise", optionPrice: 0.8}]
            },
          ]
        }
      ],
      [//"McChicken"
        {
          optionName: 'Required Changes',
          required: true,
          multiSelect: false,
          options: []
        },
        {
          optionName: 'Optional Changes',
          required: false,
          multiSelect: true,
          options:[
            {
              optionList: [{optionName: "No Lettuce", optionPrice: 0}, {optionName: "Extra Lettuce", optionPrice: 0.5}]
            },
            {
              optionList: [{optionName: "No Mayonnaise", optionPrice: 0}, {optionName: "Extra Mayonnaise", optionPrice: 0.4}]
            },
            {
              optionList: [{optionName: "No Patty", optionPrice: 0}, {optionName: "Extra Patty", optionPrice: 1.5}]
            },
            {
              optionList: [{optionName: "No Bun", optionPrice: 0}]
            },
            //Add ons
            {
              optionList: [{optionName: "Add Mustard", optionPrice: 0}, {optionName: "Add Extra Mustard", optionPrice: 0}]
            },
            {
              optionList: [{optionName: "Add Ketchup", optionPrice: 0}, {optionName: "Add Extra Ketchup", optionPrice: 0}]
            },
            {
              optionList: [{optionName: "Add Pickle", optionPrice: 0}, {optionName: "Add Extra Pickle", optionPrice: 0}]
            },
            {
              optionList: [{optionName: "Add Cheese", optionPrice: 0.7}, {optionName: "Add Extra Cheese", optionPrice: 1.4}]
            },
            {
              optionList: [{optionName: "Add Bacon", optionPrice: 1.6}, {optionName: "Add Extra Bacon", optionPrice: 3.2}]
            },
            {
              optionList: [{optionName: "Add Tomato", optionPrice: 0.6}, {optionName: "Add Extra Tomato", optionPrice: 1.2}]
            },
          ]
        }
      ],
      [//"Mocha Frappe"
        {
          optionName: 'Required Changes',
          required: true,
          multiSelect: false,
          options: [
            {
              optionList: 
              [
                {optionName: "Small", optionPrice: 0}, {optionName: "Medium", optionPrice: 1},
                {optionName: "Large", optionPrice: 1.5}
              ]
            },
          ]
        },
        {
          optionName: 'Optional Changes',
          required: false,
          multiSelect: true,
          options: [
            {
              optionList: 
              [
                {optionName: "No Ice", optionPrice: 0}, {optionName: "Extra Ice", optionPrice: 0},
                {optionName: "2x Extra Ice", optionPrice: 1}
              ]
            },
            {
              optionList: 
              [
                {optionName: "No Whipped Cream", optionPrice: 0}, {optionName: "Extra Whipped Cream", optionPrice: 0.5},
                {optionName: "2x Extra Whipped Cream", optionPrice: 1}
              ]
            },
            {
              optionList: 
              [
                {optionName: "No Chocolate Drizzle", optionPrice: 0}, {optionName: "Extra Chocolate Drizzle", optionPrice: 0.5},
                {optionName: "2x Extra Chocolate Drizzle", optionPrice: 1}
              ]
            },
            //Add ons
            {
              optionList: 
              [
                {optionName: "Add 1 Crushed Oreo", optionPrice: 0.5}, {optionName: "Add 2 Crushed Oreo", optionPrice: 1},
                {optionName: "Add 3 Crushed Oreo", optionPrice: 1.5}
              ]
            },
          ]
        }
      ],
      [//"Egg McMuffin"
        {
          optionName: 'Required Changes',
          required: true,
          multiSelect: false,
          options: []
        },
        {
          optionName: 'Optional Changes',
          required: false,
          multiSelect: true,
          options:[
            {
              optionList: [{optionName: "No Butter", optionPrice: 0}, {optionName: "Extra Butter", optionPrice: 0.25}]
            },
            {
              optionList: [{optionName: "No Cheese", optionPrice: 0}, {optionName: "Extra Cheese", optionPrice: 0.7}]
            },
            {
              optionList: [{optionName: "No Round Egg", optionPrice: 0}, {optionName: "Extra Round Egg", optionPrice: 2}]
            },
            {
              optionList: [{optionName: "No Canadian Bacon", optionPrice: 0}, {optionName: "Extra Canadian Bacon", optionPrice: 1.5}]
            },
            {
              optionList: [{optionName: "No English McMuffin", optionPrice: 0}]
            },
            //Add ons
            {
              optionList: [{optionName: "Add Bacon", optionPrice: 1.6}, {optionName: "Add Extra Bacon", optionPrice: 3.2}]
            },
          ]
        }
      ],
      [//"Ice Cream cone"
        {
          optionName: 'Required Changes',
          required: true,
          multiSelect: false,
          options: []
        },
        {
          optionName: 'Optional Changes',
          required: false,
          multiSelect: true,
          options:[]
        }
      ],
      [//"Happy Meal"
        {
          optionName: 'Required Changes',
          required: true,
          multiSelect: false,
          options: [
            {
              optionList: [{optionName: "4 Piece", optionPrice: 0}, {optionName: "6 Piece", optionPrice: 1}]
            },
            {
              optionList: 
              [
                {optionName: "No Sauce", optionPrice: 0}, {optionName: "Add Ketchup Packet", optionPrice: 0},
                {optionName: "Add Tangy BBQ Sauce", optionPrice: 0}, {optionName: "Add Sweet N Sour Sauce", optionPrice: 0},
                {optionName: "Add Honey Packet", optionPrice: 0}, {optionName: "Add Hot Mustard Dipping Sauce Sauce", optionPrice: 0},
                {optionName: "Add Creamy Ranch Sauce", optionPrice: 0}, {optionName: "Add Hot Picante Sauce", optionPrice: 0},
                {optionName: "Add Mild Picante Sauce", optionPrice: 0}, {optionName: "Add Honey Mustard", optionPrice: 0},
                {optionName: "Add Spicy Buffalo Sauce", optionPrice: 0}
              ]
            }
          ]
        },
        {
          optionName: 'Optional Changes',
          required: false,
          multiSelect: true,
          options: []
        }
      ]
    ],
    menuDietaryViolations: [
      ["vegetarian", "vegan", "gluten-free", "dairy-free"], // Big Mac
      ["vegetarian", "vegan", "gluten-free", "dairy-free"], // Chicken Nuggets
      [], // Fries
      [], // Coke
      ["vegetarian", "vegan", "gluten-free", "dairy-free"], // Cheeseburger
      ["vegetarian", "vegan", "gluten-free", "dairy-free"], // McChicken
      ["vegan", "dairy-free"], // Mocha Frappe
      ["vegetarian", "vegan", "gluten-free", "dairy-free"], // Egg McMuffin
      ["vegan", "dairy-free", "gluten-free"], // Ice Cream cone
      ["vegetarian", "vegan", "gluten-free", "dairy-free"], // Happy Meal
    ],
    ubereatsMenuPrice: [
      5.45, 5.55, 3.22, 2.99, 3.79, 4.79, 3.33, 2.67, 1.15, 3.25,
    ],
    doordashMenuPrice: [
      5.99, 5.42, 3.12, 2.57, 3.5, 4.25, 3.14, 2.83, 1.11, 3.75,
    ],
    grubhubMenuPrice: [5.3, 5.41, 3.44, 2.22, 3.8, 4.3, 3.66, 2.61, 1.08, 3.48],
    ubereatsAvailable: true,
    doordashAvailable: true,
    grubhubAvailable: false,
    cuisineType: "American",
    operatingHours: ["All Day"],
    restaurantImage: "images/mcd/mcd-logo.png",
    menuItemImages: [
      "/images/mcd/big mac.jpeg",
      "/images/mcd/mcnuggets.png",
      "/images/mcd/fries.jpeg",
      "/images/mcd/coke.jpeg",
      "/images/mcd/cheeseburger.jpg",
      "/images/mcd/mcchicken.jpeg",
      "/images/mcd/mochafrappe.jpeg",
      "/images/mcd/egg-mcmuffin.jpeg",
      "/images/mcd/icecream-cone.jpeg",
      "/images/mcd/happymeal.jpg",
    ],
    websiteURL: "https://www.mcdonalds.com/us/en-us.html",
  },
  {
    restaurantID: "89d3c1b",
    restaurantName: "McDonalds",
    restaurantAddress: "McDonalds, 510 Sagamore Pkwy N, Lafayette, IN 47904",
    distance: 2.5,
    menu: [
      "Big Mac",
      "Chicken Nuggets",
      "Fries",
      "Coke",
      "Cheeseburger",
      "McChicken",
      "Mocha Frappe",
      "Egg McMuffin",
      "Ice Cream cone",
      "Happy Meal",
    ],
    menuOptions: [
      [//"Big Mac"
        {
          optionName: 'Required Changes',
          required: true,
          multiSelect: false,
          options: []
        },
        {
          optionName: 'Optional Changes',
          required: false,
          multiSelect: true,
          options:[
            {
              optionList: [{optionName: "No Sauce", optionPrice: 0}, {optionName: "Extra Sauce", optionPrice: 0.4}]
            },
            {
              optionList: [{optionName: "No Onion", optionPrice: 0}, {optionName: "Extra Onion", optionPrice: 0}]
            },
            {
              optionList: [{optionName: "No Lettuce", optionPrice: 0}, {optionName: "Extra Lettuce", optionPrice: 0}]
            },
            {
              optionList: [{optionName: "No Pickle", optionPrice: 0}, {optionName: "Extra Pickle", optionPrice: 0}]
            },
            {
              optionList: [{optionName: "No Cheese", optionPrice: 0}, {optionName: "Extra Cheese", optionPrice: 0.7}]
            },
            {
              optionList: 
              [
                {optionName: "No Patties", optionPrice: 0}, {optionName: "Remove 1 Patty", optionPrice: 0}, 
                {optionName: "Add 1 Patty", optionPrice: 1.2}, {optionName: "Add 2 Patties", optionPrice: 2.4}
              ]
            },
            {
              optionList: [{optionName: "No Salt", optionPrice: 0}, {optionName: "Extra Salt", optionPrice: 0}]
            },
            {
              optionList: [{optionName: "No Bun", optionPrice: 0}]
            },
            //Add Ons
            {
              optionList: [{optionName: "Add Tomato", optionPrice: 0.6}, {optionName: "Add Extra Tomato", optionPrice: 1.2}]
            },
            {
              optionList: [{optionName: "Add Mayonnaise", optionPrice: 0.4}, {optionName: "Add Extra Mayonnaise", optionPrice: 0.8}]
            },
          ]
        }
      ],
      [//"Chicken Nuggets"
        {
          optionName: 'Required Changes',
          required: true,
          multiSelect: false,
          options: [
            {
              optionList: 
              [
                {optionName: "4 Piece", optionPrice: 0}, {optionName: "6 Piece", optionPrice: 1},
                {optionName: "10 Piece", optionPrice: 3}, {optionName: "20 Piece", optionPrice: 6}
              ]
            },
            {
              optionList: 
              [
                {optionName: "No Sauce", optionPrice: 0}, {optionName: "Add Ketchup Packet", optionPrice: 0},
                {optionName: "Add Tangy BBQ Sauce", optionPrice: 0}, {optionName: "Add Sweet N Sour Sauce", optionPrice: 0},
                {optionName: "Add Honey Packet", optionPrice: 0}, {optionName: "Add Hot Mustard Dipping Sauce Sauce", optionPrice: 0},
                {optionName: "Add Creamy Ranch Sauce", optionPrice: 0}, {optionName: "Add Hot Picante Sauce", optionPrice: 0},
                {optionName: "Add Mild Picante Sauce", optionPrice: 0}, {optionName: "Add Honey Mustard", optionPrice: 0},
                {optionName: "Add Spicy Buffalo Sauce", optionPrice: 0}
              ]
            }
          ]
        },
        {
          optionName: 'Optional Changes',
          required: false,
          multiSelect: true,
          options: []
        }
      ],
      [//"Fries"
        {
          optionName: 'Required Changes',
          required: true,
          multiSelect: false,
          options: [
            {
              optionList: 
              [
                {optionName: "Small", optionPrice: 0},{optionName: "Medium", optionPrice: 0.8},
                {optionName: "Large", optionPrice: 1.5}
              ]
            },
            {
              optionList: 
              [
                {optionName: "No Sauce", optionPrice: 0}, {optionName: "Add Ketchup Packet", optionPrice: 0},
                {optionName: "Add Tangy BBQ Sauce", optionPrice: 0}, {optionName: "Add Sweet N Sour Sauce", optionPrice: 0},
                {optionName: "Add Honey Packet", optionPrice: 0}, {optionName: "Add Hot Mustard Dipping Sauce Sauce", optionPrice: 0},
                {optionName: "Add Creamy Ranch Sauce", optionPrice: 0}, {optionName: "Add Hot Picante Sauce", optionPrice: 0},
                {optionName: "Add Mild Picante Sauce", optionPrice: 0}, {optionName: "Add Honey Mustard", optionPrice: 0},
                {optionName: "Add Spicy Buffalo Sauce", optionPrice: 0}
              ]
            }
          ]
        },
        {
          optionName: 'Optional Changes',
          required: false,
          multiSelect: true,
          options: [
            {
              optionList: [{optionName: "No Salt", optionPrice: 0}, {optionName: "Extra Salt", optionPrice: 0}]
            }
          ]
        }
      ],
      [//"Coke"
        {
          optionName: 'Required Changes',
          required: true,
          multiSelect: false,
          options: [
            {
              optionList: 
              [
                {optionName: "Extra Small", optionPrice: 0}, {optionName: "Small", optionPrice: 0},
                {optionName: "Medium", optionPrice: 1}, {optionName: "Large", optionPrice: 1.5}
              ]
            }
          ]
        },
        {
          optionName: 'Optional Changes',
          required: false,
          multiSelect: true,
          options: [
            {
              optionList: [{optionName: "No Ice", optionPrice: 0}, {optionName: "Extra Ice", optionPrice: 0}]
            }
          ]
        }
      ],
      [//"Cheeseburger"
        {
          optionName: 'Required Changes',
          required: true,
          multiSelect: false,
          options: []
        },
        {
          optionName: 'Optional Changes',
          required: false,
          multiSelect: true,
          options:[
            {
              optionList: [{optionName: "No Mustard", optionPrice: 0}, {optionName: "Extra Mustard", optionPrice: 0}]
            },
            {
              optionList: [{optionName: "No Ketchup", optionPrice: 0}, {optionName: "Extra Ketchup", optionPrice: 0}]
            },
            {
              optionList: [{optionName: "No Onion", optionPrice: 0}, {optionName: "Extra Onion", optionPrice: 0}]
            },
            {
              optionList: [{optionName: "No Pickle", optionPrice: 0}, {optionName: "Extra Pickle", optionPrice: 0}]
            },
            {
              optionList: [{optionName: "No Cheese", optionPrice: 0}, {optionName: "Extra Cheese", optionPrice: 0.7}]
            },
            {
              optionList: [{optionName: "No Patty", optionPrice: 0}]
            },
            {
              optionList: [{optionName: "No Salt", optionPrice: 0}, {optionName: "Extra Salt", optionPrice: 0}]
            },
            {
              optionList: [{optionName: "No Bun", optionPrice: 0}]
            },
            //Add ons
            {
              optionList: [{optionName: "Add Bacon", optionPrice: 1.6}, {optionName: "Add Extra Bacon", optionPrice: 3.2}]
            },
            {
              optionList: [{optionName: "Add Lettuce", optionPrice: 0.5}, {optionName: "Add Extra Lettuce", optionPrice: 1}]
            },
            {
              optionList: [{optionName: "Add Tomato", optionPrice: 0.6}, {optionName: "Add Extra Tomato", optionPrice: 1.2}]
            },
            {
              optionList: [{optionName: "Add Mayonnaise", optionPrice: 0.4}, {optionName: "Add Extra Mayonnaise", optionPrice: 0.8}]
            },
          ]
        }
      ],
      [//"McChicken"
        {
          optionName: 'Required Changes',
          required: true,
          multiSelect: false,
          options: []
        },
        {
          optionName: 'Optional Changes',
          required: false,
          multiSelect: true,
          options:[
            {
              optionList: [{optionName: "No Lettuce", optionPrice: 0}, {optionName: "Extra Lettuce", optionPrice: 0.5}]
            },
            {
              optionList: [{optionName: "No Mayonnaise", optionPrice: 0}, {optionName: "Extra Mayonnaise", optionPrice: 0.4}]
            },
            {
              optionList: [{optionName: "No Patty", optionPrice: 0}, {optionName: "Extra Patty", optionPrice: 1.5}]
            },
            {
              optionList: [{optionName: "No Bun", optionPrice: 0}]
            },
            //Add ons
            {
              optionList: [{optionName: "Add Mustard", optionPrice: 0}, {optionName: "Add Extra Mustard", optionPrice: 0}]
            },
            {
              optionList: [{optionName: "Add Ketchup", optionPrice: 0}, {optionName: "Add Extra Ketchup", optionPrice: 0}]
            },
            {
              optionList: [{optionName: "Add Pickle", optionPrice: 0}, {optionName: "Add Extra Pickle", optionPrice: 0}]
            },
            {
              optionList: [{optionName: "Add Cheese", optionPrice: 0.7}, {optionName: "Add Extra Cheese", optionPrice: 1.4}]
            },
            {
              optionList: [{optionName: "Add Bacon", optionPrice: 1.6}, {optionName: "Add Extra Bacon", optionPrice: 3.2}]
            },
            {
              optionList: [{optionName: "Add Tomato", optionPrice: 0.6}, {optionName: "Add Extra Tomato", optionPrice: 1.2}]
            },
          ]
        }
      ],
      [//"Mocha Frappe"
        {
          optionName: 'Required Changes',
          required: true,
          multiSelect: false,
          options: [
            {
              optionList: 
              [
                {optionName: "Small", optionPrice: 0}, {optionName: "Medium", optionPrice: 1},
                {optionName: "Large", optionPrice: 1.5}
              ]
            },
          ]
        },
        {
          optionName: 'Optional Changes',
          required: false,
          multiSelect: true,
          options: [
            {
              optionList: 
              [
                {optionName: "No Ice", optionPrice: 0}, {optionName: "Extra Ice", optionPrice: 0},
                {optionName: "2x Extra Ice", optionPrice: 1}
              ]
            },
            {
              optionList: 
              [
                {optionName: "No Whipped Cream", optionPrice: 0}, {optionName: "Extra Whipped Cream", optionPrice: 0.5},
                {optionName: "2x Extra Whipped Cream", optionPrice: 1}
              ]
            },
            {
              optionList: 
              [
                {optionName: "No Chocolate Drizzle", optionPrice: 0}, {optionName: "Extra Chocolate Drizzle", optionPrice: 0.5},
                {optionName: "2x Extra Chocolate Drizzle", optionPrice: 1}
              ]
            },
            //Add ons
            {
              optionList: 
              [
                {optionName: "Add 1 Crushed Oreo", optionPrice: 0.5}, {optionName: "Add 2 Crushed Oreo", optionPrice: 1},
                {optionName: "Add 3 Crushed Oreo", optionPrice: 1.5}
              ]
            },
          ]
        }
      ],
      [//"Egg McMuffin"
        {
          optionName: 'Required Changes',
          required: true,
          multiSelect: false,
          options: []
        },
        {
          optionName: 'Optional Changes',
          required: false,
          multiSelect: true,
          options:[
            {
              optionList: [{optionName: "No Butter", optionPrice: 0}, {optionName: "Extra Butter", optionPrice: 0.25}]
            },
            {
              optionList: [{optionName: "No Cheese", optionPrice: 0}, {optionName: "Extra Cheese", optionPrice: 0.7}]
            },
            {
              optionList: [{optionName: "No Round Egg", optionPrice: 0}, {optionName: "Extra Round Egg", optionPrice: 2}]
            },
            {
              optionList: [{optionName: "No Canadian Bacon", optionPrice: 0}, {optionName: "Extra Canadian Bacon", optionPrice: 1.5}]
            },
            {
              optionList: [{optionName: "No English McMuffin", optionPrice: 0}]
            },
            //Add ons
            {
              optionList: [{optionName: "Add Bacon", optionPrice: 1.6}, {optionName: "Add Extra Bacon", optionPrice: 3.2}]
            },
          ]
        }
      ],
      [//"Ice Cream cone"
        {
          optionName: 'Required Changes',
          required: true,
          multiSelect: false,
          options: []
        },
        {
          optionName: 'Optional Changes',
          required: false,
          multiSelect: true,
          options:[]
        }
      ],
      [//"Happy Meal"
        {
          optionName: 'Required Changes',
          required: true,
          multiSelect: false,
          options: [
            {
              optionList: [{optionName: "4 Piece", optionPrice: 0}, {optionName: "6 Piece", optionPrice: 1}]
            },
            {
              optionList: 
              [
                {optionName: "No Sauce", optionPrice: 0}, {optionName: "Add Ketchup Packet", optionPrice: 0},
                {optionName: "Add Tangy BBQ Sauce", optionPrice: 0}, {optionName: "Add Sweet N Sour Sauce", optionPrice: 0},
                {optionName: "Add Honey Packet", optionPrice: 0}, {optionName: "Add Hot Mustard Dipping Sauce Sauce", optionPrice: 0},
                {optionName: "Add Creamy Ranch Sauce", optionPrice: 0}, {optionName: "Add Hot Picante Sauce", optionPrice: 0},
                {optionName: "Add Mild Picante Sauce", optionPrice: 0}, {optionName: "Add Honey Mustard", optionPrice: 0},
                {optionName: "Add Spicy Buffalo Sauce", optionPrice: 0}
              ]
            }
          ]
        },
        {
          optionName: 'Optional Changes',
          required: false,
          multiSelect: true,
          options: []
        }
      ]
    ],
    menuDietaryViolations: [
      ["vegetarian", "vegan", "gluten-free", "dairy-free"], // Big Mac
      ["vegetarian", "vegan", "gluten-free", "dairy-free"], // Chicken Nuggets
      [], // Fries
      [], // Coke
      ["vegetarian", "vegan", "gluten-free", "dairy-free"], // Cheeseburger
      ["vegetarian", "vegan", "gluten-free", "dairy-free"], // McChicken
      ["vegan", "dairy-free"], // Mocha Frappe
      ["vegetarian", "vegan", "gluten-free", "dairy-free"], // Egg McMuffin
      ["vegan", "dairy-free", "gluten-free"], // Ice Cream cone
      ["vegetarian", "vegan", "gluten-free", "dairy-free"], // Happy Meal
    ],
    ubereatsMenuPrice: [
      5.35, 5.75, 3.67, 2.74, 3.43, 4.67, 3.42, 2.84, 1.22, 3.41,
    ],
    doordashMenuPrice: [
      5.85, 5.35, 3.25, 2.41, 3.11, 4.45, 3.12, 2.79, 1.05, 3.5,
    ],
    grubhubMenuPrice: [
      5.28, 5.33, 3.49, 2.33, 3.69, 4.11, 3.75, 2.56, 1.03, 3.3,
    ],
    ubereatsAvailable: false,
    doordashAvailable: true,
    grubhubAvailable: true,
    cuisineType: "American",
    operatingHours: ["All Day"],
    restaurantImage: "images/mcd/mcd-logo.png",
    menuItemImages: [
      "/images/mcd/big mac.jpeg",
      "/images/mcd/mcnuggets.png",
      "/images/mcd/fries.jpeg",
      "/images/mcd/coke.jpeg",
      "/images/mcd/cheeseburger.jpg",
      "/images/mcd/mcchicken.jpeg",
      "/images/mcd/mochafrappe.jpeg",
      "/images/mcd/egg-mcmuffin.jpeg",
      "/images/mcd/icecream-cone.jpeg",
      "/images/mcd/happymeal.jpg",
    ],
    websiteURL: "https://www.mcdonalds.com/us/en-us.html",
  },
  {
    restaurantID: "35ab42f",
    restaurantName: "KFC",
    restaurantAddress: "KFC, 1331 S Rangeline Rd, Carmel, IN 46032",
    distance: 1.0,
    menu: [
      "Fried Chicken Bucket",
      "Chicken Sandwich Deluxe",
      "Popcorn Chicken",
      "Chicken Tenders",
      "Mashed Potatoes",
      "Coleslaw",
      "Mac and Cheese",
      "Biscuit",
      "Chocolate Chip Cookie",
      "Fountain Drink",
    ],
    menuOptions: [
      [//"Fried Chicken Bucket"
        {
          optionName: 'Required Changes',
          required: true,
          multiSelect: false,
          options: [
            {
              optionList: 
              [
                {optionName: "8 pc", optionPrice: 0}, {optionName: "12 pc", optionPrice: 6},
                {optionName: "16 pc", optionPrice: 15}
              ]
            },
            {
              optionList: [{optionName: "Chicken - Dark", optionPrice: 0}, {optionName: "Chicken - Variety", optionPrice: 0}]
            },
            {
              optionList: [{optionName: "Original", optionPrice: 0}, {optionName: "Extra Crispy", optionPrice: 0}]
            },
          ]
        },
        {
          optionName: 'Optional Changes',
          required: false,
          multiSelect: true,
          options:[]
        }
      ],
      [//"Chicken Sandwich Deluxe"
        {
          optionName: 'Required Changes',
          required: true,
          multiSelect: false,
          options: [
            {
              optionList: 
              [
                {optionName: "Classic", optionPrice: 0}, {optionName: "Spicy", optionPrice: 0},
                {optionName: "Honey BBQ", optionPrice: 0}, {optionName: "Korean BBQ", optionPrice: 0},
                {optionName: "Honey Garlic", optionPrice: 0}, {optionName: "Mango Habanero", optionPrice: 0},
                {optionName: "Chipotle Ranch", optionPrice: 0},
              ]
            },
          ]
        },
        {
          optionName: 'Optional Changes',
          required: false,
          multiSelect: true,
          options:[]
        }
      ],
      [//"Popcorn Chicken"
        {
          optionName: 'Required Changes',
          required: true,
          multiSelect: false,
          options: []
        },
        {
          optionName: 'Optional Changes',
          required: false,
          multiSelect: true,
          options:[]
        }
      ],
      [//"Chicken Tenders"
        {
          optionName: 'Required Changes',
          required: true,
          multiSelect: false,
          options: [
            {
              optionList: 
              [
                {optionName: "8 pc", optionPrice: 0}, {optionName: "12 pc", optionPrice: 6},
                {optionName: "16 pc", optionPrice: 15}
              ]
            },
            {
              sectionCount: 4,
              optionList: 
              [
                {optionName: "Comeback Sauce", optionPrice: 0}, {optionName: "Buffalo Ranch", optionPrice: 0},
                {optionName: "KFC Sauce", optionPrice: 0}, {optionName: "Honey BBQ", optionPrice: 0},
                {optionName: "Classic Ranch", optionPrice: 0}, {optionName: "Honey Mustard", optionPrice: 0},
                {optionName: "No Sauce", optionPrice: 0},
              ]
            },
          ]
        },
        {
          optionName: 'Optional Changes',
          required: false,
          multiSelect: true,
          options:[]
        }
      ],
      [//"Mashed Potatoes"
        {
          optionName: 'Required Changes',
          required: true,
          multiSelect: false,
          options: [
            {
              optionList: [{optionName: "Side Individual", optionPrice: 0}, {optionName: "Side Large", optionPrice: 2}]
            },
          ]
        },
        {
          optionName: 'Optional Changes',
          required: false,
          multiSelect: true,
          options:[]
        }
      ],
      [//"Coleslaw"
        {
          optionName: 'Required Changes',
          required: true,
          multiSelect: false,
          options: [
            {
              optionList: [{optionName: "Side Individual", optionPrice: 0}, {optionName: "Side Large", optionPrice: 2}]
            },
          ]
        },
        {
          optionName: 'Optional Changes',
          required: false,
          multiSelect: true,
          options:[]
        }
      ],
      [//"Mac and Cheese"
        {
          optionName: 'Required Changes',
          required: true,
          multiSelect: false,
          options: [
            {
              optionList: [{optionName: "Side Individual", optionPrice: 0}, {optionName: "Side Large", optionPrice: 2}]
            },
          ]
        },
        {
          optionName: 'Optional Changes',
          required: false,
          multiSelect: true,
          options:[]
        }
      ],
      [//"Biscuit"
        {
          optionName: 'Required Changes',
          required: true,
          multiSelect: false,
          options: [
            {
              optionList: 
              [
                {optionName: "1 Biscuit", optionPrice: 0}, {optionName: "2 Biscuits", optionPrice: 1},
                {optionName: "4 Biscuits", optionPrice: 2.8}, {optionName: "12 Biscuits", optionPrice: 4.8}
              ]
            },
          ]
        },
        {
          optionName: 'Optional Changes',
          required: false,
          multiSelect: true,
          options:[]
        }
      ],
      [//"Chocolate Chip Cookie"
        {
          optionName: 'Required Changes',
          required: true,
          multiSelect: false,
          options: []
        },
        {
          optionName: 'Optional Changes',
          required: false,
          multiSelect: true,
          options:[]
        }
      ],
      [//"Fountain Drink"
        {
          optionName: 'Required Changes',
          required: true,
          multiSelect: false,
          options: [
            {
              optionList: 
              [
                {optionName: "Cranberry Pepsi", optionPrice: 0}, {optionName: "Cranberry Lemonade", optionPrice: 0},
                {optionName: "Cranberry Starry", optionPrice: 0}, {optionName: "Cranberry MTN DEW Sweet Lightning", optionPrice: 0},
                {optionName: "Cranberry Sweet Tea", optionPrice: 0}, {optionName: "Pepsi", optionPrice: 0},
                {optionName: "Pepsi Zero Sugar", optionPrice: 0}, {optionName: "Starry", optionPrice: 0},
                {optionName: "MTN DEW", optionPrice: 0}, {optionName: "MTN DEW Sweet Lightning", optionPrice: 0},
                {optionName: "Dr. Pepper", optionPrice: 0}, {optionName: "Lemonade", optionPrice: 0.5},
                {optionName: "Sweet Tea", optionPrice: 0},
              ]
            },
            {
              optionList: 
              [
                {optionName: "Medium", optionPrice: 0}, {optionName: "Large", optionPrice: 0.2},
                {optionName: "Beverage Bucket", optionPrice: 1.2},
              ]
            },
          ]
        },
        {
          optionName: 'Optional Changes',
          required: false,
          multiSelect: true,
          options:[]
        }
      ]
    ],
    menuDietaryViolations: [
      ["vegetarian", "vegan", "gluten-free", "dairy-free"], // Fried Chicken Bucket
      ["vegetarian", "vegan", "gluten-free", "dairy-free"], // Chicken Sandwich Deluxe
      ["vegetarian", "vegan", "gluten-free", "dairy-free"], // Popcorn Chicken
      ["vegetarian", "vegan", "gluten-free", "dairy-free"], // Chicken Tenders
      ["vegan", "dairy-free"], // Mashed Potatoes (may contain dairy)
      [], // Coleslaw (check for dairy if applicable)
      ["vegan", "dairy-free", "gluten-free"], // Mac and Cheese
      ["vegan", "dairy-free"], // Biscuit (may contain dairy)
      ["vegan", "dairy-free", "nut-free"], // Chocolate Chip Cookie (may contain nuts)
      [], // Fountain Drink
    ],
    ubereatsMenuPrice: [
      21.5, 6.75, 4.25, 7.4, 2.99, 2.25, 3.49, 1.69, 1.5, 2.29,
    ],
    doordashMenuPrice: [
      22.05, 6.5, 4.4, 7.25, 2.79, 2.4, 3.35, 1.55, 1.45, 2.1,
    ],
    grubhubMenuPrice: [
      20.99, 6.9, 4.35, 7.55, 2.89, 2.19, 3.59, 1.6, 1.35, 2.45,
    ],
    ubereatsAvailable: true,
    doordashAvailable: true,
    grubhubAvailable: true,
    cuisineType: "American",
    operatingHours: ["All Day"],
    restaurantImage: "/images/kfc/kfc-logo.png",
    menuItemImages: [
      "/images/kfc/fried_chicken_bucket.jpg",
      "/images/kfc/chicken_sandwich.jpg",
      "/images/kfc/popcorn_chicken.jpg",
      "/images/kfc/chicken_tenders.jpg",
      "/images/kfc/mashed_potatoes.jpg",
      "/images/kfc/coleslaw.jpg",
      "/images/kfc/mac.jpg",
      "/images/kfc/biscuit.jpg",
      "/images/kfc/cookie.jpg",
      "/images/kfc/drink.jpg",
    ],
    websiteURL: "https://www.kfc.com/",
  },
  {
    restaurantID: "54cd31e",
    restaurantName: "KFC",
    restaurantAddress: "KFC, 8737 IN-114, Rensselaer, IN 47978",
    distance: 1.6,
    menu: [
      "Fried Chicken Bucket",
      "Chicken Sandwich Deluxe",
      "Popcorn Chicken",
      "Chicken Tenders",
      "Mashed Potatoes",
      "Coleslaw",
      "Mac and Cheese",
      "Biscuit",
      "Chocolate Chip Cookie",
      "Fountain Drink",
    ],
    menuOptions: [
      [//"Fried Chicken Bucket"
        {
          optionName: 'Required Changes',
          required: true,
          multiSelect: false,
          options: [
            {
              optionList: 
              [
                {optionName: "8 pc", optionPrice: 0}, {optionName: "12 pc", optionPrice: 6},
                {optionName: "16 pc", optionPrice: 15}
              ]
            },
            {
              optionList: [{optionName: "Chicken - Dark", optionPrice: 0}, {optionName: "Chicken - Variety", optionPrice: 0}]
            },
            {
              optionList: [{optionName: "Original", optionPrice: 0}, {optionName: "Extra Crispy", optionPrice: 0}]
            },
          ]
        },
        {
          optionName: 'Optional Changes',
          required: false,
          multiSelect: true,
          options:[]
        }
      ],
      [//"Chicken Sandwich Deluxe"
        {
          optionName: 'Required Changes',
          required: true,
          multiSelect: false,
          options: [
            {
              optionList: 
              [
                {optionName: "Classic", optionPrice: 0}, {optionName: "Spicy", optionPrice: 0},
                {optionName: "Honey BBQ", optionPrice: 0}, {optionName: "Korean BBQ", optionPrice: 0},
                {optionName: "Honey Garlic", optionPrice: 0}, {optionName: "Mango Habanero", optionPrice: 0},
                {optionName: "Chipotle Ranch", optionPrice: 0},
              ]
            },
          ]
        },
        {
          optionName: 'Optional Changes',
          required: false,
          multiSelect: true,
          options:[]
        }
      ],
      [//"Popcorn Chicken"
        {
          optionName: 'Required Changes',
          required: true,
          multiSelect: false,
          options: []
        },
        {
          optionName: 'Optional Changes',
          required: false,
          multiSelect: true,
          options:[]
        }
      ],
      [//"Chicken Tenders"
        {
          optionName: 'Required Changes',
          required: true,
          multiSelect: false,
          options: [
            {
              optionList: 
              [
                {optionName: "8 pc", optionPrice: 0}, {optionName: "12 pc", optionPrice: 6},
                {optionName: "16 pc", optionPrice: 15}
              ]
            },
            {
              sectionCount: 4,
              optionList: 
              [
                {optionName: "Comeback Sauce", optionPrice: 0}, {optionName: "Buffalo Ranch", optionPrice: 0},
                {optionName: "KFC Sauce", optionPrice: 0}, {optionName: "Honey BBQ", optionPrice: 0},
                {optionName: "Classic Ranch", optionPrice: 0}, {optionName: "Honey Mustard", optionPrice: 0},
                {optionName: "No Sauce", optionPrice: 0},
              ]
            },
          ]
        },
        {
          optionName: 'Optional Changes',
          required: false,
          multiSelect: true,
          options:[]
        }
      ],
      [//"Mashed Potatoes"
        {
          optionName: 'Required Changes',
          required: true,
          multiSelect: false,
          options: [
            {
              optionList: [{optionName: "Side Individual", optionPrice: 0}, {optionName: "Side Large", optionPrice: 2}]
            },
          ]
        },
        {
          optionName: 'Optional Changes',
          required: false,
          multiSelect: true,
          options:[]
        }
      ],
      [//"Coleslaw"
        {
          optionName: 'Required Changes',
          required: true,
          multiSelect: false,
          options: [
            {
              optionList: [{optionName: "Side Individual", optionPrice: 0}, {optionName: "Side Large", optionPrice: 2}]
            },
          ]
        },
        {
          optionName: 'Optional Changes',
          required: false,
          multiSelect: true,
          options:[]
        }
      ],
      [//"Mac and Cheese"
        {
          optionName: 'Required Changes',
          required: true,
          multiSelect: false,
          options: [
            {
              optionList: [{optionName: "Side Individual", optionPrice: 0}, {optionName: "Side Large", optionPrice: 2}]
            },
          ]
        },
        {
          optionName: 'Optional Changes',
          required: false,
          multiSelect: true,
          options:[]
        }
      ],
      [//"Biscuit"
        {
          optionName: 'Required Changes',
          required: true,
          multiSelect: false,
          options: [
            {
              optionList: 
              [
                {optionName: "1 Biscuit", optionPrice: 0}, {optionName: "2 Biscuits", optionPrice: 1},
                {optionName: "4 Biscuits", optionPrice: 2.8}, {optionName: "12 Biscuits", optionPrice: 4.8}
              ]
            },
          ]
        },
        {
          optionName: 'Optional Changes',
          required: false,
          multiSelect: true,
          options:[]
        }
      ],
      [//"Chocolate Chip Cookie"
        {
          optionName: 'Required Changes',
          required: true,
          multiSelect: false,
          options: []
        },
        {
          optionName: 'Optional Changes',
          required: false,
          multiSelect: true,
          options:[]
        }
      ],
      [//"Fountain Drink"
        {
          optionName: 'Required Changes',
          required: true,
          multiSelect: false,
          options: [
            {
              optionList: 
              [
                {optionName: "Cranberry Pepsi", optionPrice: 0}, {optionName: "Cranberry Lemonade", optionPrice: 0},
                {optionName: "Cranberry Starry", optionPrice: 0}, {optionName: "Cranberry MTN DEW Sweet Lightning", optionPrice: 0},
                {optionName: "Cranberry Sweet Tea", optionPrice: 0}, {optionName: "Pepsi", optionPrice: 0},
                {optionName: "Pepsi Zero Sugar", optionPrice: 0}, {optionName: "Starry", optionPrice: 0},
                {optionName: "MTN DEW", optionPrice: 0}, {optionName: "MTN DEW Sweet Lightning", optionPrice: 0},
                {optionName: "Dr. Pepper", optionPrice: 0}, {optionName: "Lemonade", optionPrice: 0.5},
                {optionName: "Sweet Tea", optionPrice: 0},
              ]
            },
            {
              optionList: 
              [
                {optionName: "Medium", optionPrice: 0}, {optionName: "Large", optionPrice: 0.2},
                {optionName: "Beverage Bucket", optionPrice: 1.2},
              ]
            },
          ]
        },
        {
          optionName: 'Optional Changes',
          required: false,
          multiSelect: true,
          options:[]
        }
      ]
    ], 
    menuDietaryViolations: [
      ["vegetarian", "vegan", "gluten-free", "dairy-free"], // Fried Chicken Bucket
      ["vegetarian", "vegan", "gluten-free", "dairy-free"], // Chicken Sandwich Deluxe
      ["vegetarian", "vegan", "gluten-free", "dairy-free"], // Popcorn Chicken
      ["vegetarian", "vegan", "gluten-free", "dairy-free"], // Chicken Tenders
      ["vegan", "dairy-free"], // Mashed Potatoes (may contain dairy)
      [], // Coleslaw (check for dairy if applicable)
      ["vegan", "dairy-free", "gluten-free"], // Mac and Cheese
      ["vegan", "dairy-free"], // Biscuit (may contain dairy)
      ["vegan", "dairy-free", "nut-free"], // Chocolate Chip Cookie (may contain nuts)
      [], // Fountain Drink
    ],
    ubereatsMenuPrice: [21.95, 6.55, 4.45, 7.20, 3.05, 2.15, 3.29, 1.59, 1.40, 2.35],
    doordashMenuPrice: [22.1, 6.6, 4.5, 7.3, 2.95, 2.35, 3.15, 1.5, 1.55, 2.2],
    grubhubMenuPrice: [21.3, 6.8, 4.55, 7.45, 3.1, 2.2, 3.45, 1.62, 1.55, 2.3],
    ubereatsAvailable: true,
    doordashAvailable: false,
    grubhubAvailable: true,
    cuisineType: "American",
    operatingHours: ["All Day"],
    restaurantImage: "/images/kfc/kfc-logo.png",
    menuItemImages: [
      "/images/kfc/fried_chicken_bucket.jpg",
      "/images/kfc/chicken_sandwich.jpg",
      "/images/kfc/popcorn_chicken.jpg",
      "/images/kfc/chicken_tenders.jpg",
      "/images/kfc/mashed_potatoes.jpg",
      "/images/kfc/coleslaw.jpg",
      "/images/kfc/mac.jpg",
      "/images/kfc/biscuit.jpg",
      "/images/kfc/cookie.jpg",
      "/images/kfc/drink.jpg",
    ],
    websiteURL: "https://www.kfc.com/",
  },
  {
    restaurantID: "23df67b",
    restaurantName: "KFC",
    restaurantAddress: "KFC, 3561 Promenade Parkway, Lafayette, IN 47909",
    distance: 2.2,
    menu: [
      "Fried Chicken Bucket",
      "Chicken Sandwich Deluxe",
      "Popcorn Chicken",
      "Chicken Tenders",
      "Mashed Potatoes",
      "Coleslaw",
      "Mac and Cheese",
      "Biscuit",
      "Chocolate Chip Cookie",
      "Fountain Drink",
    ],
    menuOptions: [
      [//"Fried Chicken Bucket"
        {
          optionName: 'Required Changes',
          required: true,
          multiSelect: false,
          options: [
            {
              optionList: 
              [
                {optionName: "8 pc", optionPrice: 0}, {optionName: "12 pc", optionPrice: 6},
                {optionName: "16 pc", optionPrice: 15}
              ]
            },
            {
              optionList: [{optionName: "Chicken - Dark", optionPrice: 0}, {optionName: "Chicken - Variety", optionPrice: 0}]
            },
            {
              optionList: [{optionName: "Original", optionPrice: 0}, {optionName: "Extra Crispy", optionPrice: 0}]
            },
          ]
        },
        {
          optionName: 'Optional Changes',
          required: false,
          multiSelect: true,
          options:[]
        }
      ],
      [//"Chicken Sandwich Deluxe"
        {
          optionName: 'Required Changes',
          required: true,
          multiSelect: false,
          options: [
            {
              optionList: 
              [
                {optionName: "Classic", optionPrice: 0}, {optionName: "Spicy", optionPrice: 0},
                {optionName: "Honey BBQ", optionPrice: 0}, {optionName: "Korean BBQ", optionPrice: 0},
                {optionName: "Honey Garlic", optionPrice: 0}, {optionName: "Mango Habanero", optionPrice: 0},
                {optionName: "Chipotle Ranch", optionPrice: 0},
              ]
            },
          ]
        },
        {
          optionName: 'Optional Changes',
          required: false,
          multiSelect: true,
          options:[]
        }
      ],
      [//"Popcorn Chicken"
        {
          optionName: 'Required Changes',
          required: true,
          multiSelect: false,
          options: []
        },
        {
          optionName: 'Optional Changes',
          required: false,
          multiSelect: true,
          options:[]
        }
      ],
      [//"Chicken Tenders"
        {
          optionName: 'Required Changes',
          required: true,
          multiSelect: false,
          options: [
            {
              optionList: 
              [
                {optionName: "8 pc", optionPrice: 0}, {optionName: "12 pc", optionPrice: 6},
                {optionName: "16 pc", optionPrice: 15}
              ]
            },
            {
              sectionCount: 4,
              optionList: 
              [
                {optionName: "Comeback Sauce", optionPrice: 0}, {optionName: "Buffalo Ranch", optionPrice: 0},
                {optionName: "KFC Sauce", optionPrice: 0}, {optionName: "Honey BBQ", optionPrice: 0},
                {optionName: "Classic Ranch", optionPrice: 0}, {optionName: "Honey Mustard", optionPrice: 0},
                {optionName: "No Sauce", optionPrice: 0},
              ]
            },
          ]
        },
        {
          optionName: 'Optional Changes',
          required: false,
          multiSelect: true,
          options:[]
        }
      ],
      [//"Mashed Potatoes"
        {
          optionName: 'Required Changes',
          required: true,
          multiSelect: false,
          options: [
            {
              optionList: [{optionName: "Side Individual", optionPrice: 0}, {optionName: "Side Large", optionPrice: 2}]
            },
          ]
        },
        {
          optionName: 'Optional Changes',
          required: false,
          multiSelect: true,
          options:[]
        }
      ],
      [//"Coleslaw"
        {
          optionName: 'Required Changes',
          required: true,
          multiSelect: false,
          options: [
            {
              optionList: [{optionName: "Side Individual", optionPrice: 0}, {optionName: "Side Large", optionPrice: 2}]
            },
          ]
        },
        {
          optionName: 'Optional Changes',
          required: false,
          multiSelect: true,
          options:[]
        }
      ],
      [//"Mac and Cheese"
        {
          optionName: 'Required Changes',
          required: true,
          multiSelect: false,
          options: [
            {
              optionList: [{optionName: "Side Individual", optionPrice: 0}, {optionName: "Side Large", optionPrice: 2}]
            },
          ]
        },
        {
          optionName: 'Optional Changes',
          required: false,
          multiSelect: true,
          options:[]
        }
      ],
      [//"Biscuit"
        {
          optionName: 'Required Changes',
          required: true,
          multiSelect: false,
          options: [
            {
              optionList: 
              [
                {optionName: "1 Biscuit", optionPrice: 0}, {optionName: "2 Biscuits", optionPrice: 1},
                {optionName: "4 Biscuits", optionPrice: 2.8}, {optionName: "12 Biscuits", optionPrice: 4.8}
              ]
            },
          ]
        },
        {
          optionName: 'Optional Changes',
          required: false,
          multiSelect: true,
          options:[]
        }
      ],
      [//"Chocolate Chip Cookie"
        {
          optionName: 'Required Changes',
          required: true,
          multiSelect: false,
          options: []
        },
        {
          optionName: 'Optional Changes',
          required: false,
          multiSelect: true,
          options:[]
        }
      ],
      [//"Fountain Drink"
        {
          optionName: 'Required Changes',
          required: true,
          multiSelect: false,
          options: [
            {
              optionList: 
              [
                {optionName: "Cranberry Pepsi", optionPrice: 0}, {optionName: "Cranberry Lemonade", optionPrice: 0},
                {optionName: "Cranberry Starry", optionPrice: 0}, {optionName: "Cranberry MTN DEW Sweet Lightning", optionPrice: 0},
                {optionName: "Cranberry Sweet Tea", optionPrice: 0}, {optionName: "Pepsi", optionPrice: 0},
                {optionName: "Pepsi Zero Sugar", optionPrice: 0}, {optionName: "Starry", optionPrice: 0},
                {optionName: "MTN DEW", optionPrice: 0}, {optionName: "MTN DEW Sweet Lightning", optionPrice: 0},
                {optionName: "Dr. Pepper", optionPrice: 0}, {optionName: "Lemonade", optionPrice: 0.5},
                {optionName: "Sweet Tea", optionPrice: 0},
              ]
            },
            {
              optionList: 
              [
                {optionName: "Medium", optionPrice: 0}, {optionName: "Large", optionPrice: 0.2},
                {optionName: "Beverage Bucket", optionPrice: 1.2},
              ]
            },
          ]
        },
        {
          optionName: 'Optional Changes',
          required: false,
          multiSelect: true,
          options:[]
        }
      ]
    ], 
    menuDietaryViolations: [
      ["vegetarian", "vegan", "gluten-free", "dairy-free"], // Fried Chicken Bucket
      ["vegetarian", "vegan", "gluten-free", "dairy-free"], // Chicken Sandwich Deluxe
      ["vegetarian", "vegan", "gluten-free", "dairy-free"], // Popcorn Chicken
      ["vegetarian", "vegan", "gluten-free", "dairy-free"], // Chicken Tenders
      ["vegan", "dairy-free"], // Mashed Potatoes (may contain dairy)
      [], // Coleslaw (check for dairy if applicable)
      ["vegan", "dairy-free", "gluten-free"], // Mac and Cheese
      ["vegan", "dairy-free"], // Biscuit (may contain dairy)
      ["vegan", "dairy-free", "nut-free"], // Chocolate Chip Cookie (may contain nuts)
      [], // Fountain Drink
    ],
    ubereatsMenuPrice: [22.25, 6.65, 4.30, 7.35, 2.99, 2.29, 3.49, 1.65, 1.45, 2.30],
    doordashMenuPrice: [
      21.85, 6.4, 4.25, 7.15, 2.75, 2.2, 3.25, 1.5, 1.5, 2.15,
    ],
    grubhubMenuPrice: [
      21.7, 6.75, 4.55, 7.5, 2.89, 2.15, 3.55, 1.69, 1.6, 2.35,
    ],
    ubereatsAvailable: false,
    doordashAvailable: true,
    grubhubAvailable: false,
    cuisineType: "American",
    operatingHours: ["All Day"],
    restaurantImage: "/images/kfc/kfc-logo.png",
    menuItemImages: [
      "/images/kfc/fried_chicken_bucket.jpg",
      "/images/kfc/chicken_sandwich.jpg",
      "/images/kfc/popcorn_chicken.jpg",
      "/images/kfc/chicken_tenders.jpg",
      "/images/kfc/mashed_potatoes.jpg",
      "/images/kfc/coleslaw.jpg",
      "/images/kfc/mac.jpg",
      "/images/kfc/biscuit.jpg",
      "/images/kfc/cookie.jpg",
      "/images/kfc/drink.jpg",
    ],
    websiteURL: "https://www.kfc.com/",
  },
  {
    restaurantID: "91ae82d",
    restaurantName: "KFC",
    restaurantAddress: "KFC, 3809 South Street, Lafayette, IN 47905",
    distance: 3.0,
    menu: [
      "Fried Chicken Bucket",
      "Chicken Sandwich Deluxe",
      "Popcorn Chicken",
      "Chicken Tenders",
      "Mashed Potatoes",
      "Coleslaw",
      "Mac and Cheese",
      "Biscuit",
      "Chocolate Chip Cookie",
      "Fountain Drink",
    ],
    menuOptions: [
      [//"Fried Chicken Bucket"
        {
          optionName: 'Required Changes',
          required: true,
          multiSelect: false,
          options: [
            {
              optionList: 
              [
                {optionName: "8 pc", optionPrice: 0}, {optionName: "12 pc", optionPrice: 6},
                {optionName: "16 pc", optionPrice: 15}
              ]
            },
            {
              optionList: [{optionName: "Chicken - Dark", optionPrice: 0}, {optionName: "Chicken - Variety", optionPrice: 0}]
            },
            {
              optionList: [{optionName: "Original", optionPrice: 0}, {optionName: "Extra Crispy", optionPrice: 0}]
            },
          ]
        },
        {
          optionName: 'Optional Changes',
          required: false,
          multiSelect: true,
          options:[]
        }
      ],
      [//"Chicken Sandwich Deluxe"
        {
          optionName: 'Required Changes',
          required: true,
          multiSelect: false,
          options: [
            {
              optionList: 
              [
                {optionName: "Classic", optionPrice: 0}, {optionName: "Spicy", optionPrice: 0},
                {optionName: "Honey BBQ", optionPrice: 0}, {optionName: "Korean BBQ", optionPrice: 0},
                {optionName: "Honey Garlic", optionPrice: 0}, {optionName: "Mango Habanero", optionPrice: 0},
                {optionName: "Chipotle Ranch", optionPrice: 0},
              ]
            },
          ]
        },
        {
          optionName: 'Optional Changes',
          required: false,
          multiSelect: true,
          options:[]
        }
      ],
      [//"Popcorn Chicken"
        {
          optionName: 'Required Changes',
          required: true,
          multiSelect: false,
          options: []
        },
        {
          optionName: 'Optional Changes',
          required: false,
          multiSelect: true,
          options:[]
        }
      ],
      [//"Chicken Tenders"
        {
          optionName: 'Required Changes',
          required: true,
          multiSelect: false,
          options: [
            {
              optionList: 
              [
                {optionName: "8 pc", optionPrice: 0}, {optionName: "12 pc", optionPrice: 6},
                {optionName: "16 pc", optionPrice: 15}
              ]
            },
            {
              sectionCount: 4,
              optionList: 
              [
                {optionName: "Comeback Sauce", optionPrice: 0}, {optionName: "Buffalo Ranch", optionPrice: 0},
                {optionName: "KFC Sauce", optionPrice: 0}, {optionName: "Honey BBQ", optionPrice: 0},
                {optionName: "Classic Ranch", optionPrice: 0}, {optionName: "Honey Mustard", optionPrice: 0},
                {optionName: "No Sauce", optionPrice: 0},
              ]
            },
          ]
        },
        {
          optionName: 'Optional Changes',
          required: false,
          multiSelect: true,
          options:[]
        }
      ],
      [//"Mashed Potatoes"
        {
          optionName: 'Required Changes',
          required: true,
          multiSelect: false,
          options: [
            {
              optionList: [{optionName: "Side Individual", optionPrice: 0}, {optionName: "Side Large", optionPrice: 2}]
            },
          ]
        },
        {
          optionName: 'Optional Changes',
          required: false,
          multiSelect: true,
          options:[]
        }
      ],
      [//"Coleslaw"
        {
          optionName: 'Required Changes',
          required: true,
          multiSelect: false,
          options: [
            {
              optionList: [{optionName: "Side Individual", optionPrice: 0}, {optionName: "Side Large", optionPrice: 2}]
            },
          ]
        },
        {
          optionName: 'Optional Changes',
          required: false,
          multiSelect: true,
          options:[]
        }
      ],
      [//"Mac and Cheese"
        {
          optionName: 'Required Changes',
          required: true,
          multiSelect: false,
          options: [
            {
              optionList: [{optionName: "Side Individual", optionPrice: 0}, {optionName: "Side Large", optionPrice: 2}]
            },
          ]
        },
        {
          optionName: 'Optional Changes',
          required: false,
          multiSelect: true,
          options:[]
        }
      ],
      [//"Biscuit"
        {
          optionName: 'Required Changes',
          required: true,
          multiSelect: false,
          options: [
            {
              optionList: 
              [
                {optionName: "1 Biscuit", optionPrice: 0}, {optionName: "2 Biscuits", optionPrice: 1},
                {optionName: "4 Biscuits", optionPrice: 2.8}, {optionName: "12 Biscuits", optionPrice: 4.8}
              ]
            },
          ]
        },
        {
          optionName: 'Optional Changes',
          required: false,
          multiSelect: true,
          options:[]
        }
      ],
      [//"Chocolate Chip Cookie"
        {
          optionName: 'Required Changes',
          required: true,
          multiSelect: false,
          options: []
        },
        {
          optionName: 'Optional Changes',
          required: false,
          multiSelect: true,
          options:[]
        }
      ],
      [//"Fountain Drink"
        {
          optionName: 'Required Changes',
          required: true,
          multiSelect: false,
          options: [
            {
              optionList: 
              [
                {optionName: "Cranberry Pepsi", optionPrice: 0}, {optionName: "Cranberry Lemonade", optionPrice: 0},
                {optionName: "Cranberry Starry", optionPrice: 0}, {optionName: "Cranberry MTN DEW Sweet Lightning", optionPrice: 0},
                {optionName: "Cranberry Sweet Tea", optionPrice: 0}, {optionName: "Pepsi", optionPrice: 0},
                {optionName: "Pepsi Zero Sugar", optionPrice: 0}, {optionName: "Starry", optionPrice: 0},
                {optionName: "MTN DEW", optionPrice: 0}, {optionName: "MTN DEW Sweet Lightning", optionPrice: 0},
                {optionName: "Dr. Pepper", optionPrice: 0}, {optionName: "Lemonade", optionPrice: 0.5},
                {optionName: "Sweet Tea", optionPrice: 0},
              ]
            },
            {
              optionList: 
              [
                {optionName: "Medium", optionPrice: 0}, {optionName: "Large", optionPrice: 0.2},
                {optionName: "Beverage Bucket", optionPrice: 1.2},
              ]
            },
          ]
        },
        {
          optionName: 'Optional Changes',
          required: false,
          multiSelect: true,
          options:[]
        }
      ]
    ],
    menuDietaryViolations: [
      ["vegetarian", "vegan", "gluten-free", "dairy-free"], // Fried Chicken Bucket
      ["vegetarian", "vegan", "gluten-free", "dairy-free"], // Chicken Sandwich Deluxe
      ["vegetarian", "vegan", "gluten-free", "dairy-free"], // Popcorn Chicken
      ["vegetarian", "vegan", "gluten-free", "dairy-free"], // Chicken Tenders
      ["vegan", "dairy-free"], // Mashed Potatoes (may contain dairy)
      [], // Coleslaw (check for dairy if applicable)
      ["vegan", "dairy-free", "gluten-free"], // Mac and Cheese
      ["vegan", "dairy-free"], // Biscuit (may contain dairy)
      ["vegan", "dairy-free", "nut-free"], // Chocolate Chip Cookie (may contain nuts)
      [], // Fountain Drink
    ],
    ubereatsMenuPrice: [21.65, 6.50, 4.35, 7.50, 3.05, 2.35, 3.65, 1.55, 1.55, 2.20],
    doordashMenuPrice: [22.3, 6.55, 4.25, 7.2, 2.95, 2.4, 3.45, 1.5, 1.6, 2.1],
    grubhubMenuPrice: [
      21.85, 6.7, 4.45, 7.35, 2.99, 2.25, 3.6, 1.65, 1.5, 2.25,
    ],
    ubereatsAvailable: true,
    doordashAvailable: true,
    grubhubAvailable: true,
    cuisineType: "American",
    operatingHours: ["All Day"],
    restaurantImage: "/images/kfc/kfc-logo.png",
    menuItemImages: [
      "/images/kfc/fried_chicken_bucket.jpg",
      "/images/kfc/chicken_sandwich.jpg",
      "/images/kfc/popcorn_chicken.jpg",
      "/images/kfc/chicken_tenders.jpg",
      "/images/kfc/mashed_potatoes.jpg",
      "/images/kfc/coleslaw.jpg",
      "/images/kfc/mac.jpg",
      "/images/kfc/biscuit.jpg",
      "/images/kfc/cookie.jpg",
      "/images/kfc/drink.jpg",
    ],
    websiteURL: "https://www.kfc.com/",
  },
  {
    restaurantID: "12ab36c",
    restaurantName: "Burger King",
    restaurantAddress: "Burger King, 1069 Sagamore Pkwy W, West Lafayette, IN 47906",
    distance: 1.5,
    menu: [
      "Whopper",
      "Chicken Fries",
      "Impossible Whopper",
      "Chicken Sandwich",
      "French Fries",
      "Onion Rings",
      "Mozzarella Sticks",
      "Chocolate Shake",
      "Soft Drink",
      "King Jr.Meal",
    ],
    menuOptions: [
      [//"Whopper"
        {
          optionName: 'Required Changes',
          required: true,
          multiSelect: false,
          options: []
        },
        {
          optionName: 'Optional Changes',
          required: false,
          multiSelect: true,
          options:[
            {
              optionList: 
              [
                {optionName: "No Mayo", optionPrice: 0}, {optionName: "Light Mayo", optionPrice: 0},
                {optionName: "Extra Mayo", optionPrice: 0},
              ]
            },
            {
              optionList: 
              [
                {optionName: "No Ketchup", optionPrice: 0}, {optionName: "Light Ketchup", optionPrice: 0},
                {optionName: "Extra Ketchup", optionPrice: 0}
              ]
            },
            {
              optionList: 
              [
                {optionName: "No Onion", optionPrice: 0}, {optionName: "Light Onion", optionPrice: 0},
                {optionName: "Extra Onion", optionPrice: 0}
              ]
            },
            {
              optionList: 
              [
                {optionName: "No Tomato", optionPrice: 0.0}, {optionName: "Light Tomato", optionPrice: 0},
                {optionName: "Extra Tomato", optionPrice: 0.15}
              ]
            },
            {
              optionList: 
              [
                {optionName: "No Pickle", optionPrice: 0}, {optionName: "Light Pickle", optionPrice: 0},
                {optionName: "Extra Pickle", optionPrice: 0}
              ]
            },
            {
              optionList: 
              [
                {optionName: "No Lettuce", optionPrice: 0}, {optionName: "Light Lettuce", optionPrice: 0},
                {optionName: "Extra Lettuce", optionPrice: 0.08}
              ]
            },
            //Add ons
            {
              optionList: [{optionName: "Add Swiss Cheese", optionPrice: 0.6}]
            },
            {
              optionList: [{optionName: "Add Onion Rings", optionPrice: 0.46}]
            },
            {
              optionList: 
              [
                {optionName: "Add Light Mustard", optionPrice: 0}, {optionName: "Add Regular Mustard", optionPrice: 0},
                {optionName: "Add Extra Mustard", optionPrice: 0},
              ]
            },
            {
              optionList: 
              [
                {optionName: "Add Light BBQ Sauce", optionPrice: 0}, {optionName: "Add Regular BBQ Sauce", optionPrice: 0},
                {optionName: "Add Extra BBQ Sauce", optionPrice: 0},
              ]
            },
          ]
        }
      ],
      [//"Chicken Fries"
        {
          optionName: 'Required Changes',
          required: true,
          multiSelect: false,
          options: [
            {
              optionList: 
              [
                {optionName: "4 Pc", optionPrice: 0}, {optionName: "8 Pc", optionPrice: 1.5},
                {optionName: "12 Pc", optionPrice: 3},
              ]
            },
            {
              sectionCount: 2,
              optionList: 
              [
                {optionName: "BBQ Dipping Sauce", optionPrice: 0}, {optionName: "Buffalo Dipping Sauce", optionPrice: 0},
                {optionName: "Honey Mustard Dipping Sauce", optionPrice: 0}, {optionName: "Hidden Valley Ranch Dipping Sauce", optionPrice: 0},
                {optionName: "Sweet & Sour Dipping Sauce", optionPrice: 0}, {optionName: "Zesty Dipping Sauce", optionPrice: 0},
                {optionName: "No Sauce", optionPrice: 0},
              ]
            },
          ]
        },
        {
          optionName: 'Optional Changes',
          required: false,
          multiSelect: true,
          options:[]
        }
      ],
      [//"Impossible Whopper"
        {
          optionName: 'Required Changes',
          required: true,
          multiSelect: false,
          options: []
        },
        {
          optionName: 'Optional Changes',
          required: false,
          multiSelect: true,
          options:[
            {
              optionList: 
              [
                {optionName: "No Mayo", optionPrice: 0}, {optionName: "Light Mayo", optionPrice: 0},
                {optionName: "Extra Mayo", optionPrice: 0},
              ]
            },
            {
              optionList: 
              [
                {optionName: "No Ketchup", optionPrice: 0}, {optionName: "Light Ketchup", optionPrice: 0},
                {optionName: "Extra Ketchup", optionPrice: 0}
              ]
            },
            {
              optionList: 
              [
                {optionName: "No Onion", optionPrice: 0}, {optionName: "Light Onion", optionPrice: 0},
                {optionName: "Extra Onion", optionPrice: 0}
              ]
            },
            {
              optionList: 
              [
                {optionName: "No Tomato", optionPrice: 0.0}, {optionName: "Light Tomato", optionPrice: 0},
                {optionName: "Extra Tomato", optionPrice: 0.15}
              ]
            },
            {
              optionList: 
              [
                {optionName: "No Pickle", optionPrice: 0}, {optionName: "Light Pickle", optionPrice: 0},
                {optionName: "Extra Pickle", optionPrice: 0}
              ]
            },
            {
              optionList: 
              [
                {optionName: "No Lettuce", optionPrice: 0}, {optionName: "Light Lettuce", optionPrice: 0},
                {optionName: "Extra Lettuce", optionPrice: 0.08}
              ]
            },
            //Add ons
            {
              optionList: [{optionName: "Add Swiss Cheese", optionPrice: 0.6}]
            },
            {
              optionList: [{optionName: "Add Onion Rings", optionPrice: 0.46}]
            },
            {
              optionList: 
              [
                {optionName: "Add Light Mustard", optionPrice: 0}, {optionName: "Add Regular Mustard", optionPrice: 0},
                {optionName: "Add Extra Mustard", optionPrice: 0},
              ]
            },
            {
              optionList: 
              [
                {optionName: "Add Light BBQ Sauce", optionPrice: 0}, {optionName: "Add Regular BBQ Sauce", optionPrice: 0},
                {optionName: "Add Extra BBQ Sauce", optionPrice: 0},
              ]
            },
          ]
        }
      ],
      [//"Chicken Sandwich"
        {
          optionName: 'Required Changes',
          required: true,
          multiSelect: false,
          options: []
        },
        {
          optionName: 'Optional Changes',
          required: false,
          multiSelect: true,
          options:[
            {
              optionList: 
              [
                {optionName: "No Mayo", optionPrice: 0}, {optionName: "Light Mayo", optionPrice: 0},
                {optionName: "Extra Mayo", optionPrice: 0},
              ]
            },
            {
              optionList: 
              [
                {optionName: "No Lettuce", optionPrice: 0}, {optionName: "Light Lettuce", optionPrice: 0},
                {optionName: "Extra Lettuce", optionPrice: 0.08}
              ]
            },
            //Add ons
            {
              optionList: 
              [
                {optionName: "Add Light American Cheese", optionPrice: 0}, {optionName: "Add Regular American Cheese", optionPrice: 0},
                {optionName: "Add Extra American Cheese", optionPrice: 0}
              ]
            },
            {
              optionList: [{optionName: "Add Bacon", optionPrice: 1.2}]
            },
            {
              optionList: 
              [
                {optionName: "Add Light Onion", optionPrice: 0}, {optionName: "Add Regular Onion", optionPrice: 0},
                {optionName: "Add Extra Onion", optionPrice: 0}
              ]
            },
            {
              optionList: 
              [
                {optionName: "Add Light Tomato", optionPrice: 0.15}, {optionName: "Add Regular Tomato", optionPrice: 0.3},
                {optionName: "Extra Tomato", optionPrice: 0.45}
              ]
            },
            {
              optionList: 
              [
                {optionName: "Add Light Pickle", optionPrice: 0}, {optionName: "Add Regular Pickle", optionPrice: 0},
                {optionName: "Add Extra Pickle", optionPrice: 0}
              ]
            },
            {
              optionList: 
              [
                {optionName: "Add Light Ketchup", optionPrice: 0}, {optionName: "Add Regular Ketchup", optionPrice: 0},
                {optionName: "Add Extra Ketchup", optionPrice: 0},
              ]
            },
            {
              optionList: 
              [
                {optionName: "Add Light Mustard", optionPrice: 0}, {optionName: "Add Regular Mustard", optionPrice: 0},
                {optionName: "Add Extra Mustard", optionPrice: 0},
              ]
            },
            {
              optionList: 
              [
                {optionName: "Add Light BBQ Sauce", optionPrice: 0}, {optionName: "Add Regular BBQ Sauce", optionPrice: 0},
                {optionName: "Add Extra BBQ Sauce", optionPrice: 0},
              ]
            },
          ]
        }
      ],
      [//"French Fries"
        {
          optionName: 'Required Changes',
          required: true,
          multiSelect: false,
          options: [
            {
              optionList: 
              [
                {optionName: "Value", optionPrice: 0}, {optionName: "Small", optionPrice: 0.6},
                {optionName: "Medium", optionPrice: 1}, {optionName: "Large", optionPrice: 1.4},
              ]
            },
          ]
        },
        {
          optionName: 'Optional Changes',
          required: false,
          multiSelect: true,
          options:[]
        }
      ],
      [//"Onion Rings"
        {
          optionName: 'Required Changes',
          required: true,
          multiSelect: false,
          options: [
            {
              optionList: 
              [
                {optionName: "Value", optionPrice: 0}, {optionName: "Small", optionPrice: 0.6},
                {optionName: "Medium", optionPrice: 1}, {optionName: "Large", optionPrice: 1.4},
              ]
            },
          ]
        },
        {
          optionName: 'Optional Changes',
          required: false,
          multiSelect: true,
          options:[
            {
              optionList: 
              [
                {optionName: "No Zesty Dipping Sauce", optionPrice: 0}
              ]
            },
          ]
        }
      ],
      [//"Mozzarella Sticks"
        {
          optionName: 'Required Changes',
          required: true,
          multiSelect: false,
          options: [
            {
              optionList: 
              [
                {optionName: "4 Pc", optionPrice: 0}, {optionName: "8 Pc", optionPrice: 1.9},
                {optionName: "12 Pc", optionPrice: 3},
              ]
            },
          ]
        },
        {
          optionName: 'Optional Changes',
          required: false,
          multiSelect: true,
          options:[
            {
              optionList: 
              [
                {optionName: "No Marinara Sauce", optionPrice: 0}
              ]
            },
          ]
        }
      ],
      [//"Chocolate Shake"
        {
          optionName: 'Required Changes',
          required: true,
          multiSelect: false,
          options: []
        },
        {
          optionName: 'Optional Changes',
          required: false,
          multiSelect: true,
          options:[]
        }
      ],
      [//"Soft Drink"
        {
          optionName: 'Required Changes',
          required: true,
          multiSelect: false,
          options: [
            {
              optionList: 
              [
                {optionName: "Coca-Cola", optionPrice: 0}, {optionName: "Diet Coke", optionPrice: 0},
                {optionName: "Dr Pepper", optionPrice: 0}, {optionName: "Sprite", optionPrice: 0},
                {optionName: "Water", optionPrice: 0}, {optionName: "Sweetened Iced Tea", optionPrice: 0},
                {optionName: "Unsweetened Iced Tea", optionPrice: 0},
              ]
            },
            {
              optionList: 
              [
                {optionName: "Value", optionPrice: 0}, {optionName: "Small", optionPrice: 0.6},
                {optionName: "Medium", optionPrice: 1}, {optionName: "Large", optionPrice: 1.4},
              ]
            },
          ]
        },
        {
          optionName: 'Optional Changes',
          required: false,
          multiSelect: true,
          options:[]
        }
      ],
      [//"King Jr.Meal"
        {
          optionName: 'Required Changes',
          required: true,
          multiSelect: false,
          options: [
            {
              optionList: 
              [
                {optionName: "4 Pc", optionPrice: 0}, {optionName: "6 Pc", optionPrice: 0.5},
              ]
            },
            {
              optionList: 
              [
                {optionName: "BBQ Dipping Sauce", optionPrice: 0}, {optionName: "Buffalo Dipping Sauce", optionPrice: 0},
                {optionName: "Honey Mustard Dipping Sauce", optionPrice: 0}, {optionName: "Hidden Valley Ranch Dipping Sauce", optionPrice: 0},
                {optionName: "Sweet & Sour Dipping Sauce", optionPrice: 0}, {optionName: "Zesty Dipping Sauce", optionPrice: 0},
                {optionName: "No Sauce", optionPrice: 0},
              ]
            },
            {
              optionList: 
              [
                {optionName: "Value French Fries", optionPrice: 0}, {optionName: "Value Onion Rings", optionPrice: 0.1},
                {optionName: "Mott's Applesauce", optionPrice: 0}, {optionName: "Value Have-sies", optionPrice: 0.1},
              ]
            },
            {
              optionList: 
              [
                {optionName: "Honest Kids Apple Juice", optionPrice: 0}, {optionName: "Fat Free Milk", optionPrice: 0.4},
                {optionName: "Value Coca-Cola", optionPrice: 0}, {optionName: "Value Diet Coke", optionPrice: 0},
                {optionName: "Value Sprite", optionPrice: 0}, {optionName: "Value Dr Pepper", optionPrice: 0},
                {optionName: "Pure Life Purified Water", optionPrice: 0.3},
              ]
            },
            {
              optionList: 
              [
                {optionName: "Toy", optionPrice: 0}, {optionName: "Chocolate Chip Cookie", optionPrice: 0},
              ]
            },
          ]
        },
        {
          optionName: 'Optional Changes',
          required: false,
          multiSelect: true,
          options:[]
        }
      ],
    ],
    menuDietaryViolations: [
      ["vegetarian", "vegan", "gluten-free", "dairy-free"], // Whopper
      ["vegetarian", "vegan", "gluten-free", "dairy-free"], // Chicken Fries
      ["vegan", "gluten-free", "dairy-free"], // Impossible Whopper
      ["vegetarian", "vegan", "gluten-free", "dairy-free"], // Chicken Sandwich
      [], // French Fries
      ["vegan", "gluten-free"], // Onion Rings
      ["vegetarian", "vegan", "gluten-free", "dairy-free"], // Mozzarella Sticks
      ["vegan", "dairy-free"], // Chocolate Shake
      [], // Soft Drink
      ["vegetarian", "vegan", "gluten-free", "dairy-free"], // King Jr.Meal
    ],
    ubereatsMenuPrice: [6.49, 4.29, 6.99, 5.39, 2.99, 2.79, 3.29, 3.99, 2.29, 4.99],
    doordashMenuPrice: [6.79, 4.1, 6.79, 5.59, 2.89, 2.99, 3.39, 3.89, 2.19, 5.09],
    grubhubMenuPrice: [6.29, 4.45, 7.09, 5.19, 3.09, 2.69, 3.19, 3.79, 2.35, 4.79],
    ubereatsAvailable: true,
    doordashAvailable: true,
    grubhubAvailable: true,
    cuisineType: "American",
    operatingHours: ["Breakfast", "Brunch", "Lunch", "Dinner"],
    restaurantImage: "/images/burger_king/bk-logo.png",
    menuItemImages: [
      "/images/burger_king/whopper.jpg",
      "/images/burger_king/chicken_fries.jpg",
      "/images/burger_king/impossible.jpg",
      "/images/burger_king/chicken_sandwich.jpg",
      "/images/burger_king/chicken_fries.jpg",
      "/images/burger_king/onion_rings.jpg",
      "/images/burger_king/mozzarella_sticks.jpg",
      "/images/burger_king/shake.jpg",
      "/images/burger_king/drink.jpg",
      "/images/burger_king/jr_meal.jpg",
    ],
    websiteURL: "https://www.bk.com/",
  },
  {
    restaurantID: "56cd78e",
    restaurantName: "Burger King",
    restaurantAddress: "Burger King, 2175 Greenbush St, Lafayette, IN 47904",
    distance: 2.3,
    menu: [
      "Whopper",
      "Chicken Fries",
      "Impossible Whopper",
      "Chicken Sandwich",
      "French Fries",
      "Onion Rings",
      "Mozzarella Sticks",
      "Chocolate Shake",
      "Soft Drink",
      "King Jr.Meal",
    ],
    menuOptions: [
      [//"Whopper"
        {
          optionName: 'Required Changes',
          required: true,
          multiSelect: false,
          options: []
        },
        {
          optionName: 'Optional Changes',
          required: false,
          multiSelect: true,
          options:[
            {
              optionList: 
              [
                {optionName: "No Mayo", optionPrice: 0}, {optionName: "Light Mayo", optionPrice: 0},
                {optionName: "Extra Mayo", optionPrice: 0},
              ]
            },
            {
              optionList: 
              [
                {optionName: "No Ketchup", optionPrice: 0}, {optionName: "Light Ketchup", optionPrice: 0},
                {optionName: "Extra Ketchup", optionPrice: 0}
              ]
            },
            {
              optionList: 
              [
                {optionName: "No Onion", optionPrice: 0}, {optionName: "Light Onion", optionPrice: 0},
                {optionName: "Extra Onion", optionPrice: 0}
              ]
            },
            {
              optionList: 
              [
                {optionName: "No Tomato", optionPrice: 0.0}, {optionName: "Light Tomato", optionPrice: 0},
                {optionName: "Extra Tomato", optionPrice: 0.15}
              ]
            },
            {
              optionList: 
              [
                {optionName: "No Pickle", optionPrice: 0}, {optionName: "Light Pickle", optionPrice: 0},
                {optionName: "Extra Pickle", optionPrice: 0}
              ]
            },
            {
              optionList: 
              [
                {optionName: "No Lettuce", optionPrice: 0}, {optionName: "Light Lettuce", optionPrice: 0},
                {optionName: "Extra Lettuce", optionPrice: 0.08}
              ]
            },
            //Add ons
            {
              optionList: [{optionName: "Add Swiss Cheese", optionPrice: 0.6}]
            },
            {
              optionList: [{optionName: "Add Onion Rings", optionPrice: 0.46}]
            },
            {
              optionList: 
              [
                {optionName: "Add Light Mustard", optionPrice: 0}, {optionName: "Add Regular Mustard", optionPrice: 0},
                {optionName: "Add Extra Mustard", optionPrice: 0},
              ]
            },
            {
              optionList: 
              [
                {optionName: "Add Light BBQ Sauce", optionPrice: 0}, {optionName: "Add Regular BBQ Sauce", optionPrice: 0},
                {optionName: "Add Extra BBQ Sauce", optionPrice: 0},
              ]
            },
          ]
        }
      ],
      [//"Chicken Fries"
        {
          optionName: 'Required Changes',
          required: true,
          multiSelect: false,
          options: [
            {
              optionList: 
              [
                {optionName: "4 Pc", optionPrice: 0}, {optionName: "8 Pc", optionPrice: 1.5},
                {optionName: "12 Pc", optionPrice: 3},
              ]
            },
            {
              sectionCount: 2,
              optionList: 
              [
                {optionName: "BBQ Dipping Sauce", optionPrice: 0}, {optionName: "Buffalo Dipping Sauce", optionPrice: 0},
                {optionName: "Honey Mustard Dipping Sauce", optionPrice: 0}, {optionName: "Hidden Valley Ranch Dipping Sauce", optionPrice: 0},
                {optionName: "Sweet & Sour Dipping Sauce", optionPrice: 0}, {optionName: "Zesty Dipping Sauce", optionPrice: 0},
                {optionName: "No Sauce", optionPrice: 0},
              ]
            },
          ]
        },
        {
          optionName: 'Optional Changes',
          required: false,
          multiSelect: true,
          options:[]
        }
      ],
      [//"Impossible Whopper"
        {
          optionName: 'Required Changes',
          required: true,
          multiSelect: false,
          options: []
        },
        {
          optionName: 'Optional Changes',
          required: false,
          multiSelect: true,
          options:[
            {
              optionList: 
              [
                {optionName: "No Mayo", optionPrice: 0}, {optionName: "Light Mayo", optionPrice: 0},
                {optionName: "Extra Mayo", optionPrice: 0},
              ]
            },
            {
              optionList: 
              [
                {optionName: "No Ketchup", optionPrice: 0}, {optionName: "Light Ketchup", optionPrice: 0},
                {optionName: "Extra Ketchup", optionPrice: 0}
              ]
            },
            {
              optionList: 
              [
                {optionName: "No Onion", optionPrice: 0}, {optionName: "Light Onion", optionPrice: 0},
                {optionName: "Extra Onion", optionPrice: 0}
              ]
            },
            {
              optionList: 
              [
                {optionName: "No Tomato", optionPrice: 0.0}, {optionName: "Light Tomato", optionPrice: 0},
                {optionName: "Extra Tomato", optionPrice: 0.15}
              ]
            },
            {
              optionList: 
              [
                {optionName: "No Pickle", optionPrice: 0}, {optionName: "Light Pickle", optionPrice: 0},
                {optionName: "Extra Pickle", optionPrice: 0}
              ]
            },
            {
              optionList: 
              [
                {optionName: "No Lettuce", optionPrice: 0}, {optionName: "Light Lettuce", optionPrice: 0},
                {optionName: "Extra Lettuce", optionPrice: 0.08}
              ]
            },
            //Add ons
            {
              optionList: [{optionName: "Add Swiss Cheese", optionPrice: 0.6}]
            },
            {
              optionList: [{optionName: "Add Onion Rings", optionPrice: 0.46}]
            },
            {
              optionList: 
              [
                {optionName: "Add Light Mustard", optionPrice: 0}, {optionName: "Add Regular Mustard", optionPrice: 0},
                {optionName: "Add Extra Mustard", optionPrice: 0},
              ]
            },
            {
              optionList: 
              [
                {optionName: "Add Light BBQ Sauce", optionPrice: 0}, {optionName: "Add Regular BBQ Sauce", optionPrice: 0},
                {optionName: "Add Extra BBQ Sauce", optionPrice: 0},
              ]
            },
          ]
        }
      ],
      [//"Chicken Sandwich"
        {
          optionName: 'Required Changes',
          required: true,
          multiSelect: false,
          options: []
        },
        {
          optionName: 'Optional Changes',
          required: false,
          multiSelect: true,
          options:[
            {
              optionList: 
              [
                {optionName: "No Mayo", optionPrice: 0}, {optionName: "Light Mayo", optionPrice: 0},
                {optionName: "Extra Mayo", optionPrice: 0},
              ]
            },
            {
              optionList: 
              [
                {optionName: "No Lettuce", optionPrice: 0}, {optionName: "Light Lettuce", optionPrice: 0},
                {optionName: "Extra Lettuce", optionPrice: 0.08}
              ]
            },
            //Add ons
            {
              optionList: 
              [
                {optionName: "Add Light American Cheese", optionPrice: 0}, {optionName: "Add Regular American Cheese", optionPrice: 0},
                {optionName: "Add Extra American Cheese", optionPrice: 0}
              ]
            },
            {
              optionList: [{optionName: "Add Bacon", optionPrice: 1.2}]
            },
            {
              optionList: 
              [
                {optionName: "Add Light Onion", optionPrice: 0}, {optionName: "Add Regular Onion", optionPrice: 0},
                {optionName: "Add Extra Onion", optionPrice: 0}
              ]
            },
            {
              optionList: 
              [
                {optionName: "Add Light Tomato", optionPrice: 0.15}, {optionName: "Add Regular Tomato", optionPrice: 0.3},
                {optionName: "Extra Tomato", optionPrice: 0.45}
              ]
            },
            {
              optionList: 
              [
                {optionName: "Add Light Pickle", optionPrice: 0}, {optionName: "Add Regular Pickle", optionPrice: 0},
                {optionName: "Add Extra Pickle", optionPrice: 0}
              ]
            },
            {
              optionList: 
              [
                {optionName: "Add Light Ketchup", optionPrice: 0}, {optionName: "Add Regular Ketchup", optionPrice: 0},
                {optionName: "Add Extra Ketchup", optionPrice: 0},
              ]
            },
            {
              optionList: 
              [
                {optionName: "Add Light Mustard", optionPrice: 0}, {optionName: "Add Regular Mustard", optionPrice: 0},
                {optionName: "Add Extra Mustard", optionPrice: 0},
              ]
            },
            {
              optionList: 
              [
                {optionName: "Add Light BBQ Sauce", optionPrice: 0}, {optionName: "Add Regular BBQ Sauce", optionPrice: 0},
                {optionName: "Add Extra BBQ Sauce", optionPrice: 0},
              ]
            },
          ]
        }
      ],
      [//"French Fries"
        {
          optionName: 'Required Changes',
          required: true,
          multiSelect: false,
          options: [
            {
              optionList: 
              [
                {optionName: "Value", optionPrice: 0}, {optionName: "Small", optionPrice: 0.6},
                {optionName: "Medium", optionPrice: 1}, {optionName: "Large", optionPrice: 1.4},
              ]
            },
          ]
        },
        {
          optionName: 'Optional Changes',
          required: false,
          multiSelect: true,
          options:[]
        }
      ],
      [//"Onion Rings"
        {
          optionName: 'Required Changes',
          required: true,
          multiSelect: false,
          options: [
            {
              optionList: 
              [
                {optionName: "Value", optionPrice: 0}, {optionName: "Small", optionPrice: 0.6},
                {optionName: "Medium", optionPrice: 1}, {optionName: "Large", optionPrice: 1.4},
              ]
            },
          ]
        },
        {
          optionName: 'Optional Changes',
          required: false,
          multiSelect: true,
          options:[
            {
              optionList: 
              [
                {optionName: "No Zesty Dipping Sauce", optionPrice: 0}
              ]
            },
          ]
        }
      ],
      [//"Mozzarella Sticks"
        {
          optionName: 'Required Changes',
          required: true,
          multiSelect: false,
          options: [
            {
              optionList: 
              [
                {optionName: "4 Pc", optionPrice: 0}, {optionName: "8 Pc", optionPrice: 1.9},
                {optionName: "12 Pc", optionPrice: 3},
              ]
            },
          ]
        },
        {
          optionName: 'Optional Changes',
          required: false,
          multiSelect: true,
          options:[
            {
              optionList: 
              [
                {optionName: "No Marinara Sauce", optionPrice: 0}
              ]
            },
          ]
        }
      ],
      [//"Chocolate Shake"
        {
          optionName: 'Required Changes',
          required: true,
          multiSelect: false,
          options: []
        },
        {
          optionName: 'Optional Changes',
          required: false,
          multiSelect: true,
          options:[]
        }
      ],
      [//"Soft Drink"
        {
          optionName: 'Required Changes',
          required: true,
          multiSelect: false,
          options: [
            {
              optionList: 
              [
                {optionName: "Coca-Cola", optionPrice: 0}, {optionName: "Diet Coke", optionPrice: 0},
                {optionName: "Dr Pepper", optionPrice: 0}, {optionName: "Sprite", optionPrice: 0},
                {optionName: "Water", optionPrice: 0}, {optionName: "Sweetened Iced Tea", optionPrice: 0},
                {optionName: "Unsweetened Iced Tea", optionPrice: 0},
              ]
            },
            {
              optionList: 
              [
                {optionName: "Value", optionPrice: 0}, {optionName: "Small", optionPrice: 0.6},
                {optionName: "Medium", optionPrice: 1}, {optionName: "Large", optionPrice: 1.4},
              ]
            },
          ]
        },
        {
          optionName: 'Optional Changes',
          required: false,
          multiSelect: true,
          options:[]
        }
      ],
      [//"King Jr.Meal"
        {
          optionName: 'Required Changes',
          required: true,
          multiSelect: false,
          options: [
            {
              optionList: 
              [
                {optionName: "4 Pc", optionPrice: 0}, {optionName: "6 Pc", optionPrice: 0.5},
              ]
            },
            {
              optionList: 
              [
                {optionName: "BBQ Dipping Sauce", optionPrice: 0}, {optionName: "Buffalo Dipping Sauce", optionPrice: 0},
                {optionName: "Honey Mustard Dipping Sauce", optionPrice: 0}, {optionName: "Hidden Valley Ranch Dipping Sauce", optionPrice: 0},
                {optionName: "Sweet & Sour Dipping Sauce", optionPrice: 0}, {optionName: "Zesty Dipping Sauce", optionPrice: 0},
                {optionName: "No Sauce", optionPrice: 0},
              ]
            },
            {
              optionList: 
              [
                {optionName: "Value French Fries", optionPrice: 0}, {optionName: "Value Onion Rings", optionPrice: 0.1},
                {optionName: "Mott's Applesauce", optionPrice: 0}, {optionName: "Value Have-sies", optionPrice: 0.1},
              ]
            },
            {
              optionList: 
              [
                {optionName: "Honest Kids Apple Juice", optionPrice: 0}, {optionName: "Fat Free Milk", optionPrice: 0.4},
                {optionName: "Value Coca-Cola", optionPrice: 0}, {optionName: "Value Diet Coke", optionPrice: 0},
                {optionName: "Value Sprite", optionPrice: 0}, {optionName: "Value Dr Pepper", optionPrice: 0},
                {optionName: "Pure Life Purified Water", optionPrice: 0.3},
              ]
            },
            {
              optionList: 
              [
                {optionName: "Toy", optionPrice: 0}, {optionName: "Chocolate Chip Cookie", optionPrice: 0},
              ]
            },
          ]
        },
        {
          optionName: 'Optional Changes',
          required: false,
          multiSelect: true,
          options:[]
        }
      ],
    ],
    menuDietaryViolations: [
      ["vegetarian", "vegan", "gluten-free", "dairy-free"], // Whopper
      ["vegetarian", "vegan", "gluten-free", "dairy-free"], // Chicken Fries
      ["vegan", "gluten-free", "dairy-free"], // Impossible Whopper
      ["vegetarian", "vegan", "gluten-free", "dairy-free"], // Chicken Sandwich
      [], // French Fries
      ["vegan", "gluten-free"], // Onion Rings
      ["vegetarian", "vegan", "gluten-free", "dairy-free"], // Mozzarella Sticks
      ["vegan", "dairy-free"], // Chocolate Shake
      [], // Soft Drink
      ["vegetarian", "vegan", "gluten-free", "dairy-free"], // King Jr.Meal
    ],
    ubereatsMenuPrice: [6.55, 4.19, 7.1, 5.49, 3.05, 2.69, 3.39, 3.89, 2.25, 5.19],
    doordashMenuPrice: [6.99, 4.25, 6.99, 5.69, 2.95, 2.89, 3.25, 3.79, 2.15, 4.99],
    grubhubMenuPrice: [6.39, 4.5, 7.2, 5.25, 3.19, 2.79, 3.1, 3.99, 2.45, 5.09],
    ubereatsAvailable: false,
    doordashAvailable: true,
    grubhubAvailable: true,
    cuisineType: "American",
    operatingHours: ["Breakfast", "Brunch", "Lunch", "Dinner"],
    restaurantImage: "/images/burger_king/bk-logo.png",
    menuItemImages: [
      "/images/burger_king/whopper.jpg",
      "/images/burger_king/chicken_fries.jpg",
      "/images/burger_king/impossible.jpg",
      "/images/burger_king/chicken_sandwich.jpg",
      "/images/burger_king/chicken_fries.jpg",
      "/images/burger_king/onion_rings.jpg",
      "/images/burger_king/mozzarella_sticks.jpg",
      "/images/burger_king/shake.jpg",
      "/images/burger_king/drink.jpg",
      "/images/burger_king/jr_meal.jpg",
    ],
    websiteURL: "https://www.bk.com/",
  },
  {
    restaurantID: "34ab90d",
    restaurantName: "Burger King",
    restaurantAddress: "Burger King, 2338 Teal Rd, Lafayette, IN 47905",
    distance: 3.0,
    menu: [
      "Whopper",
      "Chicken Fries",
      "Impossible Whopper",
      "Chicken Sandwich",
      "French Fries",
      "Onion Rings",
      "Mozzarella Sticks",
      "Chocolate Shake",
      "Soft Drink",
      "King Jr.Meal",
    ],
    menuOptions: [
      [//"Whopper"
        {
          optionName: 'Required Changes',
          required: true,
          multiSelect: false,
          options: []
        },
        {
          optionName: 'Optional Changes',
          required: false,
          multiSelect: true,
          options:[
            {
              optionList: 
              [
                {optionName: "No Mayo", optionPrice: 0}, {optionName: "Light Mayo", optionPrice: 0},
                {optionName: "Extra Mayo", optionPrice: 0},
              ]
            },
            {
              optionList: 
              [
                {optionName: "No Ketchup", optionPrice: 0}, {optionName: "Light Ketchup", optionPrice: 0},
                {optionName: "Extra Ketchup", optionPrice: 0}
              ]
            },
            {
              optionList: 
              [
                {optionName: "No Onion", optionPrice: 0}, {optionName: "Light Onion", optionPrice: 0},
                {optionName: "Extra Onion", optionPrice: 0}
              ]
            },
            {
              optionList: 
              [
                {optionName: "No Tomato", optionPrice: 0.0}, {optionName: "Light Tomato", optionPrice: 0},
                {optionName: "Extra Tomato", optionPrice: 0.15}
              ]
            },
            {
              optionList: 
              [
                {optionName: "No Pickle", optionPrice: 0}, {optionName: "Light Pickle", optionPrice: 0},
                {optionName: "Extra Pickle", optionPrice: 0}
              ]
            },
            {
              optionList: 
              [
                {optionName: "No Lettuce", optionPrice: 0}, {optionName: "Light Lettuce", optionPrice: 0},
                {optionName: "Extra Lettuce", optionPrice: 0.08}
              ]
            },
            //Add ons
            {
              optionList: [{optionName: "Add Swiss Cheese", optionPrice: 0.6}]
            },
            {
              optionList: [{optionName: "Add Onion Rings", optionPrice: 0.46}]
            },
            {
              optionList: 
              [
                {optionName: "Add Light Mustard", optionPrice: 0}, {optionName: "Add Regular Mustard", optionPrice: 0},
                {optionName: "Add Extra Mustard", optionPrice: 0},
              ]
            },
            {
              optionList: 
              [
                {optionName: "Add Light BBQ Sauce", optionPrice: 0}, {optionName: "Add Regular BBQ Sauce", optionPrice: 0},
                {optionName: "Add Extra BBQ Sauce", optionPrice: 0},
              ]
            },
          ]
        }
      ],
      [//"Chicken Fries"
        {
          optionName: 'Required Changes',
          required: true,
          multiSelect: false,
          options: [
            {
              optionList: 
              [
                {optionName: "4 Pc", optionPrice: 0}, {optionName: "8 Pc", optionPrice: 1.5},
                {optionName: "12 Pc", optionPrice: 3},
              ]
            },
            {
              sectionCount: 2,
              optionList: 
              [
                {optionName: "BBQ Dipping Sauce", optionPrice: 0}, {optionName: "Buffalo Dipping Sauce", optionPrice: 0},
                {optionName: "Honey Mustard Dipping Sauce", optionPrice: 0}, {optionName: "Hidden Valley Ranch Dipping Sauce", optionPrice: 0},
                {optionName: "Sweet & Sour Dipping Sauce", optionPrice: 0}, {optionName: "Zesty Dipping Sauce", optionPrice: 0},
                {optionName: "No Sauce", optionPrice: 0},
              ]
            },
          ]
        },
        {
          optionName: 'Optional Changes',
          required: false,
          multiSelect: true,
          options:[]
        }
      ],
      [//"Impossible Whopper"
        {
          optionName: 'Required Changes',
          required: true,
          multiSelect: false,
          options: []
        },
        {
          optionName: 'Optional Changes',
          required: false,
          multiSelect: true,
          options:[
            {
              optionList: 
              [
                {optionName: "No Mayo", optionPrice: 0}, {optionName: "Light Mayo", optionPrice: 0},
                {optionName: "Extra Mayo", optionPrice: 0},
              ]
            },
            {
              optionList: 
              [
                {optionName: "No Ketchup", optionPrice: 0}, {optionName: "Light Ketchup", optionPrice: 0},
                {optionName: "Extra Ketchup", optionPrice: 0}
              ]
            },
            {
              optionList: 
              [
                {optionName: "No Onion", optionPrice: 0}, {optionName: "Light Onion", optionPrice: 0},
                {optionName: "Extra Onion", optionPrice: 0}
              ]
            },
            {
              optionList: 
              [
                {optionName: "No Tomato", optionPrice: 0.0}, {optionName: "Light Tomato", optionPrice: 0},
                {optionName: "Extra Tomato", optionPrice: 0.15}
              ]
            },
            {
              optionList: 
              [
                {optionName: "No Pickle", optionPrice: 0}, {optionName: "Light Pickle", optionPrice: 0},
                {optionName: "Extra Pickle", optionPrice: 0}
              ]
            },
            {
              optionList: 
              [
                {optionName: "No Lettuce", optionPrice: 0}, {optionName: "Light Lettuce", optionPrice: 0},
                {optionName: "Extra Lettuce", optionPrice: 0.08}
              ]
            },
            //Add ons
            {
              optionList: [{optionName: "Add Swiss Cheese", optionPrice: 0.6}]
            },
            {
              optionList: [{optionName: "Add Onion Rings", optionPrice: 0.46}]
            },
            {
              optionList: 
              [
                {optionName: "Add Light Mustard", optionPrice: 0}, {optionName: "Add Regular Mustard", optionPrice: 0},
                {optionName: "Add Extra Mustard", optionPrice: 0},
              ]
            },
            {
              optionList: 
              [
                {optionName: "Add Light BBQ Sauce", optionPrice: 0}, {optionName: "Add Regular BBQ Sauce", optionPrice: 0},
                {optionName: "Add Extra BBQ Sauce", optionPrice: 0},
              ]
            },
          ]
        }
      ],
      [//"Chicken Sandwich"
        {
          optionName: 'Required Changes',
          required: true,
          multiSelect: false,
          options: []
        },
        {
          optionName: 'Optional Changes',
          required: false,
          multiSelect: true,
          options:[
            {
              optionList: 
              [
                {optionName: "No Mayo", optionPrice: 0}, {optionName: "Light Mayo", optionPrice: 0},
                {optionName: "Extra Mayo", optionPrice: 0},
              ]
            },
            {
              optionList: 
              [
                {optionName: "No Lettuce", optionPrice: 0}, {optionName: "Light Lettuce", optionPrice: 0},
                {optionName: "Extra Lettuce", optionPrice: 0.08}
              ]
            },
            //Add ons
            {
              optionList: 
              [
                {optionName: "Add Light American Cheese", optionPrice: 0}, {optionName: "Add Regular American Cheese", optionPrice: 0},
                {optionName: "Add Extra American Cheese", optionPrice: 0}
              ]
            },
            {
              optionList: [{optionName: "Add Bacon", optionPrice: 1.2}]
            },
            {
              optionList: 
              [
                {optionName: "Add Light Onion", optionPrice: 0}, {optionName: "Add Regular Onion", optionPrice: 0},
                {optionName: "Add Extra Onion", optionPrice: 0}
              ]
            },
            {
              optionList: 
              [
                {optionName: "Add Light Tomato", optionPrice: 0.15}, {optionName: "Add Regular Tomato", optionPrice: 0.3},
                {optionName: "Extra Tomato", optionPrice: 0.45}
              ]
            },
            {
              optionList: 
              [
                {optionName: "Add Light Pickle", optionPrice: 0}, {optionName: "Add Regular Pickle", optionPrice: 0},
                {optionName: "Add Extra Pickle", optionPrice: 0}
              ]
            },
            {
              optionList: 
              [
                {optionName: "Add Light Ketchup", optionPrice: 0}, {optionName: "Add Regular Ketchup", optionPrice: 0},
                {optionName: "Add Extra Ketchup", optionPrice: 0},
              ]
            },
            {
              optionList: 
              [
                {optionName: "Add Light Mustard", optionPrice: 0}, {optionName: "Add Regular Mustard", optionPrice: 0},
                {optionName: "Add Extra Mustard", optionPrice: 0},
              ]
            },
            {
              optionList: 
              [
                {optionName: "Add Light BBQ Sauce", optionPrice: 0}, {optionName: "Add Regular BBQ Sauce", optionPrice: 0},
                {optionName: "Add Extra BBQ Sauce", optionPrice: 0},
              ]
            },
          ]
        }
      ],
      [//"French Fries"
        {
          optionName: 'Required Changes',
          required: true,
          multiSelect: false,
          options: [
            {
              optionList: 
              [
                {optionName: "Value", optionPrice: 0}, {optionName: "Small", optionPrice: 0.6},
                {optionName: "Medium", optionPrice: 1}, {optionName: "Large", optionPrice: 1.4},
              ]
            },
          ]
        },
        {
          optionName: 'Optional Changes',
          required: false,
          multiSelect: true,
          options:[]
        }
      ],
      [//"Onion Rings"
        {
          optionName: 'Required Changes',
          required: true,
          multiSelect: false,
          options: [
            {
              optionList: 
              [
                {optionName: "Value", optionPrice: 0}, {optionName: "Small", optionPrice: 0.6},
                {optionName: "Medium", optionPrice: 1}, {optionName: "Large", optionPrice: 1.4},
              ]
            },
          ]
        },
        {
          optionName: 'Optional Changes',
          required: false,
          multiSelect: true,
          options:[
            {
              optionList: 
              [
                {optionName: "No Zesty Dipping Sauce", optionPrice: 0}
              ]
            },
          ]
        }
      ],
      [//"Mozzarella Sticks"
        {
          optionName: 'Required Changes',
          required: true,
          multiSelect: false,
          options: [
            {
              optionList: 
              [
                {optionName: "4 Pc", optionPrice: 0}, {optionName: "8 Pc", optionPrice: 1.9},
                {optionName: "12 Pc", optionPrice: 3},
              ]
            },
          ]
        },
        {
          optionName: 'Optional Changes',
          required: false,
          multiSelect: true,
          options:[
            {
              optionList: 
              [
                {optionName: "No Marinara Sauce", optionPrice: 0}
              ]
            },
          ]
        }
      ],
      [//"Chocolate Shake"
        {
          optionName: 'Required Changes',
          required: true,
          multiSelect: false,
          options: []
        },
        {
          optionName: 'Optional Changes',
          required: false,
          multiSelect: true,
          options:[]
        }
      ],
      [//"Soft Drink"
        {
          optionName: 'Required Changes',
          required: true,
          multiSelect: false,
          options: [
            {
              optionList: 
              [
                {optionName: "Coca-Cola", optionPrice: 0}, {optionName: "Diet Coke", optionPrice: 0},
                {optionName: "Dr Pepper", optionPrice: 0}, {optionName: "Sprite", optionPrice: 0},
                {optionName: "Water", optionPrice: 0}, {optionName: "Sweetened Iced Tea", optionPrice: 0},
                {optionName: "Unsweetened Iced Tea", optionPrice: 0},
              ]
            },
            {
              optionList: 
              [
                {optionName: "Value", optionPrice: 0}, {optionName: "Small", optionPrice: 0.6},
                {optionName: "Medium", optionPrice: 1}, {optionName: "Large", optionPrice: 1.4},
              ]
            },
          ]
        },
        {
          optionName: 'Optional Changes',
          required: false,
          multiSelect: true,
          options:[]
        }
      ],
      [//"King Jr.Meal"
        {
          optionName: 'Required Changes',
          required: true,
          multiSelect: false,
          options: [
            {
              optionList: 
              [
                {optionName: "4 Pc", optionPrice: 0}, {optionName: "6 Pc", optionPrice: 0.5},
              ]
            },
            {
              optionList: 
              [
                {optionName: "BBQ Dipping Sauce", optionPrice: 0}, {optionName: "Buffalo Dipping Sauce", optionPrice: 0},
                {optionName: "Honey Mustard Dipping Sauce", optionPrice: 0}, {optionName: "Hidden Valley Ranch Dipping Sauce", optionPrice: 0},
                {optionName: "Sweet & Sour Dipping Sauce", optionPrice: 0}, {optionName: "Zesty Dipping Sauce", optionPrice: 0},
                {optionName: "No Sauce", optionPrice: 0},
              ]
            },
            {
              optionList: 
              [
                {optionName: "Value French Fries", optionPrice: 0}, {optionName: "Value Onion Rings", optionPrice: 0.1},
                {optionName: "Mott's Applesauce", optionPrice: 0}, {optionName: "Value Have-sies", optionPrice: 0.1},
              ]
            },
            {
              optionList: 
              [
                {optionName: "Honest Kids Apple Juice", optionPrice: 0}, {optionName: "Fat Free Milk", optionPrice: 0.4},
                {optionName: "Value Coca-Cola", optionPrice: 0}, {optionName: "Value Diet Coke", optionPrice: 0},
                {optionName: "Value Sprite", optionPrice: 0}, {optionName: "Value Dr Pepper", optionPrice: 0},
                {optionName: "Pure Life Purified Water", optionPrice: 0.3},
              ]
            },
            {
              optionList: 
              [
                {optionName: "Toy", optionPrice: 0}, {optionName: "Chocolate Chip Cookie", optionPrice: 0},
              ]
            },
          ]
        },
        {
          optionName: 'Optional Changes',
          required: false,
          multiSelect: true,
          options:[]
        }
      ],
    ],
    menuDietaryViolations: [
      ["vegetarian", "vegan", "gluten-free", "dairy-free"], // Whopper
      ["vegetarian", "vegan", "gluten-free", "dairy-free"], // Chicken Fries
      ["vegan", "gluten-free", "dairy-free"], // Impossible Whopper
      ["vegetarian", "vegan", "gluten-free", "dairy-free"], // Chicken Sandwich
      [], // French Fries
      ["vegan", "gluten-free"], // Onion Rings
      ["vegetarian", "vegan", "gluten-free", "dairy-free"], // Mozzarella Sticks
      ["vegan", "dairy-free"], // Chocolate Shake
      [], // Soft Drink
      ["vegetarian", "vegan", "gluten-free", "dairy-free"], // King Jr.Meal
    ],
    ubereatsMenuPrice: [6.39, 4.15, 7.05, 5.35, 3.19, 2.89, 3.19, 3.69, 2.29, 4.89],
    doordashMenuPrice: [6.59, 4.35, 6.95, 5.65, 3.05, 2.79, 3.25, 3.79, 2.39, 5.05],
    grubhubMenuPrice: [6.49, 4.55, 7.15, 5.45, 3.09, 2.95, 3.35, 3.99, 2.45, 4.95],
    ubereatsAvailable: true,
    doordashAvailable: false,
    grubhubAvailable: true,
    cuisineType: "American",
    operatingHours: ["Breakfast", "Brunch", "Lunch", "Dinner"],
    restaurantImage: "/images/burger_king/bk-logo.png",
    menuItemImages: [
      "/images/burger_king/whopper.jpg",
      "/images/burger_king/chicken_fries.jpg",
      "/images/burger_king/impossible.jpg",
      "/images/burger_king/chicken_sandwich.jpg",
      "/images/burger_king/chicken_fries.jpg",
      "/images/burger_king/onion_rings.jpg",
      "/images/burger_king/mozzarella_sticks.jpg",
      "/images/burger_king/shake.jpg",
      "/images/burger_king/drink.jpg",
      "/images/burger_king/jr_meal.jpg",
    ],
    websiteURL: "https://www.bk.com/",
  },
  {
    restaurantID: "78ef44g",
    restaurantName: "Burger King",
    restaurantAddress: "Burger King, 4092 South St, Lafayette, IN 47905",
    distance: 1.8,
    menu: [
      "Whopper",
      "Chicken Fries",
      "Impossible Whopper",
      "Chicken Sandwich",
      "French Fries",
      "Onion Rings",
      "Mozzarella Sticks",
      "Chocolate Shake",
      "Soft Drink",
      "King Jr.Meal",
    ],
    menuOptions: [
      [//"Whopper"
        {
          optionName: 'Required Changes',
          required: true,
          multiSelect: false,
          options: []
        },
        {
          optionName: 'Optional Changes',
          required: false,
          multiSelect: true,
          options:[
            {
              optionList: 
              [
                {optionName: "No Mayo", optionPrice: 0}, {optionName: "Light Mayo", optionPrice: 0},
                {optionName: "Extra Mayo", optionPrice: 0},
              ]
            },
            {
              optionList: 
              [
                {optionName: "No Ketchup", optionPrice: 0}, {optionName: "Light Ketchup", optionPrice: 0},
                {optionName: "Extra Ketchup", optionPrice: 0}
              ]
            },
            {
              optionList: 
              [
                {optionName: "No Onion", optionPrice: 0}, {optionName: "Light Onion", optionPrice: 0},
                {optionName: "Extra Onion", optionPrice: 0}
              ]
            },
            {
              optionList: 
              [
                {optionName: "No Tomato", optionPrice: 0.0}, {optionName: "Light Tomato", optionPrice: 0},
                {optionName: "Extra Tomato", optionPrice: 0.15}
              ]
            },
            {
              optionList: 
              [
                {optionName: "No Pickle", optionPrice: 0}, {optionName: "Light Pickle", optionPrice: 0},
                {optionName: "Extra Pickle", optionPrice: 0}
              ]
            },
            {
              optionList: 
              [
                {optionName: "No Lettuce", optionPrice: 0}, {optionName: "Light Lettuce", optionPrice: 0},
                {optionName: "Extra Lettuce", optionPrice: 0.08}
              ]
            },
            //Add ons
            {
              optionList: [{optionName: "Add Swiss Cheese", optionPrice: 0.6}]
            },
            {
              optionList: [{optionName: "Add Onion Rings", optionPrice: 0.46}]
            },
            {
              optionList: 
              [
                {optionName: "Add Light Mustard", optionPrice: 0}, {optionName: "Add Regular Mustard", optionPrice: 0},
                {optionName: "Add Extra Mustard", optionPrice: 0},
              ]
            },
            {
              optionList: 
              [
                {optionName: "Add Light BBQ Sauce", optionPrice: 0}, {optionName: "Add Regular BBQ Sauce", optionPrice: 0},
                {optionName: "Add Extra BBQ Sauce", optionPrice: 0},
              ]
            },
          ]
        }
      ],
      [//"Chicken Fries"
        {
          optionName: 'Required Changes',
          required: true,
          multiSelect: false,
          options: [
            {
              optionList: 
              [
                {optionName: "4 Pc", optionPrice: 0}, {optionName: "8 Pc", optionPrice: 1.5},
                {optionName: "12 Pc", optionPrice: 3},
              ]
            },
            {
              sectionCount: 2,
              optionList: 
              [
                {optionName: "BBQ Dipping Sauce", optionPrice: 0}, {optionName: "Buffalo Dipping Sauce", optionPrice: 0},
                {optionName: "Honey Mustard Dipping Sauce", optionPrice: 0}, {optionName: "Hidden Valley Ranch Dipping Sauce", optionPrice: 0},
                {optionName: "Sweet & Sour Dipping Sauce", optionPrice: 0}, {optionName: "Zesty Dipping Sauce", optionPrice: 0},
                {optionName: "No Sauce", optionPrice: 0},
              ]
            },
          ]
        },
        {
          optionName: 'Optional Changes',
          required: false,
          multiSelect: true,
          options:[]
        }
      ],
      [//"Impossible Whopper"
        {
          optionName: 'Required Changes',
          required: true,
          multiSelect: false,
          options: []
        },
        {
          optionName: 'Optional Changes',
          required: false,
          multiSelect: true,
          options:[
            {
              optionList: 
              [
                {optionName: "No Mayo", optionPrice: 0}, {optionName: "Light Mayo", optionPrice: 0},
                {optionName: "Extra Mayo", optionPrice: 0},
              ]
            },
            {
              optionList: 
              [
                {optionName: "No Ketchup", optionPrice: 0}, {optionName: "Light Ketchup", optionPrice: 0},
                {optionName: "Extra Ketchup", optionPrice: 0}
              ]
            },
            {
              optionList: 
              [
                {optionName: "No Onion", optionPrice: 0}, {optionName: "Light Onion", optionPrice: 0},
                {optionName: "Extra Onion", optionPrice: 0}
              ]
            },
            {
              optionList: 
              [
                {optionName: "No Tomato", optionPrice: 0.0}, {optionName: "Light Tomato", optionPrice: 0},
                {optionName: "Extra Tomato", optionPrice: 0.15}
              ]
            },
            {
              optionList: 
              [
                {optionName: "No Pickle", optionPrice: 0}, {optionName: "Light Pickle", optionPrice: 0},
                {optionName: "Extra Pickle", optionPrice: 0}
              ]
            },
            {
              optionList: 
              [
                {optionName: "No Lettuce", optionPrice: 0}, {optionName: "Light Lettuce", optionPrice: 0},
                {optionName: "Extra Lettuce", optionPrice: 0.08}
              ]
            },
            //Add ons
            {
              optionList: [{optionName: "Add Swiss Cheese", optionPrice: 0.6}]
            },
            {
              optionList: [{optionName: "Add Onion Rings", optionPrice: 0.46}]
            },
            {
              optionList: 
              [
                {optionName: "Add Light Mustard", optionPrice: 0}, {optionName: "Add Regular Mustard", optionPrice: 0},
                {optionName: "Add Extra Mustard", optionPrice: 0},
              ]
            },
            {
              optionList: 
              [
                {optionName: "Add Light BBQ Sauce", optionPrice: 0}, {optionName: "Add Regular BBQ Sauce", optionPrice: 0},
                {optionName: "Add Extra BBQ Sauce", optionPrice: 0},
              ]
            },
          ]
        }
      ],
      [//"Chicken Sandwich"
        {
          optionName: 'Required Changes',
          required: true,
          multiSelect: false,
          options: []
        },
        {
          optionName: 'Optional Changes',
          required: false,
          multiSelect: true,
          options:[
            {
              optionList: 
              [
                {optionName: "No Mayo", optionPrice: 0}, {optionName: "Light Mayo", optionPrice: 0},
                {optionName: "Extra Mayo", optionPrice: 0},
              ]
            },
            {
              optionList: 
              [
                {optionName: "No Lettuce", optionPrice: 0}, {optionName: "Light Lettuce", optionPrice: 0},
                {optionName: "Extra Lettuce", optionPrice: 0.08}
              ]
            },
            //Add ons
            {
              optionList: 
              [
                {optionName: "Add Light American Cheese", optionPrice: 0}, {optionName: "Add Regular American Cheese", optionPrice: 0},
                {optionName: "Add Extra American Cheese", optionPrice: 0}
              ]
            },
            {
              optionList: [{optionName: "Add Bacon", optionPrice: 1.2}]
            },
            {
              optionList: 
              [
                {optionName: "Add Light Onion", optionPrice: 0}, {optionName: "Add Regular Onion", optionPrice: 0},
                {optionName: "Add Extra Onion", optionPrice: 0}
              ]
            },
            {
              optionList: 
              [
                {optionName: "Add Light Tomato", optionPrice: 0.15}, {optionName: "Add Regular Tomato", optionPrice: 0.3},
                {optionName: "Extra Tomato", optionPrice: 0.45}
              ]
            },
            {
              optionList: 
              [
                {optionName: "Add Light Pickle", optionPrice: 0}, {optionName: "Add Regular Pickle", optionPrice: 0},
                {optionName: "Add Extra Pickle", optionPrice: 0}
              ]
            },
            {
              optionList: 
              [
                {optionName: "Add Light Ketchup", optionPrice: 0}, {optionName: "Add Regular Ketchup", optionPrice: 0},
                {optionName: "Add Extra Ketchup", optionPrice: 0},
              ]
            },
            {
              optionList: 
              [
                {optionName: "Add Light Mustard", optionPrice: 0}, {optionName: "Add Regular Mustard", optionPrice: 0},
                {optionName: "Add Extra Mustard", optionPrice: 0},
              ]
            },
            {
              optionList: 
              [
                {optionName: "Add Light BBQ Sauce", optionPrice: 0}, {optionName: "Add Regular BBQ Sauce", optionPrice: 0},
                {optionName: "Add Extra BBQ Sauce", optionPrice: 0},
              ]
            },
          ]
        }
      ],
      [//"French Fries"
        {
          optionName: 'Required Changes',
          required: true,
          multiSelect: false,
          options: [
            {
              optionList: 
              [
                {optionName: "Value", optionPrice: 0}, {optionName: "Small", optionPrice: 0.6},
                {optionName: "Medium", optionPrice: 1}, {optionName: "Large", optionPrice: 1.4},
              ]
            },
          ]
        },
        {
          optionName: 'Optional Changes',
          required: false,
          multiSelect: true,
          options:[]
        }
      ],
      [//"Onion Rings"
        {
          optionName: 'Required Changes',
          required: true,
          multiSelect: false,
          options: [
            {
              optionList: 
              [
                {optionName: "Value", optionPrice: 0}, {optionName: "Small", optionPrice: 0.6},
                {optionName: "Medium", optionPrice: 1}, {optionName: "Large", optionPrice: 1.4},
              ]
            },
          ]
        },
        {
          optionName: 'Optional Changes',
          required: false,
          multiSelect: true,
          options:[
            {
              optionList: 
              [
                {optionName: "No Zesty Dipping Sauce", optionPrice: 0}
              ]
            },
          ]
        }
      ],
      [//"Mozzarella Sticks"
        {
          optionName: 'Required Changes',
          required: true,
          multiSelect: false,
          options: [
            {
              optionList: 
              [
                {optionName: "4 Pc", optionPrice: 0}, {optionName: "8 Pc", optionPrice: 1.9},
                {optionName: "12 Pc", optionPrice: 3},
              ]
            },
          ]
        },
        {
          optionName: 'Optional Changes',
          required: false,
          multiSelect: true,
          options:[
            {
              optionList: 
              [
                {optionName: "No Marinara Sauce", optionPrice: 0}
              ]
            },
          ]
        }
      ],
      [//"Chocolate Shake"
        {
          optionName: 'Required Changes',
          required: true,
          multiSelect: false,
          options: []
        },
        {
          optionName: 'Optional Changes',
          required: false,
          multiSelect: true,
          options:[]
        }
      ],
      [//"Soft Drink"
        {
          optionName: 'Required Changes',
          required: true,
          multiSelect: false,
          options: [
            {
              optionList: 
              [
                {optionName: "Coca-Cola", optionPrice: 0}, {optionName: "Diet Coke", optionPrice: 0},
                {optionName: "Dr Pepper", optionPrice: 0}, {optionName: "Sprite", optionPrice: 0},
                {optionName: "Water", optionPrice: 0}, {optionName: "Sweetened Iced Tea", optionPrice: 0},
                {optionName: "Unsweetened Iced Tea", optionPrice: 0},
              ]
            },
            {
              optionList: 
              [
                {optionName: "Value", optionPrice: 0}, {optionName: "Small", optionPrice: 0.6},
                {optionName: "Medium", optionPrice: 1}, {optionName: "Large", optionPrice: 1.4},
              ]
            },
          ]
        },
        {
          optionName: 'Optional Changes',
          required: false,
          multiSelect: true,
          options:[]
        }
      ],
      [//"King Jr.Meal"
        {
          optionName: 'Required Changes',
          required: true,
          multiSelect: false,
          options: [
            {
              optionList: 
              [
                {optionName: "4 Pc", optionPrice: 0}, {optionName: "6 Pc", optionPrice: 0.5},
              ]
            },
            {
              optionList: 
              [
                {optionName: "BBQ Dipping Sauce", optionPrice: 0}, {optionName: "Buffalo Dipping Sauce", optionPrice: 0},
                {optionName: "Honey Mustard Dipping Sauce", optionPrice: 0}, {optionName: "Hidden Valley Ranch Dipping Sauce", optionPrice: 0},
                {optionName: "Sweet & Sour Dipping Sauce", optionPrice: 0}, {optionName: "Zesty Dipping Sauce", optionPrice: 0},
                {optionName: "No Sauce", optionPrice: 0},
              ]
            },
            {
              optionList: 
              [
                {optionName: "Value French Fries", optionPrice: 0}, {optionName: "Value Onion Rings", optionPrice: 0.1},
                {optionName: "Mott's Applesauce", optionPrice: 0}, {optionName: "Value Have-sies", optionPrice: 0.1},
              ]
            },
            {
              optionList: 
              [
                {optionName: "Honest Kids Apple Juice", optionPrice: 0}, {optionName: "Fat Free Milk", optionPrice: 0.4},
                {optionName: "Value Coca-Cola", optionPrice: 0}, {optionName: "Value Diet Coke", optionPrice: 0},
                {optionName: "Value Sprite", optionPrice: 0}, {optionName: "Value Dr Pepper", optionPrice: 0},
                {optionName: "Pure Life Purified Water", optionPrice: 0.3},
              ]
            },
            {
              optionList: 
              [
                {optionName: "Toy", optionPrice: 0}, {optionName: "Chocolate Chip Cookie", optionPrice: 0},
              ]
            },
          ]
        },
        {
          optionName: 'Optional Changes',
          required: false,
          multiSelect: true,
          options:[]
        }
      ],
    ],
    menuDietaryViolations: [
      ["vegetarian", "vegan", "gluten-free", "dairy-free"], // Whopper
      ["vegetarian", "vegan", "gluten-free", "dairy-free"], // Chicken Fries
      ["vegan", "gluten-free", "dairy-free"], // Impossible Whopper
      ["vegetarian", "vegan", "gluten-free", "dairy-free"], // Chicken Sandwich
      [], // French Fries
      ["vegan", "gluten-free"], // Onion Rings
      ["vegetarian", "vegan", "gluten-free", "dairy-free"], // Mozzarella Sticks
      ["vegan", "dairy-free"], // Chocolate Shake
      [], // Soft Drink
      ["vegetarian", "vegan", "gluten-free", "dairy-free"], // King Jr.Meal
    ],
    ubereatsMenuPrice: [6.69, 4.2, 6.85, 5.29, 3.09, 2.79, 3.09, 3.79, 2.19, 5.09],
    doordashMenuPrice: [6.89, 4.39, 7.05, 5.59, 2.95, 2.95, 3.15, 3.89, 2.25, 5.29],
    grubhubMenuPrice: [6.55, 4.49, 7.0, 5.39, 3.29, 2.85, 3.35, 3.85, 2.35, 5.19],
    ubereatsAvailable: true,
    doordashAvailable: true,
    grubhubAvailable: false,
    cuisineType: "American",
    operatingHours: ["Breakfast", "Brunch", "Lunch", "Dinner"],
    restaurantImage: "/images/burger_king/bk-logo.png",
    menuItemImages: [
      "/images/burger_king/whopper.jpg",
      "/images/burger_king/chicken_fries.jpg",
      "/images/burger_king/impossible.jpg",
      "/images/burger_king/chicken_sandwich.jpg",
      "/images/burger_king/chicken_fries.jpg",
      "/images/burger_king/onion_rings.jpg",
      "/images/burger_king/mozzarella_sticks.jpg",
      "/images/burger_king/shake.jpg",
      "/images/burger_king/drink.jpg",
      "/images/burger_king/jr_meal.jpg",
    ],
    websiteURL: "https://www.bk.com/",
  },
  {
    restaurantID: "17cd32x",
    restaurantName: "Chipotle",
    restaurantAddress: "Chipotle, 200 W State St, West Lafayette, IN 47906",
    distance: 0.9,
    menu: [
      "Burrito",
      "Burrito Bowl",
      "Tacos",
      "Salad",
      "Chips & Guacamole",
      "Quesadilla",
      "Sofritas Bowl",
      "Steak Bowl",
      "Barbacoa Burrito",
      "Chicken Burrito",
    ],
    menuOptions: [
      [
        {
          optionName: 'Required Changes',
          required: true,
          multiSelect: false,
          options: []
        },
        {
          optionName: 'Optional Changes',
          required: false,
          multiSelect: true,
          options:[]
        }
      ],
      [

      ],
      [

      ],
      [

      ],
      [

      ],
      [

      ],
      [

      ],
      [

      ],
      [

      ],
      [

      ],
    ],
    menuDietaryViolations: [
      ["gluten-free"], // Burrito (flour tortilla)
      [], // Burrito Bowl (can be customized)
      ["gluten-free"], // Tacos (if using flour tortillas)
      [], // Salad
      [], // Chips & Guacamole
      ["gluten-free"], // Quesadilla (flour tortilla, cheese)
      [], // Sofritas Bowl (vegan)
      ["vegetarian", "vegan"], // Steak Bowl
      ["vegetarian", "vegan"], // Barbacoa Burrito
      ["vegetarian", "vegan"], // Chicken Burrito
    ],
    ubereatsMenuPrice: [8.25, 8.15, 7.85, 7.5, 4.25, 8.95, 8.0, 9.45, 9.1, 8.5],
    doordashMenuPrice: [8.5, 8.25, 7.75, 7.35, 4.5, 9.1, 8.25, 9.65, 9.3, 8.4],
    grubhubMenuPrice: [8.4, 8.2, 7.95, 7.6, 4.35, 9.0, 8.15, 9.55, 9.2, 8.6],
    ubereatsAvailable: true,
    doordashAvailable: true,
    grubhubAvailable: false,
    cuisineType: "Mexican",
    operatingHours: ["Breakfast", "Lunch", "Dinner"],
    restaurantImage: "/images/chipotle/chipotle-logo.png",
    menuItemImages: [
      "/images/chipotle/burrito.jpg",
      "/images/chipotle/bowl.jpg",
      "/images/chipotle/tacos.jpg",
      "/images/chipotle/salad.jpg",
      "/images/chipotle/chips_guac.jpg",
      "/images/chipotle/quesadilla.jpg",
      "/images/chipotle/bowl.jpg",
      "/images/chipotle/bowl.jpg",
      "/images/chipotle/burrito.jpg",
      "/images/chipotle/burrito.jpg",
    ],
    websiteURL: "https://www.chipotle.com/",
  },
  {
    restaurantID: "23ef67y",
    restaurantName: "Chipotle",
    restaurantAddress: "Chipotle, 2400 N Salisbury St, West Lafayette, IN 47906",
    distance: 1.2,
    menu: [
      "Burrito",
      "Burrito Bowl",
      "Tacos",
      "Salad",
      "Chips & Guacamole",
      "Quesadilla",
      "Sofritas Bowl",
      "Steak Bowl",
      "Barbacoa Burrito",
      "Chicken Burrito",
    ],
    menuOptions: [],
    menuDietaryViolations: [
      ["gluten-free"], // Burrito (flour tortilla)
      [], // Burrito Bowl (can be customized)
      ["gluten-free"], // Tacos (if using flour tortillas)
      [], // Salad
      [], // Chips & Guacamole
      ["gluten-free"], // Quesadilla (flour tortilla, cheese)
      [], // Sofritas Bowl (vegan)
      ["vegetarian", "vegan"], // Steak Bowl
      ["vegetarian", "vegan"], // Barbacoa Burrito
      ["vegetarian", "vegan"], // Chicken Burrito
    ],
    ubereatsMenuPrice: [8.45, 8.3, 7.75, 7.4, 4.35, 9.05, 8.1, 9.5, 9.15, 8.35],
    doordashMenuPrice: [8.6, 8.4, 7.65, 7.5, 4.55, 9.15, 8.2, 9.75, 9.35, 8.55],
    grubhubMenuPrice: [8.3, 8.2, 7.8, 7.45, 4.4, 9.0, 8.0, 9.55, 9.1, 8.45],
    ubereatsAvailable: true,
    doordashAvailable: false,
    grubhubAvailable: true,
    cuisineType: "Mexican",
    operatingHours: ["Breakfast", "Lunch", "Dinner"],
    restaurantImage: "/images/chipotle/chipotle-logo.png",
    menuItemImages: [
      "/images/chipotle/burrito.jpg",
      "/images/chipotle/bowl.jpg",
      "/images/chipotle/tacos.jpg",
      "/images/chipotle/salad.jpg",
      "/images/chipotle/chips_guac.jpg",
      "/images/chipotle/quesadilla.jpg",
      "/images/chipotle/bowl.jpg",
      "/images/chipotle/bowl.jpg",
      "/images/chipotle/burrito.jpg",
      "/images/chipotle/burrito.jpg",
    ],
    websiteURL: "https://www.chipotle.com/",
  },
  {
    restaurantID: "37fg89z",
    restaurantName: "Chipotle",
    restaurantAddress: "Chipotle, 4030 South St, Lafayette, IN 47905",
    distance: 2.0,
    menu: [
      "Burrito",
      "Burrito Bowl",
      "Tacos",
      "Salad",
      "Chips & Guacamole",
      "Quesadilla",
      "Sofritas Bowl",
      "Steak Bowl",
      "Barbacoa Burrito",
      "Chicken Burrito",
    ],
    menuOptions: [],
    menuDietaryViolations: [
      ["gluten-free"], // Burrito (flour tortilla)
      [], // Burrito Bowl (can be customized)
      ["gluten-free"], // Tacos (if using flour tortillas)
      [], // Salad
      [], // Chips & Guacamole
      ["gluten-free"], // Quesadilla (flour tortilla, cheese)
      [], // Sofritas Bowl (vegan)
      ["vegetarian", "vegan"], // Steak Bowl
      ["vegetarian", "vegan"], // Barbacoa Burrito
      ["vegetarian", "vegan"], // Chicken Burrito
    ],
    ubereatsMenuPrice: [8.3, 8.1, 7.95, 7.55, 4.4, 9.1, 8.25, 9.4, 9.05, 8.6],
    doordashMenuPrice: [8.65, 8.45, 7.8, 7.6, 4.6, 9.25, 8.3, 9.65, 9.45, 8.7],
    grubhubMenuPrice: [8.25, 8.0, 7.85, 7.5, 4.3, 9.05, 8.1, 9.5, 9.2, 8.5],
    ubereatsAvailable: true,
    doordashAvailable: true,
    grubhubAvailable: false,
    cuisineType: "Mexican",
    operatingHours: ["Breakfast", "Lunch", "Dinner"],
    restaurantImage: "/images/chipotle/chipotle-logo.png",
    menuItemImages: [
      "/images/chipotle/burrito.jpg",
      "/images/chipotle/bowl.jpg",
      "/images/chipotle/tacos.jpg",
      "/images/chipotle/salad.jpg",
      "/images/chipotle/chips_guac.jpg",
      "/images/chipotle/quesadilla.jpg",
      "/images/chipotle/bowl.jpg",
      "/images/chipotle/bowl.jpg",
      "/images/chipotle/burrito.jpg",
      "/images/chipotle/burrito.jpg",
    ],
    websiteURL: "https://www.chipotle.com/",
  },
  {
    restaurantID: "45hi12w",
    restaurantName: "Chipotle",
    restaurantAddress: "Chipotle, 3211 Builder Dr, Lafayette, IN 47909",
    distance: 1.5,
    menu: [
      "Burrito",
      "Burrito Bowl",
      "Tacos",
      "Salad",
      "Chips & Guacamole",
      "Quesadilla",
      "Sofritas Bowl",
      "Steak Bowl",
      "Barbacoa Burrito",
      "Chicken Burrito",
    ],
    menuOptions: [],
    menuDietaryViolations: [
      ["gluten-free"], // Burrito (flour tortilla)
      [], // Burrito Bowl (can be customized)
      ["gluten-free"], // Tacos (if using flour tortillas)
      [], // Salad
      [], // Chips & Guacamole
      ["gluten-free"], // Quesadilla (flour tortilla, cheese)
      [], // Sofritas Bowl (vegan)
      ["vegetarian", "vegan"], // Steak Bowl
      ["vegetarian", "vegan"], // Barbacoa Burrito
      ["vegetarian", "vegan"], // Chicken Burrito
    ],
    ubereatsMenuPrice: [
      8.55, 8.35, 7.85, 7.65, 4.45, 9.2, 8.35, 9.55, 9.25, 8.5,
    ],
    doordashMenuPrice: [
      8.7, 8.45, 7.95, 7.7, 4.55, 9.35, 8.45, 9.6, 9.35, 8.75,
    ],
    grubhubMenuPrice: [8.35, 8.1, 7.75, 7.6, 4.5, 9.1, 8.2, 9.5, 9.15, 8.6],
    ubereatsAvailable: false,
    doordashAvailable: true,
    grubhubAvailable: true,
    cuisineType: "Mexican",
    operatingHours: ["Breakfast", "Lunch", "Dinner"],
    restaurantImage: "/images/chipotle/chipotle-logo.png",
    menuItemImages: [
      "/images/chipotle/burrito.jpg",
      "/images/chipotle/bowl.jpg",
      "/images/chipotle/tacos.jpg",
      "/images/chipotle/salad.jpg",
      "/images/chipotle/chips_guac.jpg",
      "/images/chipotle/quesadilla.jpg",
      "/images/chipotle/bowl.jpg",
      "/images/chipotle/bowl.jpg",
      "/images/chipotle/burrito.jpg",
      "/images/chipotle/burrito.jpg",
    ],
    websiteURL: "https://www.chipotle.com/",
  },
  {
    restaurantID: "99bc12x",
    restaurantName: "Applebee's",
    restaurantAddress: "Applebee's, 3009 Northwestern Ave, West Lafayette, IN 47906",
    distance: 1.2,
    menu: [
      "Bourbon Street Chicken & Shrimp",
      "Classic Bacon Cheeseburger",
      "Chicken Tenders Platter",
      "Fiesta Lime Chicken",
      "Mozzarella Sticks",
      "Four Cheese Mac & Cheese with Honey Pepper Chicken Tenders",
      "Oriental Chicken Salad",
      "Double - Glazed Baby Back Ribs",
      "Triple Chocolate Meltdown",
      "Classic Fries",
    ],
    menuOptions: [],
    menuDietaryViolations: [
      ["vegetarian", "vegan", "gluten-free", "dairy-free"], // Bourbon Street Chicken & Shrimp
      ["vegetarian", "vegan", "gluten-free", "dairy-free"], // Bacon Cheeseburger
      ["vegetarian", "vegan", "gluten-free", "dairy-free"], // Chicken Tenders
      ["vegetarian", "vegan", "gluten-free", "dairy-free"], // Fiesta Lime Chicken
      ["vegetarian", "vegan", "gluten-free", "dairy-free"], // Mozzarella Sticks
      ["vegetarian", "vegan", "gluten-free", "dairy-free"], // Mac & Cheese with Chicken Tenders
      ["vegetarian", "vegan", "gluten-free", "dairy-free"], // Oriental Chicken Salad
      ["vegetarian", "vegan", "gluten-free", "dairy-free"], // Baby Back Ribs
      ["vegan", "dairy-free", "gluten-free"], // Triple Chocolate Meltdown
      [], // Classic Fries
    ],
    ubereatsMenuPrice: [
      16.99, 12.5, 11.25, 13.75, 7.49, 15.5, 12.99, 18.99, 7.25, 3.99,
    ],
    doordashMenuPrice: [
      17.25, 12.75, 11.5, 13.5, 7.25, 15.75, 13.25, 19.25, 7.0, 4.25,
    ],
    grubhubMenuPrice: [
      16.5, 12.65, 11.35, 13.85, 7.35, 15.6, 12.85, 18.85, 7.1, 4.0,
    ],
    ubereatsAvailable: true,
    doordashAvailable: true,
    grubhubAvailable: true,
    cuisineType: "American",
    operatingHours: ["All Day"],
    restaurantImage: "/images/applebees/applebees-logo.png",
    menuItemImages: [
      "/images/applebees/bourbon_street_chicken_shrimp.jpg",
      "/images/applebees/bacon_cheeseburger.jpg",
      "/images/applebees/chicken_tenders_platter.jpg",
      "/images/applebees/fiesta_lime_chicken.jpg",
      "/images/applebees/mozzarella_sticks.jpg",
      "/images/applebees/mac_and_honey_pepper_chicken_tenders.jpg",
      "/images/applebees/oriental_chicken_salad.jpg",
      "/images/applebees/ribs.jpg",
      "/images/applebees/chocolate_meltdown.jpg",
      "/images/applebees/fries.jpg",
    ],
    websiteURL: "https://www.applebees.com/en",
  },
  {
    restaurantID: "12de45z",
    restaurantName: "Applebee's",
    restaurantAddress: "Applebee's, Tippecanoe Mall, 2415 Sagamore Pkwy S, Lafayette, IN 47905",
    distance: 2.5,
    menu: [
      "Bourbon Street Chicken & Shrimp",
      "Classic Bacon Cheeseburger",
      "Chicken Tenders Platter",
      "Fiesta Lime Chicken",
      "Mozzarella Sticks",
      "Four Cheese Mac & Cheese with Honey Pepper Chicken Tenders",
      "Oriental Chicken Salad",
      "Double - Glazed Baby Back Ribs",
      "Triple Chocolate Meltdown",
      "Classic Fries",
    ],
    menuOptions: [],
    menuDietaryViolations: [
      ["vegetarian", "vegan", "gluten-free", "dairy-free"], // Bourbon Street Chicken & Shrimp
      ["vegetarian", "vegan", "gluten-free", "dairy-free"], // Bacon Cheeseburger
      ["vegetarian", "vegan", "gluten-free", "dairy-free"], // Chicken Tenders
      ["vegetarian", "vegan", "gluten-free", "dairy-free"], // Fiesta Lime Chicken
      ["vegetarian", "vegan", "gluten-free", "dairy-free"], // Mozzarella Sticks
      ["vegetarian", "vegan", "gluten-free", "dairy-free"], // Mac & Cheese with Chicken Tenders
      ["vegetarian", "vegan", "gluten-free", "dairy-free"], // Oriental Chicken Salad
      ["vegetarian", "vegan", "gluten-free", "dairy-free"], // Baby Back Ribs
      ["vegan", "dairy-free", "gluten-free"], // Triple Chocolate Meltdown
      [], // Classic Fries
    ],
    ubereatsMenuPrice: [
      17.15, 12.45, 11.55, 13.55, 7.29, 15.85, 13.05, 19.1, 7.15, 4.1,
    ],
    doordashMenuPrice: [
      17.35, 12.65, 11.7, 13.85, 7.4, 15.95, 13.2, 19.45, 7.25, 4.25,
    ],
    grubhubMenuPrice: [
      16.95, 12.4, 11.4, 13.4, 7.1, 15.7, 12.9, 19.05, 7.0, 4.0,
    ],
    ubereatsAvailable: false,
    doordashAvailable: true,
    grubhubAvailable: true,
    cuisineType: "American",
    operatingHours: ["All Day"],
    restaurantImage: "/images/applebees/applebees-logo.png",
    menuItemImages: [
      "/images/applebees/bourbon_street_chicken_shrimp.jpg",
      "/images/applebees/bacon_cheeseburger.jpg",
      "/images/applebees/chicken_tenders_platter.jpg",
      "/images/applebees/fiesta_lime_chicken.jpg",
      "/images/applebees/mozzarella_sticks.jpg",
      "/images/applebees/mac_and_honey_pepper_chicken_tenders.jpg",
      "/images/applebees/oriental_chicken_salad.jpg",
      "/images/applebees/ribs.jpg",
      "/images/applebees/chocolate_meltdown.jpg",
      "/images/applebees/fries.jpg",
    ],
    websiteURL: "https://www.applebees.com/en",
  },
  {
    restaurantID: "45ef67y",
    restaurantName: "Applebee's",
    restaurantAddress: "Applebee's, 2432 E Wabash St, Frankfort, IN 46041",
    distance: 3.0,
    menu: [
      "Bourbon Street Chicken & Shrimp",
      "Classic Bacon Cheeseburger",
      "Chicken Tenders Platter",
      "Fiesta Lime Chicken",
      "Mozzarella Sticks",
      "Four Cheese Mac & Cheese with Honey Pepper Chicken Tenders",
      "Oriental Chicken Salad",
      "Double - Glazed Baby Back Ribs",
      "Triple Chocolate Meltdown",
      "Classic Fries",
    ],
    menuOptions: [],
    menuDietaryViolations: [
      ["vegetarian", "vegan", "gluten-free", "dairy-free"], // Bourbon Street Chicken & Shrimp
      ["vegetarian", "vegan", "gluten-free", "dairy-free"], // Bacon Cheeseburger
      ["vegetarian", "vegan", "gluten-free", "dairy-free"], // Chicken Tenders
      ["vegetarian", "vegan", "gluten-free", "dairy-free"], // Fiesta Lime Chicken
      ["vegetarian", "vegan", "gluten-free", "dairy-free"], // Mozzarella Sticks
      ["vegetarian", "vegan", "gluten-free", "dairy-free"], // Mac & Cheese with Chicken Tenders
      ["vegetarian", "vegan", "gluten-free", "dairy-free"], // Oriental Chicken Salad
      ["vegetarian", "vegan", "gluten-free", "dairy-free"], // Baby Back Ribs
      ["vegan", "dairy-free", "gluten-free"], // Triple Chocolate Meltdown
      [], // Classic Fries
    ],
    ubereatsMenuPrice: [
      17.05, 12.55, 11.4, 13.6, 7.35, 15.6, 12.8, 18.9, 7.05, 4.15,
    ],
    doordashMenuPrice: [
      17.45, 12.85, 11.7, 13.95, 7.45, 16.1, 13.1, 19.35, 7.15, 4.35,
    ],
    grubhubMenuPrice: [
      16.75, 12.65, 11.45, 13.65, 7.25, 15.75, 12.95, 19.0, 7.1, 4.05,
    ],
    ubereatsAvailable: true,
    doordashAvailable: false,
    grubhubAvailable: true,
    cuisineType: "American",
    operatingHours: ["All Day"],
    restaurantImage: "/images/applebees/applebees-logo.png",
    menuItemImages: [
      "/images/applebees/bourbon_street_chicken_shrimp.jpg",
      "/images/applebees/bacon_cheeseburger.jpg",
      "/images/applebees/chicken_tenders_platter.jpg",
      "/images/applebees/fiesta_lime_chicken.jpg",
      "/images/applebees/mozzarella_sticks.jpg",
      "/images/applebees/mac_and_honey_pepper_chicken_tenders.jpg",
      "/images/applebees/oriental_chicken_salad.jpg",
      "/images/applebees/ribs.jpg",
      "/images/applebees/chocolate_meltdown.jpg",
      "/images/applebees/fries.jpg",
    ],
    websiteURL: "https://www.applebees.com/en",
  },

  {
    restaurantID: "67gh89v",
    restaurantName: "Applebee's",
    restaurantAddress: "Applebee's, 1516 S Washington St, Crawfordsville, IN 47933",
    distance: 1.8,
    menu: [
      "Bourbon Street Chicken & Shrimp",
      "Classic Bacon Cheeseburger",
      "Chicken Tenders Platter",
      "Fiesta Lime Chicken",
      "Mozzarella Sticks",
      "Four Cheese Mac & Cheese with Honey Pepper Chicken Tenders",
      "Oriental Chicken Salad",
      "Double - Glazed Baby Back Ribs",
      "Triple Chocolate Meltdown",
      "Classic Fries",
    ],
    menuOptions: [],
    menuDietaryViolations: [
      ["vegetarian", "vegan", "gluten-free", "dairy-free"], // Bourbon Street Chicken & Shrimp
      ["vegetarian", "vegan", "gluten-free", "dairy-free"], // Bacon Cheeseburger
      ["vegetarian", "vegan", "gluten-free", "dairy-free"], // Chicken Tenders
      ["vegetarian", "vegan", "gluten-free", "dairy-free"], // Fiesta Lime Chicken
      ["vegetarian", "vegan", "gluten-free", "dairy-free"], // Mozzarella Sticks
      ["vegetarian", "vegan", "gluten-free", "dairy-free"], // Mac & Cheese with Chicken Tenders
      ["vegetarian", "vegan", "gluten-free", "dairy-free"], // Oriental Chicken Salad
      ["vegetarian", "vegan", "gluten-free", "dairy-free"], // Baby Back Ribs
      ["vegan", "dairy-free", "gluten-free"], // Triple Chocolate Meltdown
      [], // Classic Fries
    ],
    ubereatsMenuPrice: [
      16.85, 12.3, 11.65, 13.35, 7.3, 15.9, 13.0, 18.95, 7.25, 3.85,
    ],
    doordashMenuPrice: [
      17.2, 12.55, 11.55, 13.6, 7.5, 16.05, 13.15, 19.25, 7.3, 4.1,
    ],
    grubhubMenuPrice: [
      16.95, 12.4, 11.45, 13.45, 7.15, 15.85, 12.9, 19.05, 7.05, 3.9,
    ],
    ubereatsAvailable: true,
    doordashAvailable: true,
    grubhubAvailable: false,
    cuisineType: "American",
    operatingHours: ["All Day"],
    restaurantImage: "/images/applebees/applebees-logo.png",
    menuItemImages: [
      "/images/applebees/bourbon_street_chicken_shrimp.jpg",
      "/images/applebees/bacon_cheeseburger.jpg",
      "/images/applebees/chicken_tenders_platter.jpg",
      "/images/applebees/fiesta_lime_chicken.jpg",
      "/images/applebees/mozzarella_sticks.jpg",
      "/images/applebees/mac_and_honey_pepper_chicken_tenders.jpg",
      "/images/applebees/oriental_chicken_salad.jpg",
      "/images/applebees/ribs.jpg",
      "/images/applebees/chocolate_meltdown.jpg",
      "/images/applebees/fries.jpg",
    ],
    websiteURL: "https://www.applebees.com/en",
  },
  {
    restaurantID: "87ab12x",
    restaurantName: "Bistro Bella",
    restaurantAddress: "Bistro Bella, 44 Cesar E. Chavez Ave SW, Grand Rapids, MI 49503",
    distance: 2.0,
    menu: [
      "Grilled Salmon",
      "Pasta Primavera",
      "Beef Wellington",
      "Caesar Salad",
      "Bruschetta",
      "Clam Chowder",
      "Tiramisu",
      "Chocolate Fondant",
      "French Fries",
      "Espresso",
    ],
    menuOptions: [],
    menuDietaryViolations: [
      ["vegetarian", "vegan"], // Grilled Salmon
      ["vegan", "gluten-free", "dairy-free"], // Pasta Primavera
      ["vegetarian", "vegan", "gluten-free", "dairy-free"], // Beef Wellington
      ["vegan", "gluten-free", "dairy-free"], // Caesar Salad
      ["vegan", "gluten-free", "dairy-free"], // Bruschetta
      ["vegetarian", "vegan", "gluten-free", "dairy-free"], // Clam Chowder
      ["vegan", "gluten-free", "dairy-free"], // Tiramisu
      ["vegan", "gluten-free", "dairy-free"], // Chocolate Fondant
      [], // French Fries
      [], // Espresso
    ],
    ubereatsMenuPrice: [
      22.95, 16.5, 28.0, 11.25, 9.75, 7.95, 6.5, 8.25, 5.5, 3.0,
    ],
    doordashMenuPrice: [
      23.5, 16.75, 27.75, 11.5, 9.5, 7.85, 6.75, 8.5, 5.25, 3.1,
    ],
    grubhubMenuPrice: [22.7, 16.2, 28.3, 11.6, 9.8, 7.99, 6.45, 8.1, 5.6, 3.15],
    ubereatsAvailable: true,
    doordashAvailable: true,
    grubhubAvailable: false,
    cuisineType: "Italian",
    operatingHours: ["Breakfast", "Brunch", "Lunch"],
    restaurantImage: "/images/bistro_bella/bistro-bella-vita-logo.jpg",
    menuItemImages: [
      "/images/bistro_bella/grilled_salmon.png",
      "/images/bistro_bella/pasta_primavera.jpg",
      "/images/bistro_bella/beef_wellington.webp",
      "/images/bistro_bella/caesar_salad.jpg",
      "/images/bistro_bella/bruschetta.jpg",
      "/images/bistro_bella/clam_chowder.jpg",
      "/images/bistro_bella/tiramisu.jpg",
      "/images/bistro_bella/chocolate_fondant.jpg",
      "/images/bistro_bella/fries.png",
      "/images/bistro_bella/espresso.jpg",
    ],
    websiteURL: "https://bistrobellavita.com/",
  },

  {
    restaurantID: "91de34v",
    restaurantName: "Ripple & Company",
    restaurantAddress: "Ripple & Company, 1007 Main St, Lafayette, IN 47901",
    distance: 1.2,
    menu: [
      "Vegan Burger",
      "Quinoa Salad",
      "Vegan Nachos",
      "Tofu Stir - Fry",
      "Vegan Pizza",
      "Sweet Potato Fries",
      "Lentil Soup",
      "Avocado Toast",
      "Vegan Brownie",
      "Iced Matcha Latte",
    ],
    menuOptions: [],
    menuDietaryViolations: [
      ["gluten-free"], // Vegan Burger
      [], // Quinoa Salad
      [], // Vegan Nachos
      [], // Tofu Stir-Fry
      ["gluten-free"], // Vegan Pizza
      [], // Sweet Potato Fries
      [], // Lentil Soup
      ["gluten-free"], // Avocado Toast
      ["gluten-free", "nut-free"], // Vegan Brownie
      [], // Iced Matcha Latte
    ],
    ubereatsMenuPrice: [
      12.95, 10.5, 9.75, 13.25, 14.0, 5.95, 7.5, 8.95, 4.25, 6.75,
    ],
    doordashMenuPrice: [
      13.1, 10.6, 9.5, 13.5, 14.25, 6.1, 7.75, 9.25, 4.5, 6.95,
    ],
    grubhubMenuPrice: [
      12.85, 10.45, 9.8, 13.1, 14.1, 5.9, 7.35, 8.8, 4.35, 6.85,
    ],
    ubereatsAvailable: true,
    doordashAvailable: true,
    grubhubAvailable: true,
    cuisineType: "American",
    operatingHours: ["Breakfast", "Lunch", "Dinner"],
    restaurantImage: "/images/rippleAndCompany/RippleAndCompanylogo.png",
    menuItemImages: [
      "/images/rippleAndCompany/vegan_burger.webp",
      "/images/rippleAndCompany/quinoa-salad.jpg",
      "/images/rippleAndCompany/vegan_nachos.webp",
      "/images/rippleAndCompany/tofu_stirfry.jpg",
      "/images/rippleAndCompany/vegan-pizza.jpg",
      "/images/rippleAndCompany/baked-sweet-potato-fries-12.jpg",
      "/images/rippleAndCompany/lentil soup.jpg",
      "/images/rippleAndCompany/avocado-toast-hero-cropped.jpg",
      "/images/rippleAndCompany/vegan brownie.jpg",
      "/images/rippleAndCompany/iced-matcha-latte-hero.webp",
    ],
    websiteURL: "https://www.rippleandcompany.com/",
  },

  {
    restaurantID: "54cd67b",
    restaurantName: "Revolution Barbeque",
    restaurantAddress: "Revolution Barbeque, 721 Main St, Lafayette, IN 47901",
    distance: 0.8,
    menu: [
      "BBQ Pulled Pork Sandwich",
      "Roast Chicken",
      "Beef Brisket",
      "Cornbread",
      "House Salad",
      "Fried Green Tomatoes",
      "Mac and Cheese",
      "Apple Pie",
      "Sweet Tea",
      "Lemonade",
    ],
    menuOptions: [],
    menuDietaryViolations: [
      ["vegetarian", "vegan", "gluten-free"], // BBQ Pulled Pork Sandwich
      ["vegetarian", "vegan"], // Roast Chicken
      ["vegetarian", "vegan"], // Beef Brisket
      ["gluten-free", "dairy-free"], // Cornbread
      [], // House Salad
      ["gluten-free"], // Fried Green Tomatoes
      ["vegan", "gluten-free", "dairy-free"], // Mac and Cheese
      ["vegan", "gluten-free", "dairy-free"], // Apple Pie
      [], // Sweet Tea
      [], // Lemonade
    ],
    ubereatsMenuPrice: [
      10.95, 17.5, 18.95, 4.5, 6.95, 7.25, 8.5, 5.75, 2.95, 3.5,
    ],
    doordashMenuPrice: [
      11.25, 17.35, 19.1, 4.75, 6.8, 7.5, 8.6, 5.65, 2.9, 3.75,
    ],
    grubhubMenuPrice: [
      10.85, 17.2, 18.85, 4.4, 6.7, 7.35, 8.7, 5.8, 3.05, 3.65,
    ],
    ubereatsAvailable: true,
    doordashAvailable: false,
    grubhubAvailable: true,
    cuisineType: "American",
    operatingHours: ["Breakfast", "Dinner"],
    restaurantImage: "/images/revolution_bbq/revolution_bbq.png",
    menuItemImages: [
      "/images/revolution_bbq/bbq_pulled_pork.jpg",
      "/images/revolution_bbq/roast-chicken.avif",
      "/images/revolution_bbq/beef-brisket-20.jpg",
      "/images/revolution_bbq/cornbread.jpg",
      "/images/revolution_bbq/house_salad.jpg",
      "/images/revolution_bbq/Fried-Green-Tomatoes.jpeg",
      "/images/revolution_bbq/mac_cheese.jpg",
      "/images/revolution_bbq/apple-pie.jpg",
      "/images/revolution_bbq/sweet-tea.webp",
      "/images/revolution_bbq/lemonade.jpg",
    ],
    websiteURL: "https://www.revolution-bbq.com/",
  },
  {
    restaurantID: "54gh78b",
    restaurantName: "Olive Garden",
    restaurantAddress: "Olive Garden, 4151 South St, Lafayette, IN 47905",
    distance: 0.9,
    menu: [
      "Spaghetti Bolognese",
      "Fettuccine Alfredo",
      "Lasagna",
      "Penne Arrabbiata",
      "Garlic Bread",
      "Caesar Salad",
      "Minestrone Soup",
      "Tiramisu",
      "Cannoli",
      "Espresso",
    ],
    menuOptions: [],
    menuDietaryViolations: [
      ["vegetarian", "vegan", "gluten-free", "dairy-free"], // Spaghetti Bolognese
      ["vegan", "gluten-free", "dairy-free"], // Fettuccine Alfredo
      ["vegetarian", "vegan", "gluten-free", "dairy-free"], // Lasagna
      ["vegan", "gluten-free", "dairy-free"], // Penne Arrabbiata
      ["vegan", "gluten-free", "dairy-free"], // Garlic Bread
      ["vegan", "gluten-free", "dairy-free"], // Caesar Salad
      [], // Minestrone Soup
      ["vegan", "gluten-free", "dairy-free"], // Tiramisu
      ["vegan", "gluten-free", "dairy-free"], // Cannoli
      [], // Espresso
    ],
    ubereatsMenuPrice: [
      13.5, 12.25, 14.0, 11.75, 3.5, 6.95, 5.5, 7.25, 5.95, 3.25,
    ],
    doordashMenuPrice: [
      13.75, 12.5, 14.25, 11.95, 3.25, 7.1, 5.65, 7.5, 6.05, 3.35,
    ],
    grubhubMenuPrice: [13.3, 12.15, 13.85, 11.6, 3.4, 6.8, 5.4, 7.15, 5.8, 3.2],
    ubereatsAvailable: true,
    doordashAvailable: true,
    grubhubAvailable: false,
    cuisineType: "Italian",
    operatingHours: ["Breakfast", "Brunch", "Lunch", "Dinner"],
    restaurantImage: "/images/olive_garden/olive_garden_logo_hr.webp",
    menuItemImages: [
      "/images/olive_garden/spaghetti-bolog.avif",
      "/images/olive_garden/fettuccine.jpg",
      "/images/olive_garden/lasagna.jpg",
      "/images/olive_garden/penne-arrabbiata-with-chickpeas2.jpg",
      "/images/olive_garden/19192garlic_bread.avif",
      "/images/olive_garden/caesarsalad.jpg",
      "/images/olive_garden/minestrone.webp",
      "/images/olive_garden/tiramisu.webp",
      "/images/olive_garden/cannoli.jpg",
      "/images/olive_garden/espresso-pastahouse.webp",
    ],
    websiteURL: "https://www.olivegarden.com/home",
  },
  {
    restaurantID: "39kl91q",
    restaurantName: "Nom Nom Tacos",
    restaurantAddress: "Nom Nom Tacos, 102 N 3rd St, Lafayette, IN 47901",
    distance: 1.5,
    menu: [
      "Taco",
      "Burrito",
      "Quesadilla",
      "Nachos",
      "Guacamole",
      "Churros",
      "Fajitas",
      "Tortilla Soup",
      "Mexican Rice",
      "Horchata",
    ],
    menuOptions: [],
    menuDietaryViolations: [
      ["vegetarian", "vegan", "gluten-free", "dairy-free"], // Taco
      ["vegetarian", "vegan", "gluten-free", "dairy-free"], // Burrito
      ["vegan", "gluten-free", "dairy-free"], // Quesadilla
      ["vegetarian", "vegan", "dairy-free"], // Nachos
      [], // Guacamole
      ["vegan", "gluten-free", "dairy-free"], // Churros
      ["vegetarian", "vegan", "gluten-free", "dairy-free"], // Fajitas
      ["vegetarian", "vegan", "gluten-free", "dairy-free"], // Tortilla Soup
      [], // Mexican Rice
      ["vegan", "dairy-free"], // Horchata
    ],
    ubereatsMenuPrice: [
      3.95, 8.25, 7.75, 6.5, 4.95, 3.25, 11.5, 5.95, 3.5, 2.75,
    ],
    doordashMenuPrice: [4.1, 8.5, 8.0, 6.75, 5.1, 3.45, 11.75, 6.1, 3.65, 2.85],
    grubhubMenuPrice: [3.85, 8.15, 7.5, 6.4, 4.85, 3.3, 11.4, 5.85, 3.45, 2.7],
    ubereatsAvailable: true,
    doordashAvailable: true,
    grubhubAvailable: true,
    cuisineType: "Mexican",
    operatingHours: ["Breakfast", "Brunch", "Dinner"],
    restaurantImage: "/images/nom_nom/nom_nom_logo.avif",
    menuItemImages: [
      "/images/nom_nom/taco.webp",
      "/images/nom_nom/burrito.webp",
      "/images/nom_nom/Quesadilla.jpg",
      "/images/nom_nom/nachos.webp",
      "/images/nom_nom/guac.webp",
      "/images/nom_nom/churros.jpg",
      "/images/nom_nom/fajitas.webp",
      "/images/nom_nom/tortilla-soup.jpg",
      "/images/nom_nom/mexican_rice.jpg",
      "/images/nom_nom/horchata-6.jpg",
    ],
    websiteURL: "https://nomnomtacosandtequila.com/",
  },

  //NEW DATA
  {
    restaurantID: "a1b2c3d",
    restaurantName: "Wendy's",
    restaurantAddress: "Wendy's, 252 E State St, West Lafayette, IN 47906",
    distance: 0.7,
    menu: [
      "Dave's Single",
      "Spicy Chicken Sandwich",
      "Baconator",
      "Nuggets",
      "Frosty",
      "Fries",
      "Chili",
      "Baked Potato",
      "Garden Salad",
      "Homestyle Chicken Sandwich"
    ],
    menuOptions: [],
    menuDietaryViolations: [
      ["vegetarian", "vegan", "gluten-free", "dairy-free"], // Dave's Single
      ["vegetarian", "vegan", "gluten-free", "dairy-free"], // Spicy Chicken Sandwich
      ["vegetarian", "vegan", "gluten-free", "dairy-free"], // Baconator
      ["vegetarian", "vegan", "gluten-free", "dairy-free"], // Nuggets
      ["vegan", "dairy-free"], // Frosty
      [], // Fries
      ["vegetarian", "vegan"], // Chili (contains meat)
      [], // Baked Potato (can be customized)
      [], // Garden Salad (depends on dressing)
      ["vegetarian", "vegan", "gluten-free", "dairy-free"], // Homestyle Chicken Sandwich
    ],
    ubereatsMenuPrice: [5.49, 5.99, 6.99, 4.49, 1.99, 2.19, 2.99, 3.49, 4.99, 5.59],
    doordashMenuPrice: [5.69, 5.89, 7.19, 4.39, 1.89, 2.29, 2.89, 3.39, 4.89, 5.49],
    grubhubMenuPrice: [5.59, 6.09, 7.09, 4.59, 1.79, 2.09, 2.79, 3.29, 4.79, 5.69],
    ubereatsAvailable: true,
    doordashAvailable: true,
    grubhubAvailable: false,
    cuisineType: "American",
    operatingHours: ["All Day"],
    restaurantImage: "/images/wendys/wendys-logo.png",
    menuItemImages: [
      "/images/wendys/daves_single.jpg",
      "/images/wendys/spicy_chicken_sandwich.jpg",
      "/images/wendys/baconator.jpg",
      "/images/wendys/nuggets.jpg",
      "/images/wendys/frosty.jpg",
      "/images/wendys/fries.jpg",
      "/images/wendys/chili.jpg",
      "/images/wendys/baked_potato.jpg",
      "/images/wendys/garden_salad.jpg",
      "/images/wendys/homestyle_chicken_sandwich.jpg"
    ],
    websiteURL: "https://www.wendys.com/",
  },
  {
    restaurantID: "e4f5g6h",
    restaurantName: "Wendy's",
    restaurantAddress: "Wendy's, 701 Sagamore Pk, West Lafayette, IN 47906",
    distance: 1.2,
    menu: [
      "Dave's Single",
      "Spicy Chicken Sandwich",
      "Baconator",
      "Nuggets",
      "Frosty",
      "Fries",
      "Chili",
      "Baked Potato",
      "Garden Salad",
      "Homestyle Chicken Sandwich"
    ],
    menuOptions: [],
    menuDietaryViolations: [
      ["vegetarian", "vegan", "gluten-free", "dairy-free"], // Dave's Single
      ["vegetarian", "vegan", "gluten-free", "dairy-free"], // Spicy Chicken Sandwich
      ["vegetarian", "vegan", "gluten-free", "dairy-free"], // Baconator
      ["vegetarian", "vegan", "gluten-free", "dairy-free"], // Nuggets
      ["vegan", "dairy-free"], // Frosty
      [], // Fries
      ["vegetarian", "vegan"], // Chili (contains meat)
      [], // Baked Potato (can be customized)
      [], // Garden Salad (depends on dressing)
      ["vegetarian", "vegan", "gluten-free", "dairy-free"], // Homestyle Chicken Sandwich
    ],
    ubereatsMenuPrice: [5.59, 6.09, 7.09, 4.59, 2.09, 2.29, 3.09, 3.59, 5.09, 5.69],
    doordashMenuPrice: [5.79, 5.99, 7.29, 4.49, 1.99, 2.39, 2.99, 3.49, 4.99, 5.59],
    grubhubMenuPrice: [5.69, 6.19, 7.19, 4.69, 1.89, 2.19, 2.89, 3.39, 4.89, 5.79],
    ubereatsAvailable: false,
    doordashAvailable: true,
    grubhubAvailable: true,
    cuisineType: "American",
    operatingHours: ["All Day"],
    restaurantImage: "/images/wendys/wendys-logo.png",
    menuItemImages: [
      "/images/wendys/daves_single.jpg",
      "/images/wendys/spicy_chicken_sandwich.jpg",
      "/images/wendys/baconator.jpg",
      "/images/wendys/nuggets.jpg",
      "/images/wendys/frosty.jpg",
      "/images/wendys/fries.jpg",
      "/images/wendys/chili.jpg",
      "/images/wendys/baked_potato.jpg",
      "/images/wendys/garden_salad.jpg",
      "/images/wendys/homestyle_chicken_sandwich.jpg"
    ],
    websiteURL: "https://www.wendys.com/",
  },
  {
    restaurantID: "i7j8k9l",
    restaurantName: "Wendy's",
    restaurantAddress: "Wendy's, 1201 Teal Rd, Lafayette, IN 47905",
    distance: 2.0,
    menu: [
      "Dave's Single",
      "Spicy Chicken Sandwich",
      "Baconator",
      "Nuggets",
      "Frosty",
      "Fries",
      "Chili",
      "Baked Potato",
      "Garden Salad",
      "Homestyle Chicken Sandwich"
    ],
    menuOptions: [],
    menuDietaryViolations: [
      ["vegetarian", "vegan", "gluten-free", "dairy-free"], // Dave's Single
      ["vegetarian", "vegan", "gluten-free", "dairy-free"], // Spicy Chicken Sandwich
      ["vegetarian", "vegan", "gluten-free", "dairy-free"], // Baconator
      ["vegetarian", "vegan", "gluten-free", "dairy-free"], // Nuggets
      ["vegan", "dairy-free"], // Frosty
      [], // Fries
      ["vegetarian", "vegan"], // Chili (contains meat)
      [], // Baked Potato (can be customized)
      [], // Garden Salad (depends on dressing)
      ["vegetarian", "vegan", "gluten-free", "dairy-free"], // Homestyle Chicken Sandwich
    ],
    ubereatsMenuPrice: [5.39, 5.89, 6.89, 4.39, 1.89, 2.09, 2.89, 3.39, 4.89, 5.49],
    doordashMenuPrice: [5.49, 5.79, 7.09, 4.29, 1.79, 2.19, 2.79, 3.29, 4.79, 5.39],
    grubhubMenuPrice: [5.29, 5.99, 6.99, 4.49, 1.69, 1.99, 2.69, 3.19, 4.69, 5.59],
    ubereatsAvailable: true,
    doordashAvailable: false,
    grubhubAvailable: true,
    cuisineType: "American",
    operatingHours: ["All Day"],
    restaurantImage: "/images/wendys/wendys-logo.png",
    menuItemImages: [
      "/images/wendys/daves_single.jpg",
      "/images/wendys/spicy_chicken_sandwich.jpg",
      "/images/wendys/baconator.jpg",
      "/images/wendys/nuggets.jpg",
      "/images/wendys/frosty.jpg",
      "/images/wendys/fries.jpg",
      "/images/wendys/chili.jpg",
      "/images/wendys/baked_potato.jpg",
      "/images/wendys/garden_salad.jpg",
      "/images/wendys/homestyle_chicken_sandwich.jpg"
    ],
    websiteURL: "https://www.wendys.com/",
  },
  {
    restaurantID: "m0n1o2p",
    restaurantName: "Wendy's",
    restaurantAddress: "Wendy's, 3621 State Rte 38, Lafayette, IN 47905",
    distance: 2.8,
    menu: [
      "Dave's Single",
      "Spicy Chicken Sandwich",
      "Baconator",
      "Nuggets",
      "Frosty",
      "Fries",
      "Chili",
      "Baked Potato",
      "Garden Salad",
      "Homestyle Chicken Sandwich"
    ],
    menuOptions: [],
    menuDietaryViolations: [
      ["vegetarian", "vegan", "gluten-free", "dairy-free"], // Dave's Single
      ["vegetarian", "vegan", "gluten-free", "dairy-free"], // Spicy Chicken Sandwich
      ["vegetarian", "vegan", "gluten-free", "dairy-free"], // Baconator
      ["vegetarian", "vegan", "gluten-free", "dairy-free"], // Nuggets
      ["vegan", "dairy-free"], // Frosty
      [], // Fries
      ["vegetarian", "vegan"], // Chili (contains meat)
      [], // Baked Potato (can be customized)
      [], // Garden Salad (depends on dressing)
      ["vegetarian", "vegan", "gluten-free", "dairy-free"], // Homestyle Chicken Sandwich
    ],
    ubereatsMenuPrice: [5.69, 6.19, 7.19, 4.69, 2.19, 2.39, 3.19, 3.69, 5.19, 5.79],
    doordashMenuPrice: [5.59, 6.09, 7.29, 4.59, 2.09, 2.49, 3.09, 3.59, 5.09, 5.69],
    grubhubMenuPrice: [5.79, 6.29, 7.09, 4.79, 1.99, 2.29, 2.99, 3.49, 4.99, 5.89],
    ubereatsAvailable: true,
    doordashAvailable: true,
    grubhubAvailable: false,
    cuisineType: "American",
    operatingHours: ["All Day"],
    restaurantImage: "/images/wendys/wendys-logo.png",
    menuItemImages: [
      "/images/wendys/daves_single.jpg",
      "/images/wendys/spicy_chicken_sandwich.jpg",
      "/images/wendys/baconator.jpg",
      "/images/wendys/nuggets.jpg",
      "/images/wendys/frosty.jpg",
      "/images/wendys/fries.jpg",
      "/images/wendys/chili.jpg",
      "/images/wendys/baked_potato.jpg",
      "/images/wendys/garden_salad.jpg",
      "/images/wendys/homestyle_chicken_sandwich.jpg"
    ],
    websiteURL: "https://www.wendys.com/",
  },
  {
    restaurantID: "q3r4s5t",
    restaurantName: "Popeyes",
    restaurantAddress: "Popeyes, 3836 South St, Lafayette, IN 47905",
    distance: 0.9,
    menu: [
      "Chicken Sandwich",
      "Spicy Chicken Sandwich",
      "Chicken Tenders",
      "Popcorn Shrimp",
      "Cajun Fries",
      "Red Beans & Rice",
      "Biscuits",
      "Mashed Potatoes with Gravy",
      "Coleslaw",
      "Apple Pie"
    ],
    menuOptions: [],
    menuDietaryViolations: [
      ["vegetarian", "vegan", "gluten-free", "dairy-free"], // Chicken Sandwich
      ["vegetarian", "vegan", "gluten-free", "dairy-free"], // Spicy Chicken Sandwich
      ["vegetarian", "vegan", "gluten-free", "dairy-free"], // Chicken Tenders
      ["vegetarian", "vegan", "gluten-free", "dairy-free"], // Popcorn Shrimp
      [], // Cajun Fries
      ["vegetarian", "vegan"], // Red Beans & Rice (may contain pork)
      ["vegan", "dairy-free"], // Biscuits (contain dairy)
      ["vegan", "dairy-free"], // Mashed Potatoes with Gravy
      [], // Coleslaw (check for dairy)
      ["vegan", "dairy-free", "gluten-free"], // Apple Pie
    ],
    ubereatsMenuPrice: [3.99, 4.19, 5.49, 6.99, 2.49, 2.69, 0.99, 2.99, 1.89, 1.59],
    doordashMenuPrice: [4.09, 4.29, 5.59, 7.09, 2.39, 2.79, 1.09, 2.89, 1.79, 1.69],
    grubhubMenuPrice: [3.89, 4.39, 5.69, 6.89, 2.29, 2.59, 0.89, 2.79, 1.99, 1.49],
    ubereatsAvailable: true,
    doordashAvailable: false,
    grubhubAvailable: true,
    cuisineType: "American",
    operatingHours: ["All Day"],
    restaurantImage: "/images/popeyes/popeyes-logo.png",
    menuItemImages: [
      "/images/popeyes/chicken_sandwich.jpg",
      "/images/popeyes/pop_spicy_chicken_sandwich.jpg",
      "/images/popeyes/chicken_tenders.jpg",
      "/images/popeyes/popcorn_shrimp.jpg",
      "/images/popeyes/cajun_fries.jpg",
      "/images/popeyes/red_beans_rice.jpg",
      "/images/popeyes/biscuits.jpg",
      "/images/popeyes/mashed_potatoes.jpg",
      "/images/popeyes/coleslaw.jpg",
      "/images/popeyes/apple_pie.jpg"
    ],
    websiteURL: "https://www.popeyes.com/",
  },
  {
    restaurantID: "u6v7w8x",
    restaurantName: "Popeyes",
    restaurantAddress: "Popeyes, 5930 Whitestown Pkwy, Whitestown, IN 46075",
    distance: 1.5,
    menu: [
      "Chicken Sandwich",
      "Spicy Chicken Sandwich",
      "Chicken Tenders",
      "Popcorn Shrimp",
      "Cajun Fries",
      "Red Beans & Rice",
      "Biscuits",
      "Mashed Potatoes with Gravy",
      "Coleslaw",
      "Apple Pie"
    ],
    menuOptions: [],
    menuDietaryViolations: [
      ["vegetarian", "vegan", "gluten-free", "dairy-free"], // Chicken Sandwich
      ["vegetarian", "vegan", "gluten-free", "dairy-free"], // Spicy Chicken Sandwich
      ["vegetarian", "vegan", "gluten-free", "dairy-free"], // Chicken Tenders
      ["vegetarian", "vegan", "gluten-free", "dairy-free"], // Popcorn Shrimp
      [], // Cajun Fries
      ["vegetarian", "vegan"], // Red Beans & Rice (may contain pork)
      ["vegan", "dairy-free"], // Biscuits (contain dairy)
      ["vegan", "dairy-free"], // Mashed Potatoes with Gravy
      [], // Coleslaw (check for dairy)
      ["vegan", "dairy-free", "gluten-free"], // Apple Pie
    ],
    ubereatsMenuPrice: [4.09, 4.29, 5.69, 7.09, 2.59, 2.79, 1.09, 3.09, 1.99, 1.69],
    doordashMenuPrice: [3.99, 4.19, 5.49, 6.99, 2.49, 2.69, 0.99, 2.99, 1.89, 1.59],
    grubhubMenuPrice: [4.19, 4.39, 5.79, 7.19, 2.69, 2.89, 1.19, 3.19, 2.09, 1.79],
    ubereatsAvailable: false,
    doordashAvailable: true,
    grubhubAvailable: true,
    cuisineType: "American",
    operatingHours: ["All Day"],
    restaurantImage: "/images/popeyes/popeyes-logo.png",
    menuItemImages: [
      "/images/popeyes/chicken_sandwich.jpg",
      "/images/popeyes/pop_spicy_chicken_sandwich.jpg",
      "/images/popeyes/chicken_tenders.jpg",
      "/images/popeyes/popcorn_shrimp.jpg",
      "/images/popeyes/cajun_fries.jpg",
      "/images/popeyes/red_beans_rice.jpg",
      "/images/popeyes/biscuits.jpg",
      "/images/popeyes/mashed_potatoes.jpg",
      "/images/popeyes/coleslaw.jpg",
      "/images/popeyes/apple_pie.jpg"
    ],
    websiteURL: "https://www.popeyes.com/",
  },
  {
    restaurantID: "y9z0a1b",
    restaurantName: "Popeyes",
    restaurantAddress: "Popeyes, 3131 Sachem Ct N, West Lafayette, IN 47906",
    distance: 2.3,
    menu: [
      "Chicken Sandwich",
      "Spicy Chicken Sandwich",
      "Chicken Tenders",
      "Popcorn Shrimp",
      "Cajun Fries",
      "Red Beans & Rice",
      "Biscuits",
      "Mashed Potatoes with Gravy",
      "Coleslaw",
      "Apple Pie"
    ],
    menuOptions: [],
    menuDietaryViolations: [
      ["vegetarian", "vegan", "gluten-free", "dairy-free"], // Chicken Sandwich
      ["vegetarian", "vegan", "gluten-free", "dairy-free"], // Spicy Chicken Sandwich
      ["vegetarian", "vegan", "gluten-free", "dairy-free"], // Chicken Tenders
      ["vegetarian", "vegan", "gluten-free", "dairy-free"], // Popcorn Shrimp
      [], // Cajun Fries
      ["vegetarian", "vegan"], // Red Beans & Rice (may contain pork)
      ["vegan", "dairy-free"], // Biscuits (contain dairy)
      ["vegan", "dairy-free"], // Mashed Potatoes with Gravy
      [], // Coleslaw (check for dairy)
      ["vegan", "dairy-free", "gluten-free"], // Apple Pie
    ],
    ubereatsMenuPrice: [4.19, 4.39, 5.79, 7.19, 2.69, 2.89, 1.19, 3.19, 2.09, 1.79],
    doordashMenuPrice: [4.29, 4.49, 5.89, 7.29, 2.79, 2.99, 1.29, 3.29, 2.19, 1.89],
    grubhubMenuPrice: [4.09, 4.59, 5.99, 7.09, 2.59, 2.79, 1.09, 3.09, 1.99, 1.99],
    ubereatsAvailable: true,
    doordashAvailable: true,
    grubhubAvailable: false,
    cuisineType: "American",
    operatingHours: ["All Day"],
    restaurantImage: "/images/popeyes/popeyes-logo.png",
    menuItemImages: [
      "/images/popeyes/chicken_sandwich.jpg",
      "/images/popeyes/pop_spicy_chicken_sandwich.jpg",
      "/images/popeyes/chicken_tenders.jpg",
      "/images/popeyes/popcorn_shrimp.jpg",
      "/images/popeyes/cajun_fries.jpg",
      "/images/popeyes/red_beans_rice.jpg",
      "/images/popeyes/biscuits.jpg",
      "/images/popeyes/mashed_potatoes.jpg",
      "/images/popeyes/coleslaw.jpg",
      "/images/popeyes/apple_pie.jpg"
    ],
    websiteURL: "https://www.popeyes.com/",
  },
  {
    restaurantID: "c2d3e4f",
    restaurantName: "Popeyes",
    restaurantAddress: "Popeyes, 1705 E Markland Ave, Kokomo, IN 46901",
    distance: 3.1,
    menu: [
      "Chicken Sandwich",
      "Spicy Chicken Sandwich",
      "Chicken Tenders",
      "Popcorn Shrimp",
      "Cajun Fries",
      "Red Beans & Rice",
      "Biscuits",
      "Mashed Potatoes with Gravy",
      "Coleslaw",
      "Apple Pie"
    ],
    menuOptions: [],
    menuDietaryViolations: [
      ["vegetarian", "vegan", "gluten-free", "dairy-free"], // Chicken Sandwich
      ["vegetarian", "vegan", "gluten-free", "dairy-free"], // Spicy Chicken Sandwich
      ["vegetarian", "vegan", "gluten-free", "dairy-free"], // Chicken Tenders
      ["vegetarian", "vegan", "gluten-free", "dairy-free"], // Popcorn Shrimp
      [], // Cajun Fries
      ["vegetarian", "vegan"], // Red Beans & Rice (may contain pork)
      ["vegan", "dairy-free"], // Biscuits (contain dairy)
      ["vegan", "dairy-free"], // Mashed Potatoes with Gravy
      [], // Coleslaw (check for dairy)
      ["vegan", "dairy-free", "gluten-free"], // Apple Pie
    ],
    ubereatsMenuPrice: [4.29, 4.49, 5.89, 7.29, 2.79, 2.99, 1.29, 3.29, 2.19, 1.89],
    doordashMenuPrice: [4.19, 4.39, 5.79, 7.19, 2.69, 2.89, 1.19, 3.19, 2.09, 1.79],
    grubhubMenuPrice: [4.39, 4.59, 5.99, 7.39, 2.89, 3.09, 1.39, 3.39, 2.29, 1.99],
    ubereatsAvailable: true,
    doordashAvailable: false,
    grubhubAvailable: true,
    cuisineType: "American",
    operatingHours: ["All Day"],
    restaurantImage: "/images/popeyes/popeyes-logo.png",
    menuItemImages: [
      "/images/popeyes/chicken_sandwich.jpg",
      "/images/popeyes/pop_spicy_chicken_sandwich.jpg",
      "/images/popeyes/chicken_tenders.jpg",
      "/images/popeyes/popcorn_shrimp.jpg",
      "/images/popeyes/cajun_fries.jpg",
      "/images/popeyes/red_beans_rice.jpg",
      "/images/popeyes/biscuits.jpg",
      "/images/popeyes/mashed_potatoes.jpg",
      "/images/popeyes/coleslaw.jpg",
      "/images/popeyes/apple_pie.jpg"
    ],
    websiteURL: "https://www.popeyes.com/",
  },
  {
    restaurantID: "g5h6i7j",
    restaurantName: "Pizza Hut",
    restaurantAddress: "Pizza Hut, 100 Farabee Dr N, Lafayette, IN 47905",
    distance: 0.6,
    menu: [
      "Pepperoni Pizza",
      "Cheese Pizza",
      "Supreme Pizza",
      "Meat Lover's Pizza",
      "Veggie Lover's Pizza",
      "Breadsticks",
      "Wings",
      "Pasta",
      "Salad",
      "Cinnamon Sticks"
    ],
    menuOptions: [],
    menuDietaryViolations: [
      ["vegetarian", "vegan", "gluten-free", "dairy-free"], // Pepperoni Pizza
      ["vegan", "gluten-free", "dairy-free"], // Cheese Pizza
      ["vegetarian", "vegan", "gluten-free", "dairy-free"], // Supreme Pizza
      ["vegetarian", "vegan", "gluten-free", "dairy-free"], // Meat Lover's Pizza
      ["vegan", "gluten-free", "dairy-free"], // Veggie Lover's Pizza
      ["vegan", "gluten-free", "dairy-free"], // Breadsticks
      ["vegetarian", "vegan", "gluten-free", "dairy-free"], // Wings
      ["vegan", "gluten-free", "dairy-free"], // Pasta
      [], // Salad (depends on dressing and toppings)
      ["vegan", "gluten-free", "dairy-free"], // Cinnamon Sticks
    ],
    ubereatsMenuPrice: [12.99, 11.99, 14.99, 15.99, 13.99, 5.99, 8.99, 9.99, 4.99, 5.49],
    doordashMenuPrice: [13.49, 12.49, 15.49, 16.49, 14.49, 6.49, 9.49, 10.49, 5.49, 5.99],
    grubhubMenuPrice: [12.49, 11.49, 14.49, 15.49, 13.49, 5.49, 8.49, 9.49, 4.49, 4.99],
    ubereatsAvailable: true,
    doordashAvailable: true,
    grubhubAvailable: false,
    cuisineType: "Italian",
    operatingHours: ["All Day"],
    restaurantImage: "/images/pizzahut/pizzahut-logo.png",
    menuItemImages: [
      "/images/pizzahut/pepperoni_pizza.jpg",
      "/images/pizzahut/cheese_pizza.jpg",
      "/images/pizzahut/supreme_pizza.jpg",
      "/images/pizzahut/meat_lovers_pizza.jpg",
      "/images/pizzahut/veggie_lovers_pizza.jpg",
      "/images/pizzahut/breadsticks.jpg",
      "/images/pizzahut/wings.jpg",
      "/images/pizzahut/pasta.jpg",
      "/images/pizzahut/salad.jpg",
      "/images/pizzahut/cinnamon_sticks.jpg"
    ],
    websiteURL: "https://www.pizzahut.com/",
  },
  {
    restaurantID: "k8l9m0n",
    restaurantName: "Pizza Hut",
    restaurantAddress: "Pizza Hut, 506 Sagamore Pkwy W, West Lafayette, IN 47906",
    distance: 1.4,
    menu: [
      "Pepperoni Pizza",
      "Cheese Pizza",
      "Supreme Pizza",
      "Meat Lover's Pizza",
      "Veggie Lover's Pizza",
      "Breadsticks",
      "Wings",
      "Pasta",
      "Salad",
      "Cinnamon Sticks"
    ],
    menuOptions: [],
    menuDietaryViolations: [
      ["vegetarian", "vegan", "gluten-free", "dairy-free"], // Pepperoni Pizza
      ["vegan", "gluten-free", "dairy-free"], // Cheese Pizza
      ["vegetarian", "vegan", "gluten-free", "dairy-free"], // Supreme Pizza
      ["vegetarian", "vegan", "gluten-free", "dairy-free"], // Meat Lover's Pizza
      ["vegan", "gluten-free", "dairy-free"], // Veggie Lover's Pizza
      ["vegan", "gluten-free", "dairy-free"], // Breadsticks
      ["vegetarian", "vegan", "gluten-free", "dairy-free"], // Wings
      ["vegan", "gluten-free", "dairy-free"], // Pasta
      [], // Salad (depends on dressing and toppings)
      ["vegan", "gluten-free", "dairy-free"], // Cinnamon Sticks
    ],
    ubereatsMenuPrice: [13.09, 12.09, 15.09, 16.09, 14.09, 6.09, 9.09, 10.09, 5.09, 5.59],
    doordashMenuPrice: [12.99, 11.99, 14.99, 15.99, 13.99, 5.99, 8.99, 9.99, 4.99, 5.49],
    grubhubMenuPrice: [13.19, 12.19, 15.19, 16.19, 14.19, 6.19, 9.19, 10.19, 5.19, 5.69],
    ubereatsAvailable: false,
    doordashAvailable: true,
    grubhubAvailable: true,
    cuisineType: "Italian",
    operatingHours: ["All Day"],
    restaurantImage: "/images/pizzahut/pizzahut-logo.png",
    menuItemImages: [
      "/images/pizzahut/pepperoni_pizza.jpg",
      "/images/pizzahut/cheese_pizza.jpg",
      "/images/pizzahut/supreme_pizza.jpg",
      "/images/pizzahut/meat_lovers_pizza.jpg",
      "/images/pizzahut/veggie_lovers_pizza.jpg",
      "/images/pizzahut/breadsticks.jpg",
      "/images/pizzahut/wings.jpg",
      "/images/pizzahut/pasta.jpg",
      "/images/pizzahut/salad.jpg",
      "/images/pizzahut/cinnamon_sticks.jpg"
    ],
    websiteURL: "https://www.pizzahut.com/",
  },
  {
    restaurantID: "o1p2q3r",
    restaurantName: "Pizza Hut",
    restaurantAddress: "Pizza Hut, 35 Beck Ln, Lafayette, IN 47909",
    distance: 2.5,
    menu: [
      "Pepperoni Pizza",
      "Cheese Pizza",
      "Supreme Pizza",
      "Meat Lover's Pizza",
      "Veggie Lover's Pizza",
      "Breadsticks",
      "Wings",
      "Pasta",
      "Salad",
      "Cinnamon Sticks"
    ],
    menuOptions: [],
    menuDietaryViolations: [
      ["vegetarian", "vegan", "gluten-free", "dairy-free"], // Pepperoni Pizza
      ["vegan", "gluten-free", "dairy-free"], // Cheese Pizza
      ["vegetarian", "vegan", "gluten-free", "dairy-free"], // Supreme Pizza
      ["vegetarian", "vegan", "gluten-free", "dairy-free"], // Meat Lover's Pizza
      ["vegan", "gluten-free", "dairy-free"], // Veggie Lover's Pizza
      ["vegan", "gluten-free", "dairy-free"], // Breadsticks
      ["vegetarian", "vegan", "gluten-free", "dairy-free"], // Wings
      ["vegan", "gluten-free", "dairy-free"], // Pasta
      [], // Salad (depends on dressing and toppings)
      ["vegan", "gluten-free", "dairy-free"], // Cinnamon Sticks
    ],
    ubereatsMenuPrice: [12.89, 11.89, 14.89, 15.89, 13.89, 5.89, 8.89, 9.89, 4.89, 5.39],
    doordashMenuPrice: [13.09, 12.09, 15.09, 16.09, 14.09, 6.09, 9.09, 10.09, 5.09, 5.59],
    grubhubMenuPrice: [12.79, 11.79, 14.79, 15.79, 13.79, 5.79, 8.79, 9.79, 4.79, 5.29],
    ubereatsAvailable: true,
    doordashAvailable: false,
    grubhubAvailable: true,
    cuisineType: "Italian",
    operatingHours: ["All Day"],
    restaurantImage: "/images/pizzahut/pizzahut-logo.png",
    menuItemImages: [
      "/images/pizzahut/pepperoni_pizza.jpg",
      "/images/pizzahut/cheese_pizza.jpg",
      "/images/pizzahut/supreme_pizza.jpg",
      "/images/pizzahut/meat_lovers_pizza.jpg",
      "/images/pizzahut/veggie_lovers_pizza.jpg",
      "/images/pizzahut/breadsticks.jpg",
      "/images/pizzahut/wings.jpg",
      "/images/pizzahut/pasta.jpg",
      "/images/pizzahut/salad.jpg",
      "/images/pizzahut/cinnamon_sticks.jpg"
    ],
    websiteURL: "https://www.pizzahut.com/",
  },
  {
    restaurantID: "s4t5u6v",
    restaurantName: "Pizza Hut",
    restaurantAddress: "Pizza Hut, 3209 Builder Dr, Lafayette, IN 47909",
    distance: 3.2,
    menu: [
      "Pepperoni Pizza",
      "Cheese Pizza",
      "Supreme Pizza",
      "Meat Lover's Pizza",
      "Veggie Lover's Pizza",
      "Breadsticks",
      "Wings",
      "Pasta",
      "Salad",
      "Cinnamon Sticks"
    ],
    menuOptions: [],
    menuDietaryViolations: [
      ["vegetarian", "vegan", "gluten-free", "dairy-free"], // Pepperoni Pizza
      ["vegan", "gluten-free", "dairy-free"], // Cheese Pizza
      ["vegetarian", "vegan", "gluten-free", "dairy-free"], // Supreme Pizza
      ["vegetarian", "vegan", "gluten-free", "dairy-free"], // Meat Lover's Pizza
      ["vegan", "gluten-free", "dairy-free"], // Veggie Lover's Pizza
      ["vegan", "gluten-free", "dairy-free"], // Breadsticks
      ["vegetarian", "vegan", "gluten-free", "dairy-free"], // Wings
      ["vegan", "gluten-free", "dairy-free"], // Pasta
      [], // Salad (depends on dressing and toppings)
      ["vegan", "gluten-free", "dairy-free"], // Cinnamon Sticks
    ],
    ubereatsMenuPrice: [13.19, 12.19, 15.19, 16.19, 14.19, 6.19, 9.19, 10.19, 5.19, 5.69],
    doordashMenuPrice: [13.29, 12.29, 15.29, 16.29, 14.29, 6.29, 9.29, 10.29, 5.29, 5.79],
    grubhubMenuPrice: [13.09, 12.09, 15.09, 16.09, 14.09, 6.09, 9.09, 10.09, 5.09, 5.59],
    ubereatsAvailable: true,
    doordashAvailable: true,
    grubhubAvailable: false,
    cuisineType: "Italian",
    operatingHours: ["All Day"],
    restaurantImage: "/images/pizzahut/pizzahut-logo.png",
    menuItemImages: [
      "/images/pizzahut/pepperoni_pizza.jpg",
      "/images/pizzahut/cheese_pizza.jpg",
      "/images/pizzahut/supreme_pizza.jpg",
      "/images/pizzahut/meat_lovers_pizza.jpg",
      "/images/pizzahut/veggie_lovers_pizza.jpg",
      "/images/pizzahut/breadsticks.jpg",
      "/images/pizzahut/wings.jpg",
      "/images/pizzahut/pasta.jpg",
      "/images/pizzahut/salad.jpg",
      "/images/pizzahut/cinnamon_sticks.jpg"
    ],
    websiteURL: "https://www.pizzahut.com/",
  },
  {
    restaurantID: "d8e9f0g",
    restaurantName: "Subway",
    restaurantAddress: "Subway, 7701 W Indiana 28, Frankfort, IN 46041",
    distance: 0.5,
    menu: [
      "Italian B.M.T.",
      "Turkey Breast",
      "Veggie Delite",
      "Chicken Teriyaki",
      "Meatball Marinara",
      "Tuna",
      "Black Forest Ham",
      "Steak & Cheese",
      "Roasted Chicken",
      "Subway Club"
    ],
    menuOptions: [],
    menuDietaryViolations: [
      ["vegan", "gluten-free", "dairy-free"], // Italian B.M.T. (contains meat and gluten)
      ["vegan", "gluten-free", "dairy-free"], // Turkey Breast
      ["gluten-free", "dairy-free"], // Veggie Delite (bread contains gluten)
      ["vegan", "gluten-free", "dairy-free"], // Chicken Teriyaki
      ["vegan", "gluten-free", "dairy-free"], // Meatball Marinara
      ["vegan", "gluten-free", "dairy-free"], // Tuna
      ["vegan", "gluten-free", "dairy-free"], // Black Forest Ham
      ["vegan", "gluten-free", "dairy-free"], // Steak & Cheese
      ["vegan", "gluten-free", "dairy-free"], // Roasted Chicken
      ["vegan", "gluten-free", "dairy-free"], // Subway Club
    ],
    ubereatsMenuPrice: [5.99, 5.49, 4.99, 6.49, 5.99, 5.49, 5.29, 6.99, 6.49, 6.19],
    doordashMenuPrice: [6.19, 5.69, 5.19, 6.69, 6.19, 5.69, 5.49, 7.19, 6.69, 6.39],
    grubhubMenuPrice: [5.89, 5.39, 4.89, 6.29, 5.89, 5.39, 5.19, 6.89, 6.29, 6.09],
    ubereatsAvailable: true,
    doordashAvailable: true,
    grubhubAvailable: false,
    cuisineType: "American",
    operatingHours: ["All Day"],
    restaurantImage: "/images/subway/subway-logo.png",
    menuItemImages: [
      "/images/subway/italian_bmt.jpg",
      "/images/subway/turkey_breast.jpg",
      "/images/subway/veggie_delite.jpg",
      "/images/subway/chicken_teriyaki.jpg",
      "/images/subway/meatball_marinara.jpg",
      "/images/subway/tuna.jpg",
      "/images/subway/black_forest_ham.jpg",
      "/images/subway/steak_cheese.jpg",
      "/images/subway/roasted_chicken.jpg",
      "/images/subway/subway_club.jpg"
    ],
    websiteURL: "https://www.subway.com/en-us",
  },
  {
    restaurantID: "h1i2j3k",
    restaurantName: "Subway",
    restaurantAddress: "Subway, 1010 Corey Blvd, Crawfordsville, IN 47933",
    distance: 1.1,
    menu: [
      "Italian B.M.T.",
      "Turkey Breast",
      "Veggie Delite",
      "Chicken Teriyaki",
      "Meatball Marinara",
      "Tuna",
      "Black Forest Ham",
      "Steak & Cheese",
      "Roasted Chicken",
      "Subway Club"
    ],
    menuOptions: [],
    menuDietaryViolations: [
      ["vegan", "gluten-free", "dairy-free"], // Italian B.M.T. (contains meat and gluten)
      ["vegan", "gluten-free", "dairy-free"], // Turkey Breast
      ["gluten-free", "dairy-free"], // Veggie Delite (bread contains gluten)
      ["vegan", "gluten-free", "dairy-free"], // Chicken Teriyaki
      ["vegan", "gluten-free", "dairy-free"], // Meatball Marinara
      ["vegan", "gluten-free", "dairy-free"], // Tuna
      ["vegan", "gluten-free", "dairy-free"], // Black Forest Ham
      ["vegan", "gluten-free", "dairy-free"], // Steak & Cheese
      ["vegan", "gluten-free", "dairy-free"], // Roasted Chicken
      ["vegan", "gluten-free", "dairy-free"], // Subway Club
    ],
    ubereatsMenuPrice: [6.09, 5.59, 5.09, 6.59, 6.09, 5.59, 5.39, 7.09, 6.59, 6.29],
    doordashMenuPrice: [5.99, 5.49, 4.99, 6.49, 5.99, 5.49, 5.29, 6.99, 6.49, 6.19],
    grubhubMenuPrice: [6.19, 5.69, 5.19, 6.69, 6.19, 5.69, 5.49, 7.19, 6.69, 6.39],
    ubereatsAvailable: false,
    doordashAvailable: true,
    grubhubAvailable: true,
    cuisineType: "American",
    operatingHours: ["All Day"],
    restaurantImage: "/images/subway/subway-logo.png",
    menuItemImages: [
      "/images/subway/italian_bmt.jpg",
      "/images/subway/turkey_breast.jpg",
      "/images/subway/veggie_delite.jpg",
      "/images/subway/chicken_teriyaki.jpg",
      "/images/subway/meatball_marinara.jpg",
      "/images/subway/tuna.jpg",
      "/images/subway/black_forest_ham.jpg",
      "/images/subway/steak_cheese.jpg",
      "/images/subway/roasted_chicken.jpg",
      "/images/subway/subway_club.jpg"
    ],
    websiteURL: "https://www.subway.com/en-us",
  },
  {
    restaurantID: "l4m5n6o",
    restaurantName: "Subway",
    restaurantAddress: "Subway, 1309 Darlington Ave, Crawfordsville, IN 47933",
    distance: 2.0,
    menu: [
      "Italian B.M.T.",
      "Turkey Breast",
      "Veggie Delite",
      "Chicken Teriyaki",
      "Meatball Marinara",
      "Tuna",
      "Black Forest Ham",
      "Steak & Cheese",
      "Roasted Chicken",
      "Subway Club"
    ],
    menuOptions: [],
    menuDietaryViolations: [
      ["vegan", "gluten-free", "dairy-free"], // Italian B.M.T. (contains meat and gluten)
      ["vegan", "gluten-free", "dairy-free"], // Turkey Breast
      ["gluten-free", "dairy-free"], // Veggie Delite (bread contains gluten)
      ["vegan", "gluten-free", "dairy-free"], // Chicken Teriyaki
      ["vegan", "gluten-free", "dairy-free"], // Meatball Marinara
      ["vegan", "gluten-free", "dairy-free"], // Tuna
      ["vegan", "gluten-free", "dairy-free"], // Black Forest Ham
      ["vegan", "gluten-free", "dairy-free"], // Steak & Cheese
      ["vegan", "gluten-free", "dairy-free"], // Roasted Chicken
      ["vegan", "gluten-free", "dairy-free"], // Subway Club
    ],
    ubereatsMenuPrice: [5.89, 5.39, 4.89, 6.29, 5.89, 5.39, 5.19, 6.89, 6.29, 6.09],
    doordashMenuPrice: [6.09, 5.59, 5.09, 6.59, 6.09, 5.59, 5.39, 7.09, 6.59, 6.29],
    grubhubMenuPrice: [5.79, 5.29, 4.79, 6.19, 5.79, 5.29, 5.09, 6.79, 6.19, 5.99],
    ubereatsAvailable: true,
    doordashAvailable: false,
    grubhubAvailable: true,
    cuisineType: "American",
    operatingHours: ["All Day"],
    restaurantImage: "/images/subway/subway-logo.png",
    menuItemImages: [
      "/images/subway/italian_bmt.jpg",
      "/images/subway/turkey_breast.jpg",
      "/images/subway/veggie_delite.jpg",
      "/images/subway/chicken_teriyaki.jpg",
      "/images/subway/meatball_marinara.jpg",
      "/images/subway/tuna.jpg",
      "/images/subway/black_forest_ham.jpg",
      "/images/subway/steak_cheese.jpg",
      "/images/subway/roasted_chicken.jpg",
      "/images/subway/subway_club.jpg"
    ],
    websiteURL: "https://www.subway.com/en-us",
  },
  {
    restaurantID: "p7q8r9s",
    restaurantName: "Subway",
    restaurantAddress: "Subway, 4403 IN-32, Crawfordsville, IN 47933",
    distance: 2.7,
    menu: [
      "Italian B.M.T.",
      "Turkey Breast",
      "Veggie Delite",
      "Chicken Teriyaki",
      "Meatball Marinara",
      "Tuna",
      "Black Forest Ham",
      "Steak & Cheese",
      "Roasted Chicken",
      "Subway Club"
    ],
    menuOptions: [],
    menuDietaryViolations: [
      ["vegan", "gluten-free", "dairy-free"], // Italian B.M.T. (contains meat and gluten)
      ["vegan", "gluten-free", "dairy-free"], // Turkey Breast
      ["gluten-free", "dairy-free"], // Veggie Delite (bread contains gluten)
      ["vegan", "gluten-free", "dairy-free"], // Chicken Teriyaki
      ["vegan", "gluten-free", "dairy-free"], // Meatball Marinara
      ["vegan", "gluten-free", "dairy-free"], // Tuna
      ["vegan", "gluten-free", "dairy-free"], // Black Forest Ham
      ["vegan", "gluten-free", "dairy-free"], // Steak & Cheese
      ["vegan", "gluten-free", "dairy-free"], // Roasted Chicken
      ["vegan", "gluten-free", "dairy-free"], // Subway Club
    ],
    ubereatsMenuPrice: [6.19, 5.69, 5.19, 6.69, 6.19, 5.69, 5.49, 7.19, 6.69, 6.39],
    doordashMenuPrice: [6.29, 5.79, 5.29, 6.79, 6.29, 5.79, 5.59, 7.29, 6.79, 6.49],
    grubhubMenuPrice: [6.09, 5.59, 5.09, 6.59, 6.09, 5.59, 5.39, 7.09, 6.59, 6.29],
    ubereatsAvailable: true,
    doordashAvailable: true,
    grubhubAvailable: false,
    cuisineType: "American",
    operatingHours: ["All Day"],
    restaurantImage: "/images/subway/subway-logo.png",
    menuItemImages: [
      "/images/subway/italian_bmt.jpg",
      "/images/subway/turkey_breast.jpg",
      "/images/subway/veggie_delite.jpg",
      "/images/subway/chicken_teriyaki.jpg",
      "/images/subway/meatball_marinara.jpg",
      "/images/subway/tuna.jpg",
      "/images/subway/black_forest_ham.jpg",
      "/images/subway/steak_cheese.jpg",
      "/images/subway/roasted_chicken.jpg",
      "/images/subway/subway_club.jpg"
    ],
    websiteURL: "https://www.subway.com/en-us",
  },
  {
    restaurantID: "t0u1v2w",
    restaurantName: "Taco Bell",
    restaurantAddress: "Taco Bell, 1016 West Sagamore, West Lafayette, IN 47906",
    distance: 0.8,
    menu: [
      "Crunchy Taco",
      "Soft Taco",
      "Burrito Supreme",
      "Nachos BellGrande",
      "Crunchwrap Supreme",
      "Quesadilla",
      "Bean Burrito",
      "Mexican Pizza",
      "Cheesy Gordita Crunch",
      "Chalupa Supreme"
    ],
    menuOptions: [],
    menuDietaryViolations: [
      ["vegetarian", "vegan", "gluten-free", "dairy-free"], // Crunchy Taco (contains meat)
      ["vegetarian", "vegan", "gluten-free", "dairy-free"], // Soft Taco (contains meat)
      ["vegetarian", "vegan", "gluten-free", "dairy-free"], // Burrito Supreme (contains meat, dairy)
      ["vegetarian", "vegan", "gluten-free", "dairy-free"], // Nachos BellGrande (contains meat, dairy)
      ["vegetarian", "vegan", "gluten-free", "dairy-free"], // Crunchwrap Supreme
      ["vegetarian", "vegan", "gluten-free", "dairy-free"], // Quesadilla
      ["gluten-free", "dairy-free"], // Bean Burrito (contains cheese, flour tortilla)
      ["vegetarian", "vegan", "gluten-free", "dairy-free"], // Mexican Pizza
      ["vegetarian", "vegan", "gluten-free", "dairy-free"], // Cheesy Gordita Crunch
      ["vegetarian", "vegan", "gluten-free", "dairy-free"], // Chalupa Supreme
    ],
    ubereatsMenuPrice: [1.29, 1.39, 3.49, 3.99, 3.69, 3.29, 1.99, 4.49, 3.59, 3.29],
    doordashMenuPrice: [1.19, 1.29, 3.39, 3.89, 3.59, 3.19, 1.89, 4.39, 3.49, 3.19],
    grubhubMenuPrice: [1.39, 1.49, 3.59, 4.09, 3.79, 3.39, 2.09, 4.59, 3.69, 3.39],
    ubereatsAvailable: true,
    doordashAvailable: false,
    grubhubAvailable: true,
    cuisineType: "Mexican",
    operatingHours: ["All Day"],
    restaurantImage: "/images/tacobell/tacobell-logo.png",
    menuItemImages: [
      "/images/tacobell/crunchy_taco.jpg",
      "/images/tacobell/soft_taco.jpg",
      "/images/tacobell/burrito_supreme.jpg",
      "/images/tacobell/nachos_bellgrande.jpg",
      "/images/tacobell/crunchwrap_supreme.jpg",
      "/images/tacobell/quesadilla.jpg",
      "/images/tacobell/bean_burrito.jpg",
      "/images/tacobell/mexican_pizza.jpg",
      "/images/tacobell/cheesy_gordita_crunch.jpg",
      "/images/tacobell/chalupa_supreme.jpg"
    ],
    websiteURL: "https://www.tacobell.com/",
  },
  {
    restaurantID: "x3y4z5a",
    restaurantName: "Taco Bell",
    restaurantAddress: "Taco Bell, 2190 S 26th St, Lafayette, IN 47905",
    distance: 1.3,
    menu: [
      "Crunchy Taco",
      "Soft Taco",
      "Burrito Supreme",
      "Nachos BellGrande",
      "Crunchwrap Supreme",
      "Quesadilla",
      "Bean Burrito",
      "Mexican Pizza",
      "Cheesy Gordita Crunch",
      "Chalupa Supreme"
    ],
    menuOptions: [],
    menuDietaryViolations: [
      ["vegetarian", "vegan", "gluten-free", "dairy-free"], // Crunchy Taco (contains meat)
      ["vegetarian", "vegan", "gluten-free", "dairy-free"], // Soft Taco (contains meat)
      ["vegetarian", "vegan", "gluten-free", "dairy-free"], // Burrito Supreme (contains meat, dairy)
      ["vegetarian", "vegan", "gluten-free", "dairy-free"], // Nachos BellGrande (contains meat, dairy)
      ["vegetarian", "vegan", "gluten-free", "dairy-free"], // Crunchwrap Supreme
      ["vegetarian", "vegan", "gluten-free", "dairy-free"], // Quesadilla
      ["gluten-free", "dairy-free"], // Bean Burrito (contains cheese, flour tortilla)
      ["vegetarian", "vegan", "gluten-free", "dairy-free"], // Mexican Pizza
      ["vegetarian", "vegan", "gluten-free", "dairy-free"], // Cheesy Gordita Crunch
      ["vegetarian", "vegan", "gluten-free", "dairy-free"], // Chalupa Supreme
    ],
    ubereatsMenuPrice: [1.39, 1.49, 3.59, 4.09, 3.79, 3.39, 2.09, 4.59, 3.69, 3.39],
    doordashMenuPrice: [1.29, 1.39, 3.49, 3.99, 3.69, 3.29, 1.99, 4.49, 3.59, 3.29],
    grubhubMenuPrice: [1.49, 1.59, 3.69, 4.19, 3.89, 3.49, 2.19, 4.69, 3.79, 3.49],
    ubereatsAvailable: false,
    doordashAvailable: true,
    grubhubAvailable: true,
    cuisineType: "Mexican",
    operatingHours: ["All Day"],
    restaurantImage: "/images/tacobell/tacobell-logo.png",
    menuItemImages: [
      "/images/tacobell/crunchy_taco.jpg",
      "/images/tacobell/soft_taco.jpg",
      "/images/tacobell/burrito_supreme.jpg",
      "/images/tacobell/nachos_bellgrande.jpg",
      "/images/tacobell/crunchwrap_supreme.jpg",
      "/images/tacobell/quesadilla.jpg",
      "/images/tacobell/bean_burrito.jpg",
      "/images/tacobell/mexican_pizza.jpg",
      "/images/tacobell/cheesy_gordita_crunch.jpg",
      "/images/tacobell/chalupa_supreme.jpg"
    ],
    websiteURL: "https://www.tacobell.com/",
  },
  {
    restaurantID: "b6c7d8e",
    restaurantName: "Taco Bell",
    restaurantAddress: "Taco Bell, 3805 South St, Lafayette, IN 47905",
    distance: 2.1,
    menu: [
      "Crunchy Taco",
      "Soft Taco",
      "Burrito Supreme",
      "Nachos BellGrande",
      "Crunchwrap Supreme",
      "Quesadilla",
      "Bean Burrito",
      "Mexican Pizza",
      "Cheesy Gordita Crunch",
      "Chalupa Supreme"
    ],
    menuOptions: [],
    menuDietaryViolations: [
      ["vegetarian", "vegan", "gluten-free", "dairy-free"], // Crunchy Taco (contains meat)
      ["vegetarian", "vegan", "gluten-free", "dairy-free"], // Soft Taco (contains meat)
      ["vegetarian", "vegan", "gluten-free", "dairy-free"], // Burrito Supreme (contains meat, dairy)
      ["vegetarian", "vegan", "gluten-free", "dairy-free"], // Nachos BellGrande (contains meat, dairy)
      ["vegetarian", "vegan", "gluten-free", "dairy-free"], // Crunchwrap Supreme
      ["vegetarian", "vegan", "gluten-free", "dairy-free"], // Quesadilla
      ["gluten-free", "dairy-free"], // Bean Burrito (contains cheese, flour tortilla)
      ["vegetarian", "vegan", "gluten-free", "dairy-free"], // Mexican Pizza
      ["vegetarian", "vegan", "gluten-free", "dairy-free"], // Cheesy Gordita Crunch
      ["vegetarian", "vegan", "gluten-free", "dairy-free"], // Chalupa Supreme
    ],
    ubereatsMenuPrice: [1.19, 1.29, 3.39, 3.89, 3.59, 3.19, 1.89, 4.39, 3.49, 3.19],
    doordashMenuPrice: [1.39, 1.49, 3.59, 4.09, 3.79, 3.39, 2.09, 4.59, 3.69, 3.39],
    grubhubMenuPrice: [1.29, 1.39, 3.49, 3.99, 3.69, 3.29, 1.99, 4.49, 3.59, 3.29],
    ubereatsAvailable: true,
    doordashAvailable: true,
    grubhubAvailable: false,
    cuisineType: "Mexican",
    operatingHours: ["All Day"],
    restaurantImage: "/images/tacobell/tacobell-logo.png",
    menuItemImages: [
      "/images/tacobell/crunchy_taco.jpg",
      "/images/tacobell/soft_taco.jpg",
      "/images/tacobell/burrito_supreme.jpg",
      "/images/tacobell/nachos_bellgrande.jpg",
      "/images/tacobell/crunchwrap_supreme.jpg",
      "/images/tacobell/quesadilla.jpg",
      "/images/tacobell/bean_burrito.jpg",
      "/images/tacobell/mexican_pizza.jpg",
      "/images/tacobell/cheesy_gordita_crunch.jpg",
      "/images/tacobell/chalupa_supreme.jpg"
    ],
    websiteURL: "https://www.tacobell.com/",
  },
  {
    restaurantID: "e9f0g1h",
    restaurantName: "Taco Bell",
    restaurantAddress: "Taco Bell, 5900 IN-43, West Lafayette, IN 47906",
    distance: 2.9,
    menu: [
      "Crunchy Taco",
      "Soft Taco",
      "Burrito Supreme",
      "Nachos BellGrande",
      "Crunchwrap Supreme",
      "Quesadilla",
      "Bean Burrito",
      "Mexican Pizza",
      "Cheesy Gordita Crunch",
      "Chalupa Supreme"
    ],
    menuOptions: [],
    menuDietaryViolations: [
      ["vegetarian", "vegan", "gluten-free", "dairy-free"], // Crunchy Taco (contains meat)
      ["vegetarian", "vegan", "gluten-free", "dairy-free"], // Soft Taco (contains meat)
      ["vegetarian", "vegan", "gluten-free", "dairy-free"], // Burrito Supreme (contains meat, dairy)
      ["vegetarian", "vegan", "gluten-free", "dairy-free"], // Nachos BellGrande (contains meat, dairy)
      ["vegetarian", "vegan", "gluten-free", "dairy-free"], // Crunchwrap Supreme
      ["vegetarian", "vegan", "gluten-free", "dairy-free"], // Quesadilla
      ["gluten-free", "dairy-free"], // Bean Burrito (contains cheese, flour tortilla)
      ["vegetarian", "vegan", "gluten-free", "dairy-free"], // Mexican Pizza
      ["vegetarian", "vegan", "gluten-free", "dairy-free"], // Cheesy Gordita Crunch
      ["vegetarian", "vegan", "gluten-free", "dairy-free"], // Chalupa Supreme
    ],
    ubereatsMenuPrice: [1.49, 1.59, 3.69, 4.19, 3.89, 3.49, 2.19, 4.69, 3.79, 3.49],
    doordashMenuPrice: [1.39, 1.49, 3.59, 4.09, 3.79, 3.39, 2.09, 4.59, 3.69, 3.39],
    grubhubMenuPrice: [1.59, 1.69, 3.79, 4.29, 3.99, 3.59, 2.29, 4.79, 3.89, 3.59],
    ubereatsAvailable: true,
    doordashAvailable: false,
    grubhubAvailable: true,
    cuisineType: "Mexican",
    operatingHours: ["All Day"],
    restaurantImage: "/images/tacobell/tacobell-logo.png",
    menuItemImages: [
      "/images/tacobell/crunchy_taco.jpg",
      "/images/tacobell/soft_taco.jpg",
      "/images/tacobell/burrito_supreme.jpg",
      "/images/tacobell/nachos_bellgrande.jpg",
      "/images/tacobell/crunchwrap_supreme.jpg",
      "/images/tacobell/quesadilla.jpg",
      "/images/tacobell/bean_burrito.jpg",
      "/images/tacobell/mexican_pizza.jpg",
      "/images/tacobell/cheesy_gordita_crunch.jpg",
      "/images/tacobell/chalupa_supreme.jpg"
    ],
    websiteURL: "https://www.tacobell.com/",
  },
  {
    restaurantID: "i2j3k4l",
    restaurantName: "Chick-Fil-A",
    restaurantAddress: "Chick-Fil-A, 401 N Russell St, West Lafayette, IN 47906",
    distance: 0.7,
    menu: [
      "Chicken Sandwich",
      "Spicy Chicken Sandwich",
      "Chicken Nuggets",
      "Waffle Fries",
      "Grilled Chicken Sandwich",
      "Chicken Biscuit",
      "Lemonade",
      "Mac & Cheese",
      "Chicken Strips",
      "Chocolate Milkshake"
    ],
    menuOptions: [],
    menuDietaryViolations: [
      ["vegetarian", "vegan", "gluten-free", "dairy-free"], // Chicken Sandwich
      ["vegetarian", "vegan", "gluten-free", "dairy-free"], // Spicy Chicken Sandwich
      ["vegetarian", "vegan", "gluten-free", "dairy-free"], // Chicken Nuggets
      [], // Waffle Fries
      ["vegetarian", "vegan", "gluten-free", "dairy-free"], // Grilled Chicken Sandwich
      ["vegetarian", "vegan", "gluten-free", "dairy-free"], // Chicken Biscuit
      [], // Lemonade
      ["vegan", "dairy-free", "gluten-free"], // Mac & Cheese
      ["vegetarian", "vegan", "gluten-free", "dairy-free"], // Chicken Strips
      ["vegan", "dairy-free"], // Chocolate Milkshake
    ],
    ubereatsMenuPrice: [3.75, 3.99, 4.49, 1.99, 4.29, 2.89, 1.89, 2.99, 4.59, 3.29],
    doordashMenuPrice: [3.85, 4.09, 4.59, 2.09, 4.39, 2.99, 1.99, 3.09, 4.69, 3.39],
    grubhubMenuPrice: [3.65, 3.89, 4.39, 1.89, 4.19, 2.79, 1.79, 2.89, 4.49, 3.19],
    ubereatsAvailable: true,
    doordashAvailable: true,
    grubhubAvailable: false,
    cuisineType: "American",
    operatingHours: ["Breakfast", "Lunch", "Dinner"],
    restaurantImage: "/images/chickfila/chickfila-logo.png",
    menuItemImages: [
      "/images/chickfila/chicken_sandwich.jpg",
      "/images/chickfila/spicy_chicken_sandwich.jpg",
      "/images/chickfila/nuggets.jpg",
      "/images/chickfila/waffle_fries.jpg",
      "/images/chickfila/grilled_chicken_sandwich.jpg",
      "/images/chickfila/chicken_biscuit.jpg",
      "/images/chickfila/lemonade.jpg",
      "/images/chickfila/mac_cheese.jpg",
      "/images/chickfila/chicken_strips.jpg",
      "/images/chickfila/chocolate_milkshake.jpg"
    ],
    websiteURL: "https://www.chick-fil-a.com/",
  },
  {
    restaurantID: "m5n6o7p",
    restaurantName: "Chick-Fil-A",
    restaurantAddress: "Chick-Fil-A, 50 N Creasy Ln, Lafayette, IN 47905",
    distance: 1.5,
    menu: [
      "Chicken Sandwich",
      "Spicy Chicken Sandwich",
      "Chicken Nuggets",
      "Waffle Fries",
      "Grilled Chicken Sandwich",
      "Chicken Biscuit",
      "Lemonade",
      "Mac & Cheese",
      "Chicken Strips",
      "Chocolate Milkshake"
    ],
    menuOptions: [],
    menuDietaryViolations: [
      ["vegetarian", "vegan", "gluten-free", "dairy-free"], // Chicken Sandwich
      ["vegetarian", "vegan", "gluten-free", "dairy-free"], // Spicy Chicken Sandwich
      ["vegetarian", "vegan", "gluten-free", "dairy-free"], // Chicken Nuggets
      [], // Waffle Fries
      ["vegetarian", "vegan", "gluten-free", "dairy-free"], // Grilled Chicken Sandwich
      ["vegetarian", "vegan", "gluten-free", "dairy-free"], // Chicken Biscuit
      [], // Lemonade
      ["vegan", "dairy-free", "gluten-free"], // Mac & Cheese
      ["vegetarian", "vegan", "gluten-free", "dairy-free"], // Chicken Strips
      ["vegan", "dairy-free"], // Chocolate Milkshake
    ],
    ubereatsMenuPrice: [3.85, 4.09, 4.59, 2.09, 4.39, 2.99, 1.99, 3.09, 4.69, 3.39],
    doordashMenuPrice: [3.75, 3.99, 4.49, 1.99, 4.29, 2.89, 1.89, 2.99, 4.59, 3.29],
    grubhubMenuPrice: [3.95, 4.19, 4.69, 2.19, 4.49, 3.09, 2.09, 3.19, 4.79, 3.49],
    ubereatsAvailable: false,
    doordashAvailable: true,
    grubhubAvailable: true,
    cuisineType: "American",
    operatingHours: ["Breakfast", "Lunch", "Dinner"],
    restaurantImage: "/images/chickfila/chickfila-logo.png",
    menuItemImages: [
      "/images/chickfila/chicken_sandwich.jpg",
      "/images/chickfila/spicy_chicken_sandwich.jpg",
      "/images/chickfila/nuggets.jpg",
      "/images/chickfila/waffle_fries.jpg",
      "/images/chickfila/grilled_chicken_sandwich.jpg",
      "/images/chickfila/chicken_biscuit.jpg",
      "/images/chickfila/lemonade.jpg",
      "/images/chickfila/mac_cheese.jpg",
      "/images/chickfila/chicken_strips.jpg",
      "/images/chickfila/chocolate_milkshake.jpg"
    ],
    websiteURL: "https://www.chick-fil-a.com/",
  },
  {
    restaurantID: "q8r9s0t",
    restaurantName: "Chick-Fil-A",
    restaurantAddress: "Chick-Fil-A, 3929 Bonlou Ct, Lafayette, IN 47905",
    distance: 2.4,
    menu: [
      "Chicken Sandwich",
      "Spicy Chicken Sandwich",
      "Chicken Nuggets",
      "Waffle Fries",
      "Grilled Chicken Sandwich",
      "Chicken Biscuit",
      "Lemonade",
      "Mac & Cheese",
      "Chicken Strips",
      "Chocolate Milkshake"
    ],
    menuOptions: [],
    menuDietaryViolations: [
      ["vegetarian", "vegan", "gluten-free", "dairy-free"], // Chicken Sandwich
      ["vegetarian", "vegan", "gluten-free", "dairy-free"], // Spicy Chicken Sandwich
      ["vegetarian", "vegan", "gluten-free", "dairy-free"], // Chicken Nuggets
      [], // Waffle Fries
      ["vegetarian", "vegan", "gluten-free", "dairy-free"], // Grilled Chicken Sandwich
      ["vegetarian", "vegan", "gluten-free", "dairy-free"], // Chicken Biscuit
      [], // Lemonade
      ["vegan", "dairy-free", "gluten-free"], // Mac & Cheese
      ["vegetarian", "vegan", "gluten-free", "dairy-free"], // Chicken Strips
      ["vegan", "dairy-free"], // Chocolate Milkshake
    ],
    ubereatsMenuPrice: [3.65, 3.89, 4.39, 1.89, 4.19, 2.79, 1.79, 2.89, 4.49, 3.19],
    doordashMenuPrice: [3.85, 4.09, 4.59, 2.09, 4.39, 2.99, 1.99, 3.09, 4.69, 3.39],
    grubhubMenuPrice: [3.75, 3.99, 4.49, 1.99, 4.29, 2.89, 1.89, 2.99, 4.59, 3.29],
    ubereatsAvailable: true,
    doordashAvailable: false,
    grubhubAvailable: true,
    cuisineType: "American",
    operatingHours: ["Breakfast", "Lunch", "Dinner"],
    restaurantImage: "/images/chickfila/chickfila-logo.png",
    menuItemImages: [
      "/images/chickfila/chicken_sandwich.jpg",
      "/images/chickfila/spicy_chicken_sandwich.jpg",
      "/images/chickfila/nuggets.jpg",
      "/images/chickfila/waffle_fries.jpg",
      "/images/chickfila/grilled_chicken_sandwich.jpg",
      "/images/chickfila/chicken_biscuit.jpg",
      "/images/chickfila/lemonade.jpg",
      "/images/chickfila/mac_cheese.jpg",
      "/images/chickfila/chicken_strips.jpg",
      "/images/chickfila/chocolate_milkshake.jpg"
    ],
    websiteURL: "https://www.chick-fil-a.com/",
  },
  {
    restaurantID: "u1v2w3x",
    restaurantName: "Chick-Fil-A",
    restaurantAddress: "Chick-Fil-A, 763 E Tournament Trl, Westfield, IN 46074",
    distance: 3.3,
    menu: [
      "Chicken Sandwich",
      "Spicy Chicken Sandwich",
      "Chicken Nuggets",
      "Waffle Fries",
      "Grilled Chicken Sandwich",
      "Chicken Biscuit",
      "Lemonade",
      "Mac & Cheese",
      "Chicken Strips",
      "Chocolate Milkshake"
    ],
    menuOptions: [],
    menuDietaryViolations: [
      ["vegetarian", "vegan", "gluten-free", "dairy-free"], // Chicken Sandwich
      ["vegetarian", "vegan", "gluten-free", "dairy-free"], // Spicy Chicken Sandwich
      ["vegetarian", "vegan", "gluten-free", "dairy-free"], // Chicken Nuggets
      [], // Waffle Fries
      ["vegetarian", "vegan", "gluten-free", "dairy-free"], // Grilled Chicken Sandwich
      ["vegetarian", "vegan", "gluten-free", "dairy-free"], // Chicken Biscuit
      [], // Lemonade
      ["vegan", "dairy-free", "gluten-free"], // Mac & Cheese
      ["vegetarian", "vegan", "gluten-free", "dairy-free"], // Chicken Strips
      ["vegan", "dairy-free"], // Chocolate Milkshake
    ],
    ubereatsMenuPrice: [3.95, 4.19, 4.69, 2.19, 4.49, 3.09, 2.09, 3.19, 4.79, 3.49],
    doordashMenuPrice: [3.75, 3.99, 4.49, 1.99, 4.29, 2.89, 1.89, 2.99, 4.59, 3.29],
    grubhubMenuPrice: [4.05, 4.29, 4.79, 2.29, 4.59, 3.19, 2.19, 3.29, 4.89, 3.59],
    ubereatsAvailable: true,
    doordashAvailable: true,
    grubhubAvailable: false,
    cuisineType: "American",
    operatingHours: ["Breakfast", "Lunch", "Dinner"],
    restaurantImage: "/images/chickfila/chickfila-logo.png",
    menuItemImages: [
      "/images/chickfila/chicken_sandwich.jpg",
      "/images/chickfila/spicy_chicken_sandwich.jpg",
      "/images/chickfila/nuggets.jpg",
      "/images/chickfila/waffle_fries.jpg",
      "/images/chickfila/grilled_chicken_sandwich.jpg",
      "/images/chickfila/chicken_biscuit.jpg",
      "/images/chickfila/lemonade.jpg",
      "/images/chickfila/mac_cheese.jpg",
      "/images/chickfila/chicken_strips.jpg",
      "/images/chickfila/chocolate_milkshake.jpg"
    ],
    websiteURL: "https://www.chick-fil-a.com/",
  }
  
];

export default restaurantData;
