import InputField from './InputField';
import MarkdownField from './MarkdownField';
import OptionListField from './OptionListField';
import SelectField from './SelectField';
import TextareaField from './TextareaField';

export default {
  'default': InputField,
  'md': MarkdownField,
  'radio': OptionListField,
  'checkbox': OptionListField,
  'select': SelectField,
  'textarea': TextareaField,
};
