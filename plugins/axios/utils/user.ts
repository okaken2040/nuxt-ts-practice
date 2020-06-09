import { axios } from '../index'
import { User } from '@/types/user'

export const UserApi = {
  findAll(): Array<User> {
    return axios.$get(`api/user`)
  },
  findById(id: number): User {
    return axios.$get(`api/user/${id}`)
  },
  create(user: User): User {
    return axios.$post(`api/user`, user)
  }
}
