import {Dimensions, PixelRatio} from 'react-native';
import {spacing} from './spacing';
const WINDOW_WIDTH = Dimensions.get('window').width;

// iPhone6 as base size which is 375 x 667
const guidelineBaseWidth = 375;
// const guidelineBaseHeight = 667;

export const scaleSize = (size: number) =>
  (WINDOW_WIDTH / guidelineBaseWidth) * size;

export const scaleFont = (size: number) => size * PixelRatio.getFontScale();

type ISpacing = keyof typeof spacing;

const scaleSpace = (space: ISpacing | number | string) => {
  let _spacing: number | string | undefined = spacing[space as ISpacing];
  if (_spacing === undefined && typeof space === 'number') return space;
  if (_spacing === undefined && typeof space === 'string') return 1;
  return _spacing as number;
};

export const widthNoSpace = (size: number, space: ISpacing | number | string) =>
  size - 2 * scaleSpace(space);
