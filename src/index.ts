// #!/usr/bin/env node
// import { argv } from './translate/cli';
// import { TranslateSupplier } from './translate/translate-supplier';

// try {
//   TranslateSupplier.getProvider(argv.apiProvider).translate();
// } catch (e) {
//   if (e instanceof Error) console.log(e.message);
//   else console.log(e);
// }

import { AzureOfficialAPI } from './translate/providers/azure-official-api';
// import { AzureRapidAPI } from './translate/providers/azure-rapid-api';
// import { DeepRapidAPI } from './translate/providers/deep-rapid-api';
// import { GoogleOfficialAPI } from './translate/providers/google-official-api';
// import { LectoRapidAPI } from './translate/providers/lecto-rapid-api';
// import { LingvanexRapidAPI } from './translate/providers/lingvanex-rapid-api';
// import { NLPRapidAPI } from './translate/providers/nlp-rapid-api';
// import { DeepLProAPI } from './translate/providers/deepl-pro-api';
// import { DeepLFreeAPI } from './translate/providers/deepl-free-api';
// import { Translate } from './translate/translate';
// import { Translate } from './translate';

import { JSONObj } from './translate/payload';

interface TransOptions {
  provider: string;
  key: string;
}
export class Trans {
  private readonly provider: any;

  constructor(opts: TransOptions) {
    switch (opts.provider) {
      case 'azure-official':
        this.provider = new AzureOfficialAPI(opts.key);
        break;
      default:
        break;
    }

    if (!opts.key) {
      throw Error('Key is required!');
    }
  }

  translate(data: JSONObj, to: string, from = 'en'): Promise<JSONObj> {
    return this.provider.translate(data, to, from);
  }
}
