import moment from 'moment';

export default {
    settings: {
        title: "Page",
        plural: "Pages",
        abbr: "page",
        description: "",
        icon: "book",
    },
    fields: [
        title: {
            name: "title",
            label: "Title",
            hint: "Give this page a good name",
            attributes: {
                max: 255,
                required: true,
                autofocus: true,
            }
        },
        description: {
            name: "description",
            type: "textarea",
            label: "Description",
        },
        body: {
            name: "body",
            type: "md",
            label: "Content",
            attributes: {
                required: true,
            }
        }
    ],

    storage: {
        index: '.page.index',
        directory: 'page',
        format: 'md',
        path: (content) => {
            return content.slug('title') + '.md';
        },
        title: (content) => {
            return content.data('title');
        },
        metadata: (content) => {
            return {description: content.data('description')};
        }
    }
}
