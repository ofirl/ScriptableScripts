// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: deep-green; icon-glyph: file-code;
function require (path) {
  try { var fm = FileManager.iCloud(); } catch (e) { var fm = FileManager.local(); }
  let code = fm.readString(fm.joinPath(fm.documentsDirectory(), path));
  if (code == null) throw new Error(`Module '${path}' not found.`);
  return Function(`${code}; return exports`)();
}

Script.complete();