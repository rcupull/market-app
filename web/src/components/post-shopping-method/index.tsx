import { ButtonClose } from 'components/button-close';
import { HtmlTextContainer } from 'components/html-text-container';
import { QrCode } from 'components/qr-code';

import { useModal } from 'features/modal/useModal';

import { ButtonPostToCart, ButtonPostToCartProps } from './ButtonPostToCart';

import { useBusiness } from 'pages/@hooks/useBusiness';
import { PostLayoutShoppingMethod } from 'types/business';
import { StyleProps } from 'types/general';
import { Post } from 'types/post';
import { getWhatsAppPostLink } from 'utils/business';

export interface PostShoppingMethodProps extends StyleProps {
  post: Post;
  purshaseNotes?: ButtonPostToCartProps['purshaseNotes'];
  layout?: PostLayoutShoppingMethod;
  whatsAppPhoneNumber?: string;
  btnPostToCartVariant?: ButtonPostToCartProps['variant'];
}

export const PostShoppingMethod = ({
  layout,
  whatsAppPhoneNumber,
  post,
  purshaseNotes,
  className,
  btnPostToCartVariant,
}: PostShoppingMethodProps) => {
  const { pushModal } = useModal();
  const { business } = useBusiness();

  if (layout === 'whatsApp_xsLink_lgQR') {
    if (!whatsAppPhoneNumber) {
      return <></>;
    }

    const whatsappLink = getWhatsAppPostLink(whatsAppPhoneNumber, post);

    return (
      <div className={className}>
        <QrCode
          className="w-8 h-8 cursor-pointer"
          onClick={(e) => {
            e.preventDefault();
            pushModal(
              'Emergent',
              {
                useProps: () => {
                  return {
                    content: (
                      <div className="flex flex-col items-center px-20">
                        <HtmlTextContainer className="w-80">
                          <a href={whatsappLink} target="_blank" rel="noreferrer">
                            Click en este link
                          </a>{' '}
                          o use el código desde su teléfono para contactar con nosotros
                        </HtmlTextContainer>
                        <QrCode value={whatsappLink} className="w-60 h-60 mt-2" />
                      </div>
                    ),
                    title: 'WhatsApp',
                    className: '!w-fit',
                    customBtn: <ButtonClose className="ml-auto" />,
                  };
                },
              },
              { emergent: true },
            );
          }}
          value="some dummy data"
        />
      </div>
    );
  }

  if (
    layout === 'shoppingCart' &&
    business?.shoppingStrategy === 'addToCart_whatsAppWithOwner_pickUpProduct'
  ) {
    return (
      <ButtonPostToCart
        post={post}
        purshaseNotes={purshaseNotes}
        className={className}
        variant={btnPostToCartVariant}
      />
    );
  }

  return <></>;
};
