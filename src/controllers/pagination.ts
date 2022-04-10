import { NextFunction, Request, Response } from 'express';
import Book from '../models/Book';

const pagination = (req: Request, res: Response, next: NextFunction) => {
    let perPage = 16; // số lượng sản phẩm xuất hiện trên 1 page
    let page = parseInt(req.params.page) || 1;

    Book.find() // find tất cả các data
        .skip(perPage * page - perPage) // Trong page đầu tiên sẽ bỏ qua giá trị là 0
        .limit(perPage)
        .exec((err, books) => {
            Book.countDocuments((err, count) => {
                // đếm để tính có bao nhiêu trang
                if (err) return next(err);
                res.send(books); // Trả về dữ liệu các sản phẩm theo định dạng như JSON, XML,...
            });
        });
};

export default { pagination };
