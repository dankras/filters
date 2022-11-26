import { useState, useEffect } from "react";
import { replace } from "lodash";

import { INCOME_BUCKET_TO_LABEL } from "./data/labels";

export const inchesToFeetAndInches = (inches) => {
  const feet = Math.floor(inches / 12);
  const remainingInches = inches % 12;
  return `${feet}' ${remainingInches}"`;
};

export const formatIncomeBucket = (bucket, isLeftBound) => {
  const [leftBound, rightBound] = INCOME_BUCKET_TO_LABEL[bucket];
  return isLeftBound ? leftBound : rightBound;
};

export const formatFloatToPercent = (float) => `${(float * 100).toFixed(0)}%`;

export const replaceLastCommaWithAnd = (string) =>
  replace(string, /, ([^,]*)$/, ", and $1");
