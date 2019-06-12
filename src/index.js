import BankIdPlugin from './bank-id-plugin';
import InvoicePlugin from './invoice-plugin';

// Use Humany configuration API targeting the selected implementation
humany.configure({ implementation: 'bank-id-conversation-api-demo' }, (config) => {
  // Register the plugins on the selected widget
  config({ widget: 'bank-id-demo-bot' })
    .plugin(BankIdPlugin)
    .plugin(InvoicePlugin)
    .rehydration({ enabled: false });

});

sessionStorage.clear();