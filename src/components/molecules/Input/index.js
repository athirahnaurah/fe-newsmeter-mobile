import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {colors} from '../../../utils';
import Icon from 'react-native-vector-icons/Feather';
import ms from '../../../utils/ms';
import {windowWidth} from '../../../utils/ms/constant';

const Input = ({
  height,
  theme,
  label,
  password,
  error,
  onFocus = () => {},
  ...props
}) => {
  const [hidePassword, setHidePassword] = useState(password);
  const [isFocused, setIsFocused] = useState(false);
  return (
    <View style={[ms.mgT(5), ms.mgB(10), ms.height(height)]}>
      <Text style={[theme === 'dark' ? styles.labelD : styles.label]}>
        {label}
      </Text>
      <View
        style={[
          theme === 'dark' ? styles.cardInputD : styles.cardInput,
          {
            borderColor: error
              ? theme === 'dark'
                ? colors.red_dark
                : colors.red
              : isFocused
              ? theme === 'dark'
                ? colors.blue_dark
                : colors.blue
              : theme === 'dark'
              ? colors.grey_dark
              : colors.lightblue,
          },
        ]}>
        <TextInput
          secureTextEntry={hidePassword}
          style={[
            theme === 'dark' ? styles.labelD : styles.label,
            ms.width((windowWidth * 80) / 100),
          ]}
          autoCorrect={false}
          onFocus={() => {
            onFocus();
            setIsFocused(true);
          }}
          onBlur={() => {
            setIsFocused(false);
          }}
          {...props}
        />
        {/* field password */}
        {password && (
          <TouchableOpacity
            style={[]}
            onPress={() => {
              setHidePassword(!hidePassword);
            }}>
            <Icon
              name={hidePassword ? 'eye-off' : 'eye'}
              style={[
                theme === 'dark'
                  ? ms.fzBC(14, '400', colors.white)
                  : ms.fzBC(14, '400', colors.grey),
                ms.pdR(20),
              ]}
            />
          </TouchableOpacity>
        )}
      </View>
      {/* error validation */}
      {error && (
        <Text
          style={[
            theme === 'dark'
              ? ms.fzBC(12, '400', colors.red_dark)
              : ms.fzBC(12, '400', colors.red),
            ms.mgT(5),
            ms.mgH(20),
          ]}>
          {error}
        </Text>
      )}
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  cardInput: {
    marginHorizontal: 20,
    backgroundColor: colors.lightblue,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    justifyContent: 'space-between',
    height: 50,
  },
  cardInputD: {
    marginHorizontal: 20,
    backgroundColor: colors.grey_dark,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    justifyContent: 'space-between',
    height: 50,
  },
  label: {
    fontSize: 14,
    fontWeight: '400',
    color: colors.black,
    paddingLeft: 20,
    marginVertical: 5,
    // width:(windowWidth * 60) / 100
  },
  labelD: {
    fontSize: 14,
    fontWeight: '400',
    color: colors.white,
    paddingLeft: 20,
    marginVertical: 5,
    // width:(windowWidth * 60) / 100
  },
});
