import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {colors} from '../../../utils';
import ms from '../../../utils/ms';

const MainButton = ({
  label = '',
  width = 320,
  height = 40,
  // iconStartFAName,
  // iconStartFAColor=colors.silver,
  // iconStartFASolid=false,
  backgroundColor = colors.blue,
  fontSize = 12,
  fontWeight = '700',
  color = colors.white,
  margin = 5,
  alignItem = 'center',
  borderColor = colors.blue,
  borderRadius = 12,
  borderWidth = 0.5,
  ...props
}) => {
  return (
    <TouchableOpacity
      style={[
        ms.wh(width, height),
        ms.mg(margin),
        ms.bc(backgroundColor),
        ms.bdW(borderWidth),
        ms.bdC('#222222'),
        ms.bdR(borderRadius),
        ms.aiJc(),
        ms.bdC(borderColor),
        ms.ai(alignItem)
      ]}
      {...props}
      activeOpacity={0.5}>
      <Text style={[ms.fzBC(fontSize, fontWeight, color)]}>{label}</Text>
    </TouchableOpacity>
  );
};

export default MainButton;

const styles = StyleSheet.create({});
