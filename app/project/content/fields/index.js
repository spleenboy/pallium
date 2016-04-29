import CollectionField from './CollectionField';
import HiddenField from './HiddenField';
import InputField from './InputField';
import MarkdownField from './MarkdownField';
import OptionListField from './OptionListField';
import RangeField from './RangeField';
import SelectField from './SelectField';
import TextareaField from './TextareaField';

export default {
  'checkbox': OptionListField,
  'collection': CollectionField,
  'default': InputField,
  'hidden': HiddenField,
  'md': MarkdownField,
  'radio': OptionListField,
  'range': RangeField,
  'select': SelectField,
  'textarea': TextareaField,
};
