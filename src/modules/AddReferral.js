import DaveURL from './DaveURL.js'
export default function (string) {
  if (string.includes(DaveURL())) {
    const sIndex = string.indexOf('?')
    const newReferral = '?ref=' + window.location
    if (sIndex > -1) {
      string = string.substring(0, string.indexOf('?')) + newReferral
    } else {
      string += newReferral
    }
  }
  return string
}
