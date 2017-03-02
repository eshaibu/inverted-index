describe('check book length', () => {
    it('book should not be empty', () => {
        expect(books.length > 0).toBeTruthy();
    });
});
