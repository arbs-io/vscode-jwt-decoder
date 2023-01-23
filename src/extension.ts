import { ExtensionContext } from 'vscode'
import { registerShowPreviewClaimsetCommand } from './contexts/registerShowPreviewClaimsetCommand'
import { registerShowPreviewDecodedCommand } from './contexts/registerShowPreviewDecodedCommand'
import { registerJwtDocumentSemanticTokensProvider } from './providers/documentSemanticTokensProvider'
import { registerHoverProvider } from './providers/hoverProvider'

export function activate(context: ExtensionContext) {
  //Register Providers
  registerJwtDocumentSemanticTokensProvider(context)
  registerHoverProvider(context)

  //Register Commands
  registerShowPreviewClaimsetCommand(context)
  registerShowPreviewDecodedCommand(context)
}
