import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react';
import React, { cloneElement, Fragment, useEffect, useState } from 'react';

import { IconButton } from 'components/icon-button';
import { SpinnerBox } from 'components/spinner-box';

import { onCloseCheckingChangeBackDrop } from 'features/modal/closeContext/CloseContextProvider';

import { useBreakpoints } from 'hooks/useBreakpoints';
import { useDebouncer } from 'hooks/useDebouncer';

import SvgArrowLeftSolid from 'icons/ArrowLeftSolid';
import SvgTimesSolid from 'icons/TimesSolid';
import { StyleProps } from 'types/general';
import { cn } from 'utils/general';

const renderScaledTransition = (children: React.ReactNode) => {
  return (
    <TransitionChild
      as={Fragment}
      enter="ease-out duration-300"
      enterFrom="opacity-0 scale-95"
      enterTo="opacity-100 scale-100"
      leave="ease-in duration-200"
      leaveFrom="opacity-100 scale-100"
      leaveTo="opacity-0 scale-95"
    >
      {children}
    </TransitionChild>
  );
};

const renderFromRightTransition = (children: React.ReactNode) => {
  return (
    <TransitionChild
      as={Fragment}
      enter="ease-out duration-300"
      enterFrom="opacity-0 translate-x-full sm:scale-95"
      enterTo="opacity-100 translate-x-0 sm:scale-100"
      leave="ease-in duration-300"
      leaveFrom="opacity-100 translate-x-0 sm:scale-100"
      leaveTo="opacity-50 translate-x-full sm:scale-95"
    >
      {children}
    </TransitionChild>
  );
};

export interface ModalProps extends StyleProps {
  title?: React.ReactNode;
  content: React.ReactNode;
  badge?: React.ReactNode;
  primaryBtn?: React.ReactElement;
  secondaryBtn?: React.ReactElement;
  customBtn?: React.ReactElement;
  isBusy?: boolean;
  windowType?: 'confirmation' | 'normal';
}

export const Modal = ({
  title,
  content,
  primaryBtn,
  secondaryBtn,
  customBtn,
  badge,
  className,
  isBusy,
  windowType = 'normal'
}: ModalProps) => {
  const [open, setOpen] = useState(false);

  const openDebouncer = useDebouncer();
  useEffect(() => {
    openDebouncer(() => setOpen(true), 100);
  }, []);

  const breakpoints = useBreakpoints();

  const renderTransition = (children: React.ReactNode) => {
    if (windowType === 'confirmation') {
      return renderScaledTransition(children);
    }

    if (breakpoints.xs) {
      return renderFromRightTransition(children);
    }

    return renderScaledTransition(children);
  };

  return (
    <Transition show={open} as={Fragment}>
      <Dialog data-testid="Modal" as="div" className="relative z-30" onClose={() => {}}>
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div
            className={cn(
              'flex min-h-full items-center justify-center text-center sm:items-center sm:p-0',
              {
                'p-0': breakpoints.xs,
                'p-4': windowType === 'confirmation' || !breakpoints.xs
              }
            )}
          >
            {renderTransition(
              <DialogPanel
                className={cn(
                  'relative flex flex-col overflow-hidden rounded-lg bg-white text-left shadow-xl sm:my-8 min-h-full sm:h-fit md:w-8/12 lg:w-8/12',
                  className,
                  {
                    '!w-screen !min-h-screen': breakpoints.xs && windowType === 'normal'
                  }
                )}
              >
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="flex items-center">
                    {breakpoints.xs && windowType !== 'confirmation' && (
                      <IconButton
                        svg={SvgArrowLeftSolid}
                        className="-ml-2"
                        onClick={() => {
                          setOpen(false);
                          openDebouncer(() => onCloseCheckingChangeBackDrop(), 300);
                        }}
                      />
                    )}

                    {windowType === 'confirmation' ||
                      (!breakpoints.xs && (
                        <IconButton
                          svg={SvgTimesSolid}
                          className="ml-auto"
                          onClick={() => {
                            setOpen(false);
                            openDebouncer(() => onCloseCheckingChangeBackDrop(), 300);
                          }}
                        />
                      ))}
                  </div>

                  <div className="sm:flex sm:items-start w-full">
                    {badge && <div className="mx-9 sm:mx-2 flex justify-center">{badge}</div>}

                    <div className="mt-2 w-full">
                      <DialogTitle as="h3" className="text-xl font-semibold text-gray-900">
                        {title}
                      </DialogTitle>
                      <div className="mt-4">{content}</div>
                    </div>
                  </div>
                </div>
                {(customBtn || primaryBtn || secondaryBtn) && (
                  <div
                    className={cn('bg-gray-50 px-4 py-3 sm:flex sm:flex-row sm:px-6', {
                      'mt-auto': breakpoints.xs && windowType === 'normal'
                    })}
                  >
                    {customBtn}

                    {primaryBtn &&
                      cloneElement(primaryBtn, {
                        className: 'w-full sm:w-auto ml-auto'
                      })}

                    {secondaryBtn &&
                      cloneElement(secondaryBtn, {
                        className: cn('w-full sm:w-auto mt-3 sm:mt-0', {
                          'ml-0 sm:ml-3': primaryBtn || customBtn,
                          'ml-0 sm:ml-auto': !primaryBtn && !customBtn
                        })
                      })}
                  </div>
                )}
                {isBusy && <SpinnerBox />}
              </DialogPanel>
            )}
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
