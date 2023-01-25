import { ExtensionContext } from 'vscode'
import { registerShowClaimsetPreviewCommand } from './contexts/registerShowClaimsetPreviewCommand'
import { registerShowJsonPreviewCommand } from './contexts/registerShowJsonPreviewCommand'
import { registerDocumentSemanticTokensProvider } from './providers/documentSemanticTokensProvider'
import { registerHoverProvider } from './providers/hoverProvider'

export function activate(context: ExtensionContext) {
  //Register Providers
  registerDocumentSemanticTokensProvider(context)
  registerHoverProvider(context)

  //Register Commands
  registerShowClaimsetPreviewCommand(context)
  registerShowJsonPreviewCommand(context)
}
