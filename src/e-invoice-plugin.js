import { ConversationPlatform } from '@humany/widget-conversation';

const EInvoicePlugin = async (container) => {
  const platform = await ConversationPlatform.create(container);
  const agent = platform.createAgent({ name: 'Invoice agent', avatar: 'https://humany.blob.core.windows.net/webprovisions-labs/guides/bank%20avatar.png' });

  platform.resolveEntityValue(
    'download.einvoice',
    () => {
      agent.print(
        'list',
        {
          actions: {
            one: 'February 31 2019',
            two: 'March 31 2019',
            three: 'April 31 2019',
            four: 'May 31 2019',
          },
        },
      );
    },
  );

  platform.watchAction(
    'one',
    () => {
      platform.user.print('text', 'February 31 2019');
      agent.print('text', 'Downloading invoice for February 31 2019...');

      setTimeout(() => window.alert('Downloading...'), 1000);
    },
  );

  platform.watchAction(
    'two',
    () => {
      platform.user.print('text', 'February 31 2019');
      agent.print('text', 'Downloading invoice for February 31 2019...');
    },
  );

  platform.watchAction(
    'three',
    () => {
      platform.user.print('text', 'March 31 2019');
      agent.print('text', 'Downloading invoice for March 31 2019...');

      setTimeout(() => window.alert('Downloading...'), 1000);
    },
  );

  platform.watchAction(
    'four',
    () => {
      platform.user.print('text', 'April 31 2019');
      agent.print('text', 'Downloading invoice for April 31 2019...');

      setTimeout(() => window.alert('Downloading...'), 1000);
    },
  );
};

export default EInvoicePlugin;