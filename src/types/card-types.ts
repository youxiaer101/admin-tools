import type { CardType, ContentCardAssetType, QuizCardAssetType } from './enums';

export type CardItem = {
  key: string;
  title: string;
  InUser: string;
  InDate: number;
  ReviewUser: string;
  ReviewDate: number;
  Tag: string[],
  Status:string
};

export type CardDetailItem = {
  cardId: number;
  title: string;
  cardType: CardType;
  assetType: ContentCardAssetType | QuizCardAssetType;
  pinyin: string;
  chinese: string;
  english: string;
  tags: any[];
  audioPath?: string;
  images: string[];
  videos: string[];
  quizType?: string;
  quizData?: any;
  review?: number;
  samples: {
    chinese: string;
    pinyin: string;
    english: string;
  }[];
  nextCard: {
    cardType: CardType;
    cardId?: number;
    lessonId?: number;
  };
  userLiked: boolean;
  characterCard: any;
  userStared: boolean;
};