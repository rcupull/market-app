export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  endElement?: React.ReactNode;
  typeOnlyNumbers?: boolean;
  preventDefaultEnter?: boolean;
}
