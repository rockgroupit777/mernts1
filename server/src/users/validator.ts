import Joi from 'joi';
export const userSchema = Joi.object({
  username: Joi.string().alphanum().min(2).max(50).trim().required().label("UserName"),
  email: Joi.string()
  .email({ minDomainSegments: 2 })
  .trim()
  .required()
  .label("Email"),
  password: Joi.string()
  .pattern(new RegExp('^[a-zA-Z0-9]{8,100}$'))
  .message(
    "password must have at least one uppercase letter, one lowercase letter and one digit"
  )
  .required()
  .label("Password"),
  repeatPassword: Joi.ref("password"),
  firstName: Joi.string().max(50).trim().label("FirstName"),
  lastName: Joi.string().max(50).trim().label("LastName"),
  access_token: [
    Joi.string(),
    Joi.number()
  ],
  avatar: Joi.string().label("Avatar")
})
  .with('email','password')
  .xor('password','access_token')
  .with('password','repeatPassword');


