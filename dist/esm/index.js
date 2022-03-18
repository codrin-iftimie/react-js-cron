import React, { useRef, useEffect, useCallback, useMemo, useState } from 'react';
import { Select, Button } from 'antd';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

function __spreadArray(to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
}

var DEFAULT_LOCALE_EN = {
    everyText: 'every',
    emptyMonths: 'every month',
    emptyMonthDays: 'every day of the month',
    emptyMonthDaysShort: 'day of the month',
    emptyWeekDays: 'every day of the week',
    emptyWeekDaysShort: 'day of the week',
    emptyHours: 'every hour',
    emptyMinutes: 'every minute',
    emptyMinutesForHourPeriod: 'every',
    yearOption: 'year',
    monthOption: 'month',
    weekOption: 'week',
    dayOption: 'day',
    hourOption: 'hour',
    minuteOption: 'minute',
    rebootOption: 'reboot',
    prefixPeriod: 'Every',
    prefixMonths: 'in',
    prefixMonthDays: 'on',
    prefixWeekDays: 'on',
    prefixWeekDaysForMonthAndYearPeriod: 'and',
    prefixHours: 'at',
    prefixMinutes: ':',
    prefixMinutesForHourPeriod: 'at',
    suffixMinutesForHourPeriod: 'minute(s)',
    errorInvalidCron: 'Invalid cron expression',
    clearButtonText: 'Clear',
    weekDays: [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
    ],
    months: [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ],
    altWeekDays: [
        'SUN',
        'MON',
        'TUE',
        'WED',
        'THU',
        'FRI',
        'SAT',
    ],
    altMonths: [
        'JAN',
        'FEB',
        'MAR',
        'APR',
        'MAY',
        'JUN',
        'JUL',
        'AUG',
        'SEP',
        'OCT',
        'NOV',
        'DEC',
    ],
};

function range(start, end) {
    var array = [];
    for (var i = start; i <= end; i++) {
        array.push(i);
    }
    return array;
}
function sort(array) {
    array.sort(function (a, b) {
        return a - b;
    });
    return array;
}
function dedup(array) {
    var result = [];
    array.forEach(function (i) {
        if (result.indexOf(i) < 0) {
            result.push(i);
        }
    });
    return result;
}
function classNames(classes) {
    return Object.entries(classes)
        .filter(function (_a) {
        var key = _a[0], value = _a[1];
        return key && value;
    })
        .map(function (_a) {
        var key = _a[0];
        return key;
    })
        .join(' ');
}
function setError(onError, locale) {
    onError &&
        onError({
            type: 'invalid_cron',
            description: locale.errorInvalidCron || DEFAULT_LOCALE_EN.errorInvalidCron,
        });
}
function usePrevious(value) {
    var ref = useRef(value);
    useEffect(function () {
        ref.current = value;
    }, [value]);
    return ref.current;
}

function Period(props) {
    var value = props.value, setValue = props.setValue, locale = props.locale, className = props.className, disabled = props.disabled, readOnly = props.readOnly, shortcuts = props.shortcuts;
    var options = [
        {
            value: 'year',
            label: locale.yearOption || DEFAULT_LOCALE_EN.yearOption,
        },
        {
            value: 'month',
            label: locale.monthOption || DEFAULT_LOCALE_EN.monthOption,
        },
        {
            value: 'week',
            label: locale.weekOption || DEFAULT_LOCALE_EN.weekOption,
        },
        {
            value: 'day',
            label: locale.dayOption || DEFAULT_LOCALE_EN.dayOption,
        },
        {
            value: 'hour',
            label: locale.hourOption || DEFAULT_LOCALE_EN.hourOption,
        },
        {
            value: 'minute',
            label: locale.minuteOption || DEFAULT_LOCALE_EN.minuteOption,
        },
    ];
    if (shortcuts && (shortcuts === true || shortcuts.includes('@reboot'))) {
        options = __spreadArray(__spreadArray([], options, true), [
            {
                value: 'reboot',
                label: locale.rebootOption || DEFAULT_LOCALE_EN.rebootOption,
            },
        ], false);
    }
    var handleChange = useCallback(function (newValue) {
        if (!readOnly) {
            setValue(newValue);
        }
    }, [setValue, readOnly]);
    var internalClassName = useMemo(function () {
        var _a;
        return classNames((_a = {
                'react-js-cron-field': true,
                'react-js-cron-period': true
            },
            _a["".concat(className, "-field")] = !!className,
            _a["".concat(className, "-period")] = !!className,
            _a));
    }, [className]);
    var selectClassName = useMemo(function () {
        var _a;
        return classNames((_a = {
                'react-js-cron-select': true,
                'react-js-cron-select-no-prefix': locale.prefixPeriod === ''
            },
            _a["".concat(className, "-select")] = !!className,
            _a));
    }, [className, locale.prefixPeriod]);
    var dropdownClassName = useMemo(function () {
        var _a;
        return classNames((_a = {
                'react-js-cron-select-dropdown': true,
                'react-js-cron-select-dropdown-period': true
            },
            _a["".concat(className, "-select-dropdown")] = !!className,
            _a["".concat(className, "-select-dropdown-period")] = !!className,
            _a));
    }, [className]);
    return (React.createElement("div", { className: internalClassName },
        locale.prefixPeriod !== '' && (React.createElement("span", null, locale.prefixPeriod || DEFAULT_LOCALE_EN.prefixPeriod)),
        React.createElement(Select, { key: JSON.stringify(locale), defaultValue: value, value: value, onChange: handleChange, options: options, className: selectClassName, dropdownClassName: dropdownClassName, disabled: disabled, showArrow: !readOnly, open: readOnly ? false : undefined })));
}

