import { Access } from '../../../types/admin';

export const specialAccessRecord: Record<Access, any> = {
  full: {},
  access__read: {},
  user_access__write: {},
  //
  user__remove: {},
  user__read: {},
  user__write: {},
  //
  shopping__read: {},
  shopping__write: {},
  shopping__remove: {},
  //
  business__remove: {},
  business__read: {},
  business__write: {},
  //
  bills__read: {},
  bills__write: {},
  bills__remove: {},
  agenda__full: {},
  upload__native_compilation: {}
};
