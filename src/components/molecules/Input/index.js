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

const Input = ({label, password, error, onFocus = () => {}, ...props}) => {
  const [hidePassword, setHidePassword] = useState(password);
  const [isFocused, setIsFocused] = useState(false)
  return (
    <View style={[ms.mgB(10)]}>
      <Text style={[styles.label]}>{label}</Text>
      <View style={[styles.cardInput, {borderColor: error ? colors.red : isFocused ? colors.blue : colors.lightblue}]}>
        <TextInput
          secureTextEntry={hidePassword}
          style={[styles.label]}
          autoCorrect={false}
          onFocus={() => {
            onFocus();
            setIsFocused(true)
          }}

          onBlur={()=>{
            setIsFocused(false)
          }}
          {...props}
        />
        {password && (
          <TouchableOpacity
            style={[ms.pdR(20)]}
            onPress={() => {
              setHidePassword(!hidePassword);
            }}>
            <Icon
              name={hidePassword ? 'eye-off' : 'eye'}
              style={[ms.fzBC(14, '400', colors.grey)]}
            />
          </TouchableOpacity>
        )}
      </View>
      {error && (
        <Text style={[ms.fzBC(12, '400', colors.red), ms.mgT(5), ms.mgH(20)]}>{error}</Text>
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
  label: {
    fontSize: 14,
    fontWeight: '400',
    color: colors.black,
    paddingLeft: 20,
    marginVertical: 5,
    // width:(windowWidth * 60) / 100
  },
});
