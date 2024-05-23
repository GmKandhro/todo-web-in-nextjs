// @types/sib-api-v3-sdk.d.ts
declare module 'sib-api-v3-sdk' {
    export class ApiClient {
      static instance: ApiClient;
      authentications: { 'api-key': { apiKey: string } };
    }
  
    export class TransactionalEmailsApi {
      sendTransacEmail(sendSmtpEmail: SendSmtpEmail): Promise<any>;
    }
  
    export class SendSmtpEmail {
      constructor(init?: Partial<SendSmtpEmail>);
      to: Array<{ email: string; name: string }>;
      sender: { email: string; name: string };
      subject: string;
      textContent?: string;
      htmlContent?: string;
    }
  }
  