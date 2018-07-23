//
//  CalendarView.m
//  Calendar
//
//  Created by jacob on 2018/7/21.
//  Copyright © 2018年 Facebook. All rights reserved.
//

#import "CalendarView.h"


@interface CalendarView()<UIScrollViewDelegate>{
  NSInteger _firstBegin;
  BOOL isRight;
  BOOL isLeft;
}

@property (nonatomic, strong) UIScrollView * scrollView;

@property (nonatomic, strong) UIView * firstView;

@property (nonatomic, strong) UIView * twoView;

@property (nonatomic, strong) UIView * threeView;

@property (nonatomic, strong) UIView * brigView;


@property (nonatomic, strong) NSMutableArray * arrItemView;

@end

@implementation CalendarView

- (void)drawRect:(CGRect)rect {
  [self addSubview:self.scrollView];
  [self addSubview:self.brigView];
  // Drawing code
  [self setUI];
}

- (void)setUI{
  _firstBegin = 0;
  [self onScrollTo:1 withRight:nil withAnimation:false];
  [self setData];
}

- (void)setData{
//  [self.arrItemView removeAllObjects];
  if (self.arrItemView.count == 0) {
    
    [self createView:0 data:self.dataSource[0] views:self.scrollView];
    [self createView:1 data:self.dataSource[1] views:self.scrollView];
    [self createView:2 data:self.dataSource[2] views:self.scrollView];
    
//    [self createView:0 data:self.dataSource[2] views:self.brigView];
//    dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(1 * NSEC_PER_SEC)), dispatch_get_main_queue(), ^{
//      [self.brigView setHidden:true];
//    });
  }else{
    
//    self.scrollView.contentSize = CGSizeMake(self.frame.size.width * (self.arrItemView.count + 1), self.frame.size.height);
//    [self createView:self.arrItemView.count-1 data:self.dataSource[2] views:self.scrollView];
    
//    if (self.arrItemView.count > 10) {
//      for (int i = 0;  i < 5; i ++) {
//        UIView * view = self.arrItemView[i];
//        [view removeFromSuperview];
//      }
//    }
//
//

    
    [self createView:2 data:self.dataSource[2] views:self.scrollView];


//    UIView * oneView = self.arrItemView[0];
//    UIView * b = self.arrItemView[1];
//    UIView * c = self.arrItemView[2];
//
//    [oneView removeFromSuperview];
//    [b removeFromSuperview];
//    [c removeFromSuperview];
    
//      [self createView:0 data:self.dataSource[0] views:self.scrollView];
//      [self createView:1 data:self.dataSource[1] views:self.scrollView];
//      [self createView:2 data:self.dataSource[2] views:self.scrollView];
    
//    [self createView:0 data:self.dataSource[2] views:self.brigView];
//    dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(1 * NSEC_PER_SEC)), dispatch_get_main_queue(), ^{
//      [self.brigView setHidden:true];
//    });
    
    dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(0.5 * NSEC_PER_SEC)), dispatch_get_main_queue(), ^{
      self.scrollView.userInteractionEnabled = true;
      self.brigView.hidden = true;
      isRight = false;
      isLeft = false;
    });
    
  }
}

- (void)layoutSubviews{
  [super layoutSubviews];
}


#pragma mark -- delegate

- (void)scrollViewDidScroll:(UIScrollView *)scrollView{
  if(scrollView.contentOffset.x <= 0){
//    NSLog(@"right");
////  if(self.arrItemView.count == 0) return;
//    UIView * oneView = self.arrItemView[0];
//    UIView * b = self.arrItemView[1];
//    UIView * c = self.arrItemView[2];
//    [oneView removeFromSuperview];
//    [b removeFromSuperview];
//    [c removeFromSuperview];
//    oneView.frame = CGRectMake(0, 0, self.frame.size.width, self.frame.size.height);
//    [self.brigView addSubview:oneView];
//    [self.brigView setHidden:false];
////    [self.arrItemView removeAllObjects];
//    [self onScrollTo:1 withRight:true  withAnimation:false];
  } else if (scrollView.contentOffset.x >= scrollView.frame.size.width * 2){
//    NSLog(@"left");
    isRight = true;
  
    
////  if(self.arrItemView.count == 0) return;
//    UIView * oneView = self.arrItemView[0];
//    UIView * b = self.arrItemView[1];
//    UIView * c = self.arrItemView[2];
//    [oneView removeFromSuperview];
//    [b removeFromSuperview];
//    [c removeFromSuperview];
//    c.frame = CGRectMake(0, 0, self.frame.size.width, self.frame.size.height);
//    [self.brigView addSubview:c];
//    [self.brigView setHidden:false];
////    [self.arrItemView removeAllObjects];
//    [self onScrollTo:1 withRight:false withAnimation:false];
    
//    if (self.arrItemView.count == 2 ) {
//      return;
//    }
//    UIView * oneView = self.arrItemView[0];
//    [oneView removeFromSuperview];
//    [self.arrItemView removeObjectAtIndex:0];
//    UIView * towView = self.arrItemView[0];
//    towView.frame = CGRectMake(self.frame.size.width, 0, self.frame.size.width, self.frame.size.height);
//    UIView * threeView = self.arrItemView[1];
//    threeView.frame = CGRectMake(self.frame.size.width, 0, self.frame.size.width, self.frame.size.height);
//    self.scrollView.userInteractionEnabled = false;
//    [self.scrollView setContentOffset:CGPointMake(self.frame.size.width * 1, 0) animated:true];

  }
}

