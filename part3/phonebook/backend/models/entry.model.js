import mongoose from "mongoose";

const entrySchema = new mongoose.Schema({
    name: {
    type: String,
    required: [true, 'Username is required.'],
    minlength: [3,'Name must be at least 3 characters long'],
    match: [/^[a-zA-Z\s]+$/, 'Username can only contain letters and spaces']
    },
    number: String
})

entrySchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});

const Entry = mongoose.model('Entry', entrySchema)


export default Entry