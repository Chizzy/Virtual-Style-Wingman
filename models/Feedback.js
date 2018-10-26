const mongoose = require('../db/connection')
const Schema = mongoose.Schema

const Feedback = new Schema ({
    comment: String,
    stylist: {
        type: Schema.Types.ObjectId,
        ref: 'UserStylist'
    },
    date: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('Feedback', Feedback)