- (void)scrollViewDidEndDecelerating:(UIScrollView *)scrollView{
  if (!isRight && !isLeft) { return;}
//  [self onScrollTo:1 withAnimation:false];
//  NSLog(@"enddddd");
  if(self.brigView.hidden == false){
    return;
  };

  self.brigView.hidden = false;
  self.scrollView.userInteractionEnabled = false;
  
  
  UIView * oneView = self.arrItemView[0];
  [oneView removeFromSuperview];
  [self.arrItemView removeObjectAtIndex:0];
  
  UIView * towView = self.arrItemView[0];
  towView.frame = CGRectMake(self.frame.size.width, 0, self.frame.size.width, self.frame.size.height);
  UIView * threeView = self.arrItemView[1];
  threeView.frame = CGRectMake(self.frame.size.width, 0, self.frame.size.width, self.frame.size.height);
  
//  UIView * oneView = self.arrItemView[0];
//  UIView * b = self.arrItemView[1];
//  UIView * c = self.arrItemView[2];
//  [oneView removeFromSuperview];
//  [b removeFromSuperview];
//  [c removeFromSuperview];
//  c.frame = CGRectMake(0, 0, self.frame.size.width, self.frame.size.height);
//  [self.brigView addSubview:c];
//  [self.brigView setHidden:false];
//  //    [self.arrItemView removeAllObjects];
  
  [self onScrollTo:1 withRight:false withAnimation:false];
}


#pragma mark -- custom

- (void)onRight{
  if (self.delegate) {[self.delegate onScrollRight:true];}
}

- (void)onLef{
  if (self.delegate) {[self.delegate onScrollRight:false];}
}

- (void)onScrollTo:(NSInteger)index withRight:(BOOL)right withAnimation:(BOOL)animation{
  _firstBegin != 0 ?  right ? [self onLef] : [self onRight]  : nil ;
  _firstBegin = 1;
  [self.scrollView setContentOffset:CGPointMake(self.frame.size.width * index, 0) animated:animation];
}


#pragma mark -- reposn
- (void)handleButton{
  if (self.delegate) {[self.delegate selectButton:nil];}
}

#pragma mark -- GET

- (void)setDataSource:(NSArray *)dataSource{
  _dataSource = dataSource;
//  self.arrItemView.count == 0  ? nil : [self setData];
  _firstBegin == 1 ?[self setData]: nil;
}

- (void )createView:(NSInteger)index data:(NSArray *)data views:(UIView *)views {
  UIView * view =  [[UIView alloc] initWithFrame:CGRectMake(index * self.frame.size.width, 0, self.frame.size.width, self.frame.size.height)];
  view.tag = 100 + index;
  view.backgroundColor = [UIColor grayColor];
  CGFloat floa = self.bounds.size.width / 7;
  for (int i = 0; i < data.count; i ++) {
  NSArray * arr = data[i];
  for (int k = 0; k < arr.count; k ++) {
    NSDictionary * item = arr[k];
    if([[item allKeys] containsObject:@"data"]) continue;
    UIButton * button = [[UIButton alloc] init];
    UILabel * label = [[UILabel alloc] init];
    label.frame = CGRectMake(0 , 0, 10, 10);
    button.frame = CGRectMake(floa * k, floa * i, floa, floa);
    [button setTitle: [NSString stringWithFormat:@"%@",item[@"day"]] forState:UIControlStateNormal];
    [button addTarget:self action:@selector(handleButton) forControlEvents:UIControlEventTouchUpInside];
    label.text = @"第几月份";
    [button addSubview:label];
    [view addSubview:button];
  }
  }
  
  [self.arrItemView addObject:view];
  [views addSubview:view];
}


- (UIScrollView *)scrollView{
  if (!_scrollView) {
    _scrollView = [[UIScrollView alloc] initWithFrame:self.bounds];
    _scrollView.pagingEnabled =  true;
    _scrollView.contentSize = CGSizeMake(self.frame.size.width * 3, self.frame.size.height);
    _scrollView.delegate = self;
  }
  return _scrollView;
}

- (UIView *)firstView{
  if (!_firstView) {
    _firstView = [[UIView alloc] initWithFrame:CGRectMake(0, 0, self.frame.size.width, self.frame.size.height)];
    _firstView.backgroundColor = [UIColor redColor];
  }
  return _firstView;
}

- (UIView *)twoView{
  if (!_twoView) {
    _twoView = [[UIView alloc] initWithFrame:CGRectMake( self.frame.size.width, 0, self.frame.size.width, self.frame.size.height)];
  }
  return _twoView;
}

- (UIView *)threeView{
  if (!_threeView) {
    _threeView = [[UIView alloc] initWithFrame:CGRectMake( self.frame.size.width * 2, 0, self.frame.size.width, self.frame.size.height)];
  }
  return _threeView;
}

- (UIView *)brigView{
  if (!_brigView) {
    _brigView = [[UIView alloc] initWithFrame:CGRectMake(0, 0, self.frame.size.width, self.frame.size.height)];
    _brigView.backgroundColor = [UIColor clearColor];
    _brigView.hidden = true;
  }
  return _brigView;
}

- (NSMutableArray *)arrItemView{
  if (!_arrItemView) {
    _arrItemView = [[NSMutableArray alloc] init];
  }
  return _arrItemView;
}


@end
