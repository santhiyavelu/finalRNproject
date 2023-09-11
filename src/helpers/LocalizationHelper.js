import {useEffect} from 'react';
import {useSelector} from 'react-redux';
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

const I18nWrapper = () => {
  const language = useSelector(state => state.language);

  useEffect(() => {
    i18n.locale = language;
  }, [language]);

  return null;
};

export default I18nWrapper;
