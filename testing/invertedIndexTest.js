class InvertedIndex {
    constructor() {
        this.index = {};
    }

    // Add item to the index
    add(item) {
        const { id, name, categories, tags } = item;
        const fields = [name, ...categories, ...tags];
        fields.forEach(field => {
            const term = field.toLowerCase();
            if (!this.index[term]) {
                this.index[term] = [];
            }
            this.index[term].push(id);
        });
    }

    // Search for items by term
    search(term) {
        return this.index[term.toLowerCase()] || [];
    }
}

// Sample items
const items = [
    { id: 1, name: 'Red Shirt', categories: ['Clothing'], tags: ['Red', 'Shirt', 'Cotton'] },
    { id: 2, name: 'Blue Jeans', categories: ['Clothing'], tags: ['Red', 'Jeans', 'Denim'] },
    { id: 3, name: 'Leather Jacket', categories: ['Clothing', 'Outerwear'], tags: ['Leather', 'Jacket'] }
];

// Create inverted index and add items
const index = new InvertedIndex();
items.forEach(item => index.add(item));

// Search for items
console.log(index.search('Red')); // Output: [1, 2, 3]
//console.log(index.search('Red')); // Output: [1]
//console.log(index.search('Jacket')); // Output: [3]
