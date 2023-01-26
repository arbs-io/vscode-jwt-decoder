import path = require('path')
import { window } from 'vscode'

/**
 * A helper function that returns a unique alphanumeric identifier called a nonce.
 *
 * @remarks This function is primarily used to help get filename from full url
 * appending a given extension
 *
 * @returns A filename
 */
export function getActiveTextEditorFilename(defaultName: string) {
  const activeTextEditorFileName = window.activeTextEditor?.document.fileName
    ? path.basename(window.activeTextEditor.document.fileName)
    : defaultName
  return activeTextEditorFileName
}
