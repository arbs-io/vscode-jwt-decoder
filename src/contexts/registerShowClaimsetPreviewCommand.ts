import { commands, ExtensionContext, Uri } from 'vscode'
import { ClaimsetPanel } from '../panels/ClaimsetPanel'

export function registerShowClaimsetPreviewCommand(context: ExtensionContext) {
  _registerCommand(context)
}

function _registerCommand(context: ExtensionContext) {
  const command = 'jwt.showClaimsetPreviewCommand'
  const commandHandler = (uri: Uri) => {
    ClaimsetPanel.render(context.extensionUri)
  }
  context.subscriptions.push(commands.registerCommand(command, commandHandler))
}
