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

    // Display the structure of the inverted index
    display() {
        console.log('Inverted Index Structure:');
        for (const term in this.index) {
            console.log(`${term}: [${this.index[term].join(', ')}]`);
        }
    }
}

// Sample items
const items = [
    { id: 1, name: 'Red Shirt', categories: ['Clothing'], tags: ['Red', 'Shirt', 'Cotton'] },
    { id: 2, name: 'Blue Denim Jeans', categories: ['Clothing'], tags: ['Blue','Jeans', 'Denim'] },
    { id: 3, name: 'Leather Jacket', categories: ['Clothing', 'Outerwear'], tags: ['Red','Leather', 'Jacket'] },
    { id: 4, name: 'Blue Shirt', categories: ['Clothing'], tags: ['Blue','Denim', 'Shirt'] }
];

// Create inverted index and add items
const index = new InvertedIndex();
items.forEach(item => index.add(item));

// Display the structure of the inverted index
index.display();

// Search for items
console.log(index.search('Blue'));    // Output: [1, 2]
console.log(index.search('Jacket')); // Output: [3]

