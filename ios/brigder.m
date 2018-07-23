//
//  brigder.m
//  Calendar
//
//  Created by jacob on 2018/7/21.
//  Copyright © 2018年 Facebook. All rights reserved.
//

#import "brigder.h"


@implementation brigder

@synthesize bridge = _bridge;

RCT_EXPORT_MODULE(RCTCalendarView)
RCT_EXPORT_VIEW_PROPERTY(dataSource, NSArray);
RCT_EXPORT_VIEW_PROPERTY(onLeftScroll, RCTBubblingEventBlock);
RCT_EXPORT_VIEW_PROPERTY(onRightScroll, RCTBubblingEventBlock);
RCT_EXPORT_VIEW_PROPERTY(onSelectDay, RCTBubblingEventBlock);



- (UIView *)view{
  CalendarView *calendarView = [[CalendarView alloc] initWithFrame:CGRectZero];
  calendarView.delegate = self;
  self.calendarView = calendarView;
  return calendarView;
}

- (void)onScrollRight:(BOOL)isRight{
  isRight ? self.calendarView.onLeftScroll(nil) : self.calendarView.onRightScroll(nil);
}

- (void)selectButton:(id)object{
  self.calendarView.onSelectDay(@{@"1":@"1"});
}

@end
