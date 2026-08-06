// composables/useLoaderState.js
export const useLoaderState = () => {
  // Defaults to false. It will be set to true once the loader animation finishes.
  return useState('isLoaderFinished', () => false)
}