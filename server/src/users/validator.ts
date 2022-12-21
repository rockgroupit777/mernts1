import Joi from 'joi';

  const username= Joi.string().alphanum().min(2).max(50).trim().required().label("UserName");
  const email= Joi.string()
  .email({ minDomainSegments: 2 })
  .trim()
  .required()
  .label("Email");
  const password= Joi.string()
  .pattern(new RegExp('^[a-zA-Z0-9]{8,100}$'))
  .message(
    "password must have at least one uppercase letter, one lowercase letter and one digit"
  )
  .required()
  .label("Password");
  const repeatPassword= Joi.ref("password");
  const firstName= Joi.string().max(50).trim().label("FirstName");
  const lastName = Joi.string().max(50).trim().label("LastName");
  const access_token= [
    Joi.string(),
    Joi.number()
  ];
  const avatar= Joi.string().label("Avatar");

export const signUpValidate = Joi.object().keys({
  username,
  email,
  password,
  repeatPassword,
  firstName,
  lastName,
  avatar
})
export const signInValidate = Joi.object().keys({
  email,
  password
})
export const updateUserValidate = Joi.object().keys({
  password,
  repeatPassword,
  firstName,
  lastName,
  avatar
})
