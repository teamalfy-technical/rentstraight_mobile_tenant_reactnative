export const baseurl = 'https://rentstraight.teamalfy.co.uk/api/v1/tenants'

export const fetcher = (...args: Parameters<typeof fetch>) => fetch(...args).then(res => res.json())