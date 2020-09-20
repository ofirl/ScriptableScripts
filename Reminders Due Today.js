// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: blue; icon-glyph: list;
// Shows reminders that are due for today in a table.
let cal = await Calendar.defaultForReminders()
let reminders = await Reminder.allDueToday([cal])
let table = new UITable()
populateTable(table, reminders)
QuickLook.present(table)
// Read number of reminders left when running with Siri.
if (config.runsWithSiri) {
  Speech.speak(text)
}
// It is good practice to call Script.complete() at the end of a script, especially when the script is used with Siri or in the Shortcuts app. This lets Scriptable report the results faster. Please see the documentation for details.
Script.complete()

function populateTable(table, reminders) {
  table.removeAllRows()
  let text = helperText(reminders)
  // Add the text as headline.
  if (!config.runsWithSiri) {
    let row = new UITableRow()
    row.isHeader = true
    row.addText(text)
    table.addRow(row)
  }
  // Add reminders to the table.
  for (reminder of reminders) {
    let row = new UITableRow()
    let emojiCell = row.addText(emoji(reminder))
    let titleCell = row.addText(reminder.title)
    let overdueCell = row.addText(overdueText(reminder))
    overdueCell.titleColor = Color.red()
    overdueCell.rightAligned()
    emojiCell.widthWeight = 5
    titleCell.widthWeight = 75
    overdueCell.widthWeight = 20
    row.dismissOnSelect = false
    row.onSelect = (number) => {
      toggleCompleted(reminder)
      populateTable(table, reminders)
    }
    table.addRow(row)
  }
  table.reload()
}

function toggleCompleted(reminder) {
  reminder.isCompleted = !reminder.isCompleted
  reminder.save()  
}

function helperText(reminders) {
  let incomplete = reminders.filter(reminder => {
    return reminder.isCompleted == false
  })
  if (reminders.count == 0) {
    return "You have no reminders due today."
  } else if (incomplete.length == 0) {
    return "You have completed all reminders."
  } else {
    let count = incomplete.length
    let strReminders = count == 1 ? "reminder" : "reminders"
    return "You have " + count + " " + strReminders + " left for today."
  }
}

function overdueText(reminder) {
  if (reminder.dueDate < new Date() && !reminder.isCompleted) {
    return "⚠️ Overdue"
  } else {
    return ""
  }
}

function emoji(reminder) {
  if (reminder.isCompleted) {
    return "✅"
  } else {
    return ""
  }
}