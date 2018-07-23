//
//  CalendarView.h
//  Calendar
//
//  Created by jacob on 2018/7/21.
//  Copyright © 2018年 Facebook. All rights reserved.
//


#import <React/RCTViewManager.h>
#import <React/RCTBridgeModule.h>
#import <React/RCTEventDispatcher.h>
#import <UIKit/UIKit.h>

@protocol CalendarViewDelegate<NSObject>

@optional
- (void)onScrollRight:(BOOL )isRight;
- (void)selectButton:(id)object;

@end

@interface CalendarView : UIView

@property (nonatomic, strong) NSArray * dataSource;

@property (nonatomic, weak)id<CalendarViewDelegate>delegate;


@property(nonatomic,copy) RCTBubblingEventBlock onLeftScroll;

@property(nonatomic,copy) RCTBubblingEventBlock onRightScroll;

@property(nonatomic,copy) RCTBubblingEventBlock onSelectDay;


@end
