// eslint-disable-next-line import/no-mutable-exports
export let axios: any

export default ({ $axios }: { $axios: any }) => {
  axios = $axios
}
