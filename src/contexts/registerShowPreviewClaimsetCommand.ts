import { commands, ExtensionContext, Uri, window, workspace } from 'vscode'

export function registerShowPreviewClaimsetCommand(context: ExtensionContext) {
  _showPreviewClaimset(context)
}

function _showPreviewClaimset(context: ExtensionContext) {
  const command = 'jwt.showPreviewClaimset'
  const commandHandler = (uri: Uri) => {
    window.showInformationMessage('Claimset: Coming soon...')
  }
  context.subscriptions.push(commands.registerCommand(command, commandHandler))
}
