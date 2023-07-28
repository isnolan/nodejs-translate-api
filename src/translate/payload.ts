type JSONValue = string | { [x: string]: JSONValue };

export interface JSONObj {
  [x: string]: JSONValue;
}

export interface AzureTranslateResponse {
  data: [{ translations: [{ text: string }] }];
}

export interface DeepTranslateResponse {
  data: { data: { translations: { translatedText: string } } };
}

export interface LectoTranslateResponse {
  data: { translations: [{ translated: string[] }] };
}

export interface LingvanexTranslateResponse {
  data: { result: string };
}

export interface NLPTranslateResponse {
  data: { translated_text: { [x: string]: string } };
}

export interface DeepLTranslateResponse {
  data: { translations: [{ text: string; detected_source_language: string }] };
}
