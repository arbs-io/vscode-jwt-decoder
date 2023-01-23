import { commands, ExtensionContext, Uri, window, workspace } from 'vscode'
import { LocalStorageService } from '../services/LocalStorageService'
import { stringHash } from '../utils/stringHash'

export function RegisterCommand(context: ExtensionContext) {
  showPreviewDecoded(context)
  showPreviewClaimset(context)
}

function showPreviewDecoded(context: ExtensionContext) {
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

function showPreviewClaimset(context: ExtensionContext) {
  const command = 'jwt.showPreviewClaimset'
  const commandHandler = (uri: Uri) => {
    window.showInformationMessage('Claimset: Coming soon...')
  }
  context.subscriptions.push(commands.registerCommand(command, commandHandler))
}
