// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: teal; icon-glyph: magic;

/**
 * @typedef {'default' | 'accept' | 'alert' | 'complete' | 'event' | 'failure' | 'piano_error' | 'piano_success' | 'popup'} Sound
 * 
 * @typedef {object} Action
 * @property {string} name
 * @property {string} url
 * @property {bool} destructive
 * 
 * @typedef {object} RepeatTrigger
 * @property {number} weekday
 * @property {number} hour
 * @property {number} minute
 * @property {bool} repeats
 */

/**
 * repeatTrigger and triggerIn are mutually exclusive, only one will take effect,
 * repeatTrigger will override triggerIn
 */
module.exports.NotificationFactory = ({
    threadIdentifier = 'defaultThreadIdentifier',
    schedule = true,
    title,
    subtitle,
    body,
    sound,
    triggerIn = 3000,
    repeatTrigger,
    userInfo = '',
    badge,
    actions = [],
    openURL,
    scriptName,
}) => {
    let notification = new Notification();
    notification.threadIdentifier = threadIdentifier;
    notification.title = title;
    notification.subtitle = subtitle;
    notification.body = body;
    notification.sound = sound;
    notification.userInfo = userInfo;
    notification.badge = badge;
    notification.openURL = openURL;
    notification.scriptName = scriptName;

    if (repeatTrigger) {
        let { weekday, hour, minute, repeats } = repeatTrigger;

        if (repeatTrigger.weekday)
            notification.setWeeklyTrigger(weekday, hour, minute, repeats);
        else
            notification.setDailyTrigger(hour, minute, repeats);
    }
    else {
        triggerIn = Math.max(3000, triggerIn);
        let triggerDate = new Date(Date.now() + triggerIn);
        notification.setTriggerDate(triggerDate);
    }

    actions && actions.forEach((a) => {
        let { name, url, destructive = false } = a;
        notification.addAction(name, url, destructive);
    });

    if (schedule)
        notification.schedule();

    return notification;
};