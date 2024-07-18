import { check, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

export let validatorParams = [
    check('password').isLength({ min: 8, max: 15 }),
    check('confirmPassword')
        .isLength({ min: 8, max: 15 })
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error('Password confirmation does not match password');
            }
            return true;
        }),
];

export function validator(req: Request, res: Response, next: NextFunction) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    next();
}
