export default {
    title: "Blog",
    description: "A sample blog editor",
    contentTypes: require('./contentTypes'),
    storage: {
        index: '.index',
        directory: 'content',
        format: 'md',
        path: (content) => {
            const settings content.type.definition.settings;
            return settings.abbr + '/' + content.slug('title') + '.md';
        },
        title: (content) => {
            return content.data('title');
        },
        metadata: (content) => {
            return {description: content.data('description')};
        }
    }
}
