import { languages, ExtensionContext, Hover } from 'vscode'
import { LocalStorageService } from '../services/storageService'
import { stringHash } from '../utils/stringHash'

export function RegisterHoverProvider(context: ExtensionContext) {
  context.subscriptions.push(
    languages.registerHoverProvider('jwt', {
      provideHover(document, position, token) {
        const range = document.getWordRangeAtPosition(position)
        const docHash = stringHash(document.uri.toString())
        const storageManager = new LocalStorageService(context.workspaceState)
        const storageKey =
          range?.start.character === 0
            ? `joseHeader_${docHash}`
            : `claimsSet_${docHash}`
        const hoverValue = storageManager.getValue<object>(storageKey)

        return new Hover({
          language: 'json',
          value: JSON.stringify(hoverValue, undefined, 4),
        })
      },
    })
  )
}
