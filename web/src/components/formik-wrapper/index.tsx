import { FormikFieldProps, FormikFieldReturn, useFormikField } from 'hooks/useFormikField';

export interface FormikWrapperProps<Val = any> extends Omit<FormikFieldProps<Val>, 'children'> {
  children: (args: FormikFieldReturn<Val>) => React.ReactNode;
}
export const FormikWrapper = ({ children, ...props }: FormikWrapperProps) => {
  const args = useFormikField(props);

  return <>{children(args)}</>;
};
