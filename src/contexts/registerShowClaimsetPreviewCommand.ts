import { commands, ExtensionContext, Uri } from 'vscode'
import { ClaimsetPanel } from '../panels/ClaimsetPanel'
import { LocalStorageService } from '../services/storageService'
import { stringHash } from '../utils/stringHash'

export function registerShowClaimsetPreviewCommand(context: ExtensionContext) {
  _registerCommand(context)
}

function _registerCommand(context: ExtensionContext) {
  const command = 'jwt.showClaimsetPreviewCommand'
  const commandHandler = (uri: Uri) => {
    const docHash = stringHash(uri.toString())

    const storageManager = new LocalStorageService(context.workspaceState)
    const claimSet = storageManager.getValue<object>(`claimsSet_${docHash}`)

    ClaimsetPanel.render(context.extensionUri, claimSet)
  }
  context.subscriptions.push(commands.registerCommand(command, commandHandler))
}
