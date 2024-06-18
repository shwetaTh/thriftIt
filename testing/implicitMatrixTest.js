const weights = {
    'purchase': 5,
    'view': 1,
    'favorite': 2,
    'add_to_cart': 3,
    'click': 0.5
};

// Interaction data for one user (user_id = 1)
const interactions = [
    { item_id: 1, interaction_type: 'purchase' },
    { item_id: 2, interaction_type: 'view' },
    { item_id: 3, interaction_type: 'favorite' },
    { item_id: 4, interaction_type: 'add_to_cart' },
    { item_id: 5, interaction_type: 'purchase' },
    { item_id: 1, interaction_type: 'view' },
    { item_id: 2, interaction_type: 'add_to_cart' },
    { item_id: 3, interaction_type: 'click' },
    { item_id: 4, interaction_type: 'favorite' },
    { item_id: 5, interaction_type: 'view' }
];

// Unique items (for demonstration purposes)
const items = [...new Set(interactions.map(i => i.item_id))];

// Display the unique items and interaction data
console.log("Unique Items:", items);
console.log("Interactions:", interactions);