var SUPPORTED_SHORTCUTS = [
    {
        name: '@yearly',
        value: '0 0 1 1 *',
    },
    {
        name: '@annually',
        value: '0 0 1 1 *',
    },
    {
        name: '@monthly',
        value: '0 0 1 * *',
    },
    {
        name: '@weekly',
        value: '0 0 * * 0',
    },
    {
        name: '@daily',
        value: '0 0 * * *',
    },
    {
        name: '@midnight',
        value: '0 0 * * *',
    },
    {
        name: '@hourly',
        value: '0 * * * *',
    },
];
var UNITS = [
    {
        type: 'minutes',
        min: 0,
        max: 59,
        total: 60,
    },
    {
        type: 'hours',
        min: 0,
        max: 23,
        total: 24,
    },
    {
        type: 'month-days',
        min: 1,
        max: 31,
        total: 31,
    },
    {
        type: 'months',
        min: 1,
        max: 12,
        total: 12,
        alt: [
            'JAN',
            'FEB',
            'MAR',
            'APR',
            'MAY',
            'JUN',
            'JUL',
            'AUG',
            'SEP',
            'OCT',
            'NOV',
            'DEC',
        ],
    },
    {
        type: 'week-days',
        min: 0,
        max: 6,
        total: 7,
        alt: ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'],
    },
];

