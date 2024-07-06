import { check, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

export let validatorParams = [
    check('name').isLength({ min: 1, max: 150 }).isString(),
    check('lastName').isLength({ min: 1, max: 150 }).isString(),
    check('phoneNumber').isLength({ min: 10, max: 10 }).isString(),
    check('age').isNumeric(),
    check('document').isLength({ min: 10, max: 10 }).isString(),
    check('address').isLength({ min: 1 }).isString(), // Ajustado el min length para no estar vacío
    check('email').isEmail(),
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
