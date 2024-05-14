import React from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';

export function DateTimePickerComponent({value,functioning,mode,display='calendar'}) {
  return (
    <DateTimePicker
      value={value}
      mode={mode}
      display={display}
      is24Hour={false}
      onChange={functioning}
      dateFormat={'day month year'}
      themeVariant={'light'}
      textColor={'black'}
      timeZoneName={'Africa/Abidjan'}
    />
  );
}
