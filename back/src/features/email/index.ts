import nodemailer from "nodemailer";

const user = "aseremarket@gmail.com";
const pass = "apxb pupn lhex catp";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user,
    pass,
  },
});

const HOSTNAME = process.env.HOSTNAME;
const PORT = process.env.PORT;

export const getUrl = () => {
  if (HOSTNAME && PORT) {
    return `${HOSTNAME}:${PORT}`;
  }

  return "http://localhost:5173";
};

const getValidationCodeRoute = (code: string): string => {
  return `${getUrl()}/validate/${code}`;
};

const getForgotPasswordCodeRoute = (code: string): string => {
  return `${getUrl()}/forgot-password/${code}`;
};

export const sendValidationCodeToEmail = ({
  email,
  code,
}: {
  email: string;
  code: string;
}): Promise<void> => {
  return new Promise((resolve, reject) => {
    transporter.sendMail(
      {
        from: user,
        to: email,
        subject: "Verificación de la cuenta",
        text: `No debe responde a este correo. De click al siguiente link para validar su cuenta en Asere Market ${getValidationCodeRoute(
          code
        )}`,
      },
      (error: any, info: any) => {
        if (error) {
          reject(error);
        } else {
          resolve(info);
        }
      }
    );
  });
};

export const sendForgotPasswordCodeToEmail = ({
  email,
  code,
}: {
  email: string;
  code: string;
}): Promise<void> => {
  return new Promise((resolve, reject) => {
    transporter.sendMail(
      {
        from: user,
        to: email,
        subject: "Recuperación de la cuenta",
        text: `No debe responde a este correo. De click al siguiente link para recuperar su cuenta en Asere Market ${getForgotPasswordCodeRoute(
          code
        )}`,
      },
      (error: any, info: any) => {
        if (error) {
          reject(error);
        } else {
          resolve(info);
        }
      }
    );
  });
};
