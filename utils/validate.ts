import * as yup from 'yup'
import { SigninState, SignupState } from '#root/types'

const isDefined = (value: any) => value !== null && value !== undefined

const createNestedField = (path: string, value: any) => {
  const keys = path
    .split(/(\[\d\])(\.)/i)
    .filter((key) => key !== '.')
    .map((key) => {
      const found = key.match(/\d/)
      return found ? Number(found[0]) : key
    })

  const { acc: nestedObject } = keys.reduceRight<{ acc: Record<string, any>; cachedIndex: number | null }>(
    ({ acc, cachedIndex }, curr, i) => {
      // it's an index of an array - cache it and apply in the next iteration
      if (typeof curr === 'number') {
        return {
          acc: {
            ...acc,
          },
          cachedIndex: curr,
        }
      }

      // if there is cachedIndex - current key is an array
      if (isDefined(cachedIndex)) {
        let emptyArray: any = []
        emptyArray[cachedIndex!] = acc

        return {
          acc: {
            [curr]: emptyArray,
          },
          cachedIndex: null,
        }
      }

      // otherwise nest
      return {
        acc: {
          [curr]: i === keys.length - 1 ? value : acc,
        },
        cachedIndex,
      }
    },
    {
      acc: {},
      cachedIndex: null,
    }
  )

  return nestedObject
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

const builderSchema = yup.object().shape({
  title: yup.string().required('Title is required'),
  description: yup.string().required('Description is required'),
  questions: yup.array().of(
    yup.object().shape({
      question: yup.string().required('Question is required'),
      answers: yup.array().of(
        yup.object().shape({
          answer: yup.string().required('Answer is required'),
          correct: yup.boolean(),
        })
      ),
    })
  ),
})

export const validateSigninForm = (values: SigninState) => validateYupSchema(signinSchema, values)
export const validateSignupForm = (values: SignupState) => validateYupSchema(signupSchema, values)
export const validateBuilderForm = (values: Record<string, any>) => validateYupSchema(builderSchema, values)
