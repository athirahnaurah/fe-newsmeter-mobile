import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {colors} from '../colors';

const ms = StyleSheet.create({
  containerPage: {
    backgroundColor: 'white',
    flex: 1,
  },
  fzC: (fontSize = 12, color = colors?.black) => ({
    fontSize: fontSize,
    color: color,
  }),
  fzBC: (fontSize = 12, fontWeight = 'bold', color = 'black') => ({
    fontSize: fontSize,
    fontWeight: fontWeight,
    color: color,
  }),
  fzBCLh: (
    fontSize = 12,
    fontWeight = 'bold',
    color = colors?.black,
    lineHeight = 10,
  ) => ({
    fontSize: fontSize,
    fontWeight: fontWeight,
    color: color,
    lineHeight: lineHeight,
  }),
  pd: padding => ({
    padding: padding,
  }),
  pdH: paddingHorizontal => ({
    paddingHorizontal: paddingHorizontal,
  }),
  pdV: paddingVertical => ({
    paddingVertical: paddingVertical,
  }),
  pdT: paddingTop => ({
    paddingTop: paddingTop,
  }),
  pdR: paddingRight => ({
    paddingRight: paddingRight,
  }),
  pdB: paddingBottom => ({
    paddingBottom: paddingBottom,
  }),
  pdL: paddingLeft => ({
    paddingLeft: paddingLeft,
  }),
  mg: margin => ({
    margin: margin,
  }),
  mgH: marginHorizontal => ({
    marginHorizontal: marginHorizontal,
  }),
  mgV: marginVerticall => ({
    marginVerticall: marginVerticall,
  }),
  mgT: marginTop => ({
    marginTop: marginTop,
  }),
  mgR: marginRight => ({
    marginRight: marginRight,
  }),
  mgB: marginBottom => ({
    marginBottom: marginBottom,
  }),
  mgL: marginLeft => ({
    marginLeft: marginLeft,
  }),

  fz6: {
    fontSize: 6,
  },
  fz7: {
    fontSize: 7,
  },
  fz8: {
    fontSize: 8,
  },
  fz9: {
    fontSize: 9,
  },
  txA: textAlign => ({
    textAlign: textAlign,
  }),
  txC: color => ({
    color: color,
  }),
  as: (alignSelf = 'flex-end') => ({
    alignSelf: alignSelf,
  }),
  ai: (alignItems = 'center') => ({
    alignItems: alignItems,
  }),
  jc: (justifyContent = 'center') => ({
    justifyContent: justifyContent,
  }),
  aiJc: (alignItems = 'center', justifyContent = 'center') => ({
    alignItems: alignItems,
    justifyContent: justifyContent,
  }),
  idr: {
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row',
  },
  col: (width = '100%') => ({
    width: width,
  }),
  container: (width = '100%', height = '100%') => ({
    width: width,
    height: height,
  }),
  width: (width = 20) => ({
    width: width,
  }),
  height: (height = 20) => ({
    height: height,
  }),
  wh: (width = 20, height = 20) => ({
    width: width,
    height: height,
  }),
  bdR: borderRadius => ({
    borderRadius: borderRadius,
  }),
  bdRBLR: (borderBottomLeftRadius = 0) => ({
    borderBottomLeftRadius: borderBottomLeftRadius,
  }),
  bdRBRR: (borderBottomRightRadius = 0) => ({
    borderBottomRightRadius: borderBottomRightRadius,
  }),
  bdRTLR: (borderTopLeftRadius = 0) => ({
    borderTopLeftRadius: borderTopLeftRadius,
  }),
  bdRTRR: (borderTopRightRadius = 0) => ({
    borderTopRightRadius: borderTopRightRadius,
  }),
  bdW: borderWidth => ({
    borderWidth: borderWidth,
  }),
  bdTw: (borderTopWidth = 0.5) => ({
    borderTopWidth: borderTopWidth,
  }),
  bdBw: (borderBottomWidth = 0.5) => ({
    borderBottomWidth: borderBottomWidth,
  }),
  bdLw: (borderLeftWidth = 0.5) => ({
    borderLeftWidth: borderLeftWidth,
  }),
  bdRw: (bordeRightWidth = 0.5) => ({
    bordeRightWidth: bordeRightWidth,
  }),
  bdC: borderColor => ({
    borderColor: borderColor,
  }),
  post: (position = 'absolute') => ({
    position: position,
  }),
  t: (top = 0) => ({
    top: top,
  }),
  b: (bottom = 0) => ({
    bottom: bottom,
  }),
  l: (left = 0) => ({
    left: left,
  }),
  r: (right = 0) => ({
    right: right,
  }),
  bc: (backgroundColor = colors?.white) => ({
    backgroundColor: backgroundColor,
  }),
  br: (borderRadius = 5) => ({
    borderRadius: borderRadius,
  }),
  op: (opacity = 1) => ({
    opacity: opacity,
  }),
});

export default ms;
