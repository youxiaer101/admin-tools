import { formatDistance,parseISO } from 'date-fns';


export function formatDateByDistance(dateMs: number) {
    const date = new Date(dateMs * 1000);
    return formatDistance(date, new Date(), { addSuffix: true });
  }

export const reviewStatusList = ["Pending", "Passed", "NotPassed"]

export function convertISODate2TimeStamp(isoStringDate:string):number{

  const date = parseISO(isoStringDate); // 使用 date-fns 解析 ISO 字符串  
  

  return date.getTime(); // 这将返回毫秒级的时间戳  
}