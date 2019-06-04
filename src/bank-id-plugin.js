import { ConversationPlatform } from '@humany/widget-conversation';

import BankIdClient from './mock-bank-id-client';


const BankIdPlugin = async (container) => {
  window.bankIdClient = new BankIdClient();

  const platform = await ConversationPlatform.create(container);

  platform.resolveEntityValue(
    'bankid.login',
    async (resolve) => {
      const { session } = await container.getAsync('storage');
      const token = await session.getItem('bank-id-token');
      if (token) {
        return resolve('success');
      }
      const agent = platform.createAgent({ name: 'Banky' });
      return agent.print(
        'form',
        {
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
          validate: async (formData) => {
            const { id } = formData;
            if (!id) {
              return { valid: false, errors: { id: 'Id is required!' } };
            }
            if (id.length < 10) {
              return { valid: false, errors: { id: 'Id must be at least 10 numbers!' } };
            }
            return { valid: true };
          },
          submit: async () => {
            window.bankIdClient.start();
            platform.user.print('text', 'Log in');
            const message = await agent.print('text', 'Log in...');
            window.bankIdClient.onAuth((token) => {
              message.update('Logged in successfully!');
              session.setItem('bank-id-token', token);
              resolve('success');
            });
          },
        });
    },
  );
};

export default BankIdPlugin;