function setValuesFromCronString(cronString, setInternalError, onError, allowEmpty, internalValueRef, firstRender, locale, shortcuts, setMinutes, setHours, setMonthDays, setMonths, setWeekDays, setPeriod) {
    onError && onError(undefined);
    setInternalError(false);
    var error = false;
    if (!cronString) {
        if (allowEmpty === 'always' ||
            (firstRender && allowEmpty === 'for-default-value')) {
            return;
        }
        error = true;
    }
    if (!error) {
        if (shortcuts &&
            (shortcuts === true || shortcuts.includes(cronString))) {
            if (cronString === '@reboot') {
                setPeriod('reboot');
                return;
            }
            var shortcutObject = SUPPORTED_SHORTCUTS.find(function (supportedShortcut) { return supportedShortcut.name === cronString; });
            if (shortcutObject) {
                cronString = shortcutObject.value;
            }
        }
        try {
            var cronParts = parseCronString(cronString);
            var period = getPeriodFromCronparts(cronParts);
            setPeriod(period);
            setMinutes(cronParts[0]);
            setHours(cronParts[1]);
            setMonthDays(cronParts[2]);
            setMonths(cronParts[3]);
            setWeekDays(cronParts[4]);
        }
        catch (err) {
            error = true;
        }
    }
    if (error) {
        internalValueRef.current = cronString;
        setInternalError(true);
        setError(onError, locale);
    }
}
function getCronStringFromValues(period, months, monthDays, weekDays, hours, minutes, humanizeValue) {
    if (period === 'reboot') {
        return '@reboot';
    }
    var newMonths = period === 'year' && months ? months : [];
    var newMonthDays = (period === 'year' || period === 'month') && monthDays ? monthDays : [];
    var newWeekDays = (period === 'year' || period === 'month' || period === 'week') && weekDays
        ? weekDays
        : [];
    var newHours = period !== 'minute' && period !== 'hour' && hours ? hours : [];
    var newMinutes = period !== 'minute' && minutes ? minutes : [];
    var parsedArray = parseCronArray([newMinutes, newHours, newMonthDays, newMonths, newWeekDays], humanizeValue);
    return cronToString(parsedArray);
}
function partToString(cronPart, unit, humanize, leadingZero, clockFormat) {
    var retval = '';
    if (isFull(cronPart, unit) || cronPart.length === 0) {
        retval = '*';
    }
    else {
        var step = getStep(cronPart);
        if (step && isInterval(cronPart, step)) {
            if (isFullInterval(cronPart, unit, step)) {
                retval = "*/".concat(step);
            }
            else {
                retval = "".concat(formatValue(getMin(cronPart), unit, humanize, leadingZero, clockFormat), "-").concat(formatValue(getMax(cronPart), unit, humanize, leadingZero, clockFormat), "/").concat(step);
            }
        }
        else {
            retval = toRanges(cronPart)
                .map(function (range) {
                if (Array.isArray(range)) {
                    return "".concat(formatValue(range[0], unit, humanize, leadingZero, clockFormat), "-").concat(formatValue(range[1], unit, humanize, leadingZero, clockFormat));
                }
                return formatValue(range, unit, humanize, leadingZero, clockFormat);
            })
                .join(',');
        }
    }
    return retval;
}
function formatValue(value, unit, humanize, leadingZero, clockFormat) {
    var cronPartString = value.toString();
    var type = unit.type, alt = unit.alt, min = unit.min;
    var needLeadingZero = leadingZero && (leadingZero === true || leadingZero.includes(type));
    var need24HourClock = clockFormat === '24-hour-clock' && (type === 'hours' || type === 'minutes');
    if ((humanize && type === 'week-days') || (humanize && type === 'months')) {
        cronPartString = alt[value - min];
    }
    else if (value < 10 && (needLeadingZero || need24HourClock)) {
        cronPartString = cronPartString.padStart(2, '0');
    }
    if (type === 'hours' && clockFormat === '12-hour-clock') {
        var suffix = value >= 12 ? 'PM' : 'AM';
        var hour = value % 12 || 12;
        if (hour < 10 && needLeadingZero) {
            hour = hour.toString().padStart(2, '0');
        }
        cronPartString = "".concat(hour).concat(suffix);
    }
    return cronPartString;
}
function parseCronArray(cronArr, humanizeValue) {
    if (cronArr.length === 5) {
        return cronArr.map(function (partArr, idx) {
            var unit = UNITS[idx];
            var parsedArray = parsePartArray(partArr, unit);
            return partToString(parsedArray, unit, humanizeValue);
        });
    }
    throw new Error('Invalid cron array');
}
function cronToString(parts) {
    return parts.join(' ');
}
function getPeriodFromCronparts(cronParts) {
    if (cronParts[3].length > 0) {
        return 'year';
    }
    else if (cronParts[2].length > 0) {
        return 'month';
    }
    else if (cronParts[4].length > 0) {
        return 'week';
    }
    else if (cronParts[1].length > 0) {
        return 'day';
    }
    else if (cronParts[0].length > 0) {
        return 'hour';
    }
    return 'minute';
}
function parseCronString(str) {
    if (typeof str !== 'string') {
        throw new Error('Invalid cron string');
    }
    var parts = str.replace(/\s+/g, ' ').trim().split(' ');
    if (parts.length === 5) {
        return parts.map(function (partStr, idx) {
            return parsePartString(partStr, UNITS[idx]);
        });
    }
    throw new Error('Invalid cron string format');
}
function parsePartString(str, unit) {
    if (str === '*' || str === '*/1') {
        return [];
    }
    var stringParts = str.split('/');
    if (stringParts.length > 2) {
        throw new Error("Invalid value \"".concat(unit.type, "\""));
    }
    var rangeString = replaceAlternatives(stringParts[0], unit.min, unit.alt);
    var parsedValues;
    if (rangeString === '*') {
        parsedValues = range(unit.min, unit.max);
    }
    else {
        parsedValues = sort(dedup(fixSunday(rangeString
            .split(',')
            .map(function (range) {
            return parseRange(range, str, unit);
        })
            .flat(), unit)));
        var value = outOfRange(parsedValues, unit);
        if (typeof value !== 'undefined') {
            throw new Error("Value \"".concat(value, "\" out of range for ").concat(unit.type));
        }
    }
    var step = parseStep(stringParts[1], unit);
    var intervalValues = applyInterval(parsedValues, step);
    if (intervalValues.length === unit.total) {
        return [];
    }
    else if (intervalValues.length === 0) {
        throw new Error("Empty interval value \"".concat(str, "\" for ").concat(unit.type));
    }
    return intervalValues;
}
function replaceAlternatives(str, min, alt) {
    if (alt) {
        str = str.toUpperCase();
        for (var i = 0; i < alt.length; i++) {
            str = str.replace(alt[i], "".concat(i + min));
        }
    }
    return str;
}
function fixSunday(values, unit) {
    if (unit.type === 'week-days') {
        values = values.map(function (value) {
            if (value === 7) {
                return 0;
            }
            return value;
        });
    }
    return values;
}
function parseRange(rangeStr, context, unit) {
    var subparts = rangeStr.split('-');
    if (subparts.length === 1) {
        var value = parseInt(subparts[0], 10);
        if (isNaN(value)) {
            throw new Error("Invalid value \"".concat(context, "\" for ").concat(unit.type));
        }
        return [value];
    }
    else if (subparts.length === 2) {
        var minValue = parseInt(subparts[0], 10);
        var maxValue = parseInt(subparts[1], 10);
        if (maxValue < minValue) {
            throw new Error("Max range is less than min range in \"".concat(rangeStr, "\" for ").concat(unit.type));
        }
        return range(minValue, maxValue);
    }
    else {
        throw new Error("Invalid value \"".concat(rangeStr, "\" for ").concat(unit.type));
    }
}
function outOfRange(values, unit) {
    var first = values[0];
    var last = values[values.length - 1];
    if (first < unit.min) {
        return first;
    }
    else if (last > unit.max) {
        return last;
    }
    return;
}
function parseStep(step, unit) {
    if (typeof step !== 'undefined') {
        var parsedStep = parseInt(step, 10);
        if (isNaN(parsedStep) || parsedStep < 1) {
            throw new Error("Invalid interval step value \"".concat(step, "\" for ").concat(unit.type));
        }
        return parsedStep;
    }
}
function applyInterval(values, step) {
    if (step) {
        var minVal_1 = values[0];
        values = values.filter(function (value) {
            return value % step === minVal_1 % step || value === minVal_1;
        });
    }
    return values;
}
function parsePartArray(arr, unit) {
    var values = sort(dedup(fixSunday(arr, unit)));
    if (values.length === 0) {
        return values;
    }
    var value = outOfRange(values, unit);
    if (typeof value !== 'undefined') {
        throw new Error("Value \"".concat(value, "\" out of range for ").concat(unit.type));
    }
    return values;
}
function isFull(values, unit) {
    return values.length === unit.max - unit.min + 1;
}
function getStep(values) {
    if (values.length > 2) {
        var step = values[1] - values[0];
        if (step > 1) {
            return step;
        }
    }
}
function isInterval(values, step) {
    for (var i = 1; i < values.length; i++) {
        var prev = values[i - 1];
        var value = values[i];
        if (value - prev !== step) {
            return false;
        }
    }
    return true;
}
function isFullInterval(values, unit, step) {
    var min = getMin(values);
    var max = getMax(values);
    var haveAllValues = values.length === (max - min) / step + 1;
    if (min === unit.min && max + step > unit.max && haveAllValues) {
        return true;
    }
    return false;
}
function getMin(values) {
    return values[0];
}
function getMax(values) {
    return values[values.length - 1];
}
function toRanges(values) {
    var retval = [];
    var startPart = null;
    values.forEach(function (value, index, self) {
        if (value !== self[index + 1] - 1) {
            if (startPart !== null) {
                retval.push([startPart, value]);
                startPart = null;
            }
            else {
                retval.push(value);
            }
        }
        else if (startPart === null) {
            startPart = value;
        }
    });
    return retval;
}

