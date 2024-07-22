import { Button, ButtonProps } from 'components/button';

export interface GotItBoxProps {
  children: React.ReactNode;
  gotItButtonProps?: Pick<ButtonProps, 'onClick' | 'isBusy' | 'label'>;
}

export const GotItBox = ({ children, gotItButtonProps }: GotItBoxProps) => {
  return (
    <div className="flex flex-col sm:flex-row text-center sm:text-start items-center sm:items-start gap-3 sm:justify-between w-full text-lg text-gray-700">
      {children}
      {gotItButtonProps && (
        <div className="ml-auto mt-auto">
          <Button {...gotItButtonProps} variant="link" />
        </div>
      )}
    </div>
  );
};
