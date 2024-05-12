export type CardRespBase = {  
  total: number;  
  rows: Card[];  
};  
export type Card = {  
  CardId: number;  
  Type: string;  
  HSK3Level: number;  
  Title?: string; // 如果 Title 总是 null，可以将其定义为可选类型，但通常我们会考虑是否有其他可能的值  
  TitleEnglish?: null;  
  TitlePinyin?: null;  
  CardType: string;
  AType: string;  
  Asset: Asset;  
  Stars: number;  
  Likes: number;  
  Clicks: number;  
  Finish: number;  
  Review: number;  
  EditDate: number; // 通常是一个时间戳  
  EditUser: number;  
  EditUserName: string;  
  ReviewStatus: number;  
  ReviewUser?: null | number; // 可能是 null 或者一个数字  
  ReviewUserName?: null | string; // 可能是 null 或者一个字符串  
  Tags?:null|Array<string>
};  
type Asset = {  
  Data: AssetData;  
  Type: string;  
  Enabled: boolean;  
}; 
type AssetData = {  
  Word: string;
    Audio: string;
    Answer: string;
    Options: string[];
    Newwords: string;
    BaseUrl: string;  
};  

