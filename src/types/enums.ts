export enum CardType {
    /**
     * 内容卡
     */
    ContentCard = 'C',
  
    /**
     * 测验卡（练习卡）
     */
    QuizCard = 'E',
  
    /**
     * 课程卡，也算是一种卡片类型
     */
    LessionCard = 'T',
  }
  
  export enum ContentCardAssetType {
    /**
     * 字
     */
    Character = 'Character',
  
    /**
     * 词
     */
    Phrase = 'Phrase',
  
    /**
     * 文章
     */
    Article = 'Article',
  
    /**
     * 对话
     */
    Dialog = 'Dialog',
  }
  
  export enum QuizStyleMode {
    Choose = 'Choose',
    Translate = 'Translate',
    Match = 'Match',
    Writing = 'Writing',
    Reading = 'Reading',
    TrueOrFalse = 'TrueOrFalse',
    SortWords = 'SortWords',
    FillWords = 'FillWords',
    MatchDialog = 'MatchDialog',
    TrueFalse = 'TrueFalse',
    Choose_A2I = 'Choose_A2I',
    Choose_IC = 'Choose_IC',
  }
  
  export enum QuizCardAssetType {
    /**
     * 根据音频选汉字
     */
    ChooseChineseByAudio = 'Choose_A-C',
  
    /**
     * 根据音频选图片
     */
    Choose_A2I = 'Choose_A-I',
  
    /**
     * 根据音频选图片
     */
    ChooseImageByAudio = 'Dialogue_I',
  
    /**
     * 根据拼音选汉字
     */
    ChooseChineseByPinyin = 'Choose_P-C',
  
    /**
     * 根据图片选汉字
     */
    ChooseChineseByImage = 'Choose_C-I',
  
    /**
     * 选词填空
     */
    ChooseChinseBySpace = 'Dialogue_FC',
  
    /**
     * 中英文匹配
     */
    MatchChinseAndEnglish = 'Match_CE',
  
    /**
     * 中文拼音匹配
     */
    MatchPinyinAndChinse = 'Match_PC',
  
    /**
     * 中文翻译到英文
     */
    TranslateEnglish2Chinese = 'Translate_E-C',
  
    /**
     * 英文翻译到中文
     */
    TranslateChinese2English = 'Translate_C-E',
  
    /**
     * 汉字书写练习
     */
    WritingChinese = 'Writing_C',
  
    /**
     * 阅读理解 - 选择题
     */
    ReadingChoose = 'Reading_Choose',
  
    /**
     * 阅读理解 - 判断题
     */
    ReadingTrueFalse = 'Reading_TrueFalse',
  
    /**
     * 根据音频判断图片是否正确
     */
    Dialogue_CI = 'Dialogue_CI',
  
    /**
     * 阅读内容做判断题
     */
    Dialogue_CC = 'Dialogue_CC',
  
    /**
     * 组句
     */
    Sort_Words = 'Sort_Words',
  
    Fill_Words = 'Fill_Words',
  
    Match_Dialog = 'Match_Dialog',
  
    /**
     * 音频和图片是否匹配
     */
    TrueFalse_A2I = 'TrueFalse_A-I',
  
    /**
     * 词语和图片是否匹配
     */
    TrueFalse_CI = 'TrueFalse_C-I',
  
    /**
     * 根据图片选词语
     */
    Choose_IC = 'Choose_I-C',
  }
  
  export enum CardMediaTypes {
    Image = 'I',
    Audio = 'A',
    Video = 'V',
  }
  export enum ReviewStatus{
    Pending =0,
    Passed=1,
    NotPassed=2
  }
  export const reviewStatusMapping : { [key: number]: string } = {  
    [ReviewStatus.Pending]: 'Pending',  
    [ReviewStatus.Passed]: 'Passed',  
    [ReviewStatus.NotPassed]: 'NotPassed'  
};  