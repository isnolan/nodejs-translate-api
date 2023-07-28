// import { argv } from './cli';
import { JSONObj } from './payload';
import { replaceAll } from './util';

export abstract class Translate {
  protected readonly key: string = '';
  protected readonly sentenceDelimiter: string = '\n{|}\n';
  protected readonly skipWordRegex: RegExp = /({{([^{}]+)}}|<([^<>]+)>|<\/([^<>]+)>|\{([^{}]+)\})/g;
  private skippedWords: string[] = [];

  constructor(key: string) {
    this.key = key;
  }

  public translate = (fileForTranslation: JSONObj, to: string, from = 'en'): Promise<JSONObj> => {
    const valuesForTranslation: string[] = this.getValuesForTranslation(fileForTranslation);
    return this.callTranslateAPI(valuesForTranslation, fileForTranslation, to, from);
  };

  private getValuesForTranslation = (object: JSONObj): string[] => {
    let values: string[] = [];

    (function findValues(json: JSONObj): void {
      Object.values(json).forEach((value) => {
        if (typeof value === 'object') findValues(value);
        else values.push(value);
      });
    })(object);

    values = values.map((value) => this.skipWords(value));
    return values;
  };

  private skipWords(value: string): string {
    return value.replace(this.skipWordRegex, (match: string) => {
      this.skippedWords.push(match.trim());
      return `{{${this.skippedWords.length - 1}}}`;
    });
  }

  protected abstract callTranslateAPI: (
    valuesForTranslation: string[],
    originalObject: JSONObj,
    to: string,
    from: string,
  ) => Promise<JSONObj>;

  // protected printAxiosError = (error: AxiosError, saveTo: string): void => {
  //   const errorFilePath = saveTo.replace(`${argv.to}.json`, `${argv.from}.json`);
  //   console.error(`Request error for file: ${errorFilePath}`);
  //   if (error.response?.status && error.response.statusText && error.response.data) {
  //     console.log(`Status Code: ${error.response?.status}`);
  //     console.log(`Status Text: ${error.response?.statusText}`);
  //     console.log(`Data: ${JSON.stringify(error.response?.data)}`);
  //   } else {
  //     console.log(error.message);
  //   }
  // };

  protected saveTranslation = (value: string, originalObject: JSONObj) => {
    // replaceAll() is used because of weird bug that sometimes happens
    // when translate api return delimiter with space in between
    let translations = replaceAll(value, '{| }', '{|}');
    translations = replaceAll(translations, '{ |}', '{|}');
    const content: JSONObj = this.createTranslatedObject(
      translations.split(this.sentenceDelimiter.trim()),
      originalObject,
    );
    return content;
  };

  private createTranslatedObject = (translations: string[], originalObject: JSONObj): JSONObj => {
    translations = translations.map((value) => this.returnSkippedWords(value));
    const translatedObject: JSONObj = { ...originalObject };
    let index: number = 0;

    (function addTranslations(json: JSONObj): void {
      Object.keys(json).forEach((key: string) => {
        if (typeof json[key] === 'object') addTranslations(json[key] as JSONObj);
        else json[key] = translations[index++]?.trim();
      });
    })(translatedObject);

    return translatedObject;
  };

  private returnSkippedWords(value: string): string {
    return value.replace(this.skipWordRegex, () => `${this.skippedWords.shift()}`);
  }
}
