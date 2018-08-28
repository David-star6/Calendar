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
          style={{ width: Dimensions.get('window').width, height: 375, borderBottomWidth: 1, borderBottomColor: 'black' }}
        />
