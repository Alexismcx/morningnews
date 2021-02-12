var mongoose = require('mongoose');

var options = {
    connectTimeoutMS: 5000,
    useUnifiedTopology : true,
    useNewUrlParser: true,
}

mongoose.connect(`mongodb+srv://${process.env.NAME_USER}:${process.env.MDP_USER}@cluster0.arufm.mongodb.net/morningnews?retryWrites=true&w=majority`,
    options,
    function(err){
        console.log(err);
    }
)

module.exports = mongoose;