import moment from 'moment';

export default {
    settings: {
        title: "Post",
        plural: "Posts",
        abbr: "post",
        description: "",
        icon: "archive",
    },
    fields: [
        title: {
            name: "title",
            label: "Title",
            hint: "Give this post a good name",
            attributes: {
                max: 255,
                required: true,
                autofocus: true,
            }
        },
        postDate: {
            name: "postDate",
            type: "date",
            label: "Date of Post",
            attributes: {
                required: true,
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
        index: '.post.index',
        directory: 'post',
        format: 'md',
        path: (content) => {
            const posted = moment(content.data('postDate'));
            return posted.format('YYYY/MM/' + content.slug('title') + '.md';
        },
        title: (content) => {
            return content.data('title');
        },
        metadata: (content) => {
            return {description: content.data('description')};
        }
    }
}
