import { ColorState } from '../model/shared.model';

export const setSectionColor = (note: number) => {
  if (note > 80) {
    return {
      color: ColorState.VERY_BAD,
      weight: 5,
      opacity: 0.65,
    };
  } else if (note > 60) {
    return {
      color: ColorState.BAD,
      weight: 5,
      opacity: 0.65,
    };
  } else if (note > 40) {
    return {
      color: ColorState.MEDIUM,
      weight: 5,
      opacity: 0.65,
    };
  } else if (note > 20) {
    return {
      color: ColorState.GOOD,
      weight: 5,
      opacity: 0.65,
    };
  } else {
    return {
      color: ColorState.VERY_GOOD,
      weight: 5,
      opacity: 0.65,
    };
  }
};
