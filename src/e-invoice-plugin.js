import { ConversationPlatform } from '@humany/widget-conversation';

const EInvoicePlugin = async (container) => {
  const platform = await ConversationPlatform.create(container);
  const agent = platform.createAgent({ name: 'Einvoice agent' });

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
    (input, next) => {
      const { key } = input;
      if (key === 'one') {
        platform.user.print('guide', { body: 'February 31 2019' });
        agent.print('guide', { body: '<p>Downloading invoice for February 31 2019...</p>' });

        setTimeout(() => window.alert('Downloading...'), 1000);
      } else if (key === 'two') {
        platform.user.print('guide', { body: 'March 31 2019' });
        agent.print('guide', { body: '<p>Downloading invoice for March 31 2019...</p>' });

        setTimeout(() => window.alert('Downloading...'), 1000);
      } else if (key === 'three') {
        platform.user.print('guide', { body: 'April 31 2019' });
        agent.print('guide', { body: '<p>Downloading invoice for April 31 2019...</p>' });

        setTimeout(() => window.alert('Downloading...'), 1000);
      } else if (key === 'four') {
        platform.user.print('guide', { body: 'May 31 2019' });
        agent.print('guide', { body: '<p>Downloading invoice for May 31 2019...</p>' });

        setTimeout(() => window.alert('Downloading...'), 1000);
      } else {
        next();
      }
    },
  );
};

export default EInvoicePlugin;