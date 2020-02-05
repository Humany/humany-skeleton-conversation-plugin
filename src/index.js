import BankIdPlugin from './bank-id-plugin';
import InvoicePlugin from './invoice-plugin';

// Use Humany configuration API targeting the selected implementation
humany.configure((config) => {
  // Register the plugins on the selected widget
  config
    .plugin(BankIdPlugin)
    .plugin(InvoicePlugin)
    .rehydration({ enabled: false });

});

sessionStorage.clear();