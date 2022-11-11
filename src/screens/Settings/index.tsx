import ListTitle from '@Components/container/ListTitle';
import {useAppSelector} from '@Redux/hooks';
import {Box, Divider, FlatList, Icon, useColorMode} from 'native-base';
import React, {useCallback, useMemo} from 'react';
import {useTranslation} from 'react-i18next';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import FlagUK from '@Assets/icons/flag-uk.svg';
import FlagVN from '@Assets/icons/flag-vn.svg';

const SettingsScreen = () => {
  const {t, i18n} = useTranslation();
  const {colorMode, toggleColorMode} = useColorMode();
  const language = useAppSelector(state => state.system.language);

  const isLight = useMemo(() => colorMode === 'light', [colorMode]);

  const toggleLanguage = useCallback(() => {
    i18n.changeLanguage(language === 'en' ? 'vi' : 'en');
  }, [i18n, language]);

  const menuItems = useMemo(
    () => [
      {
        title: isLight
          ? t('settings.switchDarkMode')
          : t('settings.switchLightMode'),
        onPress: toggleColorMode,
        leftComponent: (
          <Icon
            name="settings-display"
            as={MaterialIcons}
            size="md"
            ml={1}
            alignSelf="center"
          />
        ),
        rightComponent: (
          <Icon
            name={isLight ? 'sun' : 'moon'}
            as={Feather}
            size="md"
            ml={1}
            alignSelf="center"
          />
        ),
      },
      {
        title: t('settings.switchLanguage'),
        onPress: toggleLanguage,
        leftComponent: (
          <Icon
            name="language"
            as={MaterialIcons}
            size="md"
            ml={1}
            alignSelf="center"
          />
        ),
        rightComponent: (
          <Icon
            as={language === 'en' ? FlagUK : FlagVN}
            size="xl"
            ml={1}
            alignSelf="center"
          />
        ),
      },
      {
        title: t('settings.notification'),
        leftComponent: (
          <Icon
            name="notification"
            as={Entypo}
            size="md"
            ml={1}
            alignSelf="center"
          />
        ),
      },
    ],
    [isLight, language, t, toggleColorMode, toggleLanguage],
  );

  return (
    <Box flex={1}>
      <FlatList
        data={menuItems}
        keyExtractor={(item, index) => `${item.title}${index}`}
        ItemSeparatorComponent={() => <Divider opacity={0.3} />}
        renderItem={({item, index}) => (
          <ListTitle
            key={index}
            title={item.title}
            backgroundColor="transparent"
            leftComponent={item.leftComponent}
            rightComponent={item.rightComponent}
            onPress={item.onPress}
          />
        )}
      />
    </Box>
  );
};

export default SettingsScreen;