function CustomSelect(props) {
    var value = props.value, _a = props.grid, grid = _a === void 0 ? true : _a, optionsList = props.optionsList, setValue = props.setValue, locale = props.locale, className = props.className, humanizeLabels = props.humanizeLabels, disabled = props.disabled, readOnly = props.readOnly, leadingZero = props.leadingZero, clockFormat = props.clockFormat, period = props.period, unit = props.unit, periodicityOnDoubleClick = props.periodicityOnDoubleClick, otherProps = __rest(props, ["value", "grid", "optionsList", "setValue", "locale", "className", "humanizeLabels", "disabled", "readOnly", "leadingZero", "clockFormat", "period", "unit", "periodicityOnDoubleClick"]);
    var stringValue = useMemo(function () {
        if (value && Array.isArray(value)) {
            return value.map(function (value) { return value.toString(); });
        }
    }, [value]);
    var options = useMemo(function () {
        if (optionsList) {
            return optionsList.map(function (option, index) {
                var number = unit.min === 0 ? index : index + 1;
                return {
                    value: number.toString(),
                    label: option,
                };
            });
        }
        return __spreadArray([], Array(unit.total), true).map(function (e, index) {
            var number = unit.min === 0 ? index : index + 1;
            return {
                value: number.toString(),
                label: formatValue(number, unit, humanizeLabels, leadingZero, clockFormat),
            };
        });
    }, [optionsList, leadingZero, humanizeLabels, clockFormat]);
    var localeJSON = JSON.stringify(locale);
    var renderTag = useCallback(function (props) {
        var itemValue = props.value;
        if (!value || value[0] !== Number(itemValue)) {
            return React.createElement(React.Fragment, null);
        }
        var parsedArray = parsePartArray(value, unit);
        var cronValue = partToString(parsedArray, unit, humanizeLabels, leadingZero, clockFormat);
        var testEveryValue = cronValue.match(/^\*\/([0-9]+),?/) || [];
        return (React.createElement("div", null, testEveryValue[1]
            ? "".concat(locale.everyText || DEFAULT_LOCALE_EN.everyText, " ").concat(testEveryValue[1])
            : cronValue));
    }, [value, localeJSON, humanizeLabels, leadingZero, clockFormat]);
    var simpleClick = useCallback(function (newValueOption) {
        var newValueOptions = Array.isArray(newValueOption)
            ? sort(newValueOption)
            : [newValueOption];
        var newValue = newValueOptions;
        if (value) {
            newValue = __spreadArray([], value, true);
            newValueOptions.forEach(function (o) {
                var newValueOptionNumber = Number(o);
                if (value.some(function (v) { return v === newValueOptionNumber; })) {
                    newValue = newValue.filter(function (v) { return v !== newValueOptionNumber; });
                }
                else {
                    newValue = sort(__spreadArray(__spreadArray([], newValue, true), [newValueOptionNumber], false));
                }
            });
        }
        if (newValue.length === unit.total) {
            setValue([]);
        }
        else {
            setValue(newValue);
        }
    }, [setValue, value]);
    var doubleClick = useCallback(function (newValueOption) {
        if (newValueOption !== 0 && newValueOption !== 1) {
            var limit = unit.total + unit.min;
            var newValue_1 = [];
            for (var i = unit.min; i < limit; i++) {
                if (i % newValueOption === 0) {
                    newValue_1.push(i);
                }
            }
            var oldValueEqualNewValue = value &&
                newValue_1 &&
                value.length === newValue_1.length &&
                value.every(function (v, i) { return v === newValue_1[i]; });
            var allValuesSelected = newValue_1.length === options.length;
            if (allValuesSelected) {
                setValue([]);
            }
            else if (oldValueEqualNewValue) {
                setValue([]);
            }
            else {
                setValue(newValue_1);
            }
        }
        else {
            setValue([]);
        }
    }, [value, options, setValue]);
    var clicksRef = useRef([]);
    var onOptionClick = useCallback(function (newValueOption) {
        if (!readOnly) {
            var doubleClickTimeout_1 = 300;
            var clicks_1 = clicksRef.current;
            clicks_1.push({
                time: new Date().getTime(),
                value: Number(newValueOption),
            });
            var id_1 = window.setTimeout(function () {
                if (periodicityOnDoubleClick &&
                    clicks_1.length > 1 &&
                    clicks_1[clicks_1.length - 1].time - clicks_1[clicks_1.length - 2].time <
                        doubleClickTimeout_1) {
                    if (clicks_1[clicks_1.length - 1].value ===
                        clicks_1[clicks_1.length - 2].value) {
                        doubleClick(Number(newValueOption));
                    }
                    else {
                        simpleClick([
                            clicks_1[clicks_1.length - 2].value,
                            clicks_1[clicks_1.length - 1].value,
                        ]);
                    }
                }
                else {
                    simpleClick(Number(newValueOption));
                }
                clicksRef.current = [];
            }, doubleClickTimeout_1);
            return function () {
                window.clearTimeout(id_1);
            };
        }
    }, [clicksRef, simpleClick, doubleClick, readOnly, periodicityOnDoubleClick]);
    var onClear = useCallback(function () {
        if (!readOnly) {
            setValue([]);
        }
    }, [setValue, readOnly]);
    var internalClassName = useMemo(function () {
        var _a;
        return classNames((_a = {
                'react-js-cron-select': true,
                'react-js-cron-custom-select': true
            },
            _a["".concat(className, "-select")] = !!className,
            _a));
    }, [className]);
    var dropdownClassNames = useMemo(function () {
        var _a;
        return classNames((_a = {
                'react-js-cron-select-dropdown': true
            },
            _a["react-js-cron-select-dropdown-".concat(unit.type)] = true,
            _a['react-js-cron-custom-select-dropdown'] = true,
            _a["react-js-cron-custom-select-dropdown-".concat(unit.type)] = true,
            _a["react-js-cron-custom-select-dropdown-minutes-large"] = unit.type === 'minutes' && period !== 'hour' && period !== 'day',
            _a["react-js-cron-custom-select-dropdown-minutes-medium"] = unit.type === 'minutes' && (period === 'day' || period === 'hour'),
            _a['react-js-cron-custom-select-dropdown-hours-twelve-hour-clock'] = unit.type === 'hours' && clockFormat === '12-hour-clock',
            _a['react-js-cron-custom-select-dropdown-grid'] = !!grid,
            _a["".concat(className, "-select-dropdown")] = !!className,
            _a["".concat(className, "-select-dropdown-").concat(unit.type)] = !!className,
            _a));
    }, [className, grid, clockFormat, period]);
    return (React.createElement(Select, __assign({ mode: 'multiple', allowClear: !readOnly, virtual: false, open: readOnly ? false : undefined, value: stringValue, onClear: onClear, tagRender: renderTag, className: internalClassName, dropdownClassName: dropdownClassNames, options: options, showSearch: false, showArrow: !readOnly, menuItemSelectedIcon: null, dropdownMatchSelectWidth: false, onSelect: onOptionClick, onDeselect: onOptionClick, disabled: disabled, dropdownAlign: (unit.type === 'minutes' || unit.type === 'hours') &&
            period !== 'day' &&
            period !== 'hour'
            ? {
                points: ['tr', 'br'],
            }
            : undefined }, otherProps)));
}

