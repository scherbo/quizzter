export const isServer = () => typeof window === 'undefined'

export const hasError = (meta: Record<string, any> = {}) => {
  const { submitError, dirtySinceLastSubmit, error, touched } = meta

  return (error || (submitError && !dirtySinceLastSubmit)) && touched
}
