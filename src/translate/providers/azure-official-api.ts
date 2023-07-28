import axios from 'axios';
import crypto from 'crypto';
import { decode, encode } from 'html-entities';
import { AzureTranslateResponse, JSONObj } from '../payload';
import { Translate } from '../translate';

export class AzureOfficialAPI extends Translate {
  private readonly endpoint: string = 'https://api.cognitive.microsofttranslator.com/translate';

  protected callTranslateAPI = (
    valuesForTranslation: string[],
    originalObject: JSONObj,
    to: string,
    from: string,
  ): Promise<JSONObj> => {
    return new Promise((resolve, reject) => {
      axios
        .post(
          this.endpoint,
          [{ text: encode(valuesForTranslation.join(this.sentenceDelimiter)) }],
          // params
          {
            headers: {
              'Ocp-Apim-Subscription-Key': this.key,
              'Ocp-Apim-Subscription-Region': 'global',
              'Content-type': 'application/json',
              'X-ClientTraceId': crypto.randomUUID(),
            },
            params: { 'api-version': '3.0', from, to },
            responseType: 'json',
          },
        )
        .then((response) => {
          const value = (response as AzureTranslateResponse).data[0].translations[0].text;
          const content = this.saveTranslation(decode(value), originalObject);
          resolve(content);
        })
        .catch((e) => {
          reject(e.message);
        });
    });
  };
}
