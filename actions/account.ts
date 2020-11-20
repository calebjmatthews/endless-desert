export const CHANGE_SETTING = 'CHANGE_SETTING';
export function changeSetting(name: string, value: any) {
  return {
    type: CHANGE_SETTING,
    name: name,
    value: value
  }
}
