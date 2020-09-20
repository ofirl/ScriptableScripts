// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: teal; icon-glyph: magic;
console.log(args.shortcutParameter)
// let testPath = 'file:///private/var/mobile/Containers/Data/Application/9EC86ECD-87F5-481F-A45A-9BA9F99FE147/tmp/6E21AC5E-D51D-40D0-9CF9-A14AB00770F8/Turn%20Off%20WiFi.shortcut';

let fileManager = FileManager.local()

fileData=fileManager.readString(decodeURI(args.shortcutParameter.substring(7, args.shortcutParameter.length)))

// console.log(fileData)

return fileData.toString()