export const baseurl = 'https://rentstraight.teamalfy.co.uk/api/v1/tenants'
export const publicUrl = 'https://tenantpulse.space/api/v1'
export const apiKey = 'tpk_midrq21up6ogy5nxdcpoe'

export const fetcher = (...args: Parameters<typeof fetch>) => fetch(...args).then(res => res.json())