import {
  ChatPopupPlugin,
  EmailFormPlugin,
  FreeTextPlugin,
  LinkPlugin,
  PhonePlugin,
} from '@humany/widget-adapters';
import { bootstrap, Humany, loadImplementation } from '@humany/widget-core';
import { LegacyResourcesPlugin } from '@humany/widget-plugins';
import { BotWidget } from '@humany/widget-types-bot';

import BankIdPlugin from './bank-id-plugin';
import EInvoicePlugin from './e-invoice-plugin';

(async () => {
  const humany = window.humany = Humany.createFromGlobal(window.humany);

  // load remote implementation
  const implementation = await loadImplementation(
    humany,
    'https://webprovisions-labs.humany.net/skeleton-conversation',
  );

  bootstrap(implementation, (config) => {
    config.types.register(
      '@humany/bot-widget',
      BotWidget
    );

    config
      .plugin(LegacyResourcesPlugin)
      .plugin(PhonePlugin)
      .plugin(ChatPopupPlugin)
      .plugin(EmailFormPlugin)
      .plugin(FreeTextPlugin)
      .plugin(LinkPlugin)
      .plugin(BankIdPlugin)
      .plugin(EInvoicePlugin);
  });
})();