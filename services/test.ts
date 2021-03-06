import fetch from '../fetch'

export const getHomePage = async () => {
  const url = 'https://api.github.com/emojis'
  const data = await fetch(url)
  return await data.json()
}
