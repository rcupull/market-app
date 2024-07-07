export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  endElement?: React.ReactNode;
  //
  typeMaxLength?: number;
  typeOnlyNumbers?: boolean;
  //
  preventDefaultEnter?: boolean;
}
