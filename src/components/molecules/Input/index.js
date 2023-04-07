import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import {colors} from '../../../utils';
import Icon from 'react-native-vector-icons/Feather';
import ms from '../../../utils/ms';
import { windowWidth } from '../../../utils/ms/constant';

const Input = ({label, password, nama, email, pass, search, ...props}) => {
  const [hidePassword, setHidePassword] = useState(password);

  return (
    <View>
      <Text style={[styles.textInput]}>{label}</Text>
      <View style={[styles.cardInput]}>
        <TextInput
          secureTextEntry={hidePassword}
          style={[styles.textInput]}
          {...props}
        />
        {password && (
          <TouchableOpacity style={[ms.pdR(20)]} onPress={() => {setHidePassword(!hidePassword)}}>
            <Icon name={hidePassword ? "eye-off" : "eye"} style={[ms.fzBC(14, '400', colors.grey)]} />
          </TouchableOpacity>
        )}
      </View>
      {/* {nama && (
          <View style={[ms.pdH(25), ms.pdB(8)]}>
            <Text style={[ms.fzBC(12, '500', '#D9435E')]}>Nama perlu diisi</Text>
          </View>
      )}
      {email && (
          <View style={[ms.pdH(25), ms.pdB(8)]}>
            <Text style={[ms.fzBC(12, '500', '#D9435E')]}>Email perlu diisi</Text>
          </View>
      )}
      {pass && (
          <View style={[ms.pdH(25), ms.pdB(8)]}>
            <Text style={[ms.fzBC(12, '500', '#D9435E')]}>Password perlu diisi</Text>
          </View>
      )} */}

    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  cardInput: {
    marginHorizontal: 20,
    marginVertical: 10,
    backgroundColor: colors.lightblue,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textInput: {
    fontSize: 13,
    fontWeight: '400',
    color: colors.black,
    paddingLeft: 20,
    // width:(windowWidth * 60) / 100
  },
});
