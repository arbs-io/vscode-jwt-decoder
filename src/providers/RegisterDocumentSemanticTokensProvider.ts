import { languages, ExtensionContext } from 'vscode'
import { JwtDocumentSemanticTokensProvider } from './JwtDocumentSemanticTokensProvider'

export function RegisterDocumentSemanticTokensProvider(
  context: ExtensionContext
) {
  const provider = new JwtDocumentSemanticTokensProvider(context)
  context.subscriptions.push(
    languages.registerDocumentSemanticTokensProvider(
      { language: 'jwt' },
      provider,
      provider.legend
    )
  )
}
