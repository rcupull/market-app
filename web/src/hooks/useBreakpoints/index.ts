import { useBreakpoint } from 'hooks/useBreakpoint';

export const useBreakpoints = (): {
  xs: boolean;
  sm: boolean;
  md: boolean;
  lg: boolean;
  xl: boolean;
  xxl: boolean;
} => {
  const breakPoints = [
    true,
    useBreakpoint('sm'),
    useBreakpoint('md'),
    useBreakpoint('lg'),
    useBreakpoint('xl'),
    useBreakpoint('2xl'),
  ];

  const getBreakpointValue = (index: number): boolean => {
    //@ts-expect-error this function exists
    const lastIndex = breakPoints.findLastIndex((v) => v);

    return lastIndex === index;
  };

  return {
    xs: getBreakpointValue(0),
    sm: getBreakpointValue(1),
    md: getBreakpointValue(2),
    lg: getBreakpointValue(3),
    xl: getBreakpointValue(4),
    xxl: getBreakpointValue(5),
  };
};
