import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import crypto from 'crypto';
import { decode, encode } from 'html-entities';
import { argv } from '../cli';
import { AzureTranslateResponse, JSONObj } from '../payload';
import { Translate } from '../translate';
import { addCustomCert } from '../util';

export class AzureRapidAPI extends Translate {
  private static readonly endpoint: string = 'microsoft-translator-text.p.rapidapi.com';
  private static readonly axiosConfig: AxiosRequestConfig = {
    headers: {
      'X-ClientTraceId': crypto.randomUUID(),
      'X-RapidAPI-Host': AzureRapidAPI.endpoint,
      'X-RapidAPI-Key': argv.key,
      'Content-type': 'application/json',
    },
    params: {
      'api-version': '3.0',
      from: argv.from,
      to: argv.to,
    },
    responseType: 'json',
  };

  constructor() {
    super();
    if (argv.certificatePath) AzureRapidAPI.axiosConfig.httpsAgent = addCustomCert(argv.certificatePath);
  }

  protected callTranslateAPI = (valuesForTranslation: string[], originalObject: JSONObj, saveTo: string): void => {
    axios
      .post(
        `https://${AzureRapidAPI.endpoint}/translate`,
        [{ text: encode(valuesForTranslation.join(Translate.sentenceDelimiter)) }],
        AzureRapidAPI.axiosConfig,
      )
      .then((response) => {
        const value = (response as AzureTranslateResponse).data[0].translations[0].text;
        this.saveTranslation(decode(value), originalObject, saveTo);
      })
      .catch((error) => this.printAxiosError(error as AxiosError, saveTo));
  };
}
