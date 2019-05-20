import { ConversationPlatform } from '@humany/widget-conversation';

const statelessConversationPlugin = async (container, settings) => {
    const platform = await ConversationPlatform.create(container);

    const agent = platform.createAgent({ name: 'Mr.Agent' });

    agent.print(
        'list',
        {
            actions: {
                guideOne: 'First custom guide',
                guideTwo: 'Second custom guide',
            }
        },
    );

    platform.watchAction((input, next) => {
        const agent = platform.createAgent({ name: 'Mr.Agent' });
        if (input.key === 'guideOne') {
            agent.print(
                'guide',
                {
                    title: 'Correct?',
                    actions: {
                        yes: 'Yes',
                        no: 'No',
                    }
                },
            );
        } else if (input.key === 'guideTwo') {
            agent.print(
                'guide',
                {
                    body: '<p>Vestibulum interdum elit velit, ac rutrum velit imperdiet lacinia.</p>',
                },
            );
        } else {
            next();
        }
    });

    platform.listen((input) => {
        input.preventDefault();
        input.responseText = null;
    });
};

humany.configure((config) => {
    config.plugin(statelessConversationPlugin);
});

// TO DISABLE REHYDRATION
sessionStorage.clear();