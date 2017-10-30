var OdjectID = require('mongodb').ObjectID;
module.exports = function (app, db) {
    app.get('/notes/:id', (req, res) => {
        const id = req.params.id;
        const details = {'_id' : new OdjectID(id)};
        db.collection('notes').findOne(details, (err, item) => {
           if(err){
               res.send({'error' : 'An error occurred'});
           }
           else {
               res.send(item);
           }

        });
    });
    app.post('/notes', (req, res)=> {
        const note = { text: req.body.body, title: req.body.title};
        db.collection('notes').insert(note, (err, result) => {
            if(err){
                res.send({ 'error': 'An error has occurred'});
            } else{
                res.send(result.ops[0]);
            }
        });

    });
    app.delete('/notes/:id' , (req, res) => {
        const id = req.params.id;
        const details = { '_id': new OdjectID(id) };
        db.collection('notes').drop(details, (err, item) => {
            if(err){
                res.send({ 'error': 'An error has occurred'});
            } else{
                res.send('Note' + id + ' deleted!');
            }
        });
    });
    app.put('/notes/:id', (req, res) => {
        const id = req.params.id;
        const details = {'_id' : new OdjectID(id)};
        const note = {text: req.body.body, title: req.body.title};
        db.collection('notes').updateOne(details, note , ( err, result) => {
            if(err){
                res.send({'error' : 'An error has occurred'});
            }else {
                res.send(note);
            }
        });
    });
};
