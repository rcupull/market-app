import { FieldInputFile } from 'components/field-input-file';
import { Formux } from 'components/formux';
import { IconButton } from 'components/icon-button';

import { useAdminUploadApk } from 'features/api/admin/useAdminUploadApk';

import SvgUploadSolid from 'icons/UploadSolid';
import { ChildrenProp } from 'types/general';

export interface UploadApkProps extends ChildrenProp {}

export const UploadApk = ({ children }: UploadApkProps) => {
  const { adminUploadApk } = useAdminUploadApk();

  return (
    <Formux<{ file: File | undefined }>
      value={{
        file: undefined
      }}
    >
      {({ value, resetForm }) => {
        return (
          <form>
            <div className="flex items-center -my-2">
              <FieldInputFile name="file" accept="application/vnd.android.package-archive">
                {children}
              </FieldInputFile>

              {!!value.file && (
                <IconButton
                  preventDefault
                  variant="primary"
                  className="shrink-0"
                  svg={SvgUploadSolid}
                  onClick={() => {
                    if (value.file) {
                      adminUploadApk.fetch(
                        { file: value.file },
                        { onAfterSuccess: () => resetForm() }
                      );
                    }
                  }}
                />
              )}
            </div>
          </form>
        );
      }}
    </Formux>
  );
};
