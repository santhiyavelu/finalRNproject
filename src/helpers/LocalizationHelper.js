import {I18n} from 'i18n-js';

const i18n = new I18n({
  en: {
    hello: 'Hello',
  },
  ur: {
    hello: 'Haan jee',
  },
  fr: {
    hello: 'Bonjour',
  },
});

i18n.locale = 'fr';

export default i18n;
