export default function getCookieValue() {
  const userId = document.cookie
  .split('; ')
  .find(row => row.startsWith('userId='))
  ?.split('=')[1];
  const userName = document.cookie
  .split('; ')
  .find(row => row.startsWith('userName='))
  ?.split('=')[1];
  console.log(userId, userName)
  return {userId, userName }
}