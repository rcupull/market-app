import { useContext } from 'react';

import { PersistentContext } from './Context';
import { PersistentUtils } from './types';

export const usePersistentContext = (): PersistentUtils => useContext(PersistentContext);
