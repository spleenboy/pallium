import ArrayField from './ArrayField';
import CollectionField from './CollectionField';
import FileField from './FileField';
import HiddenField from './HiddenField';
import InputField from './InputField';
import MarkdownField from './MarkdownField';
import MarkupField from './MarkupField';
import ObjectField from './ObjectField';
import OptionListField from './OptionListField';
import RangeField from './RangeField';
import SelectField from './SelectField';
import TextareaField from './TextareaField';

export default {
  'array': ArrayField,
  'checkbox': OptionListField,
  'collection': CollectionField,
  'default': InputField,
  'file': FileField,
  'hidden': HiddenField,
  'md': MarkdownField,
  'markup': MarkupField,
  'object': ObjectField,
  'radio': OptionListField,
  'range': RangeField,
  'select': SelectField,
  'textarea': TextareaField,
};
