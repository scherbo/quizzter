export const isServer = () => typeof window === 'undefined'

export const hasError = (meta: Record<string, any> = {}) => {
  const { submitError, dirtySinceLastSubmit, error, touched } = meta

  return (error || (submitError && !dirtySinceLastSubmit)) && touched
}

export const getLocaleDate = ({ value, type = 'date' }: { value: string; type?: 'full' | 'date' | 'time' }) => {
  const constructedDate = new Date(value)

  return type === 'full'
    ? constructedDate.toLocaleString()
    : type === 'date'
    ? constructedDate.toLocaleDateString()
    : constructedDate.toLocaleTimeString()
}