function MonthDays(props) {
    var value = props.value, setValue = props.setValue, locale = props.locale, className = props.className, weekDays = props.weekDays, disabled = props.disabled, readOnly = props.readOnly, leadingZero = props.leadingZero, period = props.period, periodicityOnDoubleClick = props.periodicityOnDoubleClick;
    var noWeekDays = !weekDays || weekDays.length === 0;
    var internalClassName = useMemo(function () {
        var _a;
        return classNames((_a = {
                'react-js-cron-field': true,
                'react-js-cron-month-days': true,
                'react-js-cron-month-days-placeholder': !noWeekDays
            },
            _a["".concat(className, "-field")] = !!className,
            _a["".concat(className, "-month-days")] = !!className,
            _a));
    }, [className, noWeekDays]);
    var localeJSON = JSON.stringify(locale);
    var placeholder = useMemo(function () {
        if (noWeekDays) {
            return locale.emptyMonthDays || DEFAULT_LOCALE_EN.emptyMonthDays;
        }
        return locale.emptyMonthDaysShort || DEFAULT_LOCALE_EN.emptyMonthDaysShort;
    }, [noWeekDays, localeJSON]);
    var displayMonthDays = !readOnly ||
        (value && value.length > 0) ||
        ((!value || value.length === 0) && (!weekDays || weekDays.length === 0));
    return displayMonthDays ? (React.createElement("div", { className: internalClassName },
        locale.prefixMonthDays !== '' && (React.createElement("span", null, locale.prefixMonthDays || DEFAULT_LOCALE_EN.prefixMonthDays)),
        React.createElement(CustomSelect, { placeholder: placeholder, value: value, setValue: setValue, unit: UNITS[2], locale: locale, className: className, disabled: disabled, readOnly: readOnly, leadingZero: leadingZero, period: period, periodicityOnDoubleClick: periodicityOnDoubleClick }))) : null;
}

