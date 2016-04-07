# Pallium

- Project
    - definition: ProjectDefinition
- ProjectDefinition
    - contentTypes: [ContentTypeDefinition]
    - storage: [StorageDefinition]

- ContentType
    - definition: ContentTypeDefinition
- ContentTypeDefinition
    - fields: [FieldDefinition]
    - storage: [StorageDefinition]
- Content
    - id
    - contentType
    - fields

- FieldType
    - definition: FieldTypeDefinition
- FieldTypeDefinition
- Field: Instance of a FieldType
    - type: FieldType
    - value

- StorageIndex(storageDefinition): A list of all of the content for a content type
    - definition: storageDefinition
    - items
        - id
        - title
        - metadata
        - filepath
- Storage(definition): Manages the read/write operations as well as indexing lists of content
    - definition: The StorageDefinition instance
    - contentIndex
    - list(contentType)
    - save(content)
    - open(contentType, path)
    - delete(content)
- StorageDefinition
    - index: The name of the StorageIndex file. Defaults to ".index"
    - directory: The relative root directory for this type of content
    - format: The format to read/write for the data file. ['json', 'md', 'yaml'].
    - path(content): A method that returns the relative path to a content data file
    - title(content): A method that returns the title of the content
    - metadata(content): A method that returns any additional metadata about the content

- Services
    - File
    - Log
    - Formatter
        - json
        - md
        - yaml

