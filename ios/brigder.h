//
//  brigder.h
//  Calendar
//
//  Created by jacob on 2018/7/21.
//  Copyright © 2018年 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>

#import <React/RCTViewManager.h>
#import <React/RCTBridgeModule.h>
#import <UIKit/UIKit.h>

#import "CalendarView.h"

@interface brigder : RCTViewManager<CalendarViewDelegate>

@property (nonatomic,weak) CalendarView  * calendarView;

@end