function Months(props) {
    var value = props.value, setValue = props.setValue, locale = props.locale, className = props.className, humanizeLabels = props.humanizeLabels, disabled = props.disabled, readOnly = props.readOnly, period = props.period, periodicityOnDoubleClick = props.periodicityOnDoubleClick;
    var optionsList = locale.months || DEFAULT_LOCALE_EN.months;
    var internalClassName = useMemo(function () {
        var _a;
        return classNames((_a = {
                'react-js-cron-field': true,
                'react-js-cron-months': true
            },
            _a["".concat(className, "-field")] = !!className,
            _a["".concat(className, "-months")] = !!className,
            _a));
    }, [className]);
    return (React.createElement("div", { className: internalClassName },
        locale.prefixMonths !== '' && (React.createElement("span", null, locale.prefixMonths || DEFAULT_LOCALE_EN.prefixMonths)),
        React.createElement(CustomSelect, { placeholder: locale.emptyMonths || DEFAULT_LOCALE_EN.emptyMonths, optionsList: optionsList, grid: false, value: value, unit: __assign(__assign({}, UNITS[3]), { alt: locale.altMonths || DEFAULT_LOCALE_EN.altMonths }), setValue: setValue, locale: locale, className: className, humanizeLabels: humanizeLabels, disabled: disabled, readOnly: readOnly, period: period, periodicityOnDoubleClick: periodicityOnDoubleClick })));
}

function Hours(props) {
    var value = props.value, setValue = props.setValue, locale = props.locale, className = props.className, disabled = props.disabled, readOnly = props.readOnly, leadingZero = props.leadingZero, clockFormat = props.clockFormat, period = props.period, periodicityOnDoubleClick = props.periodicityOnDoubleClick;
    var internalClassName = useMemo(function () {
        var _a;
        return classNames((_a = {
                'react-js-cron-field': true,
                'react-js-cron-hours': true
            },
            _a["".concat(className, "-field")] = !!className,
            _a["".concat(className, "-hours")] = !!className,
            _a));
    }, [className]);
    return (React.createElement("div", { className: internalClassName },
        locale.prefixHours !== '' && (React.createElement("span", null, locale.prefixHours || DEFAULT_LOCALE_EN.prefixHours)),
        React.createElement(CustomSelect, { placeholder: locale.emptyHours || DEFAULT_LOCALE_EN.emptyHours, value: value, unit: UNITS[1], setValue: setValue, locale: locale, className: className, disabled: disabled, readOnly: readOnly, leadingZero: leadingZero, clockFormat: clockFormat, period: period, periodicityOnDoubleClick: periodicityOnDoubleClick })));
}

function Minutes(props) {
    var value = props.value, setValue = props.setValue, locale = props.locale, className = props.className, disabled = props.disabled, readOnly = props.readOnly, leadingZero = props.leadingZero, clockFormat = props.clockFormat, period = props.period, periodicityOnDoubleClick = props.periodicityOnDoubleClick;
    var internalClassName = useMemo(function () {
        var _a;
        return classNames((_a = {
                'react-js-cron-field': true,
                'react-js-cron-minutes': true
            },
            _a["".concat(className, "-field")] = !!className,
            _a["".concat(className, "-minutes")] = !!className,
            _a));
    }, [className]);
    return (React.createElement("div", { className: internalClassName },
        period === 'hour'
            ? locale.prefixMinutesForHourPeriod !== '' && (React.createElement("span", null, locale.prefixMinutesForHourPeriod ||
                DEFAULT_LOCALE_EN.prefixMinutesForHourPeriod))
            : locale.prefixMinutes !== '' && (React.createElement("span", null, locale.prefixMinutes || DEFAULT_LOCALE_EN.prefixMinutes)),
        React.createElement(CustomSelect, { placeholder: period === 'hour'
                ? locale.emptyMinutesForHourPeriod ||
                    DEFAULT_LOCALE_EN.emptyMinutesForHourPeriod
                : locale.emptyMinutes || DEFAULT_LOCALE_EN.emptyMinutes, value: value, unit: UNITS[0], setValue: setValue, locale: locale, className: className, disabled: disabled, readOnly: readOnly, leadingZero: leadingZero, clockFormat: clockFormat, period: period, periodicityOnDoubleClick: periodicityOnDoubleClick }),
        period === 'hour' && locale.suffixMinutesForHourPeriod !== '' && (React.createElement("span", null, locale.suffixMinutesForHourPeriod ||
            DEFAULT_LOCALE_EN.suffixMinutesForHourPeriod))));
}

