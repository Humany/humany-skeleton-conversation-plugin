import { ConversationPlatform } from '@humany/widget-conversation';

import BankIdClient from './mock-bank-id-client';


const BankIdPlugin = async (container) => {
  window.bankIdClient = new BankIdClient(container);

  const platform = await ConversationPlatform.create(container);
  const agent = platform.createAgent({ name: 'Bank ID Agent', avatar: 'https://humanytest.blob.core.windows.net/ace-labs/guides/bank%20id%20avatar.PNG' });
  const { local } = await container.getAsync('storage');

  platform.resolveEntityValue(
    'bankid.login',
    async (resolve) => {
      const token = await local.getItem('bank-id-token');
      if (token) {
        resolve('success');
        return;
      }

      agent.print(
        'form',
        {
          key: 'bank-id-form',
          form: (builder) => {
            builder
              .createComponent({
                component: 'Text',
                type: 'number',
                name: 'id',
                placeholder: 'YYMMDDXXXX',
                title: 'ID',
                required: true,
                description: 'Please enter your id',
              })
              .createComponent({
                title: 'Log in',
                actionKey: 'submit',
                name: 'submit',
                component: 'Submit',
                type: 'submit',
                evaluate: true,
                value: 'Log in',
              });
          },
        },
      );

      platform.validateForm(
        'bank-id-form',
        async (formData) => {
          const { id } = formData;
          if (!id) {
            return { valid: false, errors: { id: 'Id is required!' } };
          }
          if (id.length < 10) {
            return { valid: false, errors: { id: 'Id must be at least 10 numbers!' } };
          }
          return { valid: true };
        },
      );

      platform.submitForm(
        'bank-id-form',
        async () => {
          window.bankIdClient.start();
          platform.user.print('text', 'Log in');
          const loader = platform.loader();

          window.bankIdClient.onAuth((token) => {
            loader();
            local.setItem('bank-id-token', token);
            resolve('success');
          });
        },
      );

      return;
    },
  );

};

export default BankIdPlugin;