import mongoose from "mongoose";

const entrySchema = new mongoose.Schema({
    name: {
    type: String,
    required: [true, 'Username is required.'],
    minlength: [3,'Name must be at least 3 characters long'],
    match: [/^[a-zA-Z\s]+$/, 'Username can only contain letters and spaces']
    },
    number: {
        type: String,
        minlength: [8, "Must have length of at least 8"],
        required: [true, 'User must input a valid number'],
        validate: {
            validator: function (v) {
                return /^\d{2,3}-\d+$/.test(v);
            },
            message: props => `${props.value} is not a valid phone number! Format should be XX-XXXXXXX or XXX-XXXXXXX`,
        }

    }
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