import { FC } from "react";

/* eslint-disable-next-line */
export interface GenerateUiProps {
  RenderElement: FC<any>;
  dataArr: Array<any>;
  childRef?: any;
}

export function GenerateUi({
  RenderElement,
  dataArr,
  childRef,
}: GenerateUiProps) {
  if (!dataArr) return;
  return dataArr.map((props, i) => {
    return <RenderElement {...props} key={i} ref={i === 0 ? childRef : null} />;
  });
}

export default GenerateUi;
