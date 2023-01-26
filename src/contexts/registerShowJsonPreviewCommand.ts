import {
  commands,
  ExtensionContext,
  Uri,
  ViewColumn,
  window,
  workspace,
} from 'vscode'
import { LocalStorageService } from '../services/storageService'
import { stringHash } from '../utils/stringHash'

export function registerShowJsonPreviewCommand(context: ExtensionContext) {
  _registerCommand(context)
}

function _registerCommand(context: ExtensionContext) {
  const command = 'jwt.showJsonPreviewCommand'
  const commandHandler = (uri: Uri) => {
    const docHash = stringHash(uri.toString())

    const storageManager = new LocalStorageService(context.workspaceState)
    const claimSet = storageManager.getValue<object>(`claimsSet_${docHash}`)

    workspace
      .openTextDocument({
        content: JSON.stringify(claimSet, undefined, 4),
        language: 'json',
      })
      .then((doc) =>
        window.showTextDocument(doc, {
          preserveFocus: true,
          preview: false,
          viewColumn: ViewColumn.Beside,
        })
      )
  }
  context.subscriptions.push(commands.registerCommand(command, commandHandler))
}
