
export default function () {
  if (process.env.NODE_ENV === 'production') {
    return 'https://honeycomb.library.nd.edu'
  } else if (process.env.NODE_ENV === 'preproduction') {
    return 'https://honeycombpprd-vm.library.nd.edu'
  } else {
    return 'https://localhost:3017'
    // return 'https://honeycomb.library.nd.edu'
  }
}