function WeekDays(props) {
    var value = props.value, setValue = props.setValue, locale = props.locale, className = props.className, humanizeLabels = props.humanizeLabels, monthDays = props.monthDays, disabled = props.disabled, readOnly = props.readOnly, period = props.period, periodicityOnDoubleClick = props.periodicityOnDoubleClick;
    var optionsList = locale.weekDays || DEFAULT_LOCALE_EN.weekDays;
    var noMonthDays = period === 'week' || !monthDays || monthDays.length === 0;
    var internalClassName = useMemo(function () {
        var _a;
        return classNames((_a = {
                'react-js-cron-field': true,
                'react-js-cron-week-days': true,
                'react-js-cron-week-days-placeholder': !noMonthDays
            },
            _a["".concat(className, "-field")] = !!className,
            _a["".concat(className, "-week-days")] = !!className,
            _a));
    }, [className, noMonthDays]);
    var localeJSON = JSON.stringify(locale);
    var placeholder = useMemo(function () {
        if (noMonthDays) {
            return locale.emptyWeekDays || DEFAULT_LOCALE_EN.emptyWeekDays;
        }
        return locale.emptyWeekDaysShort || DEFAULT_LOCALE_EN.emptyWeekDaysShort;
    }, [noMonthDays, localeJSON]);
    var displayWeekDays = period === 'week' ||
        !readOnly ||
        (value && value.length > 0) ||
        ((!value || value.length === 0) && (!monthDays || monthDays.length === 0));
    var monthDaysIsDisplayed = !readOnly ||
        (monthDays && monthDays.length > 0) ||
        ((!monthDays || monthDays.length === 0) && (!value || value.length === 0));
    return displayWeekDays ? (React.createElement("div", { className: internalClassName },
        locale.prefixWeekDays !== '' &&
            (period === 'week' || !monthDaysIsDisplayed) && (React.createElement("span", null, locale.prefixWeekDays || DEFAULT_LOCALE_EN.prefixWeekDays)),
        locale.prefixWeekDaysForMonthAndYearPeriod !== '' &&
            period !== 'week' &&
            monthDaysIsDisplayed && (React.createElement("span", null, locale.prefixWeekDaysForMonthAndYearPeriod ||
            DEFAULT_LOCALE_EN.prefixWeekDaysForMonthAndYearPeriod)),
        React.createElement(CustomSelect, { placeholder: placeholder, optionsList: optionsList, grid: false, value: value, unit: __assign(__assign({}, UNITS[4]), { alt: locale.altWeekDays || DEFAULT_LOCALE_EN.altWeekDays }), setValue: setValue, locale: locale, className: className, humanizeLabels: humanizeLabels, disabled: disabled, readOnly: readOnly, period: period, periodicityOnDoubleClick: periodicityOnDoubleClick }))) : null;
}

