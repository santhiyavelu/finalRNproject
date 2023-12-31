import {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {I18n} from 'i18n-js';

import {changeLanguage} from '../feature/localeSlice/LocalSlice';

// Import your language JSON files here
import EN from '../containers/LocaleScreen/en.json';
import FR from '../containers/LocaleScreen/fr.json';

const i18n = new I18n({
  en: EN,
  fr: FR,
});

function useLocale() {
  const dispatch = useDispatch();
  const language = useSelector(state => state.locale.language);

  useEffect(() => {
    i18n.locale = language;
  }, [language]);

  const setLocale = locale => {
    dispatch(changeLanguage(locale));
  };

  return {i18n, setLocale};
}

export default useLocale;
