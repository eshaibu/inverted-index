// const books = require('./books');
const books = [
    {
        "title": "Alice in Wonderland alice",
        "text": "Alice Alice Alice Alice falls into a rabbit hole and enters a world full of imagination."
    },
    {
        "title": "The Lord of the Rings: The Fellowship of the Ring.",
        "text": "An alice unusual alliance of man, elf, dwarf dwarf, wizard and hobbit seek to destroy a powerful ring."
    },
    {
        "title": "King of kings",
        "text": "Jesus Christ is the King of kings and Lord of lords alice"
    }
];
describe('check book length', () => {
    it('book should not be empty', () => {
        expect(books.length > 0).toBeTruthy();
    });
});
