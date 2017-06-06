import {listOfCountries} from './list-of-countries'

export const genderList = ['male', 'female']

export const isValidCountry = value => listOfCountries.includes(value)

export const isValidDate = value => !!Date.parse(value)

export const isValidGender = value => genderList.includes(value)

export const isValidField = ({field, value}) => {
  switch (field) {
    case 'expirationDate':
    case 'birthDate':
      return isValidDate(value)
    case 'gender':
      return isValidGender(value)
    case 'country':
    case 'birthCountry':
      return isValidCountry(value)
    default:
      return value.length > 0
  }
}

export const mapBackendToState = (state, {result}) => state.mergeDeep({
  showErrors: false,
  loaded: true,
  passport: {
    locations: result.locations,
    number: {value: result.number, valid: true},
    expirationDate: {value: result.expirationDate, valid: true},
    firstName: {value: result.firstName, valid: true},
    lastName: {value: result.lastName, valid: true},
    gender: {value: result.gender, valid: true},
    birthDate: {value: result.birthDate, valid: true},
    birthPlace: {value: result.birthPlace, valid: true},
    birthCountry: {value: result.birthCountry, valid: true},
    physicalAddress: {
      streetWithNumber: {value: result.physicalAddress.streetWithNumber, valid: true}, // eslint-disable-line max-len
      zip: {value: result.physicalAddress.zip, valid: true},
      city: {value: result.physicalAddress.city, valid: true},
      state: {value: result.physicalAddress.state, valid: true},
      country: {value: result.physicalAddress.country, valid: true}
    }
  }
})

export const setPhysicalAddressField = (state, {field, value}) => state.mergeIn(
  ['passport', 'physicalAddress', field], {
    value,
    valid: isValidField({field, value})
  })

export const changeFieldValue = (state, {field, value}) => state.mergeIn(
  ['passport', field], {
    value,
    valid: isValidField({field, value})
  })

export const checkForNonValidFields = (reduxState) => {
  const {
    locations,
    number,
    expirationDate,
    firstName,
    lastName,
    gender,
    birthDate,
    birthPlace,
    birthCountry
  } = reduxState.toJS().passport
  const {streetWithNumber, zip, city, state, country} = reduxState
    .toJS().passport.physicalAddress
  const fields = [
    locations, number, expirationDate, firstName, lastName, gender, birthDate,
    birthPlace, birthCountry, streetWithNumber, zip, city, state, country
  ]
  const showErrors = !fields.every(({value, valid}) => valid || value === '')
  return reduxState.merge({showErrors})
}

export const storePassportDetailsInSolid = ({backend, services, passport, webId}) => { // eslint-disable-line max-len
  let solidAgent = backend.solid
  const operations = {
    set: solidAgent.setIdCard.bind(solidAgent),
    update: solidAgent.deleteEntry.bind(solidAgent),
    remove: solidAgent.updateEntry.bind(solidAgent)
  }

  return operations.set()
}
