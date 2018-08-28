#使用

yarn install react-native-iber-calendars;

import { CalendarList } from 'react-native-iber-calendars';

 
 <CalendarList         
      
          current={'2018-08-28'}
          pastScrollRange={24}
          futureScrollRange={24}
          onVisibleMonthsChange={(e) => {
            console.log('eeee', e)
          }}
          isShowLcd={true}
          horizontal
          pagingEnabled
          style={{ width: 375, height: 375, borderBottomWidth: 1, borderBottomColor: 'black' }}
        />
