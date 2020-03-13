// Reusable styles
const lightIconStyle = () => {
  return {
    color: 'white',
    fontSize: '18px',
    verticalAlign: 'text-bottom',
    minWidth: '26px',
  }
}

const darkIconStyle = () => {
  return {
    fontSize: '18px',
    verticalAlign: 'text-bottom',
    minWidth: '26px',
  }
}

const cardHeadersCommon = () => {
  return {
    fontFamily: 'GPCMed',
  }
}

const pageWidth = () => {
  return {
    // maxWidth: '960px',
    margin: '0 8%',
  }
}

export default {
  lightIconStyle,
  darkIconStyle,
  cardHeadersCommon,
  pageWidth,
}
