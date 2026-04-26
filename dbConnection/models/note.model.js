import { model, Schema , mongoose} from "mongoose";

const noteSchema = new Schema ({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    title: { 
        type: String,
        required: true
    } ,
    content: {
        type: String,
        required: true
    }
} , {
    timeseries:{
        createdAt:"date",
        updatedAt:false
    },
    versionKey:false
})

export let Note =  model("note", noteSchema)
