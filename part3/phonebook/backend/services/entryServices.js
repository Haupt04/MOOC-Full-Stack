import Entry from "../models/entry.model.js"


export const getAllEntries = async () => {
    return await Entry.find({});
}

export const addingEntry = async (name, number) => {
    const newEntry = new Entry({name, number});
    return await newEntry.save()
}

// Step 3.15
export const deleteEntry = async (id) => {
    return await Entry.findByIdAndDelete(id);
}

export const getEntryById = async (id) => {
    return await Entry.findById(id);
}


export const updateEntry = async (id, number, name) => {
    return await Entry.findByIdAndUpdate(id,
    { name, number },
    { new: true, runValidators: true, context: 'query' }
  );
}
