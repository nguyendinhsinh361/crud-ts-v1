import mongoose, { Document, Schema } from 'mongoose';
const AutoIncrement = require('mongoose-sequence')(mongoose);
export interface IBook {
    title: string;
    author: string;
    image: string;
    des: string;
}

export interface IBookModel extends IBook, Document {}

const BookSchema: Schema = new Schema(
    {
        bookId: { type: Number },
        title: { type: String, required: true },
        author: { type: Schema.Types.ObjectId, required: true, ref: 'Author' },
        image: { type: String, required: true },
        des: { type: String, required: true }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

BookSchema.plugin(AutoIncrement, { inc_field: 'bookId' });

export default mongoose.model<IBookModel>('Book', BookSchema);
