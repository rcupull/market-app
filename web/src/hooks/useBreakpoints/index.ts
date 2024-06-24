import { useBreakpoint } from 'hooks/useBreakpoint';

export interface UseBreakpointsReturn {
  xs: boolean;
  sm: boolean;
  md: boolean;
  lg: boolean;
  xl: boolean;
  xxl: boolean;
}

export const useBreakpoints = (args?: { sweep?: boolean }): UseBreakpointsReturn => {
  const { sweep } = args || {};
  const breakPoints = [
    true,
    useBreakpoint('sm'),
    useBreakpoint('md'),
    useBreakpoint('lg'),
    useBreakpoint('xl'),
    useBreakpoint('2xl'),
  ];

  const getBreakpointValue = (index: number): boolean => {
    if (sweep) {
      return breakPoints[index];
    }

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
