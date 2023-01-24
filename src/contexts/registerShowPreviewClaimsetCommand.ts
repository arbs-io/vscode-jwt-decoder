import { commands, ExtensionContext, Uri, window } from 'vscode'

export function registerShowPreviewClaimsetCommand(context: ExtensionContext) {
  _registerCommand(context)
}

function _registerCommand(context: ExtensionContext) {
  const command = 'jwt.showPreviewClaimset'
  const commandHandler = (uri: Uri) => {
    window.showInformationMessage('Claimset: Coming soon...')
  }
  context.subscriptions.push(commands.registerCommand(command, commandHandler))
}
