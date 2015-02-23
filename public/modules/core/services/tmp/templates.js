angular.module("mwl.calendar").run(["$templateCache", function($templateCache) {$templateCache.put("templates/day.html","<div class=\"cal-day-box\"><div class=\"row-fluid clearfix cal-row-head\"><div class=\"span1 col-xs-1 cal-cell\">{{ timeLabel || \'Time\' }}</div><div class=\"span11 col-xs-11 cal-cell\">{{ eventLabel || \'Events\' }}</div></div><div class=\"cal-day-panel\" ng-style=\"{height: (days.length * 60) + \'px\'}\"><div class=\"cal-day-panel-hour\"><div class=\"cal-day-hour\" ng-repeat=\"day in days\"><div class=\"row-fluid cal-day-hour-part\"><div class=\"span1 col-xs-1\"><b>{{ day.label }}</b></div><div class=\"span11 col-xs-11\"></div></div><div class=\"row-fluid cal-day-hour-part\"><div class=\"span1 col-xs-1\"></div><div class=\"span11 col-xs-11\"></div></div></div></div><div class=\"pull-left day-event day-highlight dh-event-{{ event.type }}\" ng-repeat=\"event in view track by $index\" ng-style=\"{top: event.top + \'px\', left: event.left + 60 + \'px\', height: event.height + \'px\'}\"><!--<span class=\"cal-hours\">{{ event.starts_at | date:\'d MMM HH:mm\' }} - {{ event.ends_at | date:\'d MMM HH:mm\' }}<br></span>--><a href=\"javascript:;\" class=\"event-item\" ng-click=\"eventClick({$event: event})\"><span>{{ event.title | truncateEventTitle:20:event.height }}</span></a></div></div></div>");
$templateCache.put("templates/main.html","<div class=\"cal-context\" style=\"width: 100%;\"><div class=\"alert alert-danger\" ng-if=\"!view\">The value passed to calendar-view is not set</div><mwl-calendar-year calendar-events=\"events\" calendar-current-day=\"currentDay\" calendar-event-click=\"eventClick\" calendar-edit-event-click=\"eventEditClick\" calendar-delete-event-click=\"eventDeleteClick\" calendar-edit-event-html=\"editEventHtml\" calendar-delete-event-html=\"deleteEventHtml\" calendar-auto-open=\"autoOpen\" ng-if=\"view == \'year\'\"></mwl-calendar-year><mwl-calendar-month calendar-events=\"events\" calendar-current-day=\"currentDay\" calendar-event-click=\"eventClick\" calendar-edit-event-click=\"eventEditClick\" calendar-delete-event-click=\"eventDeleteClick\" calendar-edit-event-html=\"editEventHtml\" calendar-delete-event-html=\"deleteEventHtml\" calendar-auto-open=\"autoOpen\" calendar-use-iso-week=\"useIsoWeek\" ng-if=\"view == \'month\'\"></mwl-calendar-month><mwl-calendar-week calendar-events=\"events\" calendar-current-day=\"currentDay\" calendar-event-click=\"eventClick\" calendar-use-iso-week=\"useIsoWeek\" ng-if=\"view == \'week\'\"></mwl-calendar-week><mwl-calendar-day calendar-events=\"events\" calendar-current-day=\"currentDay\" calendar-event-click=\"eventClick\" calendar-event-label=\"{{ eventLabel }}\" calendar-time-label=\"{{ timeLabel }}\" calendar-day-view-start=\"{{ dayViewStart }}\" calendar-day-view-end=\"{{ dayViewEnd }}\" ng-if=\"view == \'day\'\"></mwl-calendar-day></div>");
$templateCache.put("templates/month.html","<div class=\"cal-row-fluid cal-row-head\"><div class=\"cal-cell1\" ng-repeat=\"day in weekDays\">{{ day }}</div></div><div class=\"cal-month-box\"><div ng-repeat=\"week in view track by $index\"><div class=\"cal-row-fluid cal-before-eventlist\"><div class=\"cal-cell1 cal-cell {{ day.highlightClass }}\" ng-repeat=\"day in week track by $index\" ng-click=\"dayClicked($parent.$index, $index)\" ng-class=\"{pointer: day.events.length > 0}\"><div class=\"cal-month-day\" ng-class=\"{\'cal-day-outmonth\': !day.inMonth, \'cal-day-inmonth\': day.inMonth, \'cal-day-weekend\': $index == 5 || $index == 6, \'cal-day-today\': day.isToday}\"><small class=\"cal-events-num badge badge-important pull-left\" ng-show=\"day.events.length > 0\">{{ day.events.length }}</small> <span class=\"pull-right\" data-cal-date=\"\" ng-click=\"drillDown(day.label)\">{{ day.label }}</span><div class=\"cal-day-tick\" ng-show=\"day.isOpened\"><i class=\"glyphicon glyphicon-chevron-up\"></i> <i class=\"fa fa-chevron-up\"></i></div><div class=\"events-list\" ng-show=\"day.events.length > 0\"><a href=\"javascript:;\" ng-click=\"eventClick({$event: event})\" ng-repeat=\"event in day.events track by $index\" class=\"pull-left event event-{{ event.type }}\" ng-mouseenter=\"highlightEvent(event, true)\" ng-mouseleave=\"highlightEvent(event, false)\" tooltip-append-to-body=\"true\" tooltip=\"{{ event.title }}\"></a></div></div></div></div><div class=\"cal-slide-box\" collapse=\"!week.isOpened\"><div class=\"cal-slide-content cal-event-list\"><ul class=\"unstyled list-unstyled\"><li ng-repeat=\"event in openEvents track by $index\"><span class=\"pull-left event event-{{ event.type }}\"></span> &nbsp; <a href=\"javascript:;\" class=\"event-item\" ng-click=\"eventClick({$event: event})\">{{ event.title }}</a> <a href=\"javascript:;\" class=\"event-item-edit\" ng-if=\"editEventHtml && event.editable !== false\" ng-bind-html=\"$sce.trustAsHtml(editEventHtml)\" ng-click=\"eventEditClick({$event: event})\"></a> <a href=\"javascript:;\" class=\"event-item-delete\" ng-if=\"deleteEventHtml && event.deletable !== false\" ng-bind-html=\"$sce.trustAsHtml(deleteEventHtml)\" ng-click=\"eventDeleteClick({$event: event})\"></a></li></ul></div></div></div></div>");
$templateCache.put("templates/week.html","<div class=\"cal-week-box\"><div class=\"cal-row-fluid cal-row-head\"><div class=\"cal-cell1\" ng-repeat=\"column in view.columns track by $index\" ng-class=\"{\'cal-day-weekend\': $index > 4, \'cal-day-today\': column.isToday}\">{{ column.weekDay }}<br><small><span data-cal-date=\"\" ng-click=\"drillDown(column.day)\" class=\"pointer\">{{ column.date }}</span></small></div></div><div class=\"cal-row-fluid\" ng-repeat=\"event in view.events track by $index\"><div class=\"cal-cell{{ event.daySpan }} cal-offset{{ event.dayOffset }} day-highlight dh-event-{{ event.type }}\" data-event-class=\"\"><a href=\"javascript:;\" ng-click=\"eventClick({$event: event})\" class=\"cal-event-week\">{{ event.title }}</a></div></div></div>");
$templateCache.put("templates/year.html","<div class=\"cal-year-box\"><div ng-repeat=\"year in view track by $index\"><div class=\"row cal-before-eventlist\"><div class=\"span3 col-md-3 col-xs-6 cal-cell\" ng-repeat=\"month in year track by $index\" ng-click=\"monthClicked($parent.$index, $index)\" ng-class=\"{pointer: month.events.length > 0, \'cal-day-today\': month.isToday}\"><span class=\"pull-right\" data-cal-date=\"\" ng-click=\"drillDown(month.monthIndex)\">{{ month.label }}</span> <small class=\"cal-events-num badge badge-important pull-left\" ng-show=\"month.events.length > 0\">{{ month.events.length }}</small><div class=\"cal-day-tick\" ng-show=\"month.isOpened\"><i class=\"glyphicon glyphicon-chevron-up\"></i> <i class=\"fa fa-chevron-up\"></i></div></div></div><div class=\"cal-slide-box\" collapse=\"!year.isOpened\"><span class=\"cal-slide-tick\"></span><div class=\"cal-slide-content\"><ul class=\"unstyled list-unstyled\"><li ng-repeat=\"event in openEvents track by $index\"><span class=\"pull-left event\" ng-class=\"\'event-\' + event.type\"></span> &nbsp; <a href=\"javascript:;\" class=\"event-item\" ng-click=\"eventClick({$event: event})\">{{ event.title }}</a> <a href=\"javascript:;\" class=\"event-item-edit\" ng-if=\"editEventHtml && event.editable !== false\" ng-bind-html=\"$sce.trustAsHtml(editEventHtml)\" ng-click=\"eventEditClick({$event: event})\"></a> <a href=\"javascript:;\" class=\"event-item-delete\" ng-if=\"deleteEventHtml && event.deletable !== false\" ng-bind-html=\"$sce.trustAsHtml(deleteEventHtml)\" ng-click=\"eventDeleteClick({$event: event})\"></a></li></ul></div></div></div></div>");}]);