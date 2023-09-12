import {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {I18n} from 'i18n-js';
import {changeLanguage} from '../feature/localeSlice/LocalSlice';

const i18n = new I18n({
  en: {
    hello: 'Hello',
    maps: 'MAPS',
    dashboard: 'Dashboard',
    welcome: 'Welcome!',
    haveANiceDay: 'Have a Nice day.',
  },
  fr: {
    hello: 'Bonjour',
    maps: 'CARTES',
    dashboard: 'Tableau de bord',
    welcome: 'Bienvenue!',
    haveANiceDay: 'Passez une bonne journée.',
  },
});

function useLocale() {
  const dispatch = useDispatch();
  const language = useSelector(state => state.locale.language);

  useEffect(() => {
    i18n.locale = language;
  }, [language]);

  const setLocale = locale => {
    dispatch(changeLanguage(locale)); // Dispatch the Redux action to update the language
  };

  return {i18n, setLocale};
}

export default useLocale;
