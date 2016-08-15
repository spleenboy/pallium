---
title: Project File Format
slug: project-file-format
template: page.jade
filename: '/:file/index.html'
sequence: 1
---
A Pallium project file is just a specially-formatted JSON file that defines how Pallium should display and store JSON or YAML-formatted files.


### Document Root
At the root of the project file, you'll include some general information and a `contentTypes` object, which defines all of the content types that will be included in your project. Optionally, you may include a `references` object, which is just a way of creating snippets for re-use across multiple `contentType` definitions.

```
{
  "title": "Pallium Documentation",
  "description": "Provide documentation for the Pallium application.",
  "icon": "redeem",
  "contentDirectory": ["content"],
  "assetDirectory": ["content", "assets"],
  "database": ["content", "index.db"],
  "references": {...},
  "contentTypes": {...}
}
```
#### title
The title will identify your project.

#### description
This will appear below the title of your project on the home page of the Pallium app.


#### icon
You may use any class name from [Google's material design icon set](https://design.google.com/icons/) here.

#### contentDirectory
This array indicates the path (relative to the project file) where files managed by the project will be stored. Because this is a cross-platform application, you should save each directory as a separate item in the array. The application will handle joining the directories together in the right way for the OS being used.

#### assetDirectory
Like the `contentDirectory`, this is a relative path used to store any files uploaded to the project.

#### database
Pallium uses a embedded NoSQL database to store information about your project files. This set of relative directories and a file name tells Pallium where to save this database file.

#### [references](./references)
References are an advanced feature that you may use to store snippets of JSON for reuse within the `contentTypes` object.

#### [contentTypes](./content-types)
Each content type may have a different set of fields, storage settings and file format. If you're setting up a project for a blog, for example, you may have content types for posts, external links, static pages, etc.