function Cron(props) {
    var _a = props.clearButton, clearButton = _a === void 0 ? true : _a, _b = props.clearButtonProps, clearButtonProps = _b === void 0 ? {} : _b, _c = props.clearButtonAction, clearButtonAction = _c === void 0 ? 'fill-with-every' : _c, _d = props.locale, locale = _d === void 0 ? DEFAULT_LOCALE_EN : _d, _e = props.value, value = _e === void 0 ? '' : _e, setValue = props.setValue, _f = props.displayError, displayError = _f === void 0 ? true : _f, onError = props.onError, className = props.className, _g = props.defaultPeriod, defaultPeriod = _g === void 0 ? 'day' : _g, _h = props.allowEmpty, allowEmpty = _h === void 0 ? 'for-default-value' : _h, _j = props.humanizeLabels, humanizeLabels = _j === void 0 ? true : _j, _k = props.humanizeValue, humanizeValue = _k === void 0 ? false : _k, _l = props.disabled, disabled = _l === void 0 ? false : _l, _m = props.readOnly, readOnly = _m === void 0 ? false : _m, _o = props.leadingZero, leadingZero = _o === void 0 ? false : _o, _p = props.shortcuts, shortcuts = _p === void 0 ? [
        '@yearly',
        '@annually',
        '@monthly',
        '@weekly',
        '@daily',
        '@midnight',
        '@hourly',
    ] : _p, clockFormat = props.clockFormat, _q = props.periodicityOnDoubleClick, periodicityOnDoubleClick = _q === void 0 ? true : _q;
    var internalValueRef = useRef(value);
    var defaultPeriodRef = useRef(defaultPeriod);
    var _r = useState(), period = _r[0], setPeriod = _r[1];
    var _s = useState(), monthDays = _s[0], setMonthDays = _s[1];
    var _t = useState(), months = _t[0], setMonths = _t[1];
    var _u = useState(), weekDays = _u[0], setWeekDays = _u[1];
    var _v = useState(), hours = _v[0], setHours = _v[1];
    var _w = useState(), minutes = _w[0], setMinutes = _w[1];
    var _x = useState(false), error = _x[0], setInternalError = _x[1];
    var _y = useState(false), valueCleared = _y[0], setValueCleared = _y[1];
    var previousValueCleared = usePrevious(valueCleared);
    var localeJSON = JSON.stringify(locale);
    useEffect(function () {
        setValuesFromCronString(value, setInternalError, onError, allowEmpty, internalValueRef, true, locale, shortcuts, setMinutes, setHours, setMonthDays, setMonths, setWeekDays, setPeriod);
    }, []);
    useEffect(function () {
        if (value !== internalValueRef.current) {
            setValuesFromCronString(value, setInternalError, onError, allowEmpty, internalValueRef, false, locale, shortcuts, setMinutes, setHours, setMonthDays, setMonths, setWeekDays, setPeriod);
        }
    }, [value, internalValueRef, localeJSON, allowEmpty, shortcuts]);
    useEffect(function () {
        if ((period || minutes || months || monthDays || weekDays || hours) &&
            !valueCleared &&
            !previousValueCleared) {
            var cron = getCronStringFromValues(period || defaultPeriodRef.current, months, monthDays, weekDays, hours, minutes, humanizeValue);
            setValue(cron);
            internalValueRef.current = cron;
            onError && onError(undefined);
            setInternalError(false);
        }
        else if (valueCleared) {
            setValueCleared(false);
        }
    }, [
        period,
        monthDays,
        months,
        weekDays,
        hours,
        minutes,
        humanizeValue,
        valueCleared,
    ]);
    var handleClear = useCallback(function () {
        setMonthDays(undefined);
        setMonths(undefined);
        setWeekDays(undefined);
        setHours(undefined);
        setMinutes(undefined);
        var newValue = '';
        var newPeriod = period !== 'reboot' && period ? period : defaultPeriodRef.current;
        if (newPeriod !== period) {
            setPeriod(newPeriod);
        }
        if (clearButtonAction === 'fill-with-every') {
            var cron = getCronStringFromValues(newPeriod, undefined, undefined, undefined, undefined, undefined);
            newValue = cron;
        }
        setValue(newValue);
        internalValueRef.current = newValue;
        setValueCleared(true);
        if (allowEmpty === 'never' && clearButtonAction === 'empty') {
            setInternalError(true);
            setError(onError, locale);
        }
        else {
            onError && onError(undefined);
            setInternalError(false);
        }
    }, [period, setValue, onError, clearButtonAction]);
    var internalClassName = useMemo(function () {
        var _a;
        return classNames((_a = {
                'react-js-cron': true,
                'react-js-cron-error': error && displayError,
                'react-js-cron-disabled': disabled,
                'react-js-cron-read-only': readOnly
            },
            _a["".concat(className)] = !!className,
            _a["".concat(className, "-error")] = error && displayError && !!className,
            _a["".concat(className, "-disabled")] = disabled && !!className,
            _a["".concat(className, "-read-only")] = readOnly && !!className,
            _a));
    }, [className, error, displayError, disabled, readOnly]);
    var clearButtonClassNameProp = clearButtonProps.className, otherClearButtonProps = __rest(clearButtonProps, ["className"]);
    var clearButtonClassName = useMemo(function () {
        var _a;
        return classNames((_a = {
                'react-js-cron-clear-button': true
            },
            _a["".concat(className, "-clear-button")] = !!className,
            _a["".concat(clearButtonClassNameProp)] = !!clearButtonClassNameProp,
            _a));
    }, [className, clearButtonClassNameProp]);
    var otherClearButtonPropsJSON = JSON.stringify(otherClearButtonProps);
    var clearButtonNode = useMemo(function () {
        if (clearButton && !readOnly) {
            return (React.createElement(Button, __assign({ className: clearButtonClassName, danger: true, type: 'primary', disabled: disabled }, otherClearButtonProps, { onClick: handleClear }), locale.clearButtonText || DEFAULT_LOCALE_EN.clearButtonText));
        }
        return null;
    }, [
        clearButton,
        readOnly,
        localeJSON,
        clearButtonClassName,
        disabled,
        otherClearButtonPropsJSON,
        handleClear,
    ]);
    var periodForRender = period || defaultPeriodRef.current;
    return (React.createElement("div", { className: internalClassName },
        React.createElement(Period, { value: periodForRender, setValue: setPeriod, locale: locale, className: className, disabled: disabled, readOnly: readOnly, shortcuts: shortcuts }),
        periodForRender === 'reboot' ? (clearButtonNode) : (React.createElement(React.Fragment, null,
            periodForRender === 'year' && (React.createElement(Months, { value: months, setValue: setMonths, locale: locale, className: className, humanizeLabels: humanizeLabels, disabled: disabled, readOnly: readOnly, period: periodForRender, periodicityOnDoubleClick: periodicityOnDoubleClick })),
            (periodForRender === 'year' || periodForRender === 'month') && (React.createElement(MonthDays, { value: monthDays, setValue: setMonthDays, locale: locale, className: className, weekDays: weekDays, disabled: disabled, readOnly: readOnly, leadingZero: leadingZero, period: periodForRender, periodicityOnDoubleClick: periodicityOnDoubleClick })),
            (periodForRender === 'year' ||
                periodForRender === 'month' ||
                periodForRender === 'week') && (React.createElement(WeekDays, { value: weekDays, setValue: setWeekDays, locale: locale, className: className, humanizeLabels: humanizeLabels, monthDays: monthDays, disabled: disabled, readOnly: readOnly, period: periodForRender, periodicityOnDoubleClick: periodicityOnDoubleClick })),
            React.createElement("div", null,
                periodForRender !== 'minute' && periodForRender !== 'hour' && (React.createElement(Hours, { value: hours, setValue: setHours, locale: locale, className: className, disabled: disabled, readOnly: readOnly, leadingZero: leadingZero, clockFormat: clockFormat, period: periodForRender, periodicityOnDoubleClick: periodicityOnDoubleClick })),
                periodForRender !== 'minute' && (React.createElement(Minutes, { value: minutes, setValue: setMinutes, locale: locale, period: periodForRender, className: className, disabled: disabled, readOnly: readOnly, leadingZero: leadingZero, clockFormat: clockFormat, periodicityOnDoubleClick: periodicityOnDoubleClick })),
                clearButtonNode)))));
}

export { Cron, Cron as default };
