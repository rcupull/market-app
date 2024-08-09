import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgDAndDBeyond(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M15.92 11.002c-.906-.045-.915.752-.906.852a.546.546 0 00.144.343.564.564 0 01.055-.426c.045.136.119.29.336.409a.83.83 0 01.025-.364c-.063-.245.092-.453.291-.453.308 0 .38.4.207.655.1.145.255.252.354.351.145-.163.246-.426.246-.625.002-.372-.244-.715-.752-.742zm.906.291c0 .036.019.38.436.68.136.09.127.19.127.425.082-.045.172-.1.28-.136-.053.054-.127.128-.163.209.045-.054.344-.237.662-.164a.599.599 0 00-.254.127c.036-.01.126-.035.316-.008v-.192c.218 0 1.051-.153 1.051.78 0 .934-.842.789-.896.789a.51.51 0 01.1.732h.019c1.514 0 1.658-1.233 1.658-1.54 0-.172-.044-1.45-1.531-1.522-1.46 0-1.487.01-1.805-.18zm-5.139.008c0 .036.019.373.436.672.073.063.127.108.127.298v1.758c0 .19-.035.244-.117.29a4.766 4.766 0 01-.363.208h1.595c.453 0 .788-.063 1.178-.39a1.597 1.597 0 01.035-.543.467.467 0 00-.127.162c0-.263.074-.699.436-.934 0 .001-.163-.034-.408.057.09-.145.452-.363.47-.363-.335-1.08-1.494-1.052-1.494-1.034-1.359 0-1.441.009-1.768-.181zm3.979.435c-.073.073-.119.353-.055.498.11.063.2.172.22.272-.1-.227-.519-.272-.636-.553-.027.1-.009.228.045.309 0 0-.1-.037-.316-.028.082.027.237.155.219.237-.018.082-.318.161-.463.306.218-.045.317-.009.353.082.027.063-.008.154-.017.254.073-.082.317-.245.498-.281-.045-.009-.155-.035-.2-.035.127-.145.4-.19.553-.162-.1 0-.281.053-.353.117a.96.96 0 01.19.045.499.499 0 00-.263.281c.317-.227.598.235.317.371.036.01.128.002.164-.025a.324.324 0 01-.137.152c.127 0 .316-.08.371-.207 0 0-.08.026-.117-.01-.027-.027 0-.136 0-.171-.09.1-.145-.082-.045-.208a.833.833 0 00-.209-.027c.145-.045.473-.083.51-.01.027.045-.047.155-.047.155.181-.027.374.044.3.226.135-.066.253-.264.216-.472-.01.045-.072.109-.127.127.009-.063-.046-.102-.092-.12.082-.435-.663-.644-.635-1.088-.045.063-.081.228-.035.327.118.145.39.298.453.552-.118-.29-.68-.516-.662-.914zm-2.32.479c.325 0 .799.09.799.789 0 .943-.834.789-1.051.789v-1.568c.052 0 .143-.01.252-.01zm4.486.181c-.236.018-.406.29-.478.254-.054-.018.062-.162.062-.162a1.046 1.046 0 00-.463.588c.208-.263.626-.442.889-.406-.471.018-.879.434-1.069.715.091.036.073.027.29.199.462-1.106.98-.706.998-.697.1-.091.434-.172.615-.127-.11-.117-.337-.281-.6-.281-.218 0-.334.101-.361.064-.027-.045.071-.12.117-.147zm-1.703.21c.145.062.19.199.19.199-.128 0-.163-.1-.19-.2zm-1.168.253s-.382.254-.418.662c0 0 .046-.072.092-.082.027-.018.061 0 .025.082-.009.027-.263.716.236 1.178-.027-.073-.09-.344.11-.082 0 .018.272.319.707.319.625 0 .953-.453 1.125-.807-.046-.054-.228-.19-.336-.299-.109.19-.372.48-.625.48-.462 0-.7-.662-.147-1.205-.027-.009-.199-.081-.363.11 0-.136.046-.229.092-.3-.154.062-.445.253-.518.362.01-.263.073-.344.028-.408l-.008-.01zm2.863.02a.466.466 0 00-.344.152c-.036.036-.061.083-.09.12v.714c.155.118.316-.136.135-.326.063.01.21.12.229.147 0 0 .117-.028.226-.028.1 0 .181.019.254.055v-.834a.443.443 0 00-.12.062l-.036.028-.045-.028c-.045-.045-.128-.062-.209-.062zm-1.713.125c-.1.19.146.273.2.373.045.082-.036.218.181.38.671.527.417.363.47.825.028.19.192.3.292.336a.302.302 0 010-.428c0 .634.869.608 1.04.291-.1.054-.316-.009-.407-.082.354.046.654-.19.672-.48 0-.29-.292-.517-.618-.489.362.063.255.624-.226.516.172-.118.144-.442-.055-.56.063.19-.135.37-.334.207a22.49 22.49 0 00-.48-.39c-.11-.1-.254-.044-.3-.081-.062-.054-.026-.174-.108-.229-.073-.036-.136-.018-.208-.045-.063-.027-.119-.081-.119-.144zm1.721.771a.451.451 0 01.01.409c.118-.018.246-.074.246-.2 0-.182-.22-.2-.256-.209zm-.102 2.264c-3.7 0-3.88 4.961-.02 4.961 3.9 0 3.71-4.96.02-4.96zm11.25.041c-1.03 0-2 .07-2.51.11l.37.41v3.86l-.37.41c.52.04 1.54.1 2.58.1 2.1 0 2.95-1.03 2.95-2.44 0-1.47-1.16-2.45-3.02-2.45zm-28.83.1l.42.43v1.47H0l.57.73v1.62l-.42.43c3.09 0 3.69.07 4.32-.3.34-.2.5-.49.5-.88 0-.25.13-.94-.97-1.26.86-.23.81-.9.81-.99 0-1.03-1.21-1.25-1.85-1.25H.15zm8.76 0l-3.68.01.37.41v3.85l-.37.41h4.06L10 19.8l-3.01.01v-.77l1.16.01v-.01l.7-1.06H6.99v-.74h2.62l-.7-1.05v-.01zm11.83 0l.37.43v3.84l-.36.42h1.95l-.37-.41v-2.37h.02c.18.53 2.22 2.14 2.42 2.78h1.07v-4.26l.37-.42h-1.96l.35.41v2.13h-.02c-.27-.72-2.11-2.08-2.26-2.55h-1.58zm-11.18.01l2.2 3.29.01.97-.38.41h2.13l-.36-.41-.01-.95 2.2-3.31h-2.08l.3.36-1.02 1.86h-.02l-1.05-1.86.32-.36H9.56zm-7.63.86c1 0 1.48-.04 1.48.45v.15c0 .61-.95.44-1.48.44v-1.04zm15.79.1c1.84 0 1.94 2.76-.01 2.76-1.87 0-1.84-2.76.01-2.76zm11.042.012c1.165-.03 1.808.368 1.808 1.348 0 1.28-1.07 1.51-2.34 1.35V17.2c.188-.022.365-.034.532-.038zM2.443 18.87c.547-.007 1.127.031 1.127.451v.22h.01c0 .56-.63.47-1.65.47v-1.13c.152 0 .331-.008.513-.01z'
    })
  );
}
export default SvgDAndDBeyond;