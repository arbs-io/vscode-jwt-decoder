import {
  SemanticTokensLegend,
  DocumentSemanticTokensProvider,
  TextDocument,
  CancellationToken,
  SemanticTokens,
  SemanticTokensBuilder,
  ExtensionContext,
} from 'vscode'

import { JwtDecode } from '../utilities/JwtDecode'
import { StringHash } from '../utilities/StringHash'
import { LocalStorageService } from '../services/LocalStorageService'

const tokenTypes = new Map<string, number>()
const tokenTypesLegend = ['jwt_joseHeader', 'jwt_claimsSet', 'jwt_signature']

export class JwtDocumentSemanticTokensProvider
  implements DocumentSemanticTokensProvider
{
  context: ExtensionContext
  jwtDecode: JwtDecode | undefined

  constructor(context: ExtensionContext) {
    this.context = context
  }

  legend = (function () {
    tokenTypesLegend.forEach((tokenType, index) =>
      tokenTypes.set(tokenType, index)
    )
    return new SemanticTokensLegend(tokenTypesLegend)
  })()

  async provideDocumentSemanticTokens(
    document: TextDocument,
    token: CancellationToken
  ): Promise<SemanticTokens> {
    const allTokens = this._parseTokenText(document.getText())
    const builder = new SemanticTokensBuilder()
    allTokens.forEach((token) => {
      builder.push(
        token.line,
        token.startCharacter,
        token.length,
        this._encodeTokenType(token.tokenType)
      )
    })

    const docHash = StringHash(document.uri.toString())
    const storageManager = new LocalStorageService(this.context.workspaceState)
    storageManager.setValue<object | undefined>(
      `joseHeader_${docHash}`,
      this.jwtDecode?.joseHeader
    )
    storageManager.setValue<object | undefined>(
      `claimsSet_${docHash}`,
      this.jwtDecode?.claimset
    )

    return builder.build()
  }

  private _encodeTokenType(tokenType: string): number {
    if (tokenTypes.has(tokenType)) {
      return tokenTypes.get(tokenType)!
    } else if (tokenType === 'notInLegend') {
      return tokenTypes.size + 2
    }
    return 0
  }

  private _parseTokenText(text: string): IParsedToken[] {
    const r: IParsedToken[] = []

    const lines = text.split(/\r\n|\r|\n/)
    for (let i = 0; i < lines.length; i++) {
      try {
        const line = lines[i]
        const parts = line.split('.')
        const currentOffset = 0
        let tokenIndex = 0

        this.jwtDecode = new JwtDecode(line)

        parts.forEach((element) => {
          const openOffset = line.indexOf(element, currentOffset)
          r.push({
            line: i,
            startCharacter: openOffset,
            length: element.length,
            tokenType: Array.from(tokenTypes.keys())[tokenIndex],
            tokenModifiers: [],
          })
          tokenIndex++
        })
      } catch (error) {
        continue
      }
    }
    return r
  }
}
