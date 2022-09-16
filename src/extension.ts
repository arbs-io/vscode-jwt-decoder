import { ExtensionContext } from 'vscode'
import { RegisterCommand } from './contexts/RegisterCommand'
import { RegisterDocumentSemanticTokensProvider } from './contexts/RegisterDocumentSemanticTokensProvider'
import { RegisterHoverProvider } from './contexts/RegisterHoverProvider'

export function activate(context: ExtensionContext) {
  RegisterDocumentSemanticTokensProvider(context)
  RegisterCommand(context)
  RegisterHoverProvider(context)
}
