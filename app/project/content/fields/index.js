import ArrayField from './ArrayField';
import CollectionField from './CollectionField';
import DateField from './DateField';
import FileField from './FileField';
import HiddenField from './HiddenField';
import InputField from './InputField';
import MarkdownField from './MarkdownField';
import MarkupField from './MarkupField';
import NumberField from './NumberField';
import ObjectField from './ObjectField';
import ObjectArrayField from './ObjectArrayField';
import OptionListField from './OptionListField';
import RangeField from './RangeField';
import SelectField from './SelectField';
import TextareaField from './TextareaField';
import ToggleField from './ToggleField';

export default {
  'array': ArrayField,
  'checkbox': OptionListField,
  'collection': CollectionField,
  'date': DateField,
  'default': InputField,
  'file': FileField,
  'hidden': HiddenField,
  'md': MarkdownField,
  'markup': MarkupField,
  'number': NumberField,
  'object': ObjectField,
  'objectArray': ObjectArrayField,
  'radio': OptionListField,
  'range': RangeField,
  'select': SelectField,
  'textarea': TextareaField,
  'toggle': ToggleField,
};
