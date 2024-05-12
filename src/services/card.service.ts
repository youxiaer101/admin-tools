import httpClient from '../utils/requestor';
import type {  CardItem } from '../types/card-types';
import { reviewStatusList } from '../utils/biz-utils'
import type { CardRespBase,Card } from '../types/response-types';

export async function mockLogin(){
  const url = "/auth/login/password";
  await httpClient.post(url,{
    "username": "NovaStorm",
    "password": "nonepassword"
})
}
  export async function queryCardList(query: 
    {
      "UpdatedFrom": number,
      "UpdatedTo": number,
      "UpdateUser": string,
      "ReviewUser": string,
      "ReviewStatus": Array<string>,
      "AType": string,
      "Tags": Array<string>,
      "Word": string,
      "offset": number,
      "size":number
  
  }): Promise<[CardItem[],number]> {

    const url = `/admin/search-card?offset=${query.offset?query.offset:0}&size=${query.size?query.size:5}`;
    const resp = await httpClient.post<CardRespBase>(url, query, {
      disableLoading: true,
    });
  
    return [resp.rows.map(convertCardItem), resp.total];
  }

  export async function getCardDetail(cardId: number | string) : Promise<Card>{
    const url = `/cards/${cardId}`;
  
    const resp = await httpClient.get<Card>(url, {
      disableLoading: true,
    });
    resp.Title = `Choose the picture means "${resp.Asset.Data.Word}"`
   return resp;
  }
  
  function convertCardItem(item: Card): CardItem {
    const card: CardItem = {
      key: item.CardId.toString(),
      title: `Choose the picture means "${item.Asset.Data.Word}"`,
      InUser: item.EditUserName,
      InDate: item.EditDate,
      ReviewUser: item.EditUserName,
      ReviewDate: item.EditDate,
      Tag: [],
      Status: reviewStatusList[item.ReviewStatus]
    };

    return card;
  }
