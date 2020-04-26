import * as yup from 'yup'
import { SigninState, SignupState } from '#root/types'

const createNestedField = (path: string, value: any) => {
  const keys = path.split('.')
  return keys.reduceRight((obj, key, i) => ({ [key]: i === keys.length - 1 ? value : obj }), {})
}

const validateYupSchema = async (schema: yup.ObjectSchema, values: Record<string, any>) => {
  try {
    await schema.validate(values, { abortEarly: false })
  } catch (errors) {
    const { inner } = errors

    const obj = inner.reduce((errorsAcc: Record<string, any>, currentError: { path: string; message: string }) => {
      if (currentError.path.includes('.')) {
        return {
          ...errorsAcc,
          ...createNestedField(currentError.path, currentError.message),
        }
      }

      return {
        ...errorsAcc,
        [currentError.path]: currentError.message,
      }
    }, {})

    return obj
  }
}

const signinSchema = yup.object().shape({
  email: yup.string().email().required('Email is required'),
  password: yup.string().required('Password is required'),
})

const signupSchema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().required('Email is required'),
  password: yup.string().min(5, 'Password should be at least 5 symbols long').required('Password is required'),
  passwordRepeat: yup
    .string()
    .required()
    .when('password', (password: string, schema: yup.ObjectSchema) => {
      return schema.test({
        test: (passwordRepeat: string) => passwordRepeat === password,
        message: 'password should match',
      })
    }),
})

export const validateSigninForm = (values: SigninState) => validateYupSchema(signinSchema, values)
export const validateSignupForm = (values: SignupState) => validateYupSchema(signupSchema, values)
