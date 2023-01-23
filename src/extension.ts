import { ExtensionContext } from 'vscode'
import { RegisterCommand } from './contexts/RegisterCommand'
import { RegisterDocumentSemanticTokensProvider } from './providers/RegisterDocumentSemanticTokensProvider'
import { RegisterHoverProvider } from './providers/RegisterHoverProvider'

export function activate(context: ExtensionContext) {
  RegisterDocumentSemanticTokensProvider(context)
  RegisterCommand(context)
  RegisterHoverProvider(context)
}
