import { Link } from 'react-router-dom';

import { DocBlock, DocBlockProps } from '.';

export default {
  component: DocBlock,
};

const props: DocBlockProps = {
  items: [
    {
      items: [
        <>
          Set up to use <Link to="#">Amazon EC2</Link>
        </>,
        'Tutorial: Get started with Amazon EC2 Windows instances',
        'Connect to your Windows instance',
        'Transfer files to Windows instances',
      ],
      title: 'Set up and use an EC2 instance',
    },
    {
      items: [
        'Set up to use Amazon EC2',
        'Tutorial: Get started with Amazon EC2 Windows instances',
        'Connect to your Windows instance',
        'Transfer files to Windows instances',
      ],
      title: 'Set up and use an EC2 instance',
    },
    {
      items: [
        'Set up to use Amazon EC2',
        'Tutorial: Get started with Amazon EC2 Windows instances',
        'Connect to your Windows instance',
        'Transfer files to Windows instances',
      ],
      title: 'Set up and use an EC2 instance',
    },
  ],
  summary:
    'The following topics can help you get started with Amazon EC2. After you set up to use EC2, you can walk through Tutorial: Get started with Amazon EC2 Windows instances to launch, connect to, and clean up an instance. The remaining topics point to more information about the high-level features of EC2.',
  title: 'Get started with Amazon EC2',
  variant: 'bullet',
};

export const Default = (): JSX.Element => {
  return <DocBlock {...props} />;
};

export const Bullet = (): JSX.Element => {
  return <DocBlock {...props} variant="bullet" />;
};

export const Numered = (): JSX.Element => {
  return <DocBlock {...props} variant="numered" />;
};
