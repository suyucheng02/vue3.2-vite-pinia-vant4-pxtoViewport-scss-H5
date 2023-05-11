import service from '@/utils/request'
export function getAoth() {
  return service.post(
    'http://faceid.tencentcloudapi.com',
    {
      Product: 'faceid',
      Action: 'DetectAuth',
      SecretId: 'AKIDwmRyIiy2GH5f2BBzc1CAxWuADzb0DBxX ',
      SecretKey: 'RdaMwWv9AxGWbU8bv42oMgmgQ0OaYIyY',
      JsonData: { RuleId: '1' }
    },
    {
      headers: { 'Content-Type': 'application/json' }
    }
  )
}
