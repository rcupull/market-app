import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgDAndD(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props,
    },
    createElement('path', {
      d: 'M12.912 5.002a4.39 4.39 0 00-.947.072c-1.108.21-1.544.657-1.92.975-.021-.253.047-.507.129-.76-.978.696-1.575 1.634-1.83 2.815-.13-.305-.169-.61-.182-.928-.463.619-.575 1.331-.549 2.07.03.898.276 1.718.951 2.371-.195-.799-.073-1.559.286-2.324.31 1.027.927 1.77 1.869 2.242.005-.026.008-.034.008-.047 0-.022 0-.047-.004-.068a4.528 4.528 0 01.107-1.787.366.366 0 000-.168c-.138-.696-.02-1.336.473-1.873a1.595 1.595 0 012.314-.026c.303.314.441.704.49 1.125a2.883 2.883 0 01-.433 1.89c-.04.06-.044.103.004.155.459.524-.232-.145 1.619 1.608.082.078.163.158.25.24.376-.46.67-.975.894-1.508.39-.92.589-1.861.36-2.853-.376-1.632-1.35-2.706-3.016-3.106a4.335 4.335 0 00-.873-.115zm-1.453 4.07a.89.89 0 00-.174.285c-.074.232-.15.464-.193.7-.1.537-.114 1.078.03 1.615a.328.328 0 00.146.193c.416.275.762.62.978 1.074.034.082.06.168.096.258-.142-.163-.27-.326-.416-.468-.476-.455-1.168-.73-2.02-1.297-.428-.287-.792-.64-1.021-1.15-.152.601-.086 1.137.217 1.661-.562-.15-1.12-.179-1.713-.158.385.245.726.52.955.914.164.288.13.448-.13.64-.74.508-1.613.804-2.296 1.44.051.013.086.004.125 0 .333-.052.666-.095 1.008-.056.467.05.786.297.851.7.031.19.022.392-.004.585-.026.206-.094.407-.142.613.796-.683 1.67-1.228 2.7-1.53l-1.005-.179c.956-1.053 2.812-1.035 3.037-.898-.705.06-1.38.227-2.011.627.679.155.406.086 1.064.271-.666.34-1.142.813-1.41 1.483.35-.202.727-.27 1.121-.237.925.081 1.456.807 1.08 1.713a1.288 1.288 0 01-.441.565l.013.039c.273-.034.55-.07.83-.104-.139.327-.384.568-.687.77.688.065 1.857-.603 1.965-1.11-.268.021-.667.126-.68-.312-.004-.103-.013-.018.121-.787-.044.034-.09.078-.142.117-.311.215-.485-.133-.403-.412.078-.266.163-.534.25-.813-.312-.099-.66-.125-1.015-.142.216-.116 1.423-.396 2.5-.198.428.077.18.574-.024.961.437.034.698.034.992.09.93.185.73.999.713 1.192.783-.361 1.36-1.656 1.178-2.524-.168.28-.376.511-.709.623.013-.318-.152-.501-.42-.613-.026-.013-.053-.06-.049-.086.07-.456-.038-.872-.246-1.272-.272-.533-.674-.955-1.107-1.359-1.251-1.169-1.925-1.734-2.133-2.726-.035-.16-.039-.319-.06-.499-.035.056-.06.098-.083.141a2.43 2.43 0 00-.185 1.299c.022.18.077.338.22.467.424.387.847.777 1.262 1.177.433.417.831.894 1.047 1.452-.069-.06-.114-.133-.162-.202-.311-.434-.715-.787-1.104-1.152-.497-.464-1-.92-1.466-1.404-.848-.88-.822-1.68-.848-1.977zm11.852 3.516c-.026 0-.052.01-.082.014-.835.142-1.329.665-2.116 1.271-.45.348-.595.163-.517-.021.06-.15.142-.288.22-.43.043-.077.099-.146.15-.219-.008-.009-.02-.013-.029-.021-1.168.786-2.02 1.821-2.496 3.148.013.013.03.026.043.04.013-.027.022-.052.04-.073a6.04 6.04 0 011.581-1.28c.787-.454 1.623-.787 2.54-.869.186-.017.377-.003.568-.003a.86.86 0 01-.23.046c-.8.103-1.535.387-2.227.795-1.306.77-2.36 1.815-3.25 3.026-.013.017-.016.037-.03.054.628.228 1.037.745 1.561 1.102a.034.034 0 00.018-.018l.052-.117c.528-1.156 1.168-2.247 2.02-3.201.722-.808 1.643-1.085 2.703-.857.255.056.493.188.744.29.1-.06.223-.136.348-.2.363-.186.752-.301 1.154-.387.636-.133 1.277-.212 1.926-.057V14.6c-.023-.02-.054-.037-.076-.063a5.252 5.252 0 00-1.735-1.142 3.97 3.97 0 00-1.726-.305 4.635 4.635 0 00-1.254.275 2.93 2.93 0 01-.332.096c-.212.052-.316-.134-.203-.293.138-.198.146-.18.648-.516.026-.017.053-.034.096-.064h-.11zm-9.413 1.264c.506.206.83.558 1.03 1.043-.485.052-.887-.356-1.03-1.043zm-6.47 1.377C6.38 16.288 5.502 17.45 5 18.859c.32-.253.645-.489 1.021-.695-.359.958-.848 2.269-.337 4.344.199.816.515 1.58 1.043 2.246.125.159.274.295.412.441.009-.009.016-.011.025-.02a3.204 3.204 0 01-.064-.94c.095.136.168.258.254.369.545.687 1.241 1.177 2.042 1.529 1.081.485 2.21.571 3.37.369 2.375-.417 3.922-2.09 5.017-4.246.042-.075.026-.122-.039-.178-1.704-1.418-.987-.838-1.848-1.53-.035.04 0-.008-.082.13-.484.82-1.102 1.517-1.902 2.045-.446.292-.93.507-1.475.507-.933 0-1.651-.409-2.136-1.195-.52-.838-.576-1.747-.356-2.687.337-1.452 1.302-2.371 1.67-2.762-.809-.266-1.428.072-2.008.596.035-.597.186-1.126.51-1.602a8.995 8.995 0 00-2.803 1.887c-.013-.25.235-1.877.243-1.92a.354.354 0 00-.13-.318zm6.316.732c-.216.473-.068.962.317 1.285.195.163.402.314.597.48.2.164.32.375.342.637.017.202.035.408.078.606.095.455.385.79.735 1.078.713.589 1.426 1.172 2.14 1.765.774.644.602 1.41.563 2.407a2.234 2.234 0 001.449 2.2c.043.018.087.027.156.048-.679-.782-.438-1.896.03-2.248.012.095.016.185.038.275.407 1.895 1.965 2.758 3.678 2.444.692-.125 1.324-.381 1.856-.85.087-.077.16-.176.256-.28-.835.199-1.55.005-2.204-.454a.191.191 0 01.082-.014c.921.077 1.757-.146 2.467-.748.844-.713 1.15-1.842.752-2.834-.357-.865-1.018-1.39-1.892-1.672-.411-.133-.96-.18-1.24-.125.427.172.609.284.812.516.545.619.45 1.49-.235 1.959-.506.348-1.075.45-1.681.39a.658.658 0 01-.131-.025c.121-.16.26-.302.35-.465.407-.722.235-1.81-.375-2.41-.091-.09-.2-.167-.303-.252-.013.056-.004.089.004.119.182.713-.351 1.391-1.074 1.365-.33-.013-.601-.161-.848-.363-.844-.692-1.691-1.38-2.531-2.076a1.537 1.537 0 00-.87-.373c-.199-.017-.4-.026-.6-.04-.254-.016-.381-.12-.45-.36-.04-.147-.064-.292-.094-.438-.065-.348-.268-.56-.62-.612-.19-.03-.385-.043-.575-.064-.562-.06-.857-.317-.979-.871z',
    }),
  );
}
export default SvgDAndD;
