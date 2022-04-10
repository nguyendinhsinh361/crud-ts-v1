import mongoose, { Document, Schema } from 'mongoose';
const AutoIncrement = require('mongoose-sequence')(mongoose);

export interface IAuthor {
    name: string;
}

export interface IAuthorModel extends IAuthor, Document {}

const AuthorSchema: Schema = new Schema(
    {
        authorId: { type: Number },
        name: { type: String, required: true }
    },
    {
        versionKey: false
    }
);

AuthorSchema.plugin(AutoIncrement, { inc_field: 'authorId' });

export default mongoose.model<IAuthorModel>('Author', AuthorSchema);
