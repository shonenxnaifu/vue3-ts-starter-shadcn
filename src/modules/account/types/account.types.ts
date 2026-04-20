interface Company {
  department: string
  name: string
  title: string
  address: {
    address: string
    city: string
    state: string
    stateCode: string
    postalCode: string
    coordinates: {
      lat: number
      lng: number
    }
    country: string
  }
}

export interface AccountProfile {
  id: number
  username: string
  email: string
  firstName: string
  lastName: string
  gender: string
  image: string
  bloodGroup: string
  phone: string
  age: number
  birthDate: string
  company: Company
}
