import { commands, ExtensionContext, Uri, window, workspace } from 'vscode'
import { LocalStorageService } from '../services/storageService'
import { stringHash } from '../utils/stringHash'

export function registerShowPreviewDecodedCommand(context: ExtensionContext) {
  _showPreviewDecoded(context)
}

function _showPreviewDecoded(context: ExtensionContext) {
  const command = 'jwt.showPreviewDecoded'
  const commandHandler = (uri: Uri) => {
    const docHash = stringHash(uri.toString())

    const storageManager = new LocalStorageService(context.workspaceState)
    const claimSet = storageManager.getValue<object>(`claimsSet_${docHash}`)

    workspace
      .openTextDocument({
        content: JSON.stringify(claimSet, undefined, 4),
        language: 'json',
      })
      .then((doc) => window.showTextDocument(doc))
  }
  context.subscriptions.push(commands.registerCommand(command, commandHandler))
}
