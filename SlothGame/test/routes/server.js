 // Random numbers length should be 3
describe('GET api//play', function() {
    it('returns a list of random numbers', function(done) {
        request.get('/api/play')
            .expect(200)
            .end(function(err, res) {
                expect(res.body.numbers).to.have.lengthOf(3);
                done(err);
            });
    });
});