export interface PersistentUtils {
  getPersistent: (key: string) => Promise<any>;
  setPersistent: (key: string, value: any) => Promise<void>;
  removePersistent: (key: string) => Promise<void>;
}
