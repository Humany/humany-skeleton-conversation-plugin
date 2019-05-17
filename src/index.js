
import { ConversationPlatform } from '@humany/widget-conversation';

const statelessConversationPlugin = async (container, settings) => {
    const platform = await ConversationPlatform.create(container);

    platform.listen((input) => {
        if (input.responseText === 'test') {
            input.preventDefault();

            platform.loader(() => {
                return new Promise((resolve) => {
                    setTimeout(() => {
                        const agent = platform.createAgent({ name: 'Mr.Agent' });

                        agent.print(
                            'guide',
                            {
                                title: 'Guide title',
                                body: '<p> Hello world! </p>',
                                actions: {
                                    actionOne: 'first action',
                                    actionTwo: 'second action',
                                }
                            },
                        );

                        resolve();
                    }, 2000);
                });
            });

        }
    });

};

humany.configure((config) => {
    config.plugin(statelessConversationPlugin);
});

sessionStorage.